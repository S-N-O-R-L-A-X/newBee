import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Index from '../views/Index.vue'
import UserInfo from '../views/UserInfo.vue'
import HRInfo from '../views/HRInfo.vue'
import MessageCenter from '../views/MessageCenter'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path:'/index',
    name: 'Index',
    component: Index
  },
  {
    path:'/userInfo',
    name: 'UserInfo',
    component: UserInfo
  },
  {
    path:'/hrInfo',
    name: 'HRInfo',
    component: HRInfo
  },
  {
    path:'/messageCenter',
    name: 'MessageCenter',
    component: MessageCenter
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
