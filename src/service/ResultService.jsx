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
