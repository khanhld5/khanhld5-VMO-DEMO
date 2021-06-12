import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleUserChangePassword } from '../../State/actions/userAction';
import ActionConfirm from '../actionComfirm/actionComfirm';

const ChangePassword = (props) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [error, setError] = useState({
    oldPassword: { visible: false, message: '' },
    newPassword: { visible: false, message: '' },
    newPasswordConfirm: { visible: false, message: '' },
  });
  const [popup, setPopup] = useState(false);

  const [discardChange, setDiscardChange] = useState(false);

  // data send
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');

  const handleValidate = () => {
    const newError = {
      oldPassword: { visible: false, message: '' },
      newPassword: { visible: false, message: '' },
      newPasswordConfirm: { visible: false, message: '' },
    };
    let passed = true;
    //validate oldPassword
    if (!oldPassword.length) {
      const visible = true;
      const message = "Password can't be empty";
      newError.oldPassword = { visible, message };
    }
    //validate newPassword
    if (newPassword.length) {
      if (
        !newPassword.match(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g
        )
      ) {
        const visible = true;
        const message =
          'Password must be atleast 8 characters, contain both digitcharacters, literal characters(at least one lowercase nor uppercase ) and might contain speacial characters ';
        newError.newPassword = { visible, message };
      }
    } else {
      const visible = true;
      const message = "Password can't be empty";
      newError.newPassword = { visible, message };
    }
    //validate new password confirm
    if (newPassword !== newPasswordConfirm) {
      const visible = true;
      const message = "Password and Confirm password doesn't match";
      newError.newPasswordConfirm = { visible, message };
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

  const handleEditUserInfo = () => {
    if (handleValidate()) {
      setPopup(true);
    }
  };
  const handleSendReq = () => {
    dispatch(
      handleUserChangePassword('/auth/changePassword', {
        id: user.id,
        oldPassword,
        newPassword,
      })
    );
  };

  const handleEnableDiscard = (e) => {
    e.preventDefault();
    setDiscardChange(true);
  };

  const handleDiscardChange = () => {
    setOldPassword('');
    setNewPassword('');
    setNewPasswordConfirm('');
    setDiscardChange(false);
  };

  useEffect(() => {
    if (user.error) {
      const newError = {
        ...error,
        oldPassword: { visible: true, message: user.error },
      };
      setError(newError);
      return;
    }
    const newError = {
      ...error,
      oldPassword: { visible: false, message: '' },
    };
    setError(newError);
  }, [user.error]);

  useEffect(() => {
    setOldPassword('');
    setNewPassword('');
    setNewPasswordConfirm('');
  }, [user.access_token]);

  return (
    <div className='h-full px-6 py-3 rounded shadow-xl border border-gray-200'>
      <div className='flex pb-2 mb-5 border-b border-gray-200'>
        <div>
          <h2 className='mb-3 text-6xl text-blue-200 font-Pattaya'>
            Change password
          </h2>
          <h3 className='text-sm italic text-gray-400 font-Oxygen'>
            For security reason, please dont share your password
          </h3>
        </div>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleEditUserInfo();
        }}
        className='flex'
      >
        <div className='flex-1 px-5 text-lg'>
          <p className='text-center text-red-500'>
            {error.oldPassword.visible ? (
              <i>{error.oldPassword.message}</i>
            ) : (
              <></>
            )}
          </p>
          <div className='flex items-center mb-5'>
            <span
              className='w-2/5 text-right mr-5 pb-0.5 
            text-xl italic text-gray-600'
            >
              Old password:
            </span>
            <span className='inline-block w-full px-2 py-1 border border-transparent'>
              <input
                className='w-full px-2 py-1 border border-gray-400
                  focus:bg-blue-100 rounded outline-none focus:outline-none'
                type='password'
                value={oldPassword}
                onChange={(e) => setOldPassword(e.currentTarget.value)}
              />
            </span>
          </div>
          <p className='text-center text-red-500'>
            {error.newPassword.visible ? (
              <i>{error.newPassword.message}</i>
            ) : (
              <></>
            )}
          </p>
          <div className='flex items-center mb-5'>
            <span
              className='w-2/5 text-right mr-5 pb-0.5
             text-xl italic text-gray-600'
            >
              New password:
            </span>
            <span className='inline-block w-full px-2 py-1 border border-transparent'>
              <input
                className='w-full px-2 py-1 border border-gray-400
                    focus:bg-blue-100 rounded outline-none focus:outline-none'
                type='password'
                value={newPassword}
                onChange={(e) => setNewPassword(e.currentTarget.value)}
              />
            </span>
          </div>
          <p className='text-center text-red-500'>
            {error.newPasswordConfirm.visible ? (
              <i>{error.newPasswordConfirm.message}</i>
            ) : (
              <></>
            )}
          </p>
          <div className='flex items-center mb-5'>
            <span
              className='w-2/5 text-right mr-5 pb-0.5
             text-xl italic text-gray-600'
            >
              New password confirm:
            </span>
            <span className='inline-block w-full px-2 py-1 border border-transparent'>
              <input
                className='w-full px-2 py-1 border border-gray-400
                    focus:bg-blue-100 rounded outline-none focus:outline-none'
                type='password'
                value={newPasswordConfirm}
                onChange={(e) => setNewPasswordConfirm(e.currentTarget.value)}
              />
            </span>
          </div>

          <div className='h-10 text-center'>
            <button
              className='ml-20 px-4 py-1 rounded outline-none focus:outline-none
                 bg-purple-300 text-yellow-100
                  hover:bg-purple-400 transition-all 
                  ease-in-out duration-300 '
              type='submit'
            >
              Save
            </button>
            <button
              onClick={handleEnableDiscard}
              className='ml-24 px-4 py-1 rounded outline-none focus:outline-none
                 bg-yellow-100 text-blue-400
                  hover:bg-yellow-200 transition-all 
                  ease-in-out duration-300 '
              type='button'
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
      {popup ? (
        <ActionConfirm
          handleNo={setPopup}
          handleYes={handleSendReq}
          title='Do you want to save the change'
        />
      ) : (
        <></>
      )}
      {discardChange ? (
        <ActionConfirm
          handleNo={setDiscardChange}
          handleYes={handleDiscardChange}
          title='Do you want to discard all the change'
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default ChangePassword;
