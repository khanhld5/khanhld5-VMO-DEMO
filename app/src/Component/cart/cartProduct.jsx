import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  handleCartDecreaseQuantity,
  handleCartIncreaseQuantity,
} from '../../State/actions/cartAction';
import RemoveConfirm from './removeConfirm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { faCheckSquare as farCheckSquare } from '@fortawesome/free-regular-svg-icons';

const Product = (props) => {
  const dispatch = useDispatch();
  const { item, border, handleCheck } = props;
  const [removeConfirm, setRemoveConfirm] = useState(false);
  const handleIncreaseQuantity = () => {
    if (item.product.left === 0) return;
    if (item.quantity === item.product.left) return;
    dispatch(handleCartIncreaseQuantity(item.product.id));
  };
  const handleDecreaseQuantity = () => {
    if (item.product.left === 0) return;
    if (item.quantity === 1) setRemoveConfirm(true);
    else dispatch(handleCartDecreaseQuantity(item.product.id));
  };
  return (
    <>
      <td
        className={`px-5 py-2 text-left select-none cursor-pointer text-green-500 text-2xl ${border}`}
        onClick={() => handleCheck(item.product.id)}
      >
        {item.check ? (
          <FontAwesomeIcon icon={faCheckSquare} />
        ) : (
          <FontAwesomeIcon icon={farCheckSquare} />
        )}
      </td>
      <td className={`px-3 py-2 ${border}`}>
        <div className='flex items-center'>
          <div className='w-24 my-3 wImage square rounded border border-gray-400'>
            <span className='image cover'>
              <img src={item.product.image} alt={item.product.title} />
            </span>
          </div>
          <p className='ml-5'>{item.product.title}</p>
        </div>
      </td>
      <td className={`px-3 py-2 ${border}`}>
        {Intl.NumberFormat('vi-VI', {
          style: 'currency',
          currency: 'VND',
        }).format(item.product.price)}
      </td>
      <td className={`px-3 py-2 ${border}`}>
        <span className='inline-block rounded-md border border-gray-200 ml-2'>
          <button
            onClick={(e) => {
              e.preventDefault();
              handleDecreaseQuantity();
            }}
            className={`bg-gray-100 w-10 px-3 py-1 rounded-l-md focus:outline-none border-r ${
              item.product.left === 0
                ? 'text-gray-400'
                : 'text-gray-800 hover:bg-blue-100'
            }`}
          >
            -
          </button>
          <span
            className={`px-5 select-none ${
              item.product.left === 0 ? 'text-gray-400' : 'text-gray-800'
            }`}
          >
            {item.quantity}
          </span>
          <button
            onClick={(e) => {
              e.preventDefault();
              handleIncreaseQuantity();
            }}
            className={`bg-gray-100 w-10 px-3 py-1 rounded-r-md  focus:outline-none border-l ${
              item.product.left === 0
                ? 'text-gray-400'
                : 'text-gray-800 hover:bg-blue-100'
            }`}
          >
            +
          </button>
        </span>
      </td>
      <td className={`px-3 py-2 ${border}`}>
        {Intl.NumberFormat('vi-VI', {
          style: 'currency',
          currency: 'VND',
        }).format(item.product.price * item.quantity)}
      </td>
      <td className={`px-3 py-2 ${border}`}>
        <button
          type='button'
          onClick={(e) => {
            e.preventDefault();
            setRemoveConfirm(true);
          }}
          className='italic text-red-500 hover:underline outline-none focus:outline-none'
        >
          Remove
        </button>
        {removeConfirm ? (
          <RemoveConfirm
            productId={[item.product.id]}
            productTitle={item.product.title}
            handleNo={setRemoveConfirm}
          />
        ) : (
          <></>
        )}
      </td>
    </>
  );
};

export default Product;
