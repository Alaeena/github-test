import PropTypes from 'prop-types';

import { useSearchParams } from 'react-router-dom';
import { getCurrentDateString } from '@/util/dateUtil';
import dayjs from 'dayjs';

import classNames from 'classnames/bind';
import Styles from './Home.module.scss';
const cx = classNames.bind(Styles);

const getLastNDays = (current, n) => {
    const dates = [];
    const currentDate = dayjs(current, 'DD/MM/YYYY');

    for (let i = -n; i <= n; i++) {
        const date = currentDate.subtract(i, 'day');

        const formattedDate = date.format('DD/MM/YYYY');
        dates.push(formattedDate);
    }

    return dates;
};
const HomeOption = ({ mobile }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const currentDate = getCurrentDateString(searchParams.get('date'));
    const today = dayjs().format('DD/MM/YYYY');
    const displayCount = mobile ? 1 : 2;

    const handleClick = (current) => {
        setSearchParams({ date: current });
    };
    const handleChange = (e) => {
        const value = e.target.value;
        const date = dayjs(value, 'YYYY-MM-DD').format('DD/MM/YYYY');
        setSearchParams({ date });
    };
    return (
        <>
            <div className={cx('option', { mobile })}>
                <div className={cx('line1')}>
                    {getLastNDays(currentDate, displayCount)
                        .reverse()
                        .map((day, index) => (
                            <button
                                key={index}
                                onClick={() => handleClick(day)}
                                className={cx({
                                    active: day === currentDate,
                                    disabled: dayjs(day, 'DD/MM/YYYY').isAfter(dayjs()),
                                })}
                            >
                                {day === today ? `Hôm nay (${day})` : day}
                            </button>
                        ))}
                </div>
                {mobile && (
                    <div className={cx('line2')}>
                        <input
                            id="searchDate"
                            className="input"
                            onChange={handleChange}
                            type="date"
                            value={dayjs(currentDate, 'DD/MM/YYYY').format('YYYY-MM-DD')}
                            placeholder={'Tên đăng nhập'}
                        />
                        <button className="button red">Tìm kiếm</button>
                    </div>
                )}
            </div>
        </>
    );
};
HomeOption.propTypes = {
    mobile: PropTypes.bool.isRequired,
};
export default HomeOption;
