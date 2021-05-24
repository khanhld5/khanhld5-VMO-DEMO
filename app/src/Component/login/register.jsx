import React, { useEffect, useState } from 'react';
import LoginTemplate from './loginTemplate';
import { Link } from 'react-router-dom';
import history from '../../history.js';
import { useDispatch, useSelector } from 'react-redux';
import { handleUserRegister } from '../../State/actions/userAction';

const Login = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [focus, setFocus] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [error, setError] = useState({
    username: { visible: false, message: '' },
    password: { visible: false, message: '' },
    confirmPassword: { visible: false, message: '' },
    email: { visible: false, message: '' },
    fullname: { visible: false, message: '' },
    address: { visible: false, message: '' },
    cmt: { visible: false, message: '' },
    sdt: { visible: false, message: '' },
  });
  const [panigation, setPanigation] = useState(1);

  // data send
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullname, setFullname] = useState('');
  const [address, setAddress] = useState('');
  const [cmt, setCMT] = useState('');
  const [sdt, setSDT] = useState('');
  const [email, setEmail] = useState('');

  const handlePrev = (e) => {
    e.preventDefault();
    if (panigation === 2) {
      setPanigation(panigation - 1);
      setFocus([0, 0, 0, 0, 0, 0, 0, 0]);
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (panigation === 1) {
      setPanigation(panigation + 1);
      setFocus([0, 0, 0, 0, 0, 0, 0, 0]);
    }
  };

  const handleFocus = (pos) => {
    const newFocus = [...focus];
    newFocus[pos] = 1;
    setFocus(newFocus);
  };
  const handleBlur = (pos) => {
    const newFocus = [...focus];
    newFocus[pos] = 0;
    setFocus(newFocus);
  };
  const handleKeyPressEnter = (e) => {
    const newFocus = [...focus];

    if (e.code === 'Enter') {
      const page = e.currentTarget.childNodes[panigation - 1];
      const index = focus.findIndex((item) => item === 1);
      if (panigation === 1 && index === 3) {
        setPanigation(panigation + 1);
        const nextFocus =
          e.currentTarget.childNodes[1].childNodes[0].childNodes[1];
        nextFocus.focus();
        newFocus[index] = 0;
        newFocus[index + 1] = 1;
        setFocus(newFocus);
        return;
      }
      if (panigation === 2 && index === 7) {
        const curFocus = page.childNodes[index % 4].childNodes[1];
        curFocus.blur();
        newFocus[index] = 0;
        setFocus(newFocus);
        return;
      }
      if (index === -1) {
        handleRegister();
        return;
      }

      const nextFocus = page.childNodes[(index % 4) + 1].childNodes[1];
      nextFocus.focus();
      newFocus[index] = 0;
      newFocus[index + 1] = 1;
      setFocus(newFocus);
      return;
    }
  };

  const handleValidate = () => {
    const newError = {
      username: { visible: false, message: '' },
      password: { visible: false, message: '' },
      confirmPassword: { visible: false, message: '' },
      email: { visible: false, message: '' },
      fullname: { visible: false, message: '' },
      address: { visible: false, message: '' },
      cmt: { visible: false, message: '' },
      sdt: { visible: false, message: '' },
    };
    let passed = true;
    //validate username
    if (username.length) {
      if (!username.match(/^(?=.{8,30}$)[a-zA-Z0-9._]+$/g)) {
        const visible = true;
        const message =
          'Username must contains alphanumeric characters, underscore and dot and must be between 8 to 30 charecters';
        newError.username = { visible, message };
      } else if (
        !username.match(
          /^(?=.{8,30}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/g
        )
      ) {
        const visible = true;
        const message =
          "Username can't contain dot and underscore as the beginning or end, next to each orther and  multiple times in a row";
        newError.username = { visible, message };
      }
    } else {
      const visible = true;
      const message = "Username can't be empty";
      newError.username = { visible, message };
    }
    //validate password
    if (password.length) {
      if (
        !password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g)
      ) {
        const visible = true;
        const message =
          'Password must be atleast 8 characters, contain both digitcharacters, literal characters(at least one lowercase nor uppercase ) and might contain speacial characters ';
        newError.password = { visible, message };
      }
    } else {
      const visible = true;
      const message = "Password can't be empty";
      newError.password = { visible, message };
    }
    //validate confirm password
    if (password !== confirmPassword) {
      const visible = true;
      const message = "Password and Confirm password doesn't match";
      newError.confirmPassword = { visible, message };
    }
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
    //driect to error
    if (
      newError.username.visible ||
      newError.password.visible ||
      newError.confirmPassword.visible ||
      newError.email.visible
    ) {
      setPanigation(1);
    } else if (
      newError.fullname.visible ||
      newError.address.visible ||
      newError.cmt.visible ||
      newError.sdt.visible
    ) {
      setPanigation(2);
    }
    //return
    for (let key in newError) {
      if (newError[key].visible === true) {
        passed = false;
        break;
      }
    }
    return passed;
  };

  const handleRegister = () => {
    const dataSend = { username, password, email, fullname, address, cmt, sdt };
    if (handleValidate()) {
      dispatch(
        handleUserRegister('http://localhost:8080/auth/register', dataSend)
      );
    }
  };
  useEffect(() => {
    if (user.error && user.error.length) {
      setPanigation(1);
    }
    if (user.hasOwnProperty('access_token')) {
      const newError = {
        username: { visible: false, message: '' },
        password: { visible: false, message: '' },
        confirmPassword: { visible: false, message: '' },
        email: { visible: false, message: '' },
        fullname: { visible: false, message: '' },
        address: { visible: false, message: '' },
        cmt: { visible: false, message: '' },
        sdt: { visible: false, message: '' },
      };
      setError(newError);
      setUsername('');
      setPassword('');
      setConfirmPassword('');
      setFullname('');
      setAddress('');
      setCMT('');
      setSDT('');
      setEmail('');
      history.push('/');
    }
  }, [user]);

  return (
    <LoginTemplate title='register'>
      <form
        className='p-5 relative overflow-hidden'
        onSubmit={(e) => {
          e.preventDefault();
          handleRegister();
        }}
        onKeyPress={(e) => handleKeyPressEnter(e)}
      >
        <div className={`page ${panigation === 1 ? 'active' : ''}`}>
          <div>
            <p>
              {error.username.visible ? <i>{error.username.message}</i> : ''}
              {user.error && user.error.length ? (
                <div>
                  <i>{user.error}</i>
                </div>
              ) : (
                ''
              )}
            </p>
            <input
              className='w-full mb-5 px-2 py-1 rounded border border-gray-200 focus:outline-none'
              type='text'
              placeholder='Username'
              onChange={(e) => setUsername(e.currentTarget.value)}
              onFocus={() => handleFocus(0)}
              onBlur={() => handleBlur(0)}
              value={username}
            />
          </div>
          <div>
            <p>
              {error.password.visible ? <i>{error.password.message}</i> : ''}
            </p>
            <input
              className='w-full mb-5 px-2 py-1 rounded border border-gray-200 focus:outline-none'
              type='password'
              placeholder='Password'
              onChange={(e) => setPassword(e.currentTarget.value)}
              onFocus={() => handleFocus(1)}
              onBlur={() => handleBlur(1)}
              value={password}
            />
          </div>
          <div>
            <p>
              {error.confirmPassword.visible ? (
                <i>{error.confirmPassword.message}</i>
              ) : (
                ''
              )}
            </p>
            <input
              className='w-full mb-5 px-2 py-1 rounded border border-gray-200 focus:outline-none'
              type='password'
              placeholder='Confirm password'
              onChange={(e) => setConfirmPassword(e.currentTarget.value)}
              onFocus={() => handleFocus(2)}
              onBlur={() => handleBlur(2)}
              value={confirmPassword}
            />
          </div>
          <div>
            <p>{error.email.visible ? <i>{error.email.message}</i> : ''}</p>
            <input
              className='w-full mb-5 px-2 py-1 rounded border border-gray-200 focus:outline-none'
              type='text'
              placeholder='Email'
              onChange={(e) => setEmail(e.currentTarget.value)}
              onFocus={() => handleFocus(3)}
              onBlur={() => handleBlur(3)}
              value={email}
            />
          </div>
        </div>
        <div className={`page ${panigation === 2 ? 'active' : ''}`}>
          <div>
            <p>
              {error.fullname.visible ? <i>{error.fullname.message}</i> : ''}
            </p>
            <input
              className='w-full mb-5 px-2 py-1 rounded border border-gray-200 focus:outline-none'
              type='text'
              placeholder='Fullname'
              onChange={(e) => setFullname(e.currentTarget.value)}
              onFocus={() => handleFocus(4)}
              onBlur={() => handleBlur(4)}
              value={fullname}
            />
          </div>
          <div>
            <p>{error.address.visible ? <i>{error.address.message}</i> : ''}</p>
            <input
              className='w-full mb-5 px-2 py-1 rounded border border-gray-200 focus:outline-none'
              type='text'
              placeholder='Address'
              onChange={(e) => setAddress(e.currentTarget.value)}
              onFocus={() => handleFocus(5)}
              onBlur={() => handleBlur(5)}
              value={address}
            />
          </div>
          <div>
            {error.cmt.visible ? (
              <p>
                <i>{error.cmt.message}</i>
              </p>
            ) : (
              ''
            )}
            <input
              className='w-full mb-5 px-2 py-1 rounded border border-gray-200 focus:outline-none'
              type='text'
              placeholder='CMT'
              onChange={(e) => setCMT(e.currentTarget.value)}
              onFocus={() => handleFocus(6)}
              onBlur={() => handleBlur(6)}
              value={cmt}
            />
          </div>
          <div>
            <p>{error.sdt.visible ? <i>{error.sdt.message}</i> : ''}</p>
            <input
              className='w-full mb-5 px-2 py-1 rounded border border-gray-200 focus:outline-none'
              type='text'
              placeholder='Phone number'
              onChange={(e) => setSDT(e.currentTarget.value)}
              onFocus={() => handleFocus(7)}
              onBlur={() => handleBlur(7)}
              value={sdt}
            />
          </div>
        </div>
        <div className='flex mb-2'>
          <button
            onClick={(e) => handlePrev(e)}
            className={`w-full mr-5 bg-red-300 px-5 py-1 outline-none rounded 
              border border-red-400 uppercase text-white 
              text-lg font-medium focus:outline-none`}
            type='button'
          >
            {panigation === 2 ? 'Previous' : <Link to='/login'>Login</Link>}
          </button>
          <button
            onClick={panigation !== 2 ? (e) => handleNext(e) : () => {}}
            className={`w-full bg-green-500 px-5 py-1 outline-none rounded 
              border border-gray-400 uppercase text-white 
              text-lg font-medium focus:outline-none`}
            type={panigation === 2 ? 'submit' : 'button'}
          >
            {panigation !== 1 ? 'Register' : 'Next'}
          </button>
        </div>
      </form>
    </LoginTemplate>
  );
};

export default Login;
