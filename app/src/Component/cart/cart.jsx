import React from 'react';
import { useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import CartTable from './cartTable';
import cartEmpty from '../../assets/image/cart-empty.jpg';

const Cart = (props) => {
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  return (
    <div>
      {Object.keys(user).length ? '' : <Redirect to='/login' />}
      {cart.products && cart.products.length ? (
        <section className='container m-auto px-10 pt-14 pb-24'>
          <CartTable
            shipping={0}
            checkout={
              <Link
                to='/checkout'
                className='inline-block ml-5 px-3 py-2 bg-green-400 
            hover:bg-green-300 rounded text-xl text-white'
              >
                Place Order
              </Link>
            }
          />
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
