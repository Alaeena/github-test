import { LotteryResult } from '@/components/PageLayout';

import classNames from 'classnames/bind';
import Styles from './Home.module.scss';
const cx = classNames.bind(Styles);

function Home() {
    return (
        <div>
            <div className={cx('header')}>Kết Quả xố số</div>
            <div className={cx('info')}>
                <span>Kết quả xổ số tiếp theo lúc 16h50: 10/09/2024. Còn 6 tiếng nữa</span>
            </div>

            <div className={cx('option')}>
                <div className={cx('line1')}>
                    <button>06-09-2024</button>
                    <button>07-09-2024</button>
                    <button>08-09-2024</button>
                    <button className={cx('active')}>Hôm nay (09-09-2024)</button>
                </div>
                <div className={cx('line2')}>
                    <input id="searchDate" className="input" type="datetime-local" placeholder={'Tên đăng nhập'} />
                    <select id="searchProvince" className="input">
                        <option value="0">Chọn tỉnh</option>
                        <option value="9">Bạc Liêu</option>
                        <option value="7">Bến Tre</option>
                        <option value="29">Đắk Lắk</option>
                        <option value="28">Quảng Nam</option>
                        <option value="47">Miền bắc</option>
                        <option value="8">Vũng Tàu</option>
                    </select>
                    <button className="button red">Tìm kiếm</button>
                </div>
            </div>
            <LotteryResult />
            <LotteryResult />
            <LotteryResult />

            <div className={cx('option')}>
                <div className={cx('line2')}>
                    <input id="searchDate" className="input" type="datetime-local" placeholder={'Tên đăng nhập'} />
                    <select id="searchProvince" className="input">
                        <option value="0">Chọn tỉnh</option>
                        <option value="9">Bạc Liêu</option>
                        <option value="7">Bến Tre</option>
                        <option value="29">Đắk Lắk</option>
                        <option value="28">Quảng Nam</option>
                        <option value="47">Miền bắc</option>
                        <option value="8">Vũng Tàu</option>
                    </select>
                    <button className="button red">Tìm kiếm</button>
                </div>
                <div className={cx('line1')}>
                    <button>06-09-2024</button>
                    <button>07-09-2024</button>
                    <button>08-09-2024</button>
                    <button className={cx('active')}>Hôm nay (09-09-2024)</button>
                </div>
            </div>
            <div style={{ padding: 12 }}>
                <div>
                    <div>
                        <h1>XỔ SỐ VIỆT NAM:</h1>
                        <p>&nbsp;</p>
                        <p className="small-text" style={{ color: '#000', marginBottom: 8 }}>
                            <a href="#">Xổ số miền Bắc</a> hay xổ số Thủ đô mở thưởng vào tất cả các ngày trong tuần,
                            thời gian mở thưởng là 18h00 và kết thúc vào lúc 18h30 hàng ngày trên kênh VTC9 (riêng dịp
                            Tết Nguyên Đán tạm ngừng mở thưởng 4 ngày từ 30 Tết đến mùng 3 Tết)
                        </p>
                        <p className="small-text" style={{ color: '#000', marginBottom: 8 }}>
                            <a href="#">Xổ số miền Trung</a> gồm 14 tỉnh khác nhau thời gian mở thưởng là 17h15 hàng
                            ngày, xổ số Khánh Hòa mở thưởng vào chủ nhật và thứ 4, xổ số Đà Nẵng mở vào thứ 4 và thứ 7,
                            các đài tỉnh khác chỉ mở một lần một tuần.
                        </p>
                        <p className="small-text" style={{ color: '#000', marginBottom: 8 }}>
                            <a href="#">Xổ số miền Nam</a> gồm 21 tỉnh khác nhau có thời gian mở thưởng là 16h10 hàng
                            ngày, xổ số Tp. Hồ Chí Minh mở thưởng vào thứ 2 và thứ 7, các đài tỉnh khác chỉ mở một lần
                            một tuần. Kết quả xổ số được cập nhật hàng ngày và hoàn toàn miễn phí trên trang kqxs.vn
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
