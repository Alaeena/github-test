import classNames from 'classnames/bind';
import Styles from './Introduction.module.scss';
import { Link } from 'react-router-dom';

import { intro_map } from '@/util/useDraw';
import { routes } from '@/routes';
const cx = classNames.bind(Styles);

const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
});
function Introduction() {
    return (
        <div className={cx('container')}>
            <div className={cx('section')}>
                <h2>GIỚI THIỆU</h2>

                <p>Xổ số MAX10 là một trong số rất nhiều sự kiện tri ân thành viên MAX10.</p>
                <p>Sự kiện được tổ chức hàng ngày, trực tiếp trên Livestream trong game.</p>
                <p>
                    Thành viên MAX10 có cơ hội trúng rất nhiều giải thưởng, với giải Đặc biệt lên tới{' '}
                    <strong>99,999,999đ.</strong>
                </p>
            </div>
            <div className={cx('section')}>
                <h2 className={cx('warning')}>CÁCH THỨC THAM GIA</h2>
                <ul className={cx('list')}>
                    <li>
                        Thành viên sẽ nhận được 1 mã dự thưởng cho mỗi 50K nạp thành công. Cuối ngày hệ thống tự động
                        cập nhật và thành viên có thể kiểm tra mã của mình tại mục{' '}
                        <Link className={cx('link')} to={routes.search}>
                            'DÒ MÃ DỰ THƯỞNG'
                        </Link>
                        .
                    </li>
                    <li>
                        Mở thưởng hàng ngày lúc 18h15, truyền hình trực tiếp trên Livestream trong game. Kết quả Xổ số
                        MAX10 của tất cả các ngày có thể được kiểm tra tại mục{' '}
                        <Link className={cx('link')} to={routes.root}>
                            'TRA CỨU KẾT QUẢ TRÚNG THƯỞNG'
                        </Link>
                        .
                    </li>
                    <li>
                        Thành viên trúng thưởng sẽ được hệ thống gửi quà vào mục HÒM THƯ trong game trong cùng ngày mở
                        thưởng.
                    </li>
                </ul>
            </div>
            <div className={cx('section')}>
                <h2>CƠ CẤU GIẢI THƯỞNG</h2>
                <table className={cx('table')}>
                    <thead>
                        <tr>
                            <th>GIẢI</th>
                            <th>SỐ LƯỢNG</th>
                            <th>GIÁ TRỊ MỖI GIẢI</th>
                            <th>CÁCH QUAY</th>
                        </tr>
                    </thead>
                    <tbody>
                        {intro_map.map((item, index) => (
                            <tr key={index}>
                                <td>{item.text}</td>
                                <td>{item.count}</td>
                                <td>{VND.format(item.reward)}</td>
                                <td>
                                    Quay {item.count} lần, mỗi lần {item.number} số
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className={cx('section')}>
                <h2>CHÚ Ý</h2>
                <ul className={cx('list', 'warning')}>
                    <li>
                        Nghiêm cấm các hành vi trục lợi trái quy định của MAX10. Nếu bị phát hiện, toàn bộ giải thưởng
                        (nếu có) sẽ bị thu hồi và chấm dứt hoạt động những tài khoản liên quan.
                    </li>
                    <li>MAX10 có toàn quyền điều chỉnh thể lệ sự kiện mà không cần báo trước.</li>
                    <li>Quyết định của MAX10 là cuối cùng và duy nhất.</li>
                </ul>
            </div>
        </div>
    );
}
export default Introduction;
