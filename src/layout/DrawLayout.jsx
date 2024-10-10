import PropTypes from 'prop-types';

function AdminLayout({ children }) {
    return <div className="background">{children}</div>;
}
AdminLayout.propTypes = {
    children: PropTypes.any.isRequired,
};
export default AdminLayout;
