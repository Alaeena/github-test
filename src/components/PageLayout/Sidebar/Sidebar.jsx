import Calender from './Calendar/Calender';
import SearchBar from './SearchBar/SearchBar';
import ListBar from './ListBar/ListBar';

import classNames from 'classnames/bind';
import Styles from './Sidebar.module.scss';
const cx = classNames.bind(Styles);

function Sidebar() {
    return (
        <div className={cx('container')}>
            <div className={cx('item')}>
                <SearchBar />
            </div>
            <div className={cx('item')}>
                <Calender />
            </div>
            <div className={cx('item')}>
                <ListBar />
            </div>
        </div>
    );
}

export default Sidebar;
