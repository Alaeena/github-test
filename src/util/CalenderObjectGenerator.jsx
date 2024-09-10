//calendarObjectGenerator.ts

import dayjs from 'dayjs';
import LocaleData from 'dayjs/plugin/localeData';
import updateLocale from 'dayjs/plugin/updateLocale';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);
dayjs.extend(LocaleData);
dayjs.extend(updateLocale);

export const CalendarObjectGenerator = (currentDate) => {
    const numOfDaysInPrevMonth = currentDate.subtract(1, 'month').daysInMonth();
    const firstDayOfCurrentMonth = currentDate.startOf('month').day();

    return {
        days: Array.from({ length: currentDate.daysInMonth() }, (_, index) => index + 1),
        day: Number(currentDate.format('DD')),
        months: [
            'Tháng 1',
            'Tháng 2',
            'Tháng 3',
            'Tháng 4',
            'Tháng 5',
            'Tháng 6',
            'Tháng 7',
            'Tháng 8',
            'Tháng 9',
            'Tháng 10',
            'Tháng 11',
            'Tháng 12',
        ],

        //read explanation
        prevMonthDays: Array.from(
            { length: firstDayOfCurrentMonth },
            (_, index) => numOfDaysInPrevMonth - index,
        ).reverse(),

        remainingDays: Array.from({ length: 6 - currentDate.endOf('month').day() }, (_, index) => index + 1),
    };
};
