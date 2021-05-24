import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { handleUserChangeInfomation } from '../../State/actions/userAction';
import ActionConfirm from '../actionComfirm/actionComfirm';

const UserInfo = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const debounce = useRef(null);
  const [error, setError] = useState({
    email: { visible: false, message: '' },
    fullname: { visible: false, message: '' },
    address: { visible: false, message: '' },
    cmt: { visible: false, message: '' },
    sdt: { visible: false, message: '' },
  });
  const [popup, setPopup] = useState(false);
  const [alert, setAlert] = useState(false);
  const [edit, setEdit] = useState(false);
  const [discardChange, setDiscardChange] = useState(false);

  // data send
  const [fullname, setFullname] = useState('');
  const [address, setAddress] = useState('');
  const [cmt, setCMT] = useState('');
  const [sdt, setSDT] = useState('');
  const [email, setEmail] = useState('');

  const handleSetToDefault = () => {
    setFullname(user.fullname);
    setAddress(user.address);
    setCMT(user.cmt);
    setSDT(user.sdt);
    setEmail(user.email);
  };

  useEffect(() => {
    handleSetToDefault();
  }, [user]);

  const handleValidate = () => {
    const newError = {
      email: { visible: false, message: '' },
      fullname: { visible: false, message: '' },
      address: { visible: false, message: '' },
      cmt: { visible: false, message: '' },
      sdt: { visible: false, message: '' },
    };
    let passed = true;
    //validate email
    if (email.length) {
      if (!email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
        const visible = true;
        const message = 'Email is not valid';
        newError.email = { visible, message };
      }
    } else {
      const visible = true;
      const message = "Email can't be empty";
      newError.email = { visible, message };
    }
    //validate fullname
    if (fullname.length) {
      if (fullname.match(/[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~\d]/g)) {
        const visible = true;
        const message = "Fullname can't contain number or special ";
        newError.fullname = { visible, message };
      }
    } else {
      const visible = true;
      const message = "Fullname can't be empty";
      newError.fullname = { visible, message };
    }
    //validate address
    if (!address.length) {
      const visible = true;
      const message = "Address can't be empty";
      newError.address = { visible, message };
    }
    //validate cmt
    if (cmt.length) {
      if (!cmt.match(/^[0-9]*$/g)) {
        const visible = true;
        const message = 'Invalid CMT';
        newError.cmt = { visible, message };
      }
    } else {
      const visible = true;
      const message = "CMT can't be empty";
      newError.cmt = { visible, message };
    }
    //validate sdt
    if (sdt.length) {
      if (!sdt.match(/^[0-9]*$/g)) {
        const visible = true;
        const message = 'Invalid phone number';
        newError.sdt = { visible, message };
      }
    } else {
      const visible = true;
      const message = "Phone number can't be empty";
      newError.sdt = { visible, message };
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
  const handleCheckIfChange = () => {
    const payload = {
      fullname,
      address,
      cmt,
      sdt,
      email,
    };
    let passed = false;
    for (let item in payload) {
      if (user[item] !== payload[item]) {
        passed = true;
      }
    }
    return passed;
  };
  const handleEditUserInfo = () => {
    if (handleValidate()) {
      if (!handleCheckIfChange()) {
        if (debounce.current) {
          clearTimeout(debounce.current);
        }
        setAlert(true);

        debounce.current = setTimeout(() => setAlert(false), 3500);
        return;
      }
      setAlert(false);
      setPopup(true);
    }
  };
  const handleSendReq = () => {
    dispatch(
      handleUserChangeInfomation('/auth/editInfo', {
        id: user.id,
        fullname,
        address,
        cmt,
        sdt,
        email,
      })
    );
    setEdit(false);
  };

  const handleEnableEdit = () => {
    if (edit) {
      if (!handleCheckIfChange()) {
        setEdit(false);
        return;
      }
      setDiscardChange(true);
      return;
    }
    setEdit(true);
  };

  const handleEnableDiscard = (e) => {
    e.preventDefault();
    if (!handleCheckIfChange()) {
      setEdit(false);
      return;
    }
    setDiscardChange(true);
  };

  const handleDiscardChange = () => {
    setDiscardChange(false);
    setEdit(false);
    handleSetToDefault();
  };

  return (
    <div className='h-full px-6 py-3 rounded shadow-xl border border-gray-200'>
      <div className='flex pb-2 mb-5 border-b border-gray-200'>
        <div>
          <h2 className='mb-3 text-6xl text-blue-200 font-Pattaya'>
            My profile
          </h2>
          <h3 className='text-sm italic text-gray-400 font-Oxygen'>
            Manage your profile to secure your infomation
          </h3>
        </div>
        <div className='flex items-center ml-auto'>
          <button
            className='outline-none focus:outline-none align-middle 
            text-green-300 hover:text-green-400
             transition-all ease-in-out duration-300'
            type='button'
            onClick={handleEnableEdit}
          >
            <span
              style={{ fontFamily: "'Pattaya', sans-serif" }}
              className='text-2xl italic font-semibold'
            >
              Edit
            </span>
            <FontAwesomeIcon className='ml-3 text-3xl' icon={faEdit} />
          </button>
        </div>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleEditUserInfo();
        }}
        className='flex'
      >
        <div className='flex-1 px-5 text-xl'>
          <p>
            {error.fullname.visible ? <i>{error.fullname.message}</i> : <></>}
          </p>
          <div className='flex items-center mb-5'>
            <span
              className='w-28 text-right mr-5 pb-0.5 
            text-2xl italic text-gray-600'
            >
              Fullname:
            </span>
            <label className='relative flex-1'>
              <span className='inline-block w-full px-2 py-1 border border-transparent'>
                {user.fullname}
              </span>
              {edit ? (
                <input
                  className='w-full absolute px-2 py-1 left-0 top-0 border border-gray-400
                    focus:bg-blue-100 rounded outline-none focus:outline-none'
                  type='text'
                  value={fullname}
                  onChange={(e) => setFullname(e.currentTarget.value)}
                />
              ) : (
                <></>
              )}
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
                {user.address}
              </span>
              {edit ? (
                <input
                  className='w-full absolute px-2 py-1 left-0 top-0 border border-gray-400
                    focus:bg-blue-100 rounded outline-none focus:outline-none'
                  type='text'
                  value={address}
                  onChange={(e) => setAddress(e.currentTarget.value)}
                />
              ) : (
                <></>
              )}
            </label>
          </div>
          <p>{error.cmt.visible ? <i>{error.cmt.message}</i> : <></>}</p>
          <div className='flex items-center mb-5'>
            <span
              className='w-28 text-right mr-5 pb-0.5
             text-2xl italic text-gray-600'
            >
              CMT:
            </span>
            <label className='relative flex-1'>
              <span className='inline-block w-full px-2 py-1 border border-transparent'>
                {user.cmt}
              </span>
              {edit ? (
                <input
                  className='w-full absolute px-2 py-1 left-0 top-0 border border-gray-400
                    focus:bg-blue-100 rounded outline-none focus:outline-none'
                  type='text'
                  value={cmt}
                  onChange={(e) => setCMT(e.currentTarget.value)}
                />
              ) : (
                <></>
              )}
            </label>
          </div>
          <p>{error.sdt.visible ? <i>{error.sdt.message}</i> : <></>}</p>
          <div className='flex items-center mb-5'>
            <span
              className='w-28 text-right mr-5 pb-0.5
             text-2xl italic text-gray-600'
            >
              SDT:
            </span>
            <label className='relative flex-1'>
              <span className='inline-block w-full px-2 py-1 border border-transparent'>
                {user.sdt}
              </span>
              {edit ? (
                <input
                  className='w-full absolute px-2 py-1 left-0 top-0 border border-gray-400
                    focus:bg-blue-100 rounded outline-none focus:outline-none'
                  type='text'
                  value={sdt}
                  onChange={(e) => setSDT(e.currentTarget.value)}
                />
              ) : (
                <></>
              )}
            </label>
          </div>
          <p>{error.email.visible ? <i>{error.email.message}</i> : <></>}</p>
          <div className='flex items-center mb-5'>
            <span
              className='w-28 text-right mr-5 pb-0.5
            text-2xl italic text-gray-600'
            >
              Email:
            </span>
            <label className='relative flex-1'>
              <span className='inline-block w-full px-2 py-1 border border-transparent'>
                {user.email}
              </span>
              {edit ? (
                <input
                  className='w-full absolute px-2 py-1 left-0 top-0 border border-gray-400
                    focus:bg-blue-100 rounded outline-none focus:outline-none'
                  type='text'
                  value={email}
                  onChange={(e) => setEmail(e.currentTarget.value)}
                />
              ) : (
                <></>
              )}
            </label>
          </div>
          {edit ? (
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
          ) : (
            <div className='h-10'></div>
          )}
        </div>
        <div
          style={{ width: '28%' }}
          className='ml-5 py-3 self-start border-l border-gray-200'
        >
          <div className='m-auto w-1/2 wImage square rounded-full'>
            <span className='image cover'>
              <img src={user.avatar} alt={user.username} />
            </span>
          </div>
          <div className='text-center mt-3'>
            <label
              style={{ fontFamily: "'Pattaya', sans-serif" }}
              className='inline-block m-auto px-3 py-1 
            bg-green-100 rounded text-blue-300'
            >
              Choose image
              <input
                type='file'
                accept='image/png, image/jpeg'
                className='hidden'
              />
            </label>
          </div>
        </div>
      </form>
      <div
        className={`fixed px-5 py-2 ${
          alert ? 'top-24 ' : '-top-12 '
        }left-1/2 transform -translate-x-1/2 z-50 bg-blue-300
        rounded-3xl text-white font-semibold text-xl shadow-xl 
        transition-all ease-in-out duration-300`}
      >
        <p>Nothing had been change just yet</p>
      </div>
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

export default UserInfo;
