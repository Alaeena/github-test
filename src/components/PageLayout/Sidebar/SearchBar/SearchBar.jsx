import { useState } from 'react';
import { CalendarObjectGenerator } from '@/util/CalenderObjectGenerator';
import dayjs from 'dayjs';

import classNames from 'classnames/bind';
import Styles from './SearchBar.module.scss';
const cx = classNames.bind(Styles);

function SearchBar() {
    const [currentDate, setCurrentDate] = useState(dayjs(Date.now()));
    const daysListGenerator = CalendarObjectGenerator(currentDate);
    const years = Array.from(new Array(5), (val, index) => currentDate.year() - index);

    return (
        <div className={cx('container')}>
            <div className={cx('header')}>Tra cứu kết quả trúng thưởng</div>

            <div className={cx('content')}>
                <div className={cx('line1')}>
                    <div className="input-group">
                        <input name="lotteryOption" id="lotteryOption1" type="radio" className="input" />
                        <label htmlFor="lotteryOption1" className="strong-text">
                            Theo ngày
                        </label>
                    </div>
                    <div className="input-group">
                        <input name="lotteryOption" id="lotteryOption2" type="radio" className="input" />
                        <label htmlFor="lotteryOption2" className="strong-text">
                            Theo tỉnh
                        </label>
                    </div>
                    <div className="input-group">
                        <input name="lotteryOption" id="lotteryOption3" type="radio" className="input" />
                        <label htmlFor="lotteryOption3" className="strong-text">
                            Theo đầu đuôi
                        </label>
                    </div>
                </div>
                <div className={cx('line2')}>
                    <div className="input-group">
                        <label htmlFor="lotteryProvince" className="strong-text">
                            Tỉnh:
                        </label>
                        <select id="lotteryProvince" className="input">
                            <option value="0">Chọn tỉnh</option>
                            <option value="9">Bạc Liêu</option>
                            <option value="7">Bến Tre</option>
                            <option value="29">Đắk Lắk</option>
                            <option value="28">Quảng Nam</option>
                            <option value="47">Miền bắc</option>
                            <option value="8">Vũng Tàu</option>
                        </select>
                    </div>
                </div>
                <div className={cx('line3')}>
                    <div className="input-group">
                        <select className="input" value={daysListGenerator.day}>
                            {daysListGenerator.days.map((value, index) => (
                                <option key={index} value={value}>
                                    {value}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="input-group">
                        <select className="input" value={currentDate.month()}>
                            {daysListGenerator.months.map((value, index) => (
                                <option key={index} value={index}>
                                    {value}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="input-group">
                        <select className="input" value={currentDate.year()}>
                            {years.map((value, index) => (
                                <option key={index} value={value}>
                                    {value}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <button className="button red">Dò kết quả</button>
            </div>
        </div>
    );
}

export default SearchBar;
