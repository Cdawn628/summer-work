import Vue from 'vue'
import Router from 'vue-router'
const News = () => import('../views/news/News')
const Profile = () => import('../views/profile/Profile')
const Writing = () => import('../views/writing/Writing')

Vue.use(Router)
const routes = [
  {
    path: '/',
    redirect: '/news'
  },
  {
    path: '/news',
    component: News
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/writing',
    component: Writing
  }
]

const router = new Router({
  routes,
  mode: 'history'
});

export default router
