import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LayoutView from '../views/LayoutView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import ProjectItemView from '../views/ProjectItemView.vue'
import AboutView from '../views/AboutView.vue'
import test from '../views/test.vue'
import ProjectDetail from '../views/ProjectDetail.vue'
import ManageProject from '../views/ManageProject.vue'
import EditProject from '../views/EditProject.vue'
import AddProject from '../views/AddProject.vue'
import ConfirmProject from '../views/ConfirmProject.vue'

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/home',
    component: LayoutView,
    children: [
      {
        path: '',
        name: 'home',
        component: ProjectItemView
      },
      {
        path: 'ProjectItemView',
        component: ProjectItemView
      },
      {
        path:'ManageProject',
        component:ManageProject
      },
      {
        path:'AddProject',
        component:AddProject
      },
      {
        path:'ConfirmProject',
        component:ConfirmProject
      }
    ]
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
     path: '/project/:Title',
     name:'projectdetails',
     component: ProjectDetail
  },
  {
    path: '/project/edit/:Title',
    name:'EditProject',
    component: EditProject
 }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
