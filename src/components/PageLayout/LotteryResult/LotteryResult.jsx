import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import useDraw, { isSearchable } from '@/util/useDraw';
import { getLotteryResults } from '@/service/ResultService';
import { isValidDateString } from '@/util/dateUtil';

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
const LOADING_TEXT = 'loading...';
function LotteryResult({ mobile }) {
    const { storage } = useDraw();
    const [searchParams] = useSearchParams();
    const [result, setResult] = useState({});
    const [message, setMessage] = useState();

    const date = new Date(result?.lotto_drawtime * 1000);
    const vietnamTime = date.toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
    const lotteryResults = result?.results;

    useEffect(() => {
        const date = searchParams.get('date');
        const inputDate = isValidDateString(date) ? dayjs(date, 'DD/MM/YYYY') : dayjs();
        const dateString = inputDate && inputDate.format('YYYY/MM/DD');
        if (!inputDate) {
            return;
        } else if (!isSearchable(inputDate, storage)) {
            setMessage(`Bộ số ngày ${dayjs().format('DD/MM/YYYY')} chưa được quay`);
            return;
        }
        getLotteryResults(dateString).then((data) => {
            setResult(data);
            setMessage('');
        });
    }, [searchParams]);

    if (result?.code == 102) {
        return (
            <div className={cx('content')}>
                <div className={cx('empty')}>{result.message}</div>
            </div>
        );
    } else if (message) {
        return (
            <div className={cx('content')}>
                <div className={cx('empty')}>{message}</div>
            </div>
        );
    } else if (lotteryResults == null) {
        return (
            <div className={cx('content')}>
                <div className={cx('empty')}>{LOADING_TEXT}</div>
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
                            {lotteryResults[prize_map.special]}
                        </td>
                    </tr>
                    <tr>
                        <th>Giải Nhất</th>
                        <td colSpan="12" className={cx('first')}>
                            {lotteryResults[prize_map.first]}
                        </td>
                    </tr>
                    <tr>
                        <th>Giải Nhì</th>
                        <td colSpan="6" className={cx('second')}>
                            {lotteryResults[prize_map.second][0]}
                        </td>
                        <td colSpan="6" className={cx('second')}>
                            {lotteryResults[prize_map.second][1]}
                        </td>
                    </tr>
                    <tr>
                        <th>Giải Ba</th>
                        <td colSpan="4" className={cx('third')}>
                            {lotteryResults[prize_map.third][0]}
                            <br></br>
                            {lotteryResults[prize_map.third][1]}
                        </td>
                        <td colSpan="4" className={cx('third')}>
                            {lotteryResults[prize_map.third][2]}
                            <br></br>
                            {lotteryResults[prize_map.third][3]}
                        </td>
                        <td colSpan="4" className={cx('third')}>
                            {lotteryResults[prize_map.third][4]}
                            <br></br>
                            {lotteryResults[prize_map.third][5]}
                        </td>
                    </tr>
                    <tr>
                        <th>Giải Tư</th>
                        <td colSpan="3" className={cx('four')}>
                            {lotteryResults[prize_map.fourth][0]}
                        </td>
                        <td colSpan="3" className={cx('four')}>
                            {lotteryResults[prize_map.fourth][1]}
                        </td>
                        <td colSpan="3" className={cx('four')}>
                            {lotteryResults[prize_map.fourth][2]}
                        </td>
                        <td colSpan="3" className={cx('four')}>
                            {lotteryResults[prize_map.fourth][3]}
                        </td>
                    </tr>
                    <tr>
                        <th>Giải Năm</th>
                        <td colSpan="4" className={cx('five')}>
                            {lotteryResults[prize_map.fifth][0]}
                            <br></br>
                            {lotteryResults[prize_map.fifth][1]}
                        </td>
                        <td colSpan="4" className={cx('five')}>
                            {lotteryResults[prize_map.fifth][2]}
                            <br></br>
                            {lotteryResults[prize_map.fifth][3]}
                        </td>
                        <td colSpan="4" className={cx('five')}>
                            {lotteryResults[prize_map.fifth][4]}
                            <br></br>
                            {lotteryResults[prize_map.fifth][5]}
                        </td>
                    </tr>
                    <tr>
                        <th>Giải Sáu</th>
                        <td colSpan="4" className={cx('six')}>
                            {lotteryResults[prize_map.sixth][0]}
                        </td>
                        <td colSpan="4" className={cx('six')}>
                            {lotteryResults[prize_map.sixth][1]}
                        </td>
                        <td colSpan="4" className={cx('six')}>
                            {lotteryResults[prize_map.sixth][2]}
                        </td>
                    </tr>
                    <tr>
                        <th>Giải Bảy</th>
                        <td colSpan="3" className={cx('six')}>
                            {lotteryResults[prize_map.seventh][0]}
                        </td>
                        <td colSpan="3" className={cx('six')}>
                            {lotteryResults[prize_map.seventh][1]}
                        </td>
                        <td colSpan="3" className={cx('six')}>
                            {lotteryResults[prize_map.seventh][2]}
                        </td>
                        <td colSpan="3" className={cx('six')}>
                            {lotteryResults[prize_map.seventh][3]}
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
