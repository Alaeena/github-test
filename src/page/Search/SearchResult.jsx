import PropTypes from 'prop-types';
import { useState } from 'react';

import { ResultModal } from '@/components/Modal';
import { Detail } from '@/components/Icon/Fill';
import { result_map } from '@/util/useDraw';

import classNames from 'classnames/bind';
import Styles from './Search.module.scss';
const cx = classNames.bind(Styles);

const filterResult = (result, value) => result.filter((item) => result_map[item.lotto_result]?.position == value);

function SearchResult({ result, loading, mobile }) {
    const [data, setData] = useState();

    return (
        <>
            {loading ? (
                <div className={cx('loading', 'red')}>loading...</div>
            ) : !result ? (
                <></>
            ) : result.length == 0 ? (
                <div className={cx('loading', 'red')}>Không có kết quả</div>
            ) : (
                <div className={cx('content', { mobile })}>
                    <div className={cx('left')}>
                        <div className={cx('header')}>Mã trúng thưởng</div>
                        <div className={cx('list')}>
                            {filterResult(result, 'left').map((item, index) => {
                                const { lotto_result, ticket_number } = item;
                                const mapItem = result_map[lotto_result];

                                return (
                                    <div key={index} className={cx('item')} onClick={() => setData(item)}>
                                        <p className={lotto_result == '99' ? 'rainbow-text' : ''}>
                                            {ticket_number} - {mapItem.text}
                                        </p>
                                        <Detail />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className={cx('right')}>
                        <div className={cx('header')}>Mã không trúng thưởng</div>
                        <div className={cx('list')}>
                            {filterResult(result, 'right').map((item, index) => {
                                const { lotto_result, ticket_number } = item;
                                const mapItem = result_map[lotto_result];

                                return (
                                    <div key={index} className={cx('item')}>
                                        {ticket_number} - {mapItem.text}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    {data && <ResultModal data={data} setData={setData} mobile={mobile} />}
                </div>
            )}
        </>
    );
}
SearchResult.propTypes = {
    result: PropTypes.any,
    mobile: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
};
export default SearchResult;
