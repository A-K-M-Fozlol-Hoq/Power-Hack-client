import React, { useState } from 'react';
import Login from '../components/Authentication/Login';
import SignUp from '../components/Authentication/SignUp';
import Layout from '../components/Layout/Layout';

const LoginPage = () => {
  const [showLoginComponent, setShowLoginComponent] = useState(true);
  return (
    <div>
      {showLoginComponent ? (
        <Layout>
          <Login
            showLoginComponent={showLoginComponent}
            setShowLoginComponent={setShowLoginComponent}
          ></Login>
        </Layout>
      ) : (
        <Layout>
          <SignUp
            showLoginComponent={showLoginComponent}
            setShowLoginComponent={setShowLoginComponent}
          ></SignUp>
        </Layout>
      )}
    </div>
  );
};

export default LoginPage;
