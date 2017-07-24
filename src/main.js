import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)

// Custom directives global
Vue.directive('theme', {
  bind(el, binding, vnode) {
    if (binding.value == 'wide') {
      el.style.maxWidth = '1260px'
    } else if (binding.value = 'narrow') {
      el.style.maxWidth = '560px'
    }
    if (binding.arg == 'column') {
      el.style.background = '#ddd'
      el.style.padding = '20px'
    }
  }
})
// Custom directives global (END)

//Filters globals
Vue.filter('snippet', function (value) {
  return value.slice(0, 100)+'...'
})
//Filters globals (END)


new Vue({
  el: '#app',
  render: h => h(App)
})