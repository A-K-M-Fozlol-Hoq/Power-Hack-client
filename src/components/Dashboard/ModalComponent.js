import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');
const ModalComponent = ({
  setIsOpen,
  modalIsOpen,
  setBillings,
  billings,
  modalDefaultValue,
  setModalDefaultValue,
}) => {
  const [modalData, setModalData] = useState({
    fullName: '',
    email: '',
    phone: '',
    paidAmount: 0,
  });
  let subtitle;
  useEffect(() => {
    if (modalDefaultValue._id) {
      setModalData({
        fullName: modalDefaultValue.fullName,
        email: modalDefaultValue.email,
        phone: modalDefaultValue.phone,
        paidAmount: modalDefaultValue.paidAmount,
      });
    }
  }, [modalDefaultValue._id]);

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }
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
  const isNumberValid = (phone) => {
    let isValid = phone.toString().startsWith('01');
    return isValid;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (modalData.fullName && isNameValid(modalData.fullName)) {
      if (modalData.email && isEmailValid(modalData.email)) {
        if (
          modalData.phone &&
          modalData.phone.length === 11 &&
          isNumberValid(modalData.phone)
        ) {
          if (
            modalData.paidAmount &&
            modalData.paidAmount > 0 &&
            modalData.paidAmount < 100000
          ) {
            console.log(modalData);
            setBillings([
              {
                _id: 'Generating ID',
                fullName: modalData.fullName,
                email: modalData.email,
                phone: modalData.phone,
                paidAmount: modalData.paidAmount,
              },
              ...billings,
            ]);
            fetch('http://localhost:4000/api/add-billing', {
              method: 'POST',
              headers: {
                'content-type': 'application/json',
                token: `bearer ${sessionStorage.getItem('token')}`,
              },
              body: JSON.stringify({
                fullName: modalData.fullName,
                email: modalData.email,
                phone: modalData.phone,
                paidAmount: modalData.paidAmount,
              }),
            })
              .then((response) => response.json())
              .then((data) => {
                console.log(data, 'ok', data.insertedId);
                closeModal();
                setTimeout(() => {
                  console.log(
                    "Delayed for 0.5 second to show'Generating ID' clearly."
                  );
                  const oldLists = billings.filter(checkBilling);
                  function checkBilling(billing) {
                    return billing._id !== 'Generating ID';
                  }
                  setBillings([
                    {
                      _id: data.insertedId,
                      fullName: modalData.fullName,
                      email: modalData.email,
                      phone: modalData.phone,
                      paidAmount: modalData.paidAmount,
                    },
                    ...oldLists,
                  ]);
                }, 500);
              })
              .catch((error) => {
                console.error(error, 'last');
                const oldLists = billings.filter(checkBilling);
                function checkBilling(billing) {
                  return billing._id !== 'Generating ID';
                }
                setBillings([...oldLists]);
              });
          } else {
            alert('paid amount must be larger than 0 and smaller than 100000');
          }
        } else {
          alert('Enter valid bangladeshi phone number');
        }
      } else {
        alert('Please enter a valid email');
      }
    } else {
      alert('Please enter a valid name');
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (isNameValid(modalData.fullName)) {
      if (isEmailValid(modalData.email)) {
        if (modalData.phone.length === 11 && isNumberValid(modalData.phone)) {
          if (modalData.paidAmount > 0 && modalData.paidAmount < 100000) {
            console.log(modalData, 'funal');
            fetch(
              `http://localhost:4000/api/update-billing/${modalDefaultValue._id}`,
              {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                  token: `bearer ${sessionStorage.getItem('token')}`,
                },
                body: JSON.stringify({
                  fullName: modalData.fullName,
                  email: modalData.email,
                  phone: modalData.phone,
                  paidAmount: modalData.paidAmount,
                }),
              }
            )
              .then((res) => res.json())
              .then((data) => {
                console.log(data);
                if (data.modifiedCount === 1) {
                  const oldLists = billings.filter(updateBilling);
                  function updateBilling(billing) {
                    return billing._id !== modalData._id;
                  }
                  setBillings([
                    {
                      _id: modalDefaultValue._id,
                      fullName: modalData.fullName,
                      email: modalData.email,
                      phone: modalData.phone,
                      paidAmount: modalData.paidAmount,
                    },
                    ...oldLists,
                  ]);
                  setModalDefaultValue({});
                  setModalData({});
                  closeModal();
                  alert(
                    `updated ${modalData.fullName} successfully from the billing`
                  );
                }
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            alert('paid amount must be larger than 0 and smaller than 100000');
          }
        } else {
          alert('Enter valid bangladeshi phone number');
        }
      } else {
        alert('Please enter a valid email');
      }
    } else {
      alert('Please enter a valid name');
    }
  };

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <form>
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="registerName">
              Name
            </label>
            <input
              defaultValue={`${
                modalDefaultValue.fullName
                  ? `${modalDefaultValue.fullName}`
                  : ''
              }`}
              onChange={(e) => {
                setModalData({ ...modalData, fullName: e.target.value });
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
              defaultValue={`${
                modalDefaultValue.email ? `${modalDefaultValue.email}` : ''
              }`}
              onChange={(e) => {
                setModalData({ ...modalData, email: e.target.value });
              }}
              type="email"
              id="registerEmail"
              className="form-control"
            />
          </div>

          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="phone">
              Phone
            </label>
            <input
              defaultValue={`${
                modalDefaultValue.phone ? `${modalDefaultValue.phone}` : ''
              }`}
              onChange={(e) => {
                setModalData({ ...modalData, phone: e.target.value });
              }}
              type="number"
              id="phone"
              className="form-control"
            />
          </div>

          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="amount">
              Paid Amount
            </label>
            <input
              defaultValue={`${
                modalDefaultValue.paidAmount
                  ? `${modalDefaultValue.paidAmount}`
                  : ''
              }`}
              onChange={(e) => {
                setModalData({
                  ...modalData,
                  paidAmount: e.target.value,
                });
              }}
              type="number"
              id="amount"
              className="form-control"
            />
          </div>
          {modalDefaultValue._id ? (
            <button
              type="submit"
              className="btn btn-primary btn-block mb-3 w-100"
              onClick={handleSave}
            >
              Save Change
            </button>
          ) : (
            <button
              type="submit"
              className="btn btn-primary btn-block mb-3 w-100"
              onClick={handleSubmit}
            >
              Add
            </button>
          )}
        </form>
        <button className="btn btn-danger w-100" onClick={closeModal}>
          close
        </button>
      </Modal>
    </div>
    // <div
    //   className="modal fade"
    //   id="exampleModal"
    //   tabIndex="-1"
    //   aria-labelledby="exampleModalLabel"
    //   aria-hidden="true"
    // >
    //   <div className="modal-dialog">
    //     <div className="modal-content">
    //       <div className="modal-header">
    //         <h5 className="modal-title" id="exampleModalLabel">
    //           Modal title
    //         </h5>
    //         <button
    //           type="button"
    //           className="btn-close"
    //           data-bs-dismiss="modal"
    //           aria-label="Close"
    //         ></button>
    //       </div>
    //       <div className="modal-body">
    // <form style={{ width: '50%', marginLeft: '25%' }}>
    //   <div className="form-outline mb-4">
    //     <label className="form-label" htmlFor="registerName">
    //       Name
    //     </label>
    //     <input
    //       onChange={(e) => {
    //         setModalData({ ...modalData, fullName: e.target.value });
    //       }}
    //       type="text"
    //       id="registerName"
    //       className="form-control"
    //     />
    //   </div>

    //   <div className="form-outline mb-4">
    //     <label className="form-label" htmlFor="registerEmail">
    //       Email
    //     </label>
    //     <input
    //       onChange={(e) => {
    //         setModalData({ ...modalData, email: e.target.value });
    //       }}
    //       type="email"
    //       id="registerEmail"
    //       className="form-control"
    //     />
    //   </div>

    //   <div className="form-outline mb-4">
    //     <label className="form-label" htmlFor="phone">
    //       Phone
    //     </label>
    //     <input
    //       onChange={(e) => {
    //         setModalData({ ...modalData, phone: e.target.value });
    //       }}
    //       type="number"
    //       id="phone"
    //       className="form-control"
    //     />
    //   </div>

    //   <div className="form-outline mb-4">
    //     <label className="form-label" htmlFor="amount">
    //       Paid Amount
    //     </label>
    //     <input
    //       onChange={(e) => {
    //         setModalData({
    //           ...modalData,
    //           paidAmount: e.target.value,
    //         });
    //       }}
    //       type="number"
    //       id="amount"
    //       className="form-control"
    //     />
    //   </div>
    //   <button
    //     type="submit"
    //     className="btn btn-primary btn-block mb-3"
    //     onClick={handleSubmit}
    //   >
    //     Add
    //   </button>
    // </form>
    //       </div>
    //       <div className="modal-footer">
    //         <button
    //           type="button"
    //           className="btn btn-secondary"
    //           data-bs-dismiss="modal"
    //         >
    //           Close
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default ModalComponent;
