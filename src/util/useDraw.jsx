import dayjs from 'dayjs';
import { DrawContext } from '@/config/DrawContext';
import { useContext } from 'react';

export default function useDraw() {
    return useContext(DrawContext);
}
export function isDrawable({ stopHour = 18, stopMinute = 15, releaseHour = 18, releaseMinute = 45 }) {
    const currentDate = dayjs();
    const startTime = currentDate.set('hour', stopHour).set('minute', stopMinute).set('second', 0);
    const endTime = currentDate.set('hour', releaseHour).set('minute', releaseMinute).set('second', 0);

    if (currentDate.isAfter(startTime) && currentDate.isBefore(endTime)) {
        return true;
    } else {
        return false;
    }
}
export function isSearchable(inputDate, { releaseHour = 18, releaseMinute = 45 }) {
    if (inputDate == null) {
        return false;
    }
    const endTime = dayjs().set('hour', releaseHour).set('minute', releaseMinute).set('second', 0);

    // Check if the date is today
    if (inputDate.isSame(endTime, 'day')) {
        if (dayjs().isBefore(endTime)) {
            return false; // Block if input time is before the end time
        } else {
            return true;
        }
    }
    return true; // Allow if the date is not today
}
// text map phần introduction
export const intro_map = [
    { text: 'Giải đặc biệt', count: 1, number: 6, reward: '99999999' },
    { text: 'Giải nhất', count: 1, number: 5, reward: '9999999' },
    { text: 'Giải nhì', count: 2, number: 5, reward: '6666666' },
    { text: 'Giải ba', count: 6, number: 5, reward: '999999' },
    { text: 'Giải tư', count: 4, number: 4, reward: '199999' },
    { text: 'Giải năm', count: 6, number: 4, reward: '99999' },
    { text: 'Giải sáu', count: 3, number: 3, reward: '39999' },
    { text: 'Giải bảy', count: 4, number: 2, reward: '9999' },
];

// text map phần search
// position: left là trúng thưởng
// position: right là không trúng thưởng
export const result_map = {
    0: { text: 'Chưa mở thưởng', position: 'right' },
    11: { text: 'Không trúng', position: 'right' },
    10: { text: 'Trúng nhiều giải', position: 'left' },
    7: { text: 'Giải bảy', position: 'left' },
    6: { text: 'Giải sáu', position: 'left' },
    5: { text: 'Giải năm', position: 'left' },
    4: { text: 'Giải tư', position: 'left' },
    3: { text: 'Giải ba', position: 'left' },
    2: { text: 'Giải nhì', position: 'left' },
    1: { text: 'Giải nhất', position: 'left' },
    99: { text: 'Chưa mở thưởng', position: 'left' },
};

// text map phần dữ liệu từ back-end
export const prize_map = {
    7: { text: 'Giải nhất', count: 1, number: 5, map: 'prize_first' },
    6: { text: 'Giải nhì', count: 2, number: 5, map: 'prize_second' },
    5: { text: 'Giải ba', count: 6, number: 5, map: 'prize_third' },
    4: { text: 'Giải tư', count: 4, number: 4, map: 'prize_fourth' },
    3: { text: 'Giải năm', count: 6, number: 4, map: 'prize_fifth' },
    2: { text: 'Giải sáu', count: 3, number: 3, map: 'prize_sixth' },
    1: { text: 'Giải bảy', count: 4, number: 2, map: 'prize_seventh' },
    0: { text: 'Giải đặc biệt', count: 1, number: 6, map: 'prize_jackpot' },
};
