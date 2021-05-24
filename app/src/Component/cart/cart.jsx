import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { faCheckSquare as farCheckSquare } from '@fortawesome/free-regular-svg-icons';
import cartEmpty from '../../assets/image/cart-empty.jpg';
import RemoveConfirm from './removeConfirm';
import Product from './cartProduct';

const Cart = (props) => {
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const [cartProducts, setCartProducts] = useState([]);
  const [checkAll, setCheckAll] = useState(false);
  const [removeConfirm, setRemoveConfirm] = useState(false);

  const total = () => {
    if (cartProducts.length > 1) {
      let total = 0;
      for (let item of cartProducts) {
        total += item.product.price * item.quantity;
      }
      return total;
    }

    return cartProducts[0].product.price * cartProducts[0].quantity;
  };
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
  return (
    <div>
      {Object.keys(user).length ? '' : <Redirect to='/login' />}
      {cartProducts.length ? (
        <section className='container m-auto px-10 pt-14 pb-24'>
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
                <th className='px-3 py-2 border-b border-gray-300'>Quantity</th>
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
            <Link
              to='/checkout'
              className='inline-block ml-5 px-3 py-2 bg-green-400 
            hover:bg-green-300 rounded text-xl text-white'
            >
              Place Order
            </Link>
          </div>
          {removeConfirm ? (
            <RemoveConfirm
              productId={cartProducts
                .filter((item) => item.check)
                .map((item) => item.product.id)}
              productTitle='All selected products'
              handleNo={setRemoveConfirm}
            />
          ) : (
            ''
          )}
        </section>
      ) : (
        <section className='container m-auto px-10 pt-12 pb-24 text-center select-none'>
          <p className='mb-5 text-6xl font-bold'>Opps!</p>
          <p className='mb-10 text-3xl italic underline'>
            Look like your cart is empty
          </p>
          <div className='w-1/3 m-auto wImage square rounded-full border-8 border-green-200 hover:border-green-500 hover:shadow-2xl transition-all duration-200'>
            <span className='image cover'>
              <img src={cartEmpty} alt='cart empty' />
              <Link
                className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                inline-block px-4 py-2 bg-green-400 text-white text-xl font-semibold
               rounded shadow-2xl opacity-80 hover:opacity-100'
                to='/'
              >
                Shopping Now!
              </Link>
            </span>
          </div>
        </section>
      )}
    </div>
  );
};

export default Cart;
