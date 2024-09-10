import classNames from 'classnames/bind';
import Styles from './Layout.module.scss';
const cx = classNames.bind(Styles);

function ResultLayout({ children }) {
    return (
        <div className={cx('admin-container')}>
            <h1>Sidebar</h1>

            <div className={cx('flex-column')}>
                <h1>ResultLayout</h1>
                {children}
            </div>
        </div>
    );
}

export default ResultLayout;
