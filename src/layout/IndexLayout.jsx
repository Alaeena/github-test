import { Header, Sidebar, Footer } from '@/components/PageLayout';

import classNames from 'classnames/bind';
import Styles from './Layout.module.scss';
const cx = classNames.bind(Styles);

function AdminLayout({ children }) {
    return (
        <div className={cx('container')}>
            <Header />

            <div className={cx('content', 'row')}>
                <div className={cx('column')}>{children}</div>
                <Sidebar />
            </div>
            <Footer />
        </div>
    );
}

export default AdminLayout;
