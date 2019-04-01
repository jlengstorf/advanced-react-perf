import React, { useContext } from 'react';
import { Link } from '@reach/router';
import { useUser } from '../../context/user';
import Logo from '../images/logo.svg';

const Header = () => {
  const { user, logout } = useUser();
  const authenticated = !!user.name;

  return (
    <header className="header">
      <div className="header-wrapper">
        <Link to="/">
          <Logo />
        </Link>

        <nav>
          {authenticated ? (
            <>
              <Link to="/add" className="create-account-button">
                Share Your Shame
              </Link>
              <Link to="/dashboard">
                <img
                  className="user-avatar"
                  src={user.avatar}
                  width="50"
                  height="50"
                  alt={user.name}
                />
              </Link>
              <button onClick={logout} className="logout-button">
                log out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="create-account-button">
                Create account
              </Link>
              <Link to="/login" className="login-button">
                Login
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
