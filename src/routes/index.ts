// ./routes.ts
import home from '../controllers/home';
import { auth } from '../controllers/AuthController';
import { productsController } from '../controllers/ProductsController'
import path from 'path';

// Define dynamic routes
const DynamicRoutes : any = [
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
        handler: auth.login
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
    }
];

export default DynamicRoutes;