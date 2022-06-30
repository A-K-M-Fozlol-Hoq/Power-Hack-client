import React, { useState } from 'react';
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
const ModalComponent = ({ setIsOpen, modalIsOpen, setBillings, billings }) => {
  const [modalData, setModalData] = useState({
    fullName: '',
    email: '',
    phone: '',
    paidAmount: 0,
  });
  let subtitle;

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
    if (isNameValid(modalData.fullName)) {
      if (isEmailValid(modalData.email)) {
        if (modalData.phone.length === 11 && isNumberValid(modalData.phone)) {
          if (modalData.paidAmount > 0 && modalData.paidAmount < 100000) {
            console.log(modalData);

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
                console.log(data, 'ok');
                closeModal();
              })
              .catch((error) => {
                console.error(error, 'last');
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
          <button
            type="submit"
            className="btn btn-primary btn-block mb-3 w-100"
            onClick={handleSubmit}
          >
            Add
          </button>
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
