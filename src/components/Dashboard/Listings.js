import React from 'react';
import Listing from './Listing';

const Listings = ({
  billings,
  setBillings,
  setModalDefaultValue,
  openModal,
}) => {
  const ascendingSortedBilling = billings.sort(function (a, b) {
    return a.paidAmount - b.paidAmount;
  });
  const descendingSortedBilling = ascendingSortedBilling.reverse();
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
          {descendingSortedBilling.map((billing, index) => (
            <Listing
              key={index}
              _id={billing._id}
              fullName={billing.fullName}
              email={billing.email}
              phone={billing.phone}
              paidAmount={billing.paidAmount}
              setBillings={setBillings}
              billings={billings}
              setModalDefaultValue={setModalDefaultValue}
              openModal={openModal}
            ></Listing>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Listings;
