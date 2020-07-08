# CRUD client #

The generic crud solution allows the communication with a back-end api with minimum code.
You just need to define the endpoint of a resource and add the crud to a component by instantiating it to a vue.js component.
You can also use a model instance or the model service directly to retrieve/send data without implementing the crud behaviors in your VueJS component/page.
The solution is composed of four main classes/files:

- [crud/crud.js](src/core/crud.js)
- [crud/form.js](src/core/form.js)
- [crud/model-service.js](src/core/model-service.js)
- [crud/model.js](src/core/model.js)

## Model Service ##

Model service class that allows the running of REST api actions in a remote server for a defined endpoint resource.
It is intended to be used in conjunction with the [Model class](src/core/model.js).

Params:

1. @param string - `endPoint` the relative url of the resource
1. @param string - `resourceName` the resource name (used to build the default confirmation messages)
1. @param {} options - `optional` options that allows to customize the model service behavior

The options object may contain the following attributes:

- `transformRequest` (function): executed before the request is made. Useful to change data in special circumstances.
    This function will receive an object with the endpoint and filters (when available) attributes. It is not intended to replace the axios
    request interceptor!
- `transformResponse` (function): executed after the request is made, passing the original response object received.
    Useful if it is necessary to modify the returned data before transforming them in a Model instance
- `raw` (boolean): `true` if the default transformation of the results into Model instances should be skipped.
    The active record will then not work with the returned items. Useful when you just want to get data, and not destroy/update things.
- `pk` (string): overwrites the default primary key attribute, that is 'id'. Use it if your model on the remote server uses a different field as primary key

How to create a model service to represent a resource in the back-end:

```js
  // file my-model-service.js

  import ModelService from '@/core/model-service'

  let options = {
    pk: 'my-pk-field-name' // necessary only if different of `id`
  }
  const myModelService = new ModelService('relative/url/to/resource/endpoint', 'My resource nice name', options)

  export default myModelService
```

After this my-model-service.js file is created, you can import it anywhere in the app, and use the following methods:

- `getName` - returns the model nice name

- `getEndPoint` - returns the endpoint defined for the model service

- `query(filters)` - receives an array of query filters and returns a promise, that when resolved, passes a collection of resources

- `customQuery(customOptions, endPoint)` - receives an endpoint, an array of query filters and an object with custom options and returns a promise,
  that when resolved, passes a collection of resources. The customOptions allows the overwrite of the instance options only for the executed request.
  The `customOptions` and `endPoint` parameters are optional and will be replaced by the instance options endpoint if are null.
  The following options attributes can defined:
  - `query` (object): containing key -> value attributes to be used as query string)
  - `data` (object): containing key -> value attributes to be used as post data)
  - `verb` (string): verb to be used - default is 'get'
  - `transformRequest`: function to be called back on transformRequest event

- `get(pkValue)` - get a resource identified by its primary key value

Example of model service usage:

```js
import myModelService from './my-model-service'

export default {
  created () {
    // Get the available policies (type of tokens) and store on the data tokenType's key
    myModelService.query().then((models) => {
      this.myModels = models
      // by default, each model is an instance of Model @/core/model
      // having the $save, $update, $destroy methods
    })
  }
}
```

## Form validation ##

The crud solution uses the form.js to validate a form before submitting the form.
But it is possible to disable this by passing the `skipFormValidation:true` in the options object passed to the crud constructor.
Is the default behavior is on, the solution will look for a form reference, in your component context, named `form` *(like vm.$refs.form, where vm is the component context passed to the crud)*.
It is also possible to specify a alternative form ref name, by setting the `formRef:<my-form-ref-name>(string)` in the options object passed to the constructor of crud.


It is also possible to use the form validation apart from the crud component. You just have to import it, create a new instance passing:

- the `formRef` object,
- the `context` object (the component *`this`*)
- the optional `options` object.

Then, just run the `validate` method. It will run the default form object passed in the formRef validation and also check for the `required` attribute in each input and validate it.
If any field is invalid, it will highlight it, set the `valid` status as false and also add a string to the inputs the error bucket using input label and crud translations for `required`.

## Adding CRUD functionalities to a component ##

The CRUD class allows to add common extended CRUD actions (get, index, save, update, destroy)
to a component that uses the RESTFull API pattern. It is intended to be used in conjunction with the class ModelService (required by the constructor)

This crud class implements the full cycle to get and send data to/from a remote server, including before destroy confirmation dialog,
refresh listed data after save, destroy and update and success and confirmation messages.

EXPORTS: this javascript module exports two objects: CRUDData and CRUD.

The crud setter expects the following parameters:

1. @param {} `vm` - the component instance, that can be passed using `this`
2. @param {} `modelService`  - an instance of the ModelService class representing the service that provides the data service to a resource.@see @/core/model-service
3. @param {} `options` - object with optional parameters that allows to customize the CRUD behavior

The options object may contain the following attributes:

- `queryOnStartup` (boolean): if the index action must be ran on the first CRUD run
- `indexFailedMsg` (string): custom message to be displayed on index action failure
- `getFailedMsg` (string): custom message to be displayed on get single item action failure
- `saveFailedMsg` (string): custom message to be displayed on save action failure
- `updatedMsg` (string): custom message to be displayed on update action failure
- `confirmDestroyTitle` (string): custom title to be displayed on the confirm dialog shown before destroy action
- `confirmDestroyText` (string): custom text to be displayed on the confirm dialog shown before destroy action
- `destroyedMsg` (string): custom message to be displayed after an resource has been destroyed
- `destroyFailedMsg` (string): custom message to be displayed on destroy action failure
- `destroyAbortedMsg` (string): custom message to be displayed when a destroy is aborted
- `skipFormValidation` (boolean): skips the auto form validation
- `skipFormValidation` (boolean): skips the auto form validation
- `skipAutoIndexAfterAllEvents` (boolean) : skips the auto resources reload after data change events (update, destroy and save)
- `skipAutoIndexAfterSave` (boolean) : skips the auto resources reload after save
- `skipAutoIndexAfterUpdate` (boolean) : skips the auto resources reload after update
- `skipAutoIndexAfterDestroy` (boolean) : skips the auto resources reload after destroy
- `skipServerMessages` (boolean) : skip using server returned message and use only front end messages do display toasters
- `skipShowValidationMsg` (boolean) : skit showing the validation error message via toaster when a form is invalid
- `formRef` (string, optional) : the alternative name of the form ref you are using in the template.
  Used to auto validate the form. If not provided, it is assumed that the form ref name is `form`
- `[http-error-status-code-number]` : defines the message to be used when an http error status code is returned by a request (only available fot status code from `300` to `505`)

Example of adding CRUD to a component:

```js
import {CRUD, CRUDData} from '@/core/crud'
import myModelService from './my-model-service'

// Then, inside your default export

export default {
  data: () => ({
    // create the crud data objects (resource, resources and modelService) using three dots notation
    ...CRUDData
  })

  // The second one must be used to instantiate the crud class on the vue created event, like this:
  created () {
    // extend this component, adding CRUD functionalities
    let options = {...}
    CRUD.set(this, myModelService, options)
  }
}
```

A toaster message is shown after each action using the following priority: server response message,
custom message specified in options or the default one (defined @crud/i18n/crud.i18n.en.js)

Crud events optional functions:

If the vue `component` to which you are adding the CRUD has one of the following defined methods, it is gonna be called by the CRUD.
If it returns false, the execution will be rejected and stopped

- `beforeIndex`
- `beforeGet`
- `beforeSave`
- `beforeUpdate`
- `beforeDestroy`
- `beforeShowError`

If the vue `component` to which you are adding the CRUD has one of the following defined methods, it is gonna be called by the CRUD passing the related data

- `afterIndex`
- `afterGet`
- `afterSave`
- `afterUpdate`
- `afterDestroy`
- `afterError`

Form validation:
If the vue `component` to which you are adding the CRUD has a `$ref` named `form` and it does not have the option `skipFormValidation` defined as `true`,
the auto form validation will be ran before saving and updating.
