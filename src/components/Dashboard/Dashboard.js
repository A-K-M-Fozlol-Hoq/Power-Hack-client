import React, { useEffect, useState } from 'react';
import Listing from './Listing';
import Listings from './Listings';
import ModalComponent from './ModalComponent';

const Dashboard = () => {
  const [billings, setBillings] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');

  const [currentPage, setCurrentPage] = useState(0);
  const [currentSearchPage, setCurrentSearchPage] = useState(0);
  function openModal() {
    setIsOpen(true);
  }
  const loadBillsFromDB = (currentPageToLoad) => {
    fetch('http://localhost:4000/api/billing-list', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        token: `bearer ${sessionStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        pageNumber: currentPageToLoad,
        query: search,
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
      <div className="text-center p-2 bg-secondary text-white rounded-1">
        Total paid:
        {billings.reduce(
          (partialSum, a) => partialSum + parseInt(a.paidAmount),
          0
        )}
      </div>
      <div
        className="bg-secondary my-5 rounded-1"
        style={{
          display: 'grid',
          gridTemplateColumns: '80px 1fr 150px',
          padding: '5px',
        }}
      >
        <p className="mt-2 text-white">Billings</p>
        <div className="d-flex">
          <input
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            className="form-control"
            style={{ width: '250px' }}
            type="text"
            placeholder="search"
          />
          <div className="btn btn-primary mx-2 my-2 px-5">filter</div>
        </div>
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
      <div>
        <div className="text-center">
          {currentPage > 0 && (
            <div
              onClick={() => {
                setCurrentPage(currentPage - 1);
                loadBillsFromDB(currentPage - 1);
              }}
              className="btn mx-1 btn-info"
            >
              Prev
            </div>
          )}
          <div className="btn mx-1 btn-info">{currentPage + 1}</div>
          {(billings.length === 10 || billings.length >= 10) && (
            <div
              onClick={() => {
                setCurrentPage(currentPage + 1);
                loadBillsFromDB(currentPage + 1);
              }}
              className="btn mx-1 btn-info"
            >
              Next
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
