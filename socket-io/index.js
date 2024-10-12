const { Server } = require('socket.io');
const Axios = require('axios');
const { DateTime } = require('luxon');
const cron = require('node-cron');

const baseURL = 'http://13.212.10.112:4000/api/service/run-script';
const TIMEZONE = 'Asia/Ho_Chi_Minh';
const FIX_DRAWTIME = { hour: 18, minute: 30, second: 0, millisecond: 0 }; //Chu y: Khong thay doi gia tri nay

const START_DRAWTIME = { hour: 18, minute: 15, second: 0, millisecond: 0 };
const END_DRAWTIME = { hour: 18, minute: 45, second: 0, millisecond: 0 };

const Prizes = Object.freeze({
    pending: '0',
    no_win: '11',
    in_progress: '12',

    multi: '10',
    jackpot: '99',
    first: '1',
    second: '2',
    third: '3',
    fourth: '4',
    fifth: '5',
    sixth: '6',
    seventh: '7',
});

const io = new Server({
    cors: {
        origin: 'http://localhost:3000',
    },
});

let lottoDrawingResult = {
    lotto_drawtime: 1728127800,
    results: {
        prize_jackpot: [],
        prize_first: [],
        prize_second: [],
        prize_third: [],
        prize_fourth: [],
        prize_fifth: [],
        prize_sixth: [],
        prize_seventh: [],
    },
    processing_status: '0',
};

function resetResult() {
    lottoDrawingResult.lotto_drawtime = ~~DateTime.now().setZone(TIMEZONE).set(FIX_DRAWTIME).toSeconds();
    lottoDrawingResult.results.prize_jackpot = [];
    lottoDrawingResult.results.prize_first = [];
    lottoDrawingResult.results.prize_second = [];
    lottoDrawingResult.results.prize_third = [];
    lottoDrawingResult.results.prize_fourth = [];
    lottoDrawingResult.results.prize_fifth = [];
    lottoDrawingResult.results.prize_sixth = [];
    lottoDrawingResult.results.prize_seventh = [];
}

//Reset bien global lottoDrawingResult luc 0h hang ngay
cron.schedule(
    '0 0 * * *',
    () => {
        resetResult();
    },
    {
        timezone: TIMEZONE,
    },
);

function getLastestPrizes() {
    let prizes = [];
    if (lottoDrawingResult.results.prize_first.length == 1) {
        prizes.push(Prizes.first);
    }

    if (lottoDrawingResult.results.prize_second.length == 2) {
        prizes.push(Prizes.second);
    }

    if (lottoDrawingResult.results.prize_third.length == 6) {
        prizes.push(Prizes.third);
    }

    if (lottoDrawingResult.results.prize_fourth.length == 4) {
        prizes.push(Prizes.fourth);
    }

    if (lottoDrawingResult.results.prize_fifth.length == 6) {
        prizes.push(Prizes.fifth);
    }

    if (lottoDrawingResult.results.prize_sixth.length == 3) {
        prizes.push(Prizes.sixth);
    }

    if (lottoDrawingResult.results.prize_seventh.length == 4) {
        prizes.push(Prizes.seventh);
    }

    if (lottoDrawingResult.results.prize_jackpot.length == 1) {
        prizes.push(Prizes.jackpot);
        prizes.push(Prizes.multi);
    }

    return prizes;
}

function isToday(dateString) {
    try {
        const inputDate = DateTime.fromFormat(dateString, 'yyyy/MM/dd', { zone: TIMEZONE });
        const today = DateTime.now().setZone(TIMEZONE).startOf('day');
        return inputDate.hasSame(today, 'day');
    } catch (e) {
        console.log('Sai dinh dang ngay thang');
    }

    return true;
}

io.on('connection', (socket) => {
    console.log(`Client connected: ${socket.id}`);

    socket.on('disconnect', (reason) => {
        console.log(`Client Disconnect: ${socket.id}`);
    });

    socket.on('GET_LOTTO_RESULT', async (strDate, callback) => {
        if (isToday(strDate)) {
            const currentTime = DateTime.now().setZone(TIMEZONE);
            const startDrawTime = currentTime.set(START_DRAWTIME);
            const endDrawTime = currentTime.set(END_DRAWTIME);

            //Nếu chưa đến giờ quay trả vef null
            if (currentTime < startDrawTime) {
                callback(null);
                return;
            }
            //Neu dang trong gio quay thuong thi tra ve results dang quay
            else if (currentTime >= startDrawTime && currentTime <= endDrawTime) {
                callback(lottoDrawingResult);
                return;
            }

            //trường hợp còn lại sẽ trả về kết quả từ API
        }

        let postBody = {
            token: '73d715e32eff0617eabfdebcc9e5a296',
            type: 'be',
            name: 'get_lottery_results',
            '_json|prop|lotto_drawdate': strDate,
        };

        let response = await Axios.post(baseURL, postBody);
        if (response.status === 200 && response.data['status']) {
            callback(JSON.parse(response.data.data));
        }
    });

    socket.on('NEW_PRIZE', (value, prize, index) => {
        if (prize === 'prize_first') {
            resetResult();
        }
        lottoDrawingResult.results[prize].push(value);
        console.log(lottoDrawingResult);
        io.emit('NEW_PRIZE', value, prize, index, lottoDrawingResult);
    });

    socket.on('GET_TICKET_RESULT', async (strDate, phone, callback) => {
        let resDataList = [];
        let limit = 400;
        let page = 1;

        do {
            let postBody = {
                token: '73d715e32eff0617eabfdebcc9e5a296',
                type: 'be',
                name: 'get_user_ticket_infos',
                '_json|prop|mobile': phone,
                '_json|prop|lotto_drawdate': strDate,
                '_json|prop|page': page,
                '_json|prop|limit': limit,
            };
            let response = await Axios.post(baseURL, postBody);
            if (response.status === 200 && response.data['status']) {
                let resData = JSON.parse(response.data.data);
                if (resData.length == 0) break;
                resDataList = [...resDataList, ...resData];
                page += 1;
            } else break;
        } while (resDataList.length < page * limit);

        if (isToday(strDate)) {
            const currentTime = DateTime.now().setZone(TIMEZONE);
            const startDrawTime = currentTime.set(START_DRAWTIME);
            const endDrawTime = currentTime.set(END_DRAWTIME);

            //Nếu chưa đến giờ quay thì phải set lại trạng thái là "Chưa Quay"
            //(tránh trường hợp Streamer hoặc ai đó gọi API generate kết qủa trước giờ quay ==> user nó search trước được kết quả)
            if (currentTime < startDrawTime) {
                resDataList.forEach((obj) => {
                    obj['lotto_result'] = Prizes.pending;
                    obj['txt_result_list'] = '';
                    obj['total_value'] = 0;
                    obj['result_details'] = [];
                });
            }
            //Nếu đang trong giờ quay các ticket "Không trúng" hoặc đã "trúng giải x"
            // mà giải X chưa được streamer quay thì phải reset về "12" (Đang quay số)
            else if (currentTime >= startDrawTime && currentTime <= endDrawTime) {
                resDataList.forEach((obj) => {
                    const prizes = getLastestPrizes();
                    if (!prizes.includes(obj['lotto_result'])) {
                        obj['lotto_result'] = Prizes.in_progress;
                        obj['txt_result_list'] = '';
                        obj['total_value'] = 0;
                        obj['result_details'] = [];
                    }
                });
            }
        }

        callback(resDataList);
    });
});

io.listen(4000);
console.log('Server Socket.IO started');
