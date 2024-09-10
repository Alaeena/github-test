import { Home, Result, Login } from './Page';
import { IndexLayout, ResultLayout } from './Layout';

const routes = {
    root: '/',
    error: '*',

    result: '/result',
    login: '/login',
};
const publicRoutes = [
    { path: routes.root, component: Home, layout: IndexLayout },
    { path: routes.result, component: Result, layout: ResultLayout },

    { path: routes.login, component: Login, layout: IndexLayout },
    { path: routes.error, component: Error, layout: IndexLayout },
];
const privateRoutes = [];
export { publicRoutes, privateRoutes, routes };
