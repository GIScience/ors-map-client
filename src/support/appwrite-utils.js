// eslint-disable-next-line no-unused-vars
import {Account, Client, Databases, Functions, Models, AppwriteException} from 'appwrite'
import config from '@/config/app-config'

/**
 * Returns a Promise including an object with a 'tyk_api_key' property
 * @returns {Promise<Models.Document|any|undefined>}
 */
export const getKeyObject = async () => {
  const client = new Client()
    .setEndpoint(config.appwrite.endpoint)  // move to config
    .setProject(config.appwrite.projectId)       // move to config

  const account = new Account(client)
  try {
    return await getExistingUserSession(account, client)
  } catch (error) {
    if (error.code === 401 && error.type === 'general_unauthorized_scope') {
      console.log('No existing Account')
      return await creatNewAnonUser(account, client)
    } else {
      throw error
    }
  }
}

/**
 * Returns an existing anonymous user session
 * @param account
 * @param client
 * @returns {Promise<Models.Document>}
 * @throws AppwriteException
 */
const getExistingUserSession = async (account, client) => {
  const currentUser = await account.get()
  const hasAccount = currentUser.name !== '' &&
    currentUser.email !== '' &&
    currentUser.emailVerification === true &&
    currentUser.labels.length
  const databases = new Databases(client)
  return await databases.getDocument(
    'tyk_integration',
    hasAccount ? 'basic_keys' : 'anonymous_keys',
    currentUser.$id
  )
}

/**
 * Runs the appwrite function to link anon users
 * @param {Functions} functions
 */
function executeLinkAnonFunction(functions) {
  return functions.createExecution(
    config.appwrite.linkAnonFunctionId,
    JSON.stringify({
      tag: window.location.origin,
      policy: config.appwrite.policy
    }),
  )
}

/**
 * Creates a new anonymous user & session.
 * Passes domain & configured policy to specific appwrite function
 * @param account
 * @param client
 * @returns {Promise<any>}
 */
const creatNewAnonUser = async (account, client) => {
  try {
    await account.createAnonymousSession()
    const functions = new Functions(client)

    let res = await executeLinkAnonFunction(functions)

    if (res.status === 'failed' && res.responseStatusCode === 500) {
      res = await executeLinkAnonFunction(functions)
    }
    return JSON.parse(res.responseBody)
  } catch (error) {
    console.error('Error creating anonymous user: ', error)
    throw error
  }
}
