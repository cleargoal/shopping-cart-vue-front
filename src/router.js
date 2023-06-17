import {createRouter, createWebHistory} from 'vue-router';

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
        path: "/products/:category",
        name: "products",
        component: () => import('./components/products/ProductsList.vue'),
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
    {
        path: "/admin/set-discount",
        name: "set-discount",
        component: () => import('./pages/admin/AdminSetDiscount.vue'),
    },
    {
        path: "/admin/discounts",
        name: "discounts",
        component: () => import('./pages/admin/DiscountsList.vue'),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
