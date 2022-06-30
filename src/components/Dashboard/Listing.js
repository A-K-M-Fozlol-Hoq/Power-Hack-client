import React from 'react';

const Listing = (props) => {
  const { _id, fullName, email, phone, paidAmount } = props;
  return (
    <tr>
      <th scope="row">{_id}</th>
      <td>{fullName}</td>
      <td>{email}</td>
      <td>{phone}</td>
      <td>{paidAmount}</td>
      <td className="row">
        <div className="col-md-6">
          <div className="btn btn-warning">edit</div>
        </div>
        <div className="col-md-6">
          <div className="btn btn-danger">delete</div>
        </div>
      </td>
    </tr>
  );
};

export default Listing;
