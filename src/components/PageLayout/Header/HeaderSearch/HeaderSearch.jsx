import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { routes } from '@/routes';

import classNames from 'classnames/bind';
import Styles from './HeaderSearch.module.scss';
const cx = classNames.bind(Styles);

function HeaderSearch() {
    const [date, setDate] = useState(dayjs().format('YYYY-MM-DD'));
    const [phone, setPhone] = useState('');

    return (
        <fieldset className={cx('content')}>
            <legend className="small-text dark">Dò mã dự thưởng</legend>
            <div>
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
                <div className="input-group">
                    <label htmlFor="lotteryPhone" className="strong-text dark">
                        Sđt:
                    </label>
                    <input
                        id="lotteryPhone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="input"
                        placeholder={'Số điện thoại'}
                    />
                </div>
            </div>
            <Link state={{ date, phone }} to={routes.search} className="button red">
                Dò kết quả
            </Link>
        </fieldset>
    );
}

export default HeaderSearch;
