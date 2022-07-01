import React from 'react';

const Listing = (props) => {
  const {
    _id,
    fullName,
    email,
    phone,
    paidAmount,
    setBillings,
    billings,
    setModalDefaultValue,
    openModal,
  } = props;
  // setModalDefaultValue({ _id, fullName, email, phone, paidAmount });
  // /api/delete-billing/:id
  const deleteByID = (id) => {
    fetch(`https://tim-sorry-00535.herokuapp.com/api/delete-billing/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        token: `bearer ${sessionStorage.getItem('token')}`,
      },
      body: JSON.stringify({}),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const oldLists = billings.filter(checkBilling);
        function checkBilling(billing) {
          return billing._id !== id;
        }
        setBillings([...oldLists]);
        alert(`removed ${fullName} successfully from the billing`);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <tr>
      <th scope="row">{_id}</th>
      <td>{fullName}</td>
      <td>{email}</td>
      <td>{phone}</td>
      <td>{paidAmount}</td>
      <td className="row">
        <div className="col-md-6">
          <div
            className="btn btn-warning"
            onClick={() => {
              setModalDefaultValue({ _id, fullName, email, phone, paidAmount });
              openModal();
            }}
          >
            edit
          </div>
        </div>
        <div className="col-md-6">
          <div className="btn btn-danger" onClick={() => deleteByID(_id)}>
            delete
          </div>
        </div>
      </td>
    </tr>
  );
};

export default Listing;
