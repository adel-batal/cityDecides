import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import defaultLogo from '../../Images/city-college-logo.png';
import AuthContext from '../../Context/Auth/AuthContext';
import StudentContext from '../../Context/Student/StudentContext';

export default function Navbar({ title, logo }) {
  /*  useEffect(() => {
    if (user && user.role === 'admin') {
      loadAdminUser();
    } else {
      loadStudentUser();
    }
    // eslint-disable-next-line
  }, []); */
  
  const authContext = useContext(AuthContext);
  const studentContext = useContext(StudentContext);

  const { loadAdminUser, loadStudentUser, isAuthenticated, logout, user } =
    authContext;
  const { clearStudents } = studentContext;

  const handleLogout = () => {
    clearStudents();
    logout();
  };
  return (
    <div className='navbar bg-primary'>
      <h1 className='navbar_title'>
        <img src={defaultLogo} alt={logo} /> {title}
      </h1>
      {isAuthenticated && (
        <ul>
          <li>{user && user.email}</li>
          <li>
            <a onClick={handleLogout} href='/'>
              <span>Logout </span>
            </a>
          </li>
        </ul>
      )}
    </div>
  );
}

Navbar.protoTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
};

Navbar.defaultProps = {
  title: 'CityDecides',
};
