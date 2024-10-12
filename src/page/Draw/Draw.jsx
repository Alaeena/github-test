import { Link } from 'react-router-dom';
import { useState } from 'react';

import useMobile from '@/util/useMobile';
import { ConfigModal } from '@/components/Modal';
import { DrawPanel } from '@/components/PageLayout';
import { Option } from '@/components/Icon/Fill';

import classNames from 'classnames/bind';
import Styles from './Draw.module.scss';
const cx = classNames.bind(Styles);

function Draw() {
    const [mobile] = useMobile();
    const [visible, setVisible] = useState(true);

    return (
        <div className={cx('container')}>
            <header className={cx('header', { mobile })}>
                <div className="logo"></div>
            </header>
            <DrawPanel mobile={mobile} />
            <footer className={cx('footer', { mobile })}>
                <Link className={cx('link')} onClick={() => setVisible(true)}>
                    <Option />
                </Link>
                {visible && <ConfigModal setVisible={setVisible} mobile={mobile} />}
            </footer>
        </div>
    );
}

export default Draw;
