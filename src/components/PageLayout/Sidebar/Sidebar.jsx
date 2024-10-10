import { Calendar } from '@/components/Elements';
import SearchBar from './SearchBar/SearchBar';

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
                <Calendar />
            </div>
        </div>
    );
}

export default Sidebar;
