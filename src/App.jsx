import { Fragment } from 'react';
import { publicRoutes, privateRoutes } from './routes';
import { Routes, Route } from 'react-router-dom';

function App() {
    const renderRoute = (item, index) => {
        const Layout = item.layout || Fragment;
        const Page = item.component;

        const props = { path: item.path };
        if (item.index === true) {
            props.index = true;
        }
        return (
            <Route
                key={index}
                {...props}
                element={
                    <Layout>
                        <Page />
                    </Layout>
                }
            />
        );
    };
    const render = () => publicRoutes.map(renderRoute);
    const renderPrivate = () =>
        privateRoutes.map((item, index) => {
            const Component = item.component;
            const childRoutes = item.routes;
            return (
                <Route key={index} path={item.path} element={<Component />}>
                    {childRoutes.map(renderRoute)}
                </Route>
            );
        });

    return (
        <>
            <Routes>
                {render()}
                {renderPrivate()}
            </Routes>
        </>
    );
}

export default App;
