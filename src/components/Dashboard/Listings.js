import React from 'react';
import Listing from './Listing';

const Listings = ({ billings }) => {
  return (
    <div>
      <table className="table container text-center">
        <thead>
          <tr>
            <th scope="col">Billing ID</th>
            <th scope="col">Full name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Paid Amount</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <Listing></Listing>
        </tbody>
      </table>
    </div>
  );
};

export default Listings;