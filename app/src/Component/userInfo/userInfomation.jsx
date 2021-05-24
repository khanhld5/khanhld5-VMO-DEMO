import React, { useEffect, useState } from 'react';
import {
  Route,
  Switch,
  useHistory,
  useLocation,
  useRouteMatch,
} from 'react-router';
import { Link } from 'react-router-dom';
import ReceiveInfo from './receiveInfo';
import OrderInfo from './orderInfo';
import ChangePassword from './changePassword';
import UserInfo from './userInfo';
import { useSelector } from 'react-redux';

const UserInfomation = (props) => {
  const user = useSelector((state) => state.user);
  const location = useLocation();
  const history = useHistory();

  let { path, url } = useRouteMatch();
  const [currentRoute, setCurrentRoute] = useState('');

  const currentLocation = () => {
    const locateArr = location.pathname.split('/');
    const pathSplit = path.split('/');
    for (let i = 0; i < locateArr.length; i++) {
      if (locateArr[i] === pathSplit[pathSplit.length - 1]) {
        if (locateArr[i + 1]) {
          setCurrentRoute(locateArr[i + 1]);
          break;
        }
        setCurrentRoute('');
        break;
      }
    }
  };
  useEffect(() => {
    currentLocation();
  }, [location]);

  useEffect(() => {
    if (user.access_token) return;
    history.push('/login');
  }, [user]);

  return (
    <section className='bg-green-50'>
      <div className='flex container m-auto pt-10 pb-10 justify-center'>
        <aside className='w-1/5 px-3 py-4'>
          <div className='flex mb-5'>
            <div className='w-14 self-start wImage square rounded-full border border-gray-400'>
              <span className='image cover'>
                <img src={user.avatar} alt='avatar' />
              </span>
            </div>
            <div className='ml-5 flex-1'>
              <span
                style={{ fontFamily: "'Raleway', sans-serif" }}
                className='flex items-center
                text-2xl text-blue-300'
              >
                @{user.username}
              </span>
              <span className='inline-block ml-10 text-gray-400 italic text-md'>
                Profile
              </span>
            </div>
          </div>
          <ul className='text-xl text-gray-500 font-Raleway '>
            <li
              className={`${
                currentRoute === ''
                  ? 'bg-yellow-200 text-purple-400 pl-4 py-1 '
                  : ''
              }rounded-l-2xl pr-2 mb-2 transition-all ease-in-out duration-300`}
            >
              <Link to={`${url}`}>My Profile</Link>
            </li>
            <li
              className={`${
                currentRoute === 'receiveInfo'
                  ? 'bg-yellow-200 text-purple-400 pl-4 py-1 '
                  : ''
              }rounded-l-2xl pr-2 mb-2 transition-all ease-in-out duration-300`}
            >
              <Link to={`${url}/receiveInfo`}>Receive address</Link>
            </li>
            <li
              className={`${
                currentRoute === 'orderInfo'
                  ? 'bg-yellow-200 text-purple-400 pl-4 py-1 '
                  : ''
              }rounded-l-2xl pr-2 mb-2 transition-all ease-in-out duration-300`}
            >
              <Link to={`${url}/orderInfo`}>Order status</Link>
            </li>
            <li
              className={`${
                currentRoute === 'changePassword'
                  ? 'bg-yellow-200 text-purple-400 pl-4 py-1 '
                  : ''
              }rounded-l-2xl pr-2 mb-2 transition-all ease-in-out duration-300`}
            >
              <Link to={`${url}/changePassword`}>Change password</Link>
            </li>
          </ul>
        </aside>
        <aside style={{ minHeight: '50vh' }} className='w-2/3'>
          <Switch>
            <Route exact path={path}>
              <UserInfo />
            </Route>
            <Route path={`${path}/receiveInfo`}>
              <ReceiveInfo />
            </Route>
            <Route path={`${path}/orderInfo`}>
              <OrderInfo />
            </Route>
            <Route path={`${path}/changePassword`}>
              <ChangePassword />
            </Route>
          </Switch>
        </aside>
      </div>
    </section>
  );
};

export default UserInfomation;
