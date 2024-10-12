import { post } from '@/util/httpRequest';

export const getLotteryResults = async (date) => {
    try {
        const res = await post(``, {
            type: 'be',
            name: 'get_lottery_results',
            '_json|prop|lotto_drawdate': date,
        });
        return res.data;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const processLottery = async (allowSpecial) => {
    try {
        const res = await post(``, {
            type: 'be',
            name: 'processing_lottery_draw',
            '_json|prop|allow_jackpot': allowSpecial ? 1 : 0,
        });
        return res.data;
    } catch (error) {
        console.log(error);
        return null;
    }
};
export const getTicketInfo = async (dateString, phone) => {
    try {
        let resDataList = [];
        let limit = 400;
        let page = 1;
        do {
            const response = await post(``, {
                type: 'be',
                name: 'get_user_ticket_infos',
                '_json|prop|mobile': phone,
                '_json|prop|lotto_drawdate': dateString,
                '_json|prop|page': page,
                '_json|prop|limit': limit,
            });
            if (response.status === true) {
                if (response.data.length == 0) break;
                resDataList = [...resDataList, ...response.data];
                page += 1;
            } else break;
        } while (resDataList.length < page * limit);
        return resDataList;
    } catch (error) {
        console.log(error);
        return null;
    }
};
