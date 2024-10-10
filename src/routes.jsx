import { Home, Draw, Search, Introduction } from './Page';
import { IndexLayout, DrawLayout, SearchLayout, HeaderLayout } from './Layout';

const routes = {
    root: '/',
    search: '/search',
    draw: '/draw',
    introduction: '/introduction',
    webgame: 'https://10chienthang.shop/',
};
const publicRoutes = [
    { path: routes.root, component: Home, layout: IndexLayout },
    { path: routes.draw, component: Draw, layout: DrawLayout },
    { path: routes.search, component: Search, layout: SearchLayout },
    { path: routes.introduction, component: Introduction, layout: HeaderLayout },
];
const privateRoutes = [];
export { publicRoutes, privateRoutes, routes };
