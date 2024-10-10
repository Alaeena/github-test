import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { result_map } from '@/util/useDraw';

import classNames from 'classnames/bind';
import Styles from './ResultModal.module.scss';
const cx = classNames.bind(Styles);

const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
});
const modalRoot = document.getElementById('root');
const ResultModal = ({ data = {}, setData, mobile }) => {
    const { ticket_number, result_details = [] } = data;
    if (!ticket_number || !result_details) return;
    const summary = result_details.reduce(
        (prev, value) => {
            const { prize, amount, total_value } = value;
            if (!prize || !amount || !total_value) {
                return prev;
            }
            return {
                amount: (prev.amount += value.amount),
                total_value: (prev.total_value += value.total_value),
            };
        },
        { amount: 0, total_value: 0 },
    );
    let count = 0;
    console.log(summary);

    return createPortal(
        <div className={cx('overlay')} onClick={() => setData()}>
            <div className={cx('container', { mobile })} onClick={(e) => e.stopPropagation()}>
                <div className={cx('content', { mobile })}>
                    <h2>Thông tin trúng thưởng</h2>

                    <table className={cx('table', { mobile })}>
                        <thead>
                            <tr>
                                <th style={{ width: '5%' }}></th>
                                <th style={{ width: '25%' }}>Giải thưởng</th>
                                <th style={{ width: '25%' }}>Số lượng</th>
                                <th style={{ width: '45%' }}>Tiền của giải</th>
                            </tr>
                        </thead>
                        <tbody>
                            {result_details.map((value = {}, index) => {
                                const { prize, amount, total_value } = value;
                                if (!prize || !amount || !total_value) {
                                    return;
                                }
                                const mapValue = result_map[prize];
                                count++;
                                return (
                                    <tr key={index}>
                                        <td>{count}</td>
                                        <td>{mapValue.text}</td>
                                        <td>{amount}</td>
                                        <td>{VND.format(total_value)}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                        <tfoot>
                            <tr>
                                <th></th>
                                <th>Tổng:</th>
                                <th>{summary.amount}</th>
                                <th>{VND.format(summary.total_value)}</th>
                            </tr>
                        </tfoot>
                    </table>
                    <div className={cx('result')}>Mã dự thưởng: {ticket_number}</div>

                    <div className={cx('bottom')}>
                        <button onClick={() => setData()} className={cx('button')}>
                            Đóng
                        </button>
                    </div>
                </div>
            </div>
        </div>,
        modalRoot,
    );
};
ResultModal.propTypes = {
    data: PropTypes.any.isRequired,
    setData: PropTypes.any.isRequired,
    mobile: PropTypes.bool.isRequired,
};
export default ResultModal;
