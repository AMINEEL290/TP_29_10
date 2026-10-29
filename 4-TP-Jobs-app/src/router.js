import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import JobDetails from './views/JobDetails.vue'
import JobForm from './views/JobForm.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/jobs/new', name: 'job-create', component: JobForm },
    { path: '/jobs/:id/edit', name: 'job-edit', component: JobForm },
    { path: '/jobs/:id', name: 'job-details', component: JobDetails },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
  scrollBehavior: () => ({ top: 0 }),
})

export default router
