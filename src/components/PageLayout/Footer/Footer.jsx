import { Logo } from '@/components/Icon/Fill';

import classNames from 'classnames/bind';
import Styles from './Footer.module.scss';
const cx = classNames.bind(Styles);

function Footer() {
    return (
        <div className={cx('container')}>
            <div className={cx('content')}>
                <div className={cx('logo')}>
                    <Logo />
                    <span>
                        <span style={{ color: 'rgb(0, 0, 255)' }}>X</span>
                        <span style={{ color: 'rgb(255, 0, 0)' }}>Ổ</span>{' '}
                        <span style={{ color: 'rgb(0, 128, 0)' }}>S</span>
                        <span style={{ color: 'rgb(255, 153, 0)' }}>Ố</span>
                        &nbsp;
                        <span style={{ color: 'rgb(255, 0, 0)' }}>V</span>
                        <span style={{ color: 'rgb(0, 0, 255)' }}>I</span>
                        <span style={{ color: 'rgb(255, 153, 0)' }}>Ệ</span>
                        <span style={{ color: 'rgb(0, 128, 0)' }}>T</span>{' '}
                        <span style={{ color: 'rgb(255, 0, 0)' }}>N</span>
                        <span style={{ color: 'rgb(0, 0, 255)' }}>A</span>
                        <span style={{ color: 'rgb(255, 153, 0)' }}>M</span>
                    </span>
                </div>
                <p>
                    <a href="#">Điều khoản sử dụng</a>
                    <span>&nbsp;| email: info@xosovietnam.net | lottery.net | xosovietnam.net</span>
                </p>
            </div>
        </div>
    );
}

export default Footer;
