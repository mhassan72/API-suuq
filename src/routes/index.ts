// ./routes.ts
import home from '../controllers/home';
import { auth } from '../controllers/AuthController';
import { products } from '../controllers/ProductsController'
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
        handler: products.all
    }
];

export default DynamicRoutes;