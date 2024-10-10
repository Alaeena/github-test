import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { routes } from '@/routes';

import classNames from 'classnames/bind';
import Styles from './Header.module.scss';
const cx = classNames.bind(Styles);

function Header({ mobile }) {
    return (
        <div className={cx('container')}>
            <div className={cx('content')}>
                {mobile ? (
                    <div className={cx('logo', { mobile })}>
                        <div className="icon" />
                        <Link to={routes.webgame} className={cx('logo-text')}>
                            <strong className="super-text">Quay số trúng thưởng</strong>
                            <strong className="super-text">may mắn đổi đời</strong>
                        </Link>
                    </div>
                ) : (
                    <>
                        <Link to={routes.webgame} className={cx('logo', { mobile })}>
                            <div className="icon" />
                            <div className={cx('logo-text')}>
                                <strong className="super-text">Quay số trúng thưởng</strong>
                                <strong className="super-text">may mắn đổi đời</strong>
                            </div>
                        </Link>
                        <div className={cx('middle', 'banner2')}></div>
                    </>
                )}
            </div>
            <div className={cx('bottom', { mobile })}>
                <div>
                    <Link className="button red small-text" to={routes.root}>
                        TRANG CHỦ
                    </Link>

                    <Link className="button red small-text" to={routes.introduction}>
                        GIỚI THIỆU
                    </Link>
                    <Link className="button red small-text" to={routes.search}>
                        TRA CỨU MÃ DỰ THƯỞNG
                    </Link>
                </div>
            </div>
        </div>
    );
}
Header.propTypes = {
    mobile: PropTypes.bool.isRequired,
};
export default Header;
