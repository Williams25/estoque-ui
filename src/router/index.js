import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: `/produto`,
    name: 'Produto',
    component: () => import('../views/Produtos')
  },
  {
    path: '/cadastroUsuario',
    name: 'CadastroUsuario',
    component: () => import('../views/CadastrarUsuario')
  },
  {
    path: '/cadastrarProduto',
    name: 'CadastroProduto',
    component: () => import('../views/CadastrarProduto')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach
export default router