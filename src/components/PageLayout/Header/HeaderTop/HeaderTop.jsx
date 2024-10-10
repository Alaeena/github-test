import { routes } from '@/routes';
import { Link } from 'react-router-dom';
import { Fragment } from 'react';

import classNames from 'classnames/bind';
import Styles from './HeaderTop.module.scss';
const cx = classNames.bind(Styles);

function HeaderTop() {
    const isLogin = false;
    return (
        <div className={cx('container')}>
            <div className={cx('content')}>
                <div className={cx('left')}>
                    <span className="small-text">Trang web xổ số Việt Nam - </span>
                    <Link className="small-text" to={routes.root}>
                        www.lottery.com
                    </Link>
                </div>
                <div className={cx('right')}>
                    {isLogin ? (
                        <div>Chào mừng trở lại, {'admin'}</div>
                    ) : (
                        <Fragment>
                            <input className="input" placeholder={'Tên đăng nhập'} />
                            <input className="input" placeholder={'Mật khẩu'} />
                            <div className="input-group">
                                <input id="rememberMe" type="checkbox" />
                                <label htmlFor="rememberMe">Ghi nhớ</label>
                            </div>
                            <button className="button red">Đăng nhập</button>
                        </Fragment>
                    )}
                </div>
            </div>
        </div>
    );
}

export default HeaderTop;
