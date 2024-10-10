import { useSearchParams } from 'react-router-dom';
import { getCurrentDate } from '@/util/dateUtil';

import { CalendarObjectGenerator } from '@/util/CalenderObjectGenerator';
import { LeftButton, RightButton } from '@/components/Icon/Regular';

import classNames from 'classnames/bind';
import Styles from './Calender.module.scss';
const cx = classNames.bind(Styles);

const weekDays = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

function Calender() {
    const [searchParams, setSearchParams] = useSearchParams();
    const currentDate = getCurrentDate(searchParams.get('date'));
    const daysListGenerator = CalendarObjectGenerator(currentDate);

    const dateArrowHandler = (date) => {
        console.log(date);
        setSearchParams({ date: date.format('DD/MM/YYYY') });
    };
    const handlePreviousMonthClick = (day) => {
        const dayInPreviousMonth = currentDate.subtract(1, 'month').date(day);
        setSearchParams({ date: dayInPreviousMonth.format('DD/MM/YYYY') });
    };

    const handleCurrentMonthClick = (day) => {
        const dayInCurrentMonth = currentDate.date(day);
        setSearchParams({ date: dayInCurrentMonth.format('DD/MM/YYYY') });
    };

    const handleNextMonthClick = (day) => {
        const dayInNextMonth = currentDate.add(1, 'month').date(day);
        setSearchParams({ date: dayInNextMonth.format('DD/MM/YYYY') });
    };

    return (
        <div className={cx('calendar__container')}>
            <div className={cx('control__layer')}>
                <div className={cx('month-year__layout')}>
                    <div className={cx('year__layout')}>
                        <button
                            className={cx('back__arrow')}
                            onClick={() => dateArrowHandler(currentDate.subtract(1, 'year'))}
                        >
                            <LeftButton />
                        </button>
                        <div className={cx('title')}>{currentDate.year()}</div>
                        <button
                            className={cx('forward__arrow')}
                            onClick={() => dateArrowHandler(currentDate.add(1, 'year'))}
                        >
                            <RightButton />
                        </button>
                    </div>
                    <div className={cx('month__layout')}>
                        <button
                            className={cx('back__arrow')}
                            onClick={() => dateArrowHandler(currentDate.subtract(1, 'month'))}
                        >
                            <LeftButton />
                        </button>
                        <div className={cx('new-title')}>{daysListGenerator.months[currentDate.month()]}</div>
                        <button
                            className={cx('forward__arrow')}
                            onClick={() => dateArrowHandler(currentDate.add(1, 'month'))}
                        >
                            <RightButton />
                        </button>
                    </div>
                </div>
                <div className={cx('days')}>
                    {weekDays.map((el, index) => (
                        <div key={`${el}-${index}`} className={cx('day')}>
                            {el}
                        </div>
                    ))}
                </div>
                <div className={cx('calendar__content')}>
                    <div className={cx('calendar__items-list')}>
                        {daysListGenerator.prevMonthDays.map((el, index) => {
                            return (
                                <button
                                    key={`${el}/${index}`}
                                    className={cx('calendar__item', 'gray')}
                                    onClick={() => handlePreviousMonthClick(el)}
                                >
                                    {el}
                                </button>
                            );
                        })}
                        {daysListGenerator.days.map((el, index) => {
                            return (
                                <div
                                    key={`${index}-/-${el}`}
                                    className={cx('calendar__day')}
                                    onClick={() => handleCurrentMonthClick(el)}
                                >
                                    <button
                                        className={cx('calendar__item', { selected: +el === +daysListGenerator.day })}
                                    >
                                        <div className={cx('day__layout')}>
                                            <div className={cx('text')}>{el.toString()}</div>
                                        </div>
                                    </button>
                                </div>
                            );
                        })}

                        {daysListGenerator.remainingDays.map((el, idx) => {
                            return (
                                <button
                                    className={cx('calendar__item', 'gray')}
                                    key={`${idx}----${el}`}
                                    onClick={() => handleNextMonthClick(el)}
                                >
                                    {el}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Calender;
