import { socket } from '@/util/socket';

export const getSocketResult = (dateString, callback) => {
    socket.emit('GET_LOTTO_RESULT', dateString, (response) => {
        callback(response);
    });
};
export const getSocketTicket = (dateString, phone, callback) => {
    socket.emit('GET_TICKET_RESULT', dateString, phone, (response) => {
        callback(response);
    });
};
export const newtSocketPrize = (value, map, countItem) => {
    socket.emit('NEW_PRIZE', value, map, countItem);
};
