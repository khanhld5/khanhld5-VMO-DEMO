import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import history from './history.js';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
  faShoppingCart,
  faCartArrowDown,
} from '@fortawesome/free-solid-svg-icons';
import {
  faFacebookSquare,
  faInstagram,
  faTwitterSquare,
} from '@fortawesome/free-brands-svg-icons';
import logo from './assets/image/logo.png';
import { handleCartDestroy, handleCartInit } from './State/actions/cartAction';
import Home from './Component/home/home';
import LoginTemplate from './Component/login/loginTemplate';
import Login from './Component/login/login';
import Register from './Component/login/register';
import Cart from './Component/cart/cart';
import Collection from './Component/collection/collection';
import ProductDetail from './Component/product-detail/productDetail';
import UserInfomation from './Component/userInfo/userInfomation';
import {
  handleUserInit,
  handleUserLogout,
} from './State/actions/userAction.js';
import CheckOut from './Component/checkout/checkout.jsx';

function App() {
  const dispatch = useDispatch();
  const header = useRef();
  const debounce = useRef(null);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [addToCartPopup, setAddToCartPopup] = useState(false);
  const [addToCartShake, setAddToCartShake] = useState(false);

  const [curCart, setCurCart] = useState(0);
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    setHeaderHeight(header.current.clientHeight);
    dispatch(handleCartInit());
  }, [user]);
  useEffect(() => {
    if (cart.hasOwnProperty('products')) {
      let count = 0;
      for (let item of cart.products) {
        count += item.quantity;
      }
      if (count === 1 && curCart === 0) {
        setAddToCartPopup(true);
        debounce.current = setTimeout(() => setAddToCartPopup(false), 3500);
        return;
      }
      if (count > curCart && curCart !== 0) {
        if (debounce.current) {
          clearTimeout(debounce.current);
        }
        setAddToCartPopup(true);
        setAddToCartShake(true);
        setTimeout(() => setAddToCartShake(false), 500);
        debounce.current = setTimeout(() => setAddToCartPopup(false), 3500);
      }
      setCurCart(count);
    }
  }, [cart]);

  return (
    <div className='App'>
      <Router history={history}>
        <header ref={header} className='shadow-md pb-5'>
          <nav className='nav mb-4 px-5 py-2'>
            <div className='container m-auto'>
              <ul className='flex items-center'>
                <li>
                  <Link
                    to='/'
                    className='btn inline-block px-3 rounded font-bold uppercase text-white text-lg'
                  >
                    Home
                  </Link>
                </li>
                <li className='ml-auto border-r-2 border-solid border-gray-100'>
                  <Link
                    to='/collection'
                    className='btn inline-block px-3 rounded font-bold uppercase text-white text-md'
                  >
                    Collection
                  </Link>
                </li>
                {Object.keys(user).length ? (
                  <li className='btn flex relative ml-3 px-3 py-0.5 rounded text-white select-none'>
                    <div className='wImage square w-7 rounded-full border border-gray-400'>
                      <span className='image cover'>
                        <img src={user.avatar} alt='avatar' />
                      </span>
                    </div>
                    <span
                      className='flex items-center ml-2 font-bold
                  uppercase text-md '
                    >
                      {user.username}
                    </span>
                    <ul
                      className='sub-nav w-content hidden absolute 
                    bg-gray-100 text-blue-400 rounded border border-gray-400'
                    >
                      <li className='whitespace-nowrap'>
                        <Link className='px-5 py-1' to='/userInfo'>
                          Profile
                        </Link>
                      </li>
                      <li className='whitespace-nowrap'>
                        <Link className='px-5 py-1' to='/userInfo/orderInfo'>
                          Order status
                        </Link>
                      </li>
                      <li className='whitespace-nowrap'>
                        <Link
                          className='px-5 py-1'
                          to='/userInfo/changePassword'
                        >
                          Change password
                        </Link>
                      </li>
                      <li>
                        <div
                          className='px-5 py-1 cursor-pointer'
                          onClick={() => {
                            dispatch(handleUserLogout());
                            dispatch(handleCartDestroy());
                          }}
                        >
                          Logout
                        </div>
                      </li>
                    </ul>
                  </li>
                ) : (
                  <li>
                    <Link
                      to='/login'
                      className='btn inline-block px-3 rounded font-bold uppercase text-white text-md'
                    >
                      login
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </nav>
          <div className='container m-auto'>
            <section id='search-bar' className='flex items-center'>
              <Link to='/' className='block px-3'>
                <img id='logo' src={logo} alt='logo' />
              </Link>
              <form
                style={{ borderColor: '#02f5f5' }}
                className='flex m-auto w-2/5 rounded-md border-2 border-solid'
              >
                <input
                  type='text'
                  placeholder='What on your mind ?'
                  className='block bg-transparent w-full px-4 py-2 outline-none text-xl text-gray-800 '
                />
                <button
                  style={{ margin: '2px', background: '#02f5f5' }}
                  type='submit'
                  className='inline-block px-3 outline-none rounded text-white text-2xl'
                >
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              </form>
              <Link
                to={Object.keys(user).length ? '/cart' : '/login'}
                style={{ color: '#02f5f5' }}
                className='block relative mr-3 px-3 text-3xl'
              >
                <FontAwesomeIcon icon={faShoppingCart} />
                <span
                  className={
                    cart.hasOwnProperty('products') &&
                    cart.products.length !== 0
                      ? `absolute w-6 h-6 -top-1.5 
                      left-8 p-0.5 text-center 
                      text-white align-bottom font-bold 
                      text-sm rounded-2xl bg-blue-400`
                      : `hidden`
                  }
                >
                  {cart.hasOwnProperty('products') &&
                  cart.products.length !== 0 ? (
                    cart.products.length
                  ) : (
                    <></>
                  )}
                </span>
              </Link>
            </section>
          </div>
        </header>
        <section id='body'>
          <Switch>
            <Route exact path='/'>
              <Home />
            </Route>
            <Route path='/collection'>
              <Collection />
            </Route>
            <Route path='/productDetail/:id'>
              <ProductDetail />
            </Route>
            {user.hasOwnProperty('access_token') ? (
              <>
                <Route path='/login'>
                  <Redirect to='/' />
                </Route>
                <Route path='/register'>
                  <Redirect to='/' />
                </Route>
                <Route path='/userInfo'>
                  <UserInfomation />
                </Route>
                <Route path='/cart'>
                  <Cart />
                </Route>
                <Route path='/checkout'>
                  <CheckOut />
                </Route>
              </>
            ) : (
              <>
                <Route path='/login'>
                  <LoginTemplate title='login' headerHeight={headerHeight}>
                    <Login />
                  </LoginTemplate>
                </Route>
                <Route path='/register'>
                  <LoginTemplate title='register' headerHeight={headerHeight}>
                    <Register />
                  </LoginTemplate>
                </Route>
              </>
            )}
          </Switch>
        </section>
        <footer className='pb-20'>
          <div className='nav'>
            <nav className='container m-auto py-2'>
              <ul className='flex'>
                <li>
                  <Link
                    to='/'
                    className='px-3 rounded font-bold uppercase text-white text-lg'
                  >
                    Home
                  </Link>
                </li>
                <li className='ml-auto'>
                  <Link
                    to='/collection'
                    className='btn px-3 rounded font-bold uppercase text-white text-md'
                  >
                    Collection
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          <section id='content'>
            <div className='container flex m-auto pt-5 px-3'>
              <div className='address w-1/5'>
                <p className='mb-2'>
                  <strong>VMO demo project</strong>
                </p>
                <p className='mb-2'>
                  Address: 8fl, IDMC Tower, Ton That Thuyet str, Hanoi, Vietnam.
                </p>
                <p className='mb-2'>
                  <strong>Contact</strong>
                </p>
                <p>
                  <em>Khanh Le Duy</em>
                </p>
                <p>0366203881</p>
              </div>
              <div className='about-us w-1/5 ml-auto pl-10'>
                <p>
                  <Link to='/' className='block'>
                    <img
                      id='logo'
                      className='w-36 float-left'
                      src={logo}
                      alt='logo'
                    />
                  </Link>
                  <strong>Bring you</strong> the greatest favor of variours
                  snack food that you surely keep calm and enjoy
                </p>
              </div>
              <div className='customer-service w-1/5 ml-auto pl-10'>
                <p className='mb-2'>
                  <strong>Customer services</strong>
                </p>
                <p className='text-2xl italic'>Be with us at any time</p>
                <p>
                  <em>24/7 services</em>
                </p>
                <p>
                  <b>02456723412</b>
                </p>
              </div>
              <div className='social-media w-1/5 ml-auto pl-10'>
                <p className='mb-2'>
                  <strong>Join with us on social media</strong>
                </p>
                <div className='flex w-4/5 m-auto'>
                  <a
                    className='block text-5xl'
                    href='https://www.facebook.com/le.khanh.357622/'
                  >
                    <FontAwesomeIcon icon={faFacebookSquare} />
                  </a>
                  <a
                    className='block text-5xl ml-5'
                    href='https://www.instagram.com/bot_khanh/'
                  >
                    <FontAwesomeIcon icon={faInstagram} />
                  </a>
                  <a
                    className='block text-5xl ml-5'
                    href='https://twitter.com/?lang=vi'
                  >
                    <FontAwesomeIcon icon={faTwitterSquare} />
                  </a>
                </div>
              </div>
            </div>
          </section>
        </footer>
      </Router>
      <div
        className={`pop-up ${
          addToCartPopup ? 'active' : ''
        } flex items-center fixed p-1.5 left-1/2 transform -translate-x-1/2 z-50 bg-blue-300
       rounded-3xl text-white font-semibold text-xl shadow-xl`}
      >
        <span className='pl-2'>
          Product has been successfully added to cart
        </span>
        <span className='w-9 h-9 ml-3 p-1 bg-white rounded-full'>
          <FontAwesomeIcon
            className={`${
              addToCartShake ? 'shake ' : ''
            }icon text-2xl text-blue-300`}
            icon={faCartArrowDown}
          />
        </span>
      </div>
    </div>
  );
}

export default App;
