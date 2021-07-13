import { createWebHistory, createRouter } from "vue-router";

const routes = [
    {
        path: '/',
        name: '/',
        component: () => import('../views/Home'),
    },
    { 
        path: '/:pathMatch(.*)*', 
        name: 'not-found', 
        component: () => import('../components/404'),
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;