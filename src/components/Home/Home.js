import React from 'react';

const Home = () => {
  return (
    <div className="text-center">
      <h1>homepage</h1>
      <div className="p-5">
        {sessionStorage.getItem('token') ? (
          <button
            type="button"
            onClick={() => {
              sessionStorage.clear();
              window.location.href = '/login';
            }}
            className="btn btn-primary"
          >
            LOGOUT
          </button>
        ) : (
          <button
            type="button"
            onClick={() => (window.location.href = '/login')}
            className="btn btn-primary"
          >
            GO TO LOGIN PAGE
          </button>
        )}
        <br />
        <div
          className="btn btn-primary mt-2"
          onClick={() => {
            window.location.href = '/dashboard';
          }}
        >
          GO TO DASHBOARD PAGE
        </div>
      </div>
    </div>
  );
};

export default Home;
