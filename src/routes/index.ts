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
        path:'/validate_token',
        method: 'post',
        handler: auth.validate_token
    },
    {
        path:'/products',
        method: 'get',
        handler: productsController.getAll
    },
    {
        path:'/product/:product_id',
        method: 'get',
        handler: productsController.getDetail
    },
    {
        path:'/search/:search_term',
        method: 'post',
        handler: searchController.search
    }
];

export default DynamicRoutes;


// middleware: [authenticateRequest]