import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleUserAddReceiver } from '../../../State/actions/userAction';

const AddNewAddress = (props) => {
  const { handleNo } = props;
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [address, setAddress] = useState('');
  const [receiver, setReceiver] = useState('');
  const [phone, setPhone] = useState('');

  //error
  const [error, setError] = useState({
    receiver: { visible: false, message: '' },
    address: { visible: false, message: '' },
    phone: { visible: false, message: '' },
  });
  const emptyFeild = () => {
    setAddress('');
    setReceiver('');
    setPhone('');
  };

  const handleValidate = () => {
    const newError = {
      receiver: { visible: false, message: '' },
      address: { visible: false, message: '' },
      phone: { visible: false, message: '' },
    };
    let passed = true;

    //validate receiver name
    if (receiver.length) {
      if (receiver.match(/[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~\d]/g)) {
        const visible = true;
        const message = "Receiver name can't contain number or special ";
        newError.receiver = { visible, message };
      }
    } else {
      const visible = true;
      const message = "receiver can't be empty";
      newError.receiver = { visible, message };
    }
    //validate address
    if (!address.length) {
      const visible = true;
      const message = "Address can't be empty";
      newError.address = { visible, message };
    }

    //validate phone
    if (phone.length) {
      if (!phone.match(/^[0-9]*$/g)) {
        const visible = true;
        const message = 'Invalid phone number';
        newError.phone = { visible, message };
      }
    } else {
      const visible = true;
      const message = "Phone number can't be empty";
      newError.phone = { visible, message };
    }
    setError(newError);

    //return
    for (let key in newError) {
      if (newError[key].visible === true) {
        passed = false;
        break;
      }
    }
    return passed;
  };
  const handleSendReq = () => {
    if (handleValidate()) {
      dispatch(
        handleUserAddReceiver('/auth/addReceiver', {
          id: user.id,
          receiver,
          address,
          phone,
        })
      );
      handleNo(false);
    }
  };

  return (
    <div className='fixed z-50 w-screen h-screen bg-black bg-opacity-40 top-0 left-0 text-center'>
      <div className='w-3/5 mx-auto mt-32 p-8 bg-white rounded-lg'>
        <p className='mb-3 text-4xl text-red-500 font-Raleway font-thin'>
          Add new receiver address
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendReq();
          }}
        >
          <div className='flex-1 px-5 text-xl'>
            <p>
              {error.receiver.visible ? <i>{error.receiver.message}</i> : <></>}
            </p>
            <div className='flex items-center mb-5'>
              <span
                className='w-28 text-right mr-5 pb-0.5 
            text-2xl italic text-gray-600'
              >
                Receiver:
              </span>
              <label className='relative flex-1'>
                <span className='inline-block w-full px-2 py-1 border border-transparent'>
                  <input
                    className='w-full px-2 py-1 border border-gray-400
                    focus:bg-blue-100 rounded outline-none focus:outline-none'
                    type='text'
                    value={receiver}
                    onChange={(e) => setReceiver(e.currentTarget.value)}
                  />
                </span>
              </label>
            </div>
            <p>
              {error.address.visible ? <i>{error.address.message}</i> : <></>}
            </p>
            <div className='flex items-center mb-5'>
              <span
                className='w-28 text-right mr-5 pb-0.5
             text-2xl italic text-gray-600'
              >
                Address:
              </span>
              <label className='relative flex-1'>
                <span className='inline-block w-full px-2 py-1 border border-transparent'>
                  <input
                    className='w-full px-2 py-1 border border-gray-400
                    focus:bg-blue-100 rounded outline-none focus:outline-none'
                    type='text'
                    value={address}
                    onChange={(e) => setAddress(e.currentTarget.value)}
                  />
                </span>
              </label>
            </div>

            <p>{error.phone.visible ? <i>{error.phone.message}</i> : <></>}</p>
            <div className='flex items-center mb-5'>
              <span
                className='w-28 text-right mr-5 pb-0.5
             text-2xl italic text-gray-600'
              >
                Phone:
              </span>
              <label className='relative flex-1'>
                <span className='inline-block w-full px-2 py-1 border border-transparent'>
                  <input
                    className='w-full px-2 py-1 border border-gray-400
                    focus:bg-blue-100 rounded outline-none focus:outline-none'
                    type='text'
                    value={phone}
                    onChange={(e) => setPhone(e.currentTarget.value)}
                  />
                </span>
              </label>
            </div>
          </div>
          <div className='flex'>
            <button
              type='submit'
              className='w-2/5 px-4 py-2 bg-red-500 text-white rounded-md border border-red-500 outline-none focus:outline-none'
            >
              YES
            </button>
            <button
              type='button'
              className='w-2/5 ml-auto  px-4 py-2 rounded-md border border-gray-400 outline-none focus:outline-none'
              onClick={() => {
                handleNo(false);
                emptyFeild();
              }}
            >
              NO
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewAddress;
