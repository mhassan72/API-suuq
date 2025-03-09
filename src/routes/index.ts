// ./routes.ts
import { home } from '../controllers/home';
import { authController } from '../controllers/AuthController';
import { productsController } from '../controllers/ProductsController'
import { searchController } from '../controllers/SearchController'
import {  authenticateRequest } from '../middlewares/Authenticate'
import { favouriteController } from '../controllers/FavouriteController';
import { storeController } from '../controllers/StoreController';
import { fileUploadMiddleware } from '../middlewares/fileUpload';
import { chatController } from '../controllers/ChatController';

// import types
import type { RouteConfig } from '../types'

// Define dynamic routes
const DynamicRoutes : RouteConfig[] = [
    {
        path: '/',
        method: 'get',
        handler: home.home
    },
    {
        path: '/browse',
        method: 'get',
        handler: home.browse
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
    // products routes
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
    // upload files   
    {
        path: '/upload',
        method: 'post',
        handler: storeController.uploadMedia,
        middleware: [authenticateRequest,fileUploadMiddleware]
    },
    // chat routes 
    {
        path: '/chats',
        method: 'post',
        handler: chatController.getAll
    },
    {
        path: '/chat/:chat_id',
        method: 'post',
        handler: chatController.getDetail
    }

];

export default DynamicRoutes;


// middleware: [authenticateRequest]