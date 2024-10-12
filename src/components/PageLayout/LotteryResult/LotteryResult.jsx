import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { getSocketResult } from '@/service/SocketService';
import { isValidDateString } from '@/util/dateUtil';
import { BurstEffect } from '@/components/Modal';
import { socket } from '@/util/socket';

import classNames from 'classnames/bind';
import Styles from './LotteryResult.module.scss';
const cx = classNames.bind(Styles);

const prize_map = {
    special: 'prize_jackpot',
    first: 'prize_first',
    second: 'prize_second',
    third: 'prize_third',
    fourth: 'prize_fourth',
    fifth: 'prize_fifth',
    sixth: 'prize_sixth',
    seventh: 'prize_seventh',
};
//Thứ tự quay số
const draw_indexs = [
    { prize: prize_map.first, index: 0 },

    { prize: prize_map.second, index: 0 },
    { prize: prize_map.second, index: 1 },

    { prize: prize_map.third, index: 0 },
    { prize: prize_map.third, index: 1 },
    { prize: prize_map.third, index: 2 },
    { prize: prize_map.third, index: 3 },
    { prize: prize_map.third, index: 4 },
    { prize: prize_map.third, index: 5 },

    { prize: prize_map.fourth, index: 0 },
    { prize: prize_map.fourth, index: 1 },
    { prize: prize_map.fourth, index: 2 },
    { prize: prize_map.fourth, index: 3 },

    { prize: prize_map.fifth, index: 0 },
    { prize: prize_map.fifth, index: 1 },
    { prize: prize_map.fifth, index: 2 },
    { prize: prize_map.fifth, index: 3 },
    { prize: prize_map.fifth, index: 4 },
    { prize: prize_map.fifth, index: 5 },

    { prize: prize_map.sixth, index: 0 },
    { prize: prize_map.sixth, index: 1 },
    { prize: prize_map.sixth, index: 2 },

    { prize: prize_map.seventh, index: 0 },
    { prize: prize_map.seventh, index: 1 },
    { prize: prize_map.seventh, index: 2 },
    { prize: prize_map.seventh, index: 3 },

    { prize: prize_map.special, index: 0 },
];
function LotteryResult({ mobile }) {
    const [searchParams] = useSearchParams();
    const [result, setResult] = useState({});
    const [effect, setEffect] = useState();

    const date = new Date(result?.lotto_drawtime * 1000);
    const vietnamTime = date.toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
    const lotteryResults = result?.results;

    function findValue(prize, idx, defaultValue) {
        let value = lotteryResults[prize][idx];
        if (value && value == effect) {
            return (
                <>
                    <span>{value}</span>
                    <BurstEffect />
                </>
            );
        } else if (value) {
            return value;
        }
        //Tìm giải đang quay tiếp theo
        let nextItem = draw_indexs[0];
        for (let i = 0; i < draw_indexs.length; i++) {
            const drawItem = draw_indexs[i];
            if (!lotteryResults[drawItem.prize][drawItem.index]) {
                nextItem = drawItem;
                break;
            }
        }

        //Neu dang quay thi show loading indicator
        if (nextItem.prize == prize && nextItem.index == idx) {
            return <span className={cx('loader')}></span>;
        }
        return defaultValue;
    }
    useEffect(() => {
        const date = searchParams.get('date');
        const dateString = isValidDateString(date) ? dayjs(date, 'DD/MM/YYYY').format('YYYY/MM/DD') : null;
        getSocketResult(dateString, (response) => {
            setResult(response);
        });
    }, [searchParams]);

    useEffect(() => {
        function onNewPrize(value, prize, index, results) {
            console.log(value, prize, index);
            setEffect(value);
            setResult(results);
        }

        socket.on('NEW_PRIZE', onNewPrize);
        return () => socket.off('NEW_PRIZE', onNewPrize);
    }, []);

    if (result?.code == 102) {
        return (
            <div className={cx('content')}>
                <div className={cx('empty')}>{result.message}</div>
            </div>
        );
    } else if (lotteryResults == null) {
        return (
            <div className={cx('content')}>
                <div className={cx('empty')}>Bộ số ngày {dayjs().format('DD/MM/YYYY')} chưa được quay</div>
            </div>
        );
    }
    return (
        <div className={cx('content')}>
            <div className={cx('header', { mobile })}>
                <span>Kết Quả xố số</span>-<span>{vietnamTime}</span>
            </div>

            <table className={cx('table', { mobile })}>
                <tbody>
                    <tr>
                        <th>Giải Đặc Biệt</th>
                        <td colSpan="12" className={cx('special')}>
                            {findValue(prize_map.special, 0, '-----')}
                        </td>
                    </tr>
                    <tr>
                        <th>Giải Nhất</th>
                        <td colSpan="12" className={cx('first')}>
                            {findValue(prize_map.first, 0, '-----')}
                        </td>
                    </tr>
                    <tr>
                        <th>Giải Nhì</th>
                        <td colSpan="6" className={cx('second')}>
                            {findValue(prize_map.second, 0, '-----')}
                        </td>
                        <td colSpan="6" className={cx('second')}>
                            {findValue(prize_map.second, 1, '-----')}
                        </td>
                    </tr>
                    <tr>
                        <th>Giải Ba</th>
                        <td colSpan="4" className={cx('third')}>
                            {findValue(prize_map.third, 0, '-----')}
                            <br></br>
                            {findValue(prize_map.third, 1, '-----')}
                        </td>
                        <td colSpan="4" className={cx('third')}>
                            {findValue(prize_map.third, 2, '-----')}
                            <br></br>
                            {findValue(prize_map.third, 3, '-----')}
                        </td>
                        <td colSpan="4" className={cx('third')}>
                            {findValue(prize_map.third, 4, '-----')}
                            <br></br>
                            {findValue(prize_map.third, 5, '-----')}
                        </td>
                    </tr>
                    <tr>
                        <th>Giải Tư</th>
                        <td colSpan="3" className={cx('four')}>
                            {findValue(prize_map.fourth, 0, '----')}
                        </td>
                        <td colSpan="3" className={cx('four')}>
                            {findValue(prize_map.fourth, 1, '----')}
                        </td>
                        <td colSpan="3" className={cx('four')}>
                            {findValue(prize_map.fourth, 2, '----')}
                        </td>
                        <td colSpan="3" className={cx('four')}>
                            {findValue(prize_map.fourth, 3, '----')}
                        </td>
                    </tr>
                    <tr>
                        <th>Giải Năm</th>
                        <td colSpan="4" className={cx('five')}>
                            {findValue(prize_map.fifth, 0, '----')}
                            <br></br>
                            {findValue(prize_map.fifth, 1, '----')}
                        </td>
                        <td colSpan="4" className={cx('five')}>
                            {findValue(prize_map.fifth, 2, '----')}
                            <br></br>
                            {findValue(prize_map.fifth, 3, '----')}
                        </td>
                        <td colSpan="4" className={cx('five')}>
                            {findValue(prize_map.fifth, 4, '----')}
                            <br></br>
                            {findValue(prize_map.fifth, 5, '----')}
                        </td>
                    </tr>
                    <tr>
                        <th>Giải Sáu</th>
                        <td colSpan="4" className={cx('six')}>
                            {findValue(prize_map.sixth, 0, '---')}
                        </td>
                        <td colSpan="4" className={cx('six')}>
                            {findValue(prize_map.sixth, 1, '---')}
                        </td>
                        <td colSpan="4" className={cx('six')}>
                            {findValue(prize_map.sixth, 2, '---')}
                        </td>
                    </tr>
                    <tr>
                        <th>Giải Bảy</th>
                        <td colSpan="3" className={cx('six')}>
                            {findValue(prize_map.seventh, 0, '--')}
                        </td>
                        <td colSpan="3" className={cx('six')}>
                            {findValue(prize_map.seventh, 1, '--')}
                        </td>
                        <td colSpan="3" className={cx('six')}>
                            {findValue(prize_map.seventh, 2, '--')}
                        </td>
                        <td colSpan="3" className={cx('six')}>
                            {findValue(prize_map.seventh, 3, '--')}
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className={cx('footer')}></div>
        </div>
    );
}
LotteryResult.propTypes = {
    mobile: PropTypes.bool.isRequired,
};
export default LotteryResult;
