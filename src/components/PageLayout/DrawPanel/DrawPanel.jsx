import PropTypes from 'prop-types';
import { useEffect, useState, useRef } from 'react';
import { getLotteryResults, processLottery } from '@/service/ResultService';

import PanelList from './PanelList/PanelList';
import useDraw, { isDrawable } from '@/util/useDraw';
import { LeftButton, RightButton } from '@/components/Icon/Regular';
import { prize_map } from '@/util/useDraw';

import classNames from 'classnames/bind';
import Styles from './DrawPanel.module.scss';
const cx = classNames.bind(Styles);

function createZerosString(length) {
    return '0'.repeat(length);
}

const DrawPanel = ({ mobile }) => {
    const length = Object.keys(prize_map).length;
    const audioRef = useRef(null);
    const audioRef2 = useRef(null);
    const audioRef3 = useRef(null);
    const audioRef4 = useRef(null);

    const { action, storage } = useDraw();
    const [isPlaying, setIsPlaying] = useState(false);

    const [animation, setAnimation] = useState('');
    const [prize, setPrize] = useState(length - 1);
    const [state, setState] = useState('idle');

    const [visible, setVisible] = useState(true);
    const [debounce, setDebounce] = useState(true);
    const [result, setResult] = useState();
    console.log(animation, state, visible, isPlaying);

    const prizeItem = prize_map[prize];
    const countItem = storage.data[prize] || 0;
    const value =
        (result?.results && result?.results[prizeItem.map][countItem]) ||
        result?.results[prizeItem.map][countItem - 1] ||
        createZerosString(prizeItem.number);

    const animationPlaying = !(animation == 'fadeIn' || animation == '');
    const drawable = storage.allowDrawable || isDrawable(storage);

    const handleState = () => {
        if (!result) {
            onNewDraw();
        }
        if (state == 'idle') {
            setState('drawing');
            setIsPlaying(true);
            setVisible(false);
        } else if (state == 'drawing' && prizeItem.count == 1) {
            audioRef4.current.play();
            setState('confirm');
        } else if (state == 'drawing' || state == 'confirm') {
            audioRef4.current.play();
            setState('result');
            setIsPlaying(false);
        } else if (state == 'result') {
            action.Update(prize);
            setDebounce(false);
            setAnimation('default');
            setState('idle');
        }
    };
    const onNewDraw = () => {
        processLottery(storage.allowSpecial).then((data) => {
            if (data != null && data?.code != 102) {
                return;
            }
            getLotteryResults().then((data) => {
                if (data?.code == 102) {
                    return;
                }
                setResult(data);
            });
        });
    };
    const onChange = (value) => {
        if (state == 'drawing') return;
        let newValue = prize + value;
        const newAnimation = value < 1 ? 'rightSlide' : 'leftSlide';

        if (newValue <= 0) {
            newValue = 0;
        } else if (newValue >= length - 1) {
            newValue = length - 1;
        }
        setPrize(newValue);
        setAnimation(newAnimation);
    };
    useEffect(() => setAnimation('default'), []);
    useEffect(() => {
        const timerId = setTimeout(() => {
            setVisible(true);
        }, 2000);
        return () => clearTimeout(timerId);
    }, [visible]);
    useEffect(() => {
        if (animation == 'default' && !debounce && countItem >= prizeItem.count && prize != 0) {
            setTimeout(() => {
                setDebounce(true);
                onChange(-1);
            }, 1500);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [animation]);
    useEffect(() => {
        let intervalId;
        if (isPlaying) {
            audioRef.current.play();
            audioRef4.current.play();
            intervalId = setInterval(() => {
                audioRef.current.currentTime = 0.2;
            }, 200);
        } else if (prizeItem.count == 1 && state != 'idle') {
            audioRef3.current.play();
            setTimeout(() => audioRef2.current.play(), 1000);
        } else if (state != 'idle') {
            setTimeout(() => audioRef2.current.play(), 1000);
        }
        return () => clearInterval(intervalId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isPlaying]);

    return (
        <div className={cx('container')}>
            <audio autoPlay={false} ref={audioRef}>
                <source src="/sound/roller-loop.mp3" type="audio/mpeg" />
            </audio>
            <audio autoPlay={false} ref={audioRef2}>
                <source src="/sound/tada.mp3" type="audio/mpeg" />
            </audio>
            <audio autoPlay={false} ref={audioRef3}>
                <source src="/sound/jackpot.mp3" type="audio/mpeg" />
            </audio>
            <audio autoPlay={false} ref={audioRef4}>
                <source src="/sound/spin.mp3" type="audio/mpeg" />
            </audio>
            <PanelList
                mobile={mobile}
                prize={prize}
                value={value}
                state={state}
                animation={animation}
                setAnimation={setAnimation}
            />
            <div className={cx('option')}>
                <div className={cx('option-prize')}>
                    <div className={cx('button', 'between', { mobile })}>
                        <div onClick={() => onChange(1)} className={cx('icon')}>
                            {!animationPlaying && prize < length - 1 && state == 'idle' && <LeftButton />}
                        </div>
                        <button>
                            <span>{prizeItem.text}</span>
                        </button>
                        <div onClick={() => onChange(-1)} className={cx('icon')}>
                            {!animationPlaying && prize > 0 && state == 'idle' && <RightButton />}
                        </div>
                    </div>

                    <div className={cx('button', { mobile })}>
                        Lần Quay: {countItem >= prizeItem.count ? countItem : countItem + 1}
                    </div>
                </div>
                {!drawable && (
                    <div className={cx('message', { mobile })}>Chưa đến giờ quay giải thưởng trong ngày.</div>
                )}
                {drawable && countItem >= prizeItem.count && (
                    <div className={cx('message', { mobile })}>Bạn đã quay xong giải thưởng này ngày hôm nay.</div>
                )}
                {drawable && !animationPlaying && visible && countItem < prizeItem.count && (
                    <button className={cx('option-button', { mobile }, animation)} onClick={() => handleState()}>
                        <div className={cx('button-draw', 'spinner')}></div>
                        {state != 'idle' ? (
                            <div className={cx('text', 'chot-button')} />
                        ) : (
                            <div className={cx('text', 'quay-button')} />
                        )}
                    </button>
                )}
            </div>
        </div>
    );
};
DrawPanel.propTypes = {
    mobile: PropTypes.bool.isRequired,
};
export default DrawPanel;
