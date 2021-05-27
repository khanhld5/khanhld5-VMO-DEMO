import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { handleUserRemoveReceiver } from '../../../State/actions/userAction';
import ActionConfirm from '../../actionComfirm/actionComfirm';
import AddNewAddress from './addNewAddress';

const ReceiveInfo = (props) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [popup, setPopup] = useState(false);
  const [addNew, setAddNew] = useState(false);

  const handleRemoveReceiver = (id) => {
    dispatch(
      handleUserRemoveReceiver('/auth/removeReceiver', { userId: user.id, id })
    );
  };

  return (
    <div className='h-full px-6 py-3 rounded shadow-xl border border-gray-200'>
      <div className='flex pb-2 mb-5 border-b border-gray-200'>
        <div>
          <h2 className='mb-3 text-6xl text-blue-200 font-Pattaya'>
            Receive address
          </h2>
          <h3 className='text-sm italic text-gray-400 font-Oxygen'>
            Tell us where to go, we will be there for you!
          </h3>
        </div>
        <div className='flex items-center ml-auto'>
          <button
            className='outline-none focus:outline-none align-middle 
            text-green-300 hover:text-green-400
             transition-all ease-in-out duration-300'
            type='button'
            onClick={() => setAddNew(true)}
          >
            <span className='text-lg italic font-semibold font-Raleway'>
              New address
            </span>
            <FontAwesomeIcon className='ml-3 text-3xl' icon={faEdit} />
          </button>
        </div>
      </div>

      <div>
        <table className={`w-full mb-10 bg-blue-50 shadow-xl rounded`}>
          <thead className='text-center'>
            <tr>
              <th className='px-3 py-2 border-b border-gray-300'>Address</th>
              <th className='px-3 py-2 border-b border-gray-300'>Receiver</th>
              <th className='px-3 py-2 border-b border-gray-300'>
                Phone number
              </th>
              <th className='px-3 py-2 border-b border-gray-300'>Remove</th>
            </tr>
          </thead>
          <tbody>
            {user.receivers && user.receivers.length ? (
              user.receivers.map((item) => (
                <tr className='text-center' key={item.id}>
                  <td className='px-3 py-2'>{item.address}</td>
                  <td className='px-3 py-2'>{item.receiver}</td>
                  <td className='px-3 py-2'>{item.phone}</td>
                  <td className='px-3 py-2'>
                    <button
                      onClick={() => handleRemoveReceiver(item.id)}
                      className='italic text-red-500 hover:underline outline-none focus:outline-none'
                      type='button'
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className='px-3 py-2 text-center'>
                  <button
                    className='outline-none focus:outline-none align-middle 
            text-gray-400 hover:text-blue-400
             transition-all ease-in-out duration-300'
                    type='button'
                    onClick={() => setAddNew(true)}
                  >
                    <span className='text-sm'>Not Thing just yet ?</span> <br />
                    <span className='text-lg italic font-semibold font-Raleway'>
                      Add new address
                    </span>
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {popup ? (
        <ActionConfirm
          handleNo={setPopup}
          // handleYes={handleSendReq}
          title='Do you want to remove this address'
        />
      ) : (
        <></>
      )}
      {addNew ? <AddNewAddress handleNo={setAddNew} /> : <></>}
    </div>
  );
};

export default ReceiveInfo;
