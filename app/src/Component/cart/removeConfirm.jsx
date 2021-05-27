import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { handleCartRemoveProduct } from '../../State/actions/cartAction';

const RemoveConfirm = (props) => {
  const { productId, productTitle, handleNo } = props;
  const cart = useSelector((state) => state.cart);
  const history = useHistory();
  const dispatch = useDispatch();
  const [yes, setYes] = useState(false);
  const handleYes = () => {
    dispatch(handleCartRemoveProduct(productId));
    setYes(true);
  };
  useEffect(() => {
    if (yes) {
      if (cart.products && cart.products.length) {
        handleNo(false);
        return;
      }
      history.push('/');
    }
  }, [yes]);
  return (
    <div className='fixed z-50 w-screen h-screen bg-black bg-opacity-40 top-0 left-0 text-center'>
      <div className='w-2/5 mx-auto mt-72 p-8 bg-white rounded-lg'>
        <p className='mb-3 text-2xl italic text-red-500'>
          Are you actually want to remove this product?
        </p>
        <p className='mb-10 text-lg'>{productTitle}</p>
        <div className='flex'>
          <button
            type='button'
            className='w-2/5 px-4 py-2 bg-red-500 text-white rounded-md border border-red-500 outline-none focus:outline-none'
            onClick={(e) => {
              e.preventDefault();
              handleYes();
            }}
          >
            YES
          </button>
          <button
            type='button'
            className='w-2/5 ml-auto  px-4 py-2 rounded-md border border-gray-400 outline-none focus:outline-none'
            onClick={(e) => {
              e.preventDefault();
              handleNo(false);
            }}
          >
            NO
          </button>
        </div>
      </div>
    </div>
  );
};

export default RemoveConfirm;
