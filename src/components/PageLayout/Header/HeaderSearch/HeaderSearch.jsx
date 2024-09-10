import { routes } from '@/routes';
import { useLocation } from 'react-router-dom';

import classNames from 'classnames/bind';
import Styles from './HeaderSearch.module.scss';
const cx = classNames.bind(Styles);

function HeaderSearch() {
    const { pathname } = useLocation();
    if (routes.result == pathname) {
        return;
    }
    return (
        <fieldset className={cx('content')}>
            <legend className="small-text">Dò mã dự thưởng</legend>
            <div>
                <div className="input-group">
                    <label htmlFor="lotteryDate" className="strong-text">
                        Ngày:
                    </label>
                    <input id="lotteryDate" className="input" type="datetime-local" placeholder={'Tên đăng nhập'} />
                </div>
                <div className="input-group">
                    <label htmlFor="lotteryValue" className="strong-text">
                        Mã:
                    </label>
                    <input id="lotteryValue" className="input" placeholder={'Mã dự thưởng'} />
                </div>
            </div>
            <div>
                <div className="input-group">
                    <label htmlFor="lotteryProvince" className="strong-text">
                        Tỉnh:
                    </label>
                    <select id="lotteryProvince" className="input">
                        <option value="0">Chọn tỉnh</option>
                        <option value="9">Bạc Liêu</option>
                        <option value="7">Bến Tre</option>
                        <option value="29">Đắk Lắk</option>
                        <option value="28">Quảng Nam</option>
                        <option value="47">Miền bắc</option>
                        <option value="8">Vũng Tàu</option>
                    </select>
                </div>

                <button className="button red">Dò kết quả</button>
            </div>
        </fieldset>
    );
}

export default HeaderSearch;
