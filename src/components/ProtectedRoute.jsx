import PropTypes from 'prop-types';
import { Navigate, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const location = useLocation();
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  // Fungsi validasi token
  const isTokenValid = () => {
    if (!token) return false;

    try {
      const decoded = jwtDecode(token);
      return decoded.exp > Math.floor(Date.now() / 1000);
    } catch (error) {
      return false;
    }
  };

  // Cek token
  if (!token || !isTokenValid()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Cek role jika diperlukan
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

// Tambahkan PropTypes
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  allowedRoles: PropTypes.arrayOf(PropTypes.string)
};

export default ProtectedRoute;