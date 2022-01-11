import Main from '@/main'
import Vue from 'vue'

// Solves the 'RegeneratorRuntime is not defined' issue according to
// https://stackoverflow.com/questions/28976748/regeneratorruntime-is-not-defined
import '@babel/polyfill'

describe('Main', () => {
  it('should run main and load app', async (done) => {
    let main = Main
    await new Promise(resolve => setTimeout(resolve, 2000))
    expect(main.vueInstance).not.toBeNull()  
    expect(main.vueInstance).toBeInstanceOf(Vue)
    done()    
  })
})
