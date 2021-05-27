import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../../Constant/constant';
import { Link, useHistory } from 'react-router-dom';
import { handleUserLogin } from '../../State/actions/userAction';
import { useDispatch, useSelector } from 'react-redux';

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.user);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = async () => {
    await dispatch(
      handleUserLogin(`${BASE_URL}/auth/login`, username, password)
    );
    setUsername('');
    setPassword('');
  };
  // useEffect(() => {
  //   if (user.hasOwnProperty('access_token')) {
  //     setUsername('');
  //     setPassword('');
  //     history.push('/');
  //   }
  // }, [user]);
  return (
    <form
      className='p-5'
      onSubmit={(e) => {
        e.preventDefault();
        handleLogin();
      }}
    >
      <div>
        {user.error && user.error.length ? (
          <div>
            <i>{user.error}</i>
          </div>
        ) : (
          <></>
        )}
        <input
          className='w-full mb-5 px-2 py-1 rounded border border-gray-200 focus:outline-none'
          type='text'
          placeholder='Username'
          onChange={(e) => setUsername(e.currentTarget.value)}
          required
          value={username}
        />
      </div>
      <div>
        <input
          className='w-full mb-5 px-2 py-1 rounded border border-gray-200 focus:outline-none'
          type='password'
          placeholder='Password'
          onChange={(e) => setPassword(e.currentTarget.value)}
          required
          value={password}
        />
      </div>
      <div className='mb-2'>
        <button
          className='w-full bg-green-500 px-5 py-1 outline-none rounded 
                    border border-gray-400 uppercase text-white text-lg font-medium'
          type='submit'
        >
          Login
        </button>
      </div>
      <div>
        <span className='inline-block mr-2'>New to us? </span>
        <Link
          className='inline-block italic text-blue-800 hover:underline'
          to='/register'
        >
          Register Now!
        </Link>
      </div>
    </form>
  );
};

export default Login;
