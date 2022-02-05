import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "Home" */ '../views/Home.vue'),
    props: true,

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
    path: '/Compte',
    name: 'Compte',
    component: () => import(/* webpackChunkName: "grid" */ '../views/Compte.vue')
  },
  {
    path: '/Offres',
    name: 'Offres',
    component: () => import(/* webpackChunkName: "grid" */ '../views/Offres.vue')
  },
  {
    path: '/Notifications',
    name: 'Notifications',
    component: () => import(/* webpackChunkName: "grid" */ '../views/Notifications.vue')
  },
  {
    path: '/Account',
    name: 'Account',
    component: () => import(/* webpackChunkName: "grid" */ '../views/Account.vue')
  },
  {
    path: '/Login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "grid" */ '../views/Login.vue')
  },
  {
    path: '/Signup',
    name: 'Signup',
    component: () => import(/* webpackChunkName: "grid" */ '../views/Signup.vue')
  },
  {
    path: '/SignupSenior',
    name: 'SignupSenior',
    component: () => import(/* webpackChunkName: "grid" */ '../views/SignupSenior.vue')
  },
  {
    path: '/Cadeaux',
    name: 'Cadeaux',
    component: () => import(/* webpackChunkName: "grid" */ '../views/Cadeaux.vue')
  },
  {
    path: '/detailServiceStudent',
    name: 'DetailServiceStudent',
    component: () => import(/* webpackChunkName: "grid" */ '../views/detailServiceHomeStudent.vue'),
    props: true,
  },
  {
    path: '/profil/:id',
    name: 'Profil',
    component: () => import(/* webpackChunkName: "grid" */ '../views/profil.vue'),
    props: true
  },
  {
    path: '/profilDetail',
    name: 'ProfilDetail',
    component: () => import(/* webpackChunkName: "grid" */ '../views/profilDetail.vue')
  },
  {
    path: '/Paid/:idSent',
    name: 'Paid',
    component: () => import(/* webpackChunkName: "grid" */ '../views/Paid.vue')
  }
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
