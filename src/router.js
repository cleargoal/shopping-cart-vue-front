import {createRouter, createWebHistory} from 'vue-router';
import App from './app/App.vue';

const routes = [
    {
        path: '/',
        name: 'app',
        component: () => import('./pages/FirstAccess.vue')
    },
    {
        path: '/cart',
        name: 'cart',
        component: () => import('./components/cart/ShoppingCart.vue')
    },
    {
        path: "/products",
        name: "products",
        component: () => import('./components/products/ProductsList.vue'),
    },
    {
        path: "/set-discount",
        name: "set-discount",
        component: () => import('./pages/admin/AdminSetDiscount.vue'),
    },
    {
        path: "/discounts",
        name: "discounts",
        component: () => import('./pages/admin/DiscountsList.vue'),
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('./pages/Login.vue')
    },
    {
        path: '/error',
        name: 'error',
        component: () => import('./pages/Error.vue')
    },
    {
        path: '/notfound',
        name: 'notfound',
        component: () => import('./pages/NotFound.vue')
    },
    {
        path: '/access',
        name: 'access',
        component: () => import('./pages/WelcomePage.vue')
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
