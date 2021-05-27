import React, { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { faCheckSquare as farCheckSquare } from '@fortawesome/free-regular-svg-icons';
import RemoveConfirm from './removeConfirm';
import Product from './cartProduct';

const CartTable = (props) => {
  const { shipping, checkout } = props;
  const cart = useSelector((state) => state.cart);
  const handleAddCheckFeild = () => {
    return cart.products.map((item) => ({
      check: false,
      ...item,
    }));
  };
  const [cartProducts, setCartProducts] = useState(handleAddCheckFeild());
  const [checkAll, setCheckAll] = useState(false);
  const [removeConfirm, setRemoveConfirm] = useState(false);

  useEffect(() => {
    let newCartProducts = [];
    if (cart.products && cart.products.length) {
      newCartProducts = handleAddCheckFeild();
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
    <>
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
          {cartProducts ? (
            cartProducts.map((item, index) => (
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
            ))
          ) : (
            <></>
          )}
        </tbody>
      </table>
      {shipping ? (
        <p className='mb-5 px-5 text-xl text-right text-gray-600 italic'>
          <span>Delivery fee: </span>{' '}
          <span className='text-red-600 ml-5 underline'>
            {Intl.NumberFormat('vi-VI', {
              style: 'currency',
              currency: 'VND',
            }).format(shipping)}
          </span>
        </p>
      ) : (
        <></>
      )}
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
            }).format(cart.total + shipping)}
          </span>
        </span>
        {checkout}
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
        <></>
      )}
    </>
  );
};

export default CartTable;
