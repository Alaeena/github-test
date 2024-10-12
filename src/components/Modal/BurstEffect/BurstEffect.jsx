import { useEffect, useRef } from 'react';

import classNames from 'classnames/bind';
import Styles from './BurstEffect.module.scss';
const cx = classNames.bind(Styles);

const BurstEffect = () => {
    const audioRef = useRef(null);
    useEffect(() => {
        audioRef?.current?.play();
    }, [audioRef]);

    return (
        <div className={cx('effect')}>
            <audio ref={audioRef}>
                <source src="/sound/spin.mp3" type="audio/mpeg" />
            </audio>
            <div style={{ '--angle': '5deg', '--distance': '70px' }} className={cx('spike', { effect: true })}></div>
            <div style={{ '--angle': '55deg', '--distance': '71px' }} className={cx('spike', { effect: true })}></div>
            <div style={{ '--angle': '65deg', '--distance': '67px' }} className={cx('spike', { effect: true })}></div>
            <div style={{ '--angle': '135deg', '--distance': '70px' }} className={cx('spike', { effect: true })}></div>
            <div style={{ '--angle': '190deg', '--distance': '68px' }} className={cx('spike', { effect: true })}></div>
            <div style={{ '--angle': '210deg', '--distance': '62px' }} className={cx('spike', { effect: true })}></div>
            <div style={{ '--angle': '280deg', '--distance': '61px' }} className={cx('spike', { effect: true })}></div>
            <div style={{ '--angle': '330deg', '--distance': '70px' }} className={cx('spike', { effect: true })}></div>
        </div>
    );
};
BurstEffect.propTypes = {};
export default BurstEffect;
