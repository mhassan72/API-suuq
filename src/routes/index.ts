// ./routes.ts
import home from '../controllers/home';
import AuthController from '../controllers/AuthController';

const auth = new AuthController()

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
    }
];

export default DynamicRoutes;