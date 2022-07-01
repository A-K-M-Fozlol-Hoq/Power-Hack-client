import React, { useState } from 'react';

const Login = (props) => {
  const { showLoginComponent, setShowLoginComponent } = props;
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const isEmailValid = (email) => {
    let isValid = /\S+@\S+\.\S+/.test(email);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEmailValid(loginData.email)) {
      if (loginData.password.length > 0 && loginData.password.length < 50) {
        fetch('https://tim-sorry-00535.herokuapp.com/api/login', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({
            email: loginData.email,
            password: loginData.password,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data) {
              // console.log(data);
              sessionStorage.setItem('token', data.token);
              window.location.href = '/dashboard';
            } else {
              // console.log( false);
            }
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        alert('password length must be between 6 to 50');
      }
    } else {
      alert('Please enter a valid email');
    }
  };

  return (
    <div style={{ height: '520px' }}>
      <div style={{ width: '50%', marginLeft: '25%', marginTop: '50px' }}>
        <ul
          className="nav nav-pills nav-justified mb-3"
          id="ex1"
          role="tablist"
        >
          <li
            className="nav-item"
            role="presentation"
            onClick={() => setShowLoginComponent(true)}
          >
            <p
              style={{ cursor: 'pointer' }}
              className="nav-link active"
              id="tab-login"
              data-mdb-toggle="pill"
              role="tab"
              aria-controls="pills-login"
              aria-selected="true"
            >
              Login
            </p>
          </li>
          <li
            className="nav-item"
            role="presentation"
            onClick={() => setShowLoginComponent(false)}
          >
            <p
              style={{ cursor: 'pointer' }}
              className="nav-link "
              id="tab-register"
              data-mdb-toggle="pill"
              href="/login"
              role="tab"
              aria-controls="pills-register"
              aria-selected="false"
            >
              Register
            </p>
          </li>
        </ul>
      </div>

      <form style={{ width: '50%', marginLeft: '25%' }}>
        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="loginName">
            Email
          </label>
          <input
            onChange={(e) => {
              setLoginData({ ...loginData, email: e.target.value });
            }}
            type="email"
            id="loginName"
            className="form-control"
          />
        </div>

        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="loginPassword">
            Password
          </label>
          <input
            onChange={(e) => {
              setLoginData({ ...loginData, password: e.target.value });
            }}
            type="password"
            id="loginPassword"
            className="form-control"
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary btn-block mb-3"
          onClick={handleSubmit}
        >
          Sign in
        </button>
      </form>
    </div>
  );
};

export default Login;
