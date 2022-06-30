import React, { useState } from 'react';

const SignUp = (props) => {
  const { showLoginComponent, setShowLoginComponent } = props;
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const isStartsWithAlphabetic = (string) => {
    const char = string.charAt(0);
    return /[a-zA-Z]/.test(char);
  };

  const isNameValid = (name) => {
    if (name.length >= 2 && name.length <= 50) {
      const isFieldValid =
        /^[a-z ,.'-]+$/i.test(name) && isStartsWithAlphabetic(name);
      return isFieldValid;
    } else {
      return false;
    }
  };

  const isEmailValid = (email) => {
    let isValid = /\S+@\S+\.\S+/.test(email);
    return isValid;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isNameValid(signupData.name)) {
      if (isEmailValid(signupData.email)) {
        if (signupData.password.length > 5 && signupData.password.length < 50) {
          if (signupData.password === signupData.confirmPassword) {
            console.log(signupData);

            fetch('http://localhost:4000/api/registration', {
              method: 'POST',
              headers: { 'content-type': 'application/json' },
              body: JSON.stringify({
                fullName: signupData.fullName,
                email: signupData.email,
                password: signupData.password,
              }),
            })
              .then((response) => response.json())
              .then((data) => {
                console.log(data, 'ok');
                sessionStorage.setItem('token', data.token);
                window.location.href = '/dashboard';
              })
              .catch((error) => {
                console.error(error, 'last');
              });
          } else {
            alert('Password is not matching with confirm password');
          }
        } else {
          alert('password length must be between 6 to 50');
        }
      } else {
        alert('Please enter a valid email');
      }
    } else {
      alert('Please enter a valid name');
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
              className="nav-link"
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
              className="nav-link active"
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
          <label className="form-label" htmlFor="registerName">
            Name
          </label>
          <input
            onChange={(e) => {
              setSignupData({ ...signupData, name: e.target.value });
            }}
            type="text"
            id="registerName"
            className="form-control"
          />
        </div>

        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="registerEmail">
            Email
          </label>
          <input
            onChange={(e) => {
              setSignupData({ ...signupData, email: e.target.value });
            }}
            type="email"
            id="registerEmail"
            className="form-control"
          />
        </div>

        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="registerPassword">
            Password
          </label>
          <input
            onChange={(e) => {
              setSignupData({ ...signupData, password: e.target.value });
            }}
            type="password"
            id="registerPassword"
            className="form-control"
          />
        </div>

        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="registerRepeatPassword">
            Confirm password
          </label>
          <input
            onChange={(e) => {
              setSignupData({ ...signupData, confirmPassword: e.target.value });
            }}
            type="password"
            id="registerRepeatPassword"
            className="form-control"
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary btn-block mb-3"
          onClick={handleSubmit}
        >
          Submit Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
