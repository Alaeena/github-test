import dayjs from 'dayjs';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import useMobile from '@/util/useMobile';
import SearchResult from './SearchResult';
import { getTicketInfo } from '@/service/ResultService';
import useDraw, { isSearchable } from '@/util/useDraw';

import classNames from 'classnames/bind';
import Styles from './Search.module.scss';
const cx = classNames.bind(Styles);

const getDateString = (dateString) => {
    if (!dateString) {
        return dayjs().format('YYYY-MM-DD');
    }
    return dayjs(dateString, 'YYYY-MM-DD').isValid() ? dateString : dayjs().format('YYYY-MM-DD');
};

function Search() {
    const { state } = useLocation();
    const { storage } = useDraw();
    const [mobile] = useMobile();

    const [result, setResult] = useState();
    const [date, setDate] = useState(getDateString(state?.date));
    const [phone, setPhone] = useState(state?.phone ? state?.phone : '');
    const [loading, setLoading] = useState(false);
    const [showResult, setShowResult] = useState(false);
    console.log(result);

    const searchResult = () => {
        const searchDate = dayjs(date, 'YYYY-MM-DD');

        if (!phone || !searchDate.isValid()) {
            return;
        } else if (!isSearchable(searchDate, storage)) {
            setShowResult(false);
        } else {
            setShowResult(true);
        }
        const dateString = searchDate.format('YYYY/MM/DD');
        setLoading(true);

        getTicketInfo(dateString, phone)
            .then((data) => {
                setResult(data);
            })
            .finally(() => {
                setLoading(false);
            });
    };
    useEffect(searchResult, []);

    return (
        <div>
            <div className={cx('search', { mobile })}>
                <div className={cx('row')}>
                    <div className="input-group">
                        <label htmlFor="lotteryDate" className="strong-text dark">
                            Ngày:
                        </label>
                        <input
                            id="lotteryDate"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="input"
                            type="date"
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="lotteryPhone" className="strong-text dark">
                            Sđt:
                        </label>
                        <input
                            id="lotteryPhone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="input"
                            placeholder={'Số điện thoại'}
                        />
                    </div>
                </div>
                <button onClick={() => searchResult()} className="button red">
                    Dò kết quả
                </button>
            </div>
            <SearchResult mobile={mobile} loading={loading} showResult={showResult} result={result} />
        </div>
    );
}

export default Search;
