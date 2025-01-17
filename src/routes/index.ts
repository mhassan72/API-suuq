// ./routes.ts
import home from '../controllers/home';
import { auth } from '../controllers/AuthController';
import { productsController } from '../controllers/ProductsController'
import { searchController } from '../controllers/SearchController'
import {  authenticateRequest } from '../middlewares/Authenticate'

// import types
import type { RouteConfig } from '../types'

// Define dynamic routes
const DynamicRoutes : RouteConfig[] = [
    {
        path: '/',
        method: 'get',
        handler: home
    },
    {
        path: '/register',
        method: 'post',
        handler: auth.register
    },
    {
        path: '/login',
        method: 'post',
        handler: auth.login,
    },
    {
        path:'/products',
        method: 'get',
        handler: productsController.getAll,
        middleware: [authenticateRequest]
    },
    {
        path:'/product/:product_id',
        method: 'get',
        handler: productsController.getDetail,
        middleware: [authenticateRequest]
    },
    {
        path:'/search/:search_term',
        method: 'post',
        handler: searchController.search,
        middleware: [authenticateRequest]
    }
];

export default DynamicRoutes;