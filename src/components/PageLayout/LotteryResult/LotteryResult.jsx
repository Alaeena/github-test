import classNames from 'classnames/bind';
import Styles from './LotteryResult.module.scss';
const cx = classNames.bind(Styles);

function LotteryResult() {
    return (
        <div className={cx('content')}>
            <div className={cx('header')}>
                <span>Kết Quả xố số</span>-<span>09/09/2024</span>
            </div>

            <table className={cx('table')}>
                <tr>
                    <th>Giải Đặc Biệt</th>
                    <td colSpan="12" className={cx('special')}>
                        84635
                    </td>
                </tr>
                <tr>
                    <th>Giải Nhất</th>
                    <td colSpan="12" className={cx('first')}>
                        26865
                    </td>
                </tr>
                <tr>
                    <th>Giải Nhì</th>
                    <td colSpan="6" className={cx('second')}>
                        63468
                    </td>
                    <td colSpan="6" className={cx('second')}>
                        17569
                    </td>
                </tr>
                <tr>
                    <th>Giải Ba</th>
                    <td colSpan="4" className={cx('third')}>
                        07023<br></br>
                        95983
                    </td>
                    <td colSpan="4" className={cx('third')}>
                        09539<br></br>
                        87699
                    </td>
                    <td colSpan="4" className={cx('third')}>
                        08526<br></br>
                        96057
                    </td>
                </tr>
                <tr>
                    <th>Giải Tư</th>
                    <td colSpan="3" className={cx('four')}>
                        6598
                    </td>
                    <td colSpan="3" className={cx('four')}>
                        6450
                    </td>
                    <td colSpan="3" className={cx('four')}>
                        1873
                    </td>
                    <td colSpan="3" className={cx('four')}>
                        0400
                    </td>
                </tr>
                <tr>
                    <th>Giải Năm</th>
                    <td colSpan="4" className={cx('five')}>
                        2558<br></br>
                        9983
                    </td>
                    <td colSpan="4" className={cx('five')}>
                        0939<br></br>
                        8799
                    </td>
                    <td colSpan="4" className={cx('five')}>
                        0856<br></br>
                        9607
                    </td>
                </tr>
                <tr>
                    <th>Giải Sáu</th>
                    <td colSpan="4" className={cx('six')}>
                        917
                    </td>
                    <td colSpan="4" className={cx('six')}>
                        771
                    </td>
                    <td colSpan="4" className={cx('six')}>
                        450
                    </td>
                </tr>
                <tr>
                    <th>Giải Bảy</th>
                    <td colSpan="3">87</td>
                    <td colSpan="3">96</td>
                    <td colSpan="3">97</td>
                    <td colSpan="3">75</td>
                </tr>
            </table>
            <div className={cx('footer')}></div>
        </div>
    );
}

export default LotteryResult;
