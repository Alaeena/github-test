import { useState } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

import { routes } from '@/routes';

import classNames from 'classnames/bind';
import Styles from './SearchBar.module.scss';
const cx = classNames.bind(Styles);

function SearchBar() {
    const [date, setDate] = useState(dayjs().format('YYYY-MM-DD'));
    const [phone, setPhone] = useState('');

    return (
        <div className={cx('container')}>
            <div className={cx('header')}>Tra cứu kết quả trúng thưởng</div>

            <div className={cx('content')}>
                <div className={cx('line2')}>
                    <div className="input-group">
                        <label htmlFor="lotteryPhone" className="strong-text">
                            Sđt:
                        </label>
                        <input
                            id="lotteryPhone"
                            onChange={(e) => setPhone(e.target.value)}
                            value={phone}
                            className="input"
                            type="text"
                            placeholder={'Số điện thoại'}
                        />
                    </div>
                </div>
                <div className={cx('line3')}>
                    <div className="input-group">
                        <label htmlFor="lotteryDate" className="strong-text dark">
                            Ngày:
                        </label>
                        <input
                            id="lotteryDate"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="input"
                            type="date"
                        />
                    </div>
                </div>

                <Link to={routes.search} state={{ phone, date }} className="button red">
                    Dò kết quả
                </Link>
            </div>
        </div>
    );
}

export default SearchBar;
