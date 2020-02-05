import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './views/Home.vue'
import Schedule from './views/Schedule.vue'
import Classroom from './views/Classroom.vue'
import Teachers from './views/Teachers.vue'
import Login from './views/Login.vue'
import LoginLayout from './layouts/login.vue'
import DefaultLayout from './layouts/default.vue'
import store from './store'
import Documents from './views/Documents'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'hash',
  routes: [
    {
      path: '/login',
      component: LoginLayout,
      children: [
        {
          path: '',
          name: 'login',
          component: Login
        }
      ]
    },
    {
      path: '/home',
      component: DefaultLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: Home
        }
      ]
    },
    {
      path: '/schedule',
      component: DefaultLayout,
      children: [
        {
          path: '',
          name: 'schedule',
          component: Schedule
        }
      ]
    },
    {
      path: '/classroom',
      component: DefaultLayout,
      children: [
        {
          path: '',
          name: 'classroom',
          component: Classroom
        }
      ]
    },
    {
      path: '/teachers',
      component: DefaultLayout,
      children: [
        {
          path: '',
          name: 'teachers',
          component: Teachers
        }
      ]
    },
    {
      path: '/documents',
      component: DefaultLayout,
      children: [
        {
          path: '',
          name: 'documents',
          component: Documents
        }
      ]
    },
    {
      path: '/',
      redirect: '/home'
    }
  ]
})

router.beforeEach((to, from, next) => {
  // Fetch auth from localstorage
  store.dispatch('fetchAuthToken')

  // When the route is /login
  if (to.fullPath === '/login') {
    // User is logged
    if (store.state.auth) {
      next('/')
    }
  // User is not logged
  } else if (!store.state.auth) {
    next('/login')
  }

  next()
})

export default router
