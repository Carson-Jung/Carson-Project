import Vue from 'vue'
import Router from 'vue-router'
import Index from '../views/Index.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import HomePage from '../views/HomePage.vue'
import FindHouse from '../views/FindHouse.vue'
import HouseResource from '../views/HouseResource.vue'
import HomeSend from '../views/HomeSend.vue'

Vue.use(Router)

export const createrouters = [
  {
    path: '/',
    name: '主页面',
    redirect: '/index'
  },
  {
    path: '/index',
    name: 'Index',
    component: Index
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
    path: '/findHouse',
    name: 'FindHouse',
    component: FindHouse,
    meta: {
      title: '宜居-找房',
      keepAlive: false
    }
  },
  {
    path: '/houseResource',
    name: 'HouseResource',
    component: HouseResource
  },
  {
    path: '/homePage',
    name: 'homePage',
    component: HomePage
  },
  {
    path: '/homeSend',
    name: 'homeSend',
    component: HomeSend
  }
]

const crouter = () => new Router({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes: createrouters
})

// crouter.beforeEach((to, from, next) => {
//   /* 路由发生变化修改页面title */
//   if (to.meta.title) {
//     document.title = to.meta.title
//   }
//   next()
// })

const router = crouter()

export default router
