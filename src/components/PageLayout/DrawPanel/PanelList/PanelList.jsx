import PropTypes from 'prop-types';
import { useEffect } from 'react';

import PanelItem from './PanelItem';
import { prize_map } from '@/util/useDraw';

import classNames from 'classnames/bind';
import Styles from './PanelList.module.scss';
import useDraw from '@/util/useDraw';
const cx = classNames.bind(Styles);

function createZerosString(length) {
    return '0'.repeat(length);
}

const DrawPanel = ({ mobile, state, prize, animation, value, setAnimation }) => {
    const { storage } = useDraw();
    const prizeItem = prize_map[prize];
    const showResult =
        state == 'idle' &&
        animation == 'fadeIn' &&
        value != createZerosString(prizeItem?.number) &&
        storage.data[prize] &&
        storage.data[prize] == prizeItem?.count;

    useEffect(() => {
        if (animation == 'rotate' && state == 'idle') {
            setTimeout(() => setAnimation('fadeIn'), 500);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [animation, state]);

    return (
        <div
            className={cx('content', { mobile }, animation)}
            onAnimationEnd={() => {
                if (animation == 'default' || animation == 'leftSlide' || animation == 'rightSlide') {
                    setAnimation('rotate');
                }
            }}
        >
            <div className={cx('content-inner', { mobile })}>
                {showResult ? (
                    <>
                        <div className={cx('slots', { mobile }, animation, state)}>
                            {Array.from({ length: value.length }, (v, i) => i).map((index) => (
                                <PanelItem key={index} prize={prize} value={value.charAt(index)} state="result" />
                            ))}
                        </div>
                    </>
                ) : mobile && value.length > 5 ? (
                    <>
                        <div className={cx('slots', { mobile }, animation, state)}>
                            <PanelItem key={1} prize={prize} value={value.charAt(1)} state={state} />
                            <PanelItem key={2} prize={prize} value={value.charAt(2)} state={state} />
                            <PanelItem key={3} prize={prize} value={value.charAt(3)} state={state} />
                        </div>
                        <div className={cx('slots', { mobile }, animation, state)}>
                            <PanelItem key={4} prize={prize} value={value.charAt(4)} state={state} />
                            <PanelItem key={5} prize={prize} value={value.charAt(5)} state={state} />
                            <PanelItem
                                key={6}
                                prize={prize}
                                value={value.charAt(6)}
                                state={state == 'confirm' ? 'drawing' : state}
                            />
                        </div>
                    </>
                ) : (
                    <div className={cx('slots', { mobile }, animation, state)}>
                        {Array.from({ length: value.length }, (v, i) => i).map((index) => {
                            if (state == 'confirm' && index == value.length - 1) {
                                return (
                                    <PanelItem key={index} prize={prize} value={value.charAt(index)} state="drawing" />
                                );
                            } else {
                                return (
                                    <PanelItem key={index} prize={prize} value={value.charAt(index)} state={state} />
                                );
                            }
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};
DrawPanel.propTypes = {
    mobile: PropTypes.bool.isRequired,
    value: PropTypes.string.isRequired,
    prize: PropTypes.number.isRequired,
    state: PropTypes.string.isRequired,
    animation: PropTypes.string.isRequired,
    setAnimation: PropTypes.func.isRequired,
};
export default DrawPanel;
