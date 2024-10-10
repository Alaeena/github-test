import { LotteryResult } from '@/components/PageLayout';
import useMobile from '@/util/useMobile';
import HomeOption from './HomeOption';

import classNames from 'classnames/bind';
import Styles from './Home.module.scss';
const cx = classNames.bind(Styles);

function Home() {
    const [mobile] = useMobile();

    return (
        <div>
            <div className={cx('header', { mobile })}>Kết quả trúng thưởng</div>
            <HomeOption mobile={mobile} />
            <LotteryResult mobile={mobile} />
        </div>
    );
}

export default Home;
