import React from 'react';

const Header = () => {
  return (
    <div className="container">
      <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
        <a
          href="/"
          className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none"
        >
          <img
            style={{ height: '50px', width: '50px', borderRadius: '10px' }}
            src="https://play-lh.googleusercontent.com/edmBVFMS9fhuZycs2I6jCO7vGxhH434upOADR2e3x5Wi_s6Et4vcFY0gYs0q_B0qFS8"
            alt=""
          />
        </a>

        <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
          <li>
            <a href="/" className="nav-link px-2 link-dark">
              Home
            </a>
          </li>
          <li>
            <a
              href="https://github.com/A-K-M-Fozlol-Hoq"
              target="black"
              className="nav-link px-2 link-dark"
            >
              About
            </a>
          </li>
          <li>
            <a
              href="/enjoy-404-page"
              target="self"
              className="nav-link px-2 link-dark"
            >
              Unknown
            </a>
          </li>
        </ul>

        <div className="col-md-3 text-end">
          {sessionStorage.getItem('token') ? (
            <button
              type="button"
              onClick={() => {
                sessionStorage.clear();
                window.location.href = '/login';
              }}
              className="btn btn-primary"
            >
              Logout
            </button>
          ) : (
            <button
              type="button"
              onClick={() => (window.location.href = '/login')}
              className="btn btn-primary"
            >
              Login
            </button>
          )}

          <button
            type="button"
            onClick={() => (window.location.href = '/dashboard')}
            className="btn btn-primary"
            style={{ marginLeft: '20px' }}
          >
            Dashboard
          </button>
        </div>
      </header>
    </div>
  );
};

export default Header;
