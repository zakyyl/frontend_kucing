import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

// Buat Context
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isLoggedIn: false,
    user: null,
  });

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      {children}
    </AuthContext.Provider>
  );
};

// Tambahkan PropTypes untuk validasi
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;