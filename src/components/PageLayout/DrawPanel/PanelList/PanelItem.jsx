import PropTypes from 'prop-types';

import classNames from 'classnames/bind';
import Styles from './PanelList.module.scss';
const cx = classNames.bind(Styles);

const icon_map = {
    0: 'special-prize',
    7: 'first-prize',
    6: 'second-prize',
    5: 'third-prize',
    4: 'other-prize',
    3: 'other-prize',
    2: 'other-prize',
    1: 'other-prize',
};

function randomListFromID(id) {
    function seededRandom() {
        id = (id * 9301 + 49297) % 233280;
        return id / 233280;
    }

    // Generate shuffled list from 0 to 9
    const list = [...Array(10).keys()];
    for (let i = list.length - 1; i > 0; i--) {
        const j = Math.floor(seededRandom() * (i + 1));
        [list[i], list[j]] = [list[j], list[i]]; // Swap elements
    }

    return list;
}
const PanelItem = ({ state, prize, value }) => {
    const iconClass = icon_map[prize] || icon_map[3];
    const values = randomListFromID(value);
    const valueClass = value && `value${values.indexOf(parseInt(value))}`;

    return (
        <div className={cx('slot', { drawing: state == 'drawing' })}>
            {state == 'idle' ? (
                <div className={cx('slot-front')}>
                    <div className={iconClass}></div>
                </div>
            ) : state == 'drawing' ? (
                <div className={cx('slot-drawing', 'drawing')} style={{ animationDuration: `${Math.random()}s` }}>
                    {values.map((value, index) => (
                        <div key={index} className={cx('slot-item')}>
                            {value}
                        </div>
                    ))}
                </div>
            ) : (
                <div className={cx('slot-drawing', valueClass)}>
                    {values.map((number, index) => (
                        <div key={index} className={cx('slot-item')}>
                            {number}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
PanelItem.propTypes = {
    value: PropTypes.string,
    state: PropTypes.string,
    prize: PropTypes.number,
};
export default PanelItem;
