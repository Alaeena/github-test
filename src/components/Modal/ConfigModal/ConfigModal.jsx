import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { useState } from 'react';

import classNames from 'classnames/bind';
import Styles from './ConfigModal.module.scss';
import useDraw from '@/util/useDraw';
const cx = classNames.bind(Styles);

const modalRoot = document.getElementById('root');
const ConfigModal = ({ mobile, setVisible }) => {
    const { storage, action } = useDraw();
    const [value, setValue] = useState(storage.allowSpecial);
    const [drawable, setDrawable] = useState(storage.allowDrawable);

    const { stopHour, stopMinute, releaseHour, releaseMinute } = storage;
    const handleDelete = () => {
        const result = confirm('Bạn có muốn xóa dữ liệu quay không?');
        if (result) {
            action.Clear();
        }
    };
    const handleChange = () => {
        setValue(!value);
        action.Toggle(!value);
    };
    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        const payload = { stopHour, stopMinute, releaseHour, releaseMinute };
        payload[name] = value;
        action.Range(payload);
    };
    const handleSet = () => {
        setDrawable(!drawable);
        action.Set(!drawable);
    };
    return createPortal(
        <div className={cx('overlay')} onClick={() => setVisible(false)}>
            <div className={cx('container', { mobile })} onClick={(e) => e.stopPropagation()}>
                <div className={cx('content', { mobile })}>
                    <h2>Cài đặt màn quay</h2>
                    <div className={cx('row')}>
                        <input type="checkbox" id="allowSpecial" onChange={handleChange} checked={value} />
                        <label htmlFor="allowSpecial">Cho phép xuất hiện giải thưởng đặc biệt</label>
                    </div>
                    <div className={cx('row')}>
                        <input type="checkbox" id="allowDrawable" onChange={handleSet} checked={drawable} />
                        <label htmlFor="allowDrawable">Cho phép quay mà không chặn theo khung giờ (6h15-7h00)</label>
                    </div>
                    <div className={cx('range')}>
                        <h4>Thời gian chặn</h4>
                        <div>
                            <div className={cx('row')}>
                                <input
                                    placeholder="Giờ"
                                    onChange={handleInput}
                                    value={stopHour}
                                    name="stopHour"
                                    type="number"
                                />
                                giờ
                                <input
                                    placeholder="Phút"
                                    onChange={handleInput}
                                    value={stopMinute}
                                    name="stopMinute"
                                    type="number"
                                />
                                phút
                            </div>
                            <span>-</span>
                            <div className={cx('row')}>
                                <input
                                    placeholder="Giờ"
                                    onChange={handleInput}
                                    value={releaseHour}
                                    name="releaseHour"
                                    type="number"
                                />
                                giờ
                                <input
                                    placeholder="Phút"
                                    onChange={handleInput}
                                    value={releaseMinute}
                                    name="releaseMinute"
                                    type="number"
                                />
                                phút
                            </div>
                        </div>
                    </div>

                    <div className={cx('row')}>
                        <button onClick={() => handleDelete()}>Xóa dữ liệu quay</button>
                        <label>Xóa dữ liệu quay, để làm mới lại dữ liệu xóa số lần quay trước đó</label>
                    </div>
                    <div className={cx('bottom')}>
                        <button onClick={() => setVisible(false)} className={cx('button')}>
                            Thoát
                        </button>
                    </div>
                </div>
            </div>
        </div>,
        modalRoot,
    );
};
ConfigModal.propTypes = {
    mobile: PropTypes.bool.isRequired,
};
export default ConfigModal;
