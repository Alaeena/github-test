import PropTypes from 'prop-types';
import useMobile from '@/util/useMobile';
import { Header, Sidebar } from '@/components/PageLayout';

import classNames from 'classnames/bind';
import Styles from './Layout.module.scss';
const cx = classNames.bind(Styles);

function IndexLayout({ children }) {
    const [mobile] = useMobile();

    return (
        <div className="background">
            <Header mobile={mobile} />
            <div className={cx('content', 'row')}>
                <div className={cx('column')}>{children}</div>
                {!mobile && <Sidebar />}
            </div>
        </div>
    );
}
IndexLayout.propTypes = {
    children: PropTypes.any.isRequired,
};
export default IndexLayout;
