import classNames from 'classnames/bind';
import Styles from './ListBar.module.scss';
const cx = classNames.bind(Styles);

function ListBar() {
    return (
        <div className={cx('container')}>
            <div className={cx('header')}>Kết quả xổ số</div>

            <div className={cx('content')}>
                <ul className={cx('list')}>
                    <li>
                        <a href="/ket-qua-xo-so/mien-nam/an-giang.html" title="Click xem tất cả KQXS An Giang">
                            <span>Kết quả xổ số An Giang</span>
                        </a>
                    </li>

                    <li>
                        <a href="/ket-qua-xo-so/mien-nam/bac-lieu.html" title="Click xem tất cả KQXS Bạc Liêu">
                            <span>Kết quả xổ số Bạc Liêu</span>
                        </a>
                    </li>

                    <li>
                        <a href="/ket-qua-xo-so/mien-nam/ben-tre.html" title="Click xem tất cả KQXS Bến Tre">
                            <span>Kết quả xổ số Bến Tre</span>
                        </a>
                    </li>

                    <li>
                        <a href="/ket-qua-xo-so/mien-nam/binh-duong.html" title="Click xem tất cả KQXS Bình Dương">
                            <span>Kết quả xổ số Bình Dương</span>
                        </a>
                    </li>

                    <li>
                        <a href="/ket-qua-xo-so/mien-nam/binh-phuoc.html" title="Click xem tất cả KQXS Bình Phước">
                            <span>Kết quả xổ số Bình Phước</span>
                        </a>
                    </li>

                    <li>
                        <a href="/ket-qua-xo-so/mien-nam/binh-thuan.html" title="Click xem tất cả KQXS Bình Thuận">
                            <span>Kết quả xổ số Bình Thuận</span>
                        </a>
                    </li>

                    <li>
                        <a href="/ket-qua-xo-so/mien-nam/ca-mau.html" title="Click xem tất cả KQXS Cà Mau">
                            <span>Kết quả xổ số Cà Mau</span>
                        </a>
                    </li>

                    <li>
                        <a href="/ket-qua-xo-so/mien-nam/can-tho.html" title="Click xem tất cả KQXS Cần Thơ">
                            <span>Kết quả xổ số Cần Thơ</span>
                        </a>
                    </li>

                    <li>
                        <a href="/ket-qua-xo-so/mien-nam/da-lat.html" title="Click xem tất cả KQXS Đà Lạt">
                            <span>Kết quả xổ số Đà Lạt</span>
                        </a>
                    </li>

                    <li>
                        <a href="/ket-qua-xo-so/mien-nam/dong-nai.html" title="Click xem tất cả KQXS Đồng Nai">
                            <span>Kết quả xổ số Đồng Nai</span>
                        </a>
                    </li>

                    <li>
                        <a href="/ket-qua-xo-so/mien-nam/dong-thap.html" title="Click xem tất cả KQXS Đồng Tháp">
                            <span>Kết quả xổ số Đồng Tháp</span>
                        </a>
                    </li>

                    <li>
                        <a href="/ket-qua-xo-so/mien-nam/hau-giang.html" title="Click xem tất cả KQXS Hậu Giang">
                            <span>Kết quả xổ số Hậu Giang</span>
                        </a>
                    </li>

                    <li>
                        <a href="/ket-qua-xo-so/mien-nam/kien-giang.html" title="Click xem tất cả KQXS Kiên Giang">
                            <span>Kết quả xổ số Kiên Giang</span>
                        </a>
                    </li>

                    <li>
                        <a href="/ket-qua-xo-so/mien-nam/long-an.html" title="Click xem tất cả KQXS Long An">
                            <span>Kết quả xổ số Long An</span>
                        </a>
                    </li>

                    <li>
                        <a href="/ket-qua-xo-so/mien-nam/soc-trang.html" title="Click xem tất cả KQXS Sóc Trăng">
                            <span>Kết quả xổ số Sóc Trăng</span>
                        </a>
                    </li>

                    <li>
                        <a href="/ket-qua-xo-so/mien-nam/tay-ninh.html" title="Click xem tất cả KQXS Tây Ninh">
                            <span>Kết quả xổ số Tây Ninh</span>
                        </a>
                    </li>

                    <li>
                        <a href="/ket-qua-xo-so/mien-nam/tien-giang.html" title="Click xem tất cả KQXS Tiền Giang">
                            <span>Kết quả xổ số Tiền Giang</span>
                        </a>
                    </li>

                    <li>
                        <a href="/ket-qua-xo-so/mien-nam/tp-hcm.html" title="Click xem tất cả KQXS TP. HCM">
                            <span>Kết quả xổ số TP. HCM</span>
                        </a>
                    </li>

                    <li>
                        <a href="/ket-qua-xo-so/mien-nam/tra-vinh.html" title="Click xem tất cả KQXS Trà Vinh">
                            <span>Kết quả xổ số Trà Vinh</span>
                        </a>
                    </li>

                    <li>
                        <a href="/ket-qua-xo-so/mien-nam/vinh-long.html" title="Click xem tất cả KQXS Vĩnh Long">
                            <span>Kết quả xổ số Vĩnh Long</span>
                        </a>
                    </li>

                    <li>
                        <a href="/ket-qua-xo-so/mien-nam/vung-tau.html" title="Click xem tất cả KQXS Vũng Tàu">
                            <span class="icon wait">Kết quả xổ số Vũng Tàu</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default ListBar;
