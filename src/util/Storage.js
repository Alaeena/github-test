const KEY = 'LOTTERY_STORAGE_ABCDEF';
const initState = {
    data: {},
    allowSpecial: false,
    allowDrawable: false,
    stopHour: 18,
    stopMinute: 15,
    releaseHour: 18,
    releaseMinute: 45
};

export default {
    get() {
        return JSON.parse(localStorage.getItem(KEY)) || initState;
    },
    set(value) {
        localStorage.setItem(KEY, JSON.stringify(value));
    },
};
