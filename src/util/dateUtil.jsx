import dayjs from 'dayjs';

export const isValidDateString = (dateString) => {
    if (!dateString) {
        return false;
    }
    return dayjs(dateString, 'DD/MM/YYYY').isValid();
};
export const getCurrentDate = (dateString) => {
    return isValidDateString(dateString) ? dayjs(dateString, 'DD/MM/YYYY') : dayjs();
};
export const getCurrentDateString = (dateString) => {
    return isValidDateString(dateString)
        ? dayjs(dateString, 'DD/MM/YYYY').format('DD/MM/YYYY')
        : dayjs().format('DD/MM/YYYY');
};
