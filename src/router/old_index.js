import Vue from 'vue'
import Router from 'vue-router'

// Components
import Home from '@/components/Home'
import Posts from '@/components/posts/Posts'
import PostNew from '@/components/posts/PostNew'
import PostEdit from '@/components/posts/PostEdit'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/posts',
      name: 'Posts',
      component: Posts
    },
    {
      path: '/posts/new',
      name: 'PostNew',
      component: PostNew
    },
    {
      path: '/posts/:id',
      name: 'PostEdit',
      component: PostEdit
    }
  ]
})
