import MainApp from '@/main'
describe('App render', () => {
  it('should render correct contents', (done) => {
    // eslint-disable-next-line no-undef
    
    // const Constructor = Vue.extend(App)
    // const vm = new Constructor().$mount()

    setTimeout(() => {
      let vm = MainApp.getInstance()   
      expect(vm.$el.querySelector('#app')).toBeDefined()
      expect(vm.$el.querySelector('.simple-place-search')).toBeDefined()
      expect(vm.$el.querySelector('.app-content')).toBeDefined()
      expect(vm.$el.querySelector('#map-view')).toBeDefined()
      done()      
    }, 2000)

  })
})
