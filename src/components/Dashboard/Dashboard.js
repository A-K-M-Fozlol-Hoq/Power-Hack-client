import React, { useState } from 'react';
import Listing from './Listing';
import Listings from './Listings';
import Modal from './Modal';

const Dashboard = () => {
  const [billings, setBillings] = useState([]);

  return (
    <div
      className="container"
      style={{ marginTop: '100px', marginBottom: '100px' }}
    >
      <div
        className="bg-secondary my-5"
        style={{
          display: 'grid',
          gridTemplateColumns: '80px 1fr 150px',
          padding: '5px',
          borderRadius: '10px',
        }}
      >
        <p className="mt-2 text-white">Billings</p>
        <input
          className="form-control"
          style={{ width: '250px' }}
          type="text"
          placeholder="search"
        />
        <div
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Add New Billing
        </div>
      </div>

      <Listings billings={billings}></Listings>
      <Modal></Modal>
    </div>
  );
};

export default Dashboard;
