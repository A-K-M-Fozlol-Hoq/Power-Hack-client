import React, { useEffect, useState } from 'react';
import Listing from './Listing';
import Listings from './Listings';
import ModalComponent from './ModalComponent';

const Dashboard = () => {
  const [billings, setBillings] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');

  const [currentPage, setCurrentPage] = useState(
    sessionStorage.getItem('currentPage') || 0
  );
  function openModal() {
    setIsOpen(true);
  }
  const loadBillsFromDB = (currentPageToLoad) => {
    fetch('http://localhost:4000/api/billing-list', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pageNumber: currentPageToLoad,
        query: '017',
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setBillings(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    loadBillsFromDB();
  }, []);
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
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          className="form-control"
          style={{ width: '250px' }}
          type="text"
          placeholder="search"
        />
        <div
          className="btn btn-primary"
          data-bs-toggle="modal"
          onClick={openModal}
        >
          Add New Billing
        </div>
      </div>

      <Listings billings={billings}></Listings>
      <ModalComponent
        setIsOpen={setIsOpen}
        modalIsOpen={modalIsOpen}
        setBillings={setBillings}
        billings={billings}
      ></ModalComponent>
    </div>
  );
};

export default Dashboard;
