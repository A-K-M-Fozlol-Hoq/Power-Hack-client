import React from 'react';

const Dashboard = () => {
  console.log(sessionStorage.getItem('token'));
  fetch('http://localhost:4000/api/add-billing', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      token: `bearer ${sessionStorage.getItem('token')}`,
    },
    body: JSON.stringify({
      fullName: ' signupData.fullName',
      email: 'signupData.email',
      phone: 'signupData.email',
      paidAmount: 12,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data, 'ok');
      sessionStorage.setItem('token', data.token);
    })
    .catch((error) => {
      console.error(error, 'last');
    });
  return <div>Dashboard</div>;
};

export default Dashboard;
