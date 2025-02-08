// ./routes.ts
import home from '../controllers/home';
import { authController } from '../controllers/AuthController';
import { productsController } from '../controllers/ProductsController'
import { searchController } from '../controllers/SearchController'
import {  authenticateRequest } from '../middlewares/Authenticate'
import { favouriteController } from '../controllers/FavouriteController';
import { storeController } from '../controllers/StoreController';
import { fileUploadMiddleware } from '../middlewares/fileUpload';

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
        handler: authController.register
    },
    {
        path: '/login',
        method: 'post',
        handler: authController.login,
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
    },
    // Favourites routes
    {
        path: '/favourites',
        method: 'post',
        handler: favouriteController.addToFavourites,
        middleware: [authenticateRequest]
    },
    {
        path: '/favourites/:userId',
        method: 'get',
        handler: favouriteController.list,
        middleware: [authenticateRequest]
    },
    {
        path: '/favourites/:id',
        method: 'delete',
        handler: favouriteController.remove,
        middleware: [authenticateRequest]
    },
    {
        path: '/upload',
        method: 'post',
        handler: storeController.uploadMedia,
        middleware: [authenticateRequest,fileUploadMiddleware]
    }
];

export default DynamicRoutes;


// middleware: [authenticateRequest]