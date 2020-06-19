import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

import Login from "./components/Login"
import CadastrarUsuario from "./components/CadastrarUsuario"
import Produto from "./components/Produtos"
import CadastrarProduto from "./components/CadastrarProduto"
import Menu from './components/Menu'
import Footer from './components/Footer'

Vue.component('app-login', Login)
Vue.component('app-cadastro-usuario', CadastrarUsuario)
Vue.component('app-menu', Menu)
Vue.component('app-produto', Produto)
Vue.component('app-cadastrar-produto', CadastrarProduto)
Vue.component('app-footer', Footer)


Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
