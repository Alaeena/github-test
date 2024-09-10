import { routes } from '@/routes';
import { Link } from 'react-router-dom';
import { Logo } from '@/components/Icon/Fill';

import HeaderTop from './HeaderTop/HeaderTop';
import HeaderSearch from './HeaderSearch/HeaderSearch';

import classNames from 'classnames/bind';
import Styles from './Header.module.scss';
const cx = classNames.bind(Styles);

function Header() {
    return (
        <div className={cx('container')}>
            <HeaderTop />
            <div className={cx('content')}>
                <Link to={routes.root} className={cx('logo')}>
                    <Logo />
                    <div className={cx('logo-text')}>
                        <strong className="super-text">Xổ Số Việt Nam</strong>
                        <span className="small-text">Kết Quả Xổ Số</span>
                    </div>
                </Link>

                <HeaderSearch />
            </div>
            <div className={cx('bottom')}>
                <div>
                    <Link className="button red small-text" to={routes.root}>
                        Trang chủ
                    </Link>
                    <Link className="button red small-text" to={routes.root}>
                        Kiểm tra mã dự thưởng
                    </Link>
                    <Link className="button red small-text" to={routes.root}>
                        Kết quả xổ số
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Header;
