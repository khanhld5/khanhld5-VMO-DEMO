import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare, faEdit } from '@fortawesome/free-solid-svg-icons';
import { faCheckSquare as farCheckSquare } from '@fortawesome/free-regular-svg-icons';
import RemoveConfirm from '../cart/removeConfirm';
import Product from '../cart/cartProduct';
import ActionConfirm from '../actionComfirm/actionComfirm';
import { handleCartCheckout } from '../../State/actions/cartAction';
import AddNewAddress from '../userInfo/addNewAddress';

const CheckOut = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const [cartProducts, setCartProducts] = useState([]);
  const [receiver, setReceiver] = useState('');
  const [checkAll, setCheckAll] = useState(false);
  const [removeConfirm, setRemoveConfirm] = useState(false);
  const [addReceiver, setAddReceiver] = useState(false);
  const [placeOrder, setPlaceOrder] = useState(false);

  useEffect(() => {
    let newCartProducts = [];
    if (cart.products && cart.products.length) {
      newCartProducts = cart.products.map((item) => ({
        check: false,
        ...item,
      }));
    }
    setCartProducts(newCartProducts);
  }, [cart]);

  useEffect(() => {
    if (user.receivers && user.receivers.length) {
      setReceiver(user.receivers[0].id);
    }
  }, [user]);

  const total = () => {
    if (cartProducts.length > 1) {
      let total = 0;
      for (let item of cartProducts) {
        total += item.product.price * item.quantity;
      }
      return total + 15000;
    }
    return cartProducts[0].product.price * cartProducts[0].quantity + 15000;
  };

  const handleCheck = (id) => {
    const newCartProducts = [...cartProducts];
    for (let item of newCartProducts) {
      if (item.product.id === id) {
        item.check = !item.check;
        break;
      }
    }
    setCartProducts(newCartProducts);
    if (newCartProducts.every((item) => item.check === true)) setCheckAll(true);
    else setCheckAll(false);
  };
  const handleCheckAll = () => {
    const newCartProducts = [...cartProducts];
    if (checkAll) {
      for (let item of newCartProducts) {
        item.check = false;
      }
    } else {
      for (let item of newCartProducts) {
        item.check = true;
      }
    }
    setCheckAll(!checkAll);
    setCartProducts(newCartProducts);
  };
  const handleRemoveAll = () => {
    if (cartProducts.some((item) => item.check)) setRemoveConfirm(true);
    return;
  };

  const handlePlaceOrder = async () => {
    const products = cart.products.map((item) => ({
      productId: item.product.id,
      quantity: item.quantity,
    }));
    await dispatch(
      handleCartCheckout('/auth/checkout', {
        userId: user.id,
        products,
        receiver,
        total: total(),
      })
    );
    history.push('/');
  };

  return (
    <>
      {Object.keys(user).length ? '' : <Redirect to='/login' />}
      {cartProducts && cartProducts.length ? (
        <section className='container m-auto px-10 pt-14 pb-24'>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setPlaceOrder(true);
            }}
          >
            <div className='w-full mb-10 px-5 py-2 bg-blue-50 shadow-xl rounded'>
              <h1 className='mb-4 text-8xl text-green-300 font-Pattaya underline'>
                Order
              </h1>
              <p className='mb-2 ml-5 text-2xl text-gray-500 font-Raleway'>
                <span className='font-semibold'>Delivery to: </span>
                <span className='ml-2 '>{user.username}</span>
              </p>
              <p className='mb-2 ml-5 text-xl text-gray-500 font-Raleway'>
                <span className='font-semibold'>
                  How could we deliver to you:{' '}
                </span>
                <span>
                  {user.receivers && user.receivers.length ? (
                    <select
                      className='bg-transparent italic'
                      value={receiver}
                      onChange={(e) => setReceiver(e.currentTarget.value)}
                    >
                      {user.receivers.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.receiver} {item.address}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <></>
                  )}
                </span>
                <span>
                  <button
                    type='button'
                    className='ml-2 hover:text-green-400 transition-all ease-in-out duration-300'
                    onClick={(e) => {
                      e.preventDefault();
                      setAddReceiver(true);
                    }}
                  >
                    <span>
                      {user.receivers && user.receivers.length
                        ? 'Add Receiver'
                        : 'You dont have any receiver just yet, pls create one'}
                    </span>
                    <FontAwesomeIcon className='ml-3 text-3xl' icon={faEdit} />
                  </button>
                </span>
              </p>
            </div>
            <table className={`w-full mb-10 bg-blue-50 shadow-xl rounded`}>
              <thead className='text-center'>
                <tr>
                  <th
                    className='px-5 py-2 text-green-500 text-2xl text-left border-b border-gray-300'
                    onClick={handleCheckAll}
                  >
                    {checkAll ? (
                      <FontAwesomeIcon icon={faCheckSquare} />
                    ) : (
                      <FontAwesomeIcon icon={farCheckSquare} />
                    )}
                  </th>
                  <th className='px-3 py-2 text-left border-b border-gray-300'>
                    Product
                  </th>
                  <th className='px-3 py-2 border-b border-gray-300'>Price</th>
                  <th className='px-3 py-2 border-b border-gray-300'>
                    Quantity
                  </th>
                  <th className='px-3 py-2 border-b border-gray-300'>Total</th>
                  <th className='px-3 py-2 border-b border-gray-300'>Remove</th>
                </tr>
              </thead>
              <tbody>
                {cartProducts.map((item, index) => (
                  <tr className='text-center' key={item.product.id}>
                    <Product
                      item={item}
                      border={
                        index === cartProducts.length - 1
                          ? ''
                          : 'border-b border-gray-300'
                      }
                      handleCheck={handleCheck}
                    />
                  </tr>
                ))}
              </tbody>
            </table>
            <p className='mb-5 px-5 text-xl text-right text-gray-600 italic'>
              <span>Delivery fee: </span>{' '}
              <span className='text-red-600 ml-5 underline'>
                {Intl.NumberFormat('vi-VI', {
                  style: 'currency',
                  currency: 'VND',
                }).format(15000)}
              </span>
            </p>
            <div className='flex items-center px-5 py-2 bg-blue-50 shadow-xl rounded mb-20'>
              <span
                className='select-none cursor-pointer text-green-500 text-2xl'
                onClick={handleCheckAll}
              >
                {checkAll ? (
                  <FontAwesomeIcon icon={faCheckSquare} />
                ) : (
                  <FontAwesomeIcon icon={farCheckSquare} />
                )}
                <span className='capitalize'>Select all</span>
              </span>
              <span
                onClick={handleRemoveAll}
                className='inline-block ml-3 mt-1 select-none cursor-pointer hover:text-red-500 hover:underline'
              >
                Remove
              </span>
              <span className='inline-block ml-auto'>
                Total:
                <span className='text-red-400 text-xl ml-1.5'>
                  {Intl.NumberFormat('vi-VI', {
                    style: 'currency',
                    currency: 'VND',
                  }).format(total())}
                </span>
              </span>
              <button
                type='submit'
                className='inline-block ml-5 px-3 py-2 bg-green-400 
            hover:bg-green-300 rounded text-xl text-white'
              >
                Place Order
              </button>
            </div>
          </form>
          {removeConfirm ? (
            <RemoveConfirm
              productId={cartProducts
                .filter((item) => item.check)
                .map((item) => item.product.id)}
              productTitle='All selected products'
              handleNo={setRemoveConfirm}
            />
          ) : (
            <></>
          )}
          {placeOrder ? (
            <ActionConfirm
              title='Do you want to place order now?'
              handleYes={handlePlaceOrder}
              handleNo={setPlaceOrder}
            />
          ) : (
            <></>
          )}
          {addReceiver ? <AddNewAddress handleNo={setAddReceiver} /> : <></>}
        </section>
      ) : (
        <></>
      )}
    </>
  );
};

export default CheckOut;
