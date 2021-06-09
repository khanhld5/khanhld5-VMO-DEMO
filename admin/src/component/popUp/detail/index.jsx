import React from 'react';
import { Tooltip } from 'antd';
import {
  DELIVERED,
  DELIVER_ORDER,
  ORDER_SAVED,
  RATED,
  RECEIVE_ORDER,
} from '../../../constant';
import moment from 'moment';
import Product from './product';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';

const Detail = (props) => {
  const { data, onStatusChange, handleNo, title } = props;
  const user = data.user.user;
  const receiver = data.user.receiver;
  const statusRender = (status) => {
    switch (status) {
      case ORDER_SAVED:
        return 'Waiting for handle';
      case RECEIVE_ORDER:
        return 'Received';
      case DELIVER_ORDER:
        return 'Delivering';
      case DELIVERED:
        return 'Has been delivered';
      case RATED:
        return 'User Rated';
      default:
        return;
    }
  };
  return (
    <div className='fixed z-50 w-screen h-screen bg-black bg-opacity-40 top-0 left-0 text-center'>
      <div
        className='relative w-1/2 mx-auto top-1/2 transform -translate-y-1/2 mb-10 py-3 pb-7 
        rounded-b-3xl shadow-lg bg-yellow-50'
        style={{ maxHeight: '95vh' }}
      >
        <div
          className='order-head flex mb-3 px-5 pb-2 items-center border-b-4 
          border-gray-200'
        >
          <p className='text-4xl font-bold italic text-red-500'>{title}</p>
          <div className='ml-auto text-right'>
            <p className='text-right mb-1 pb-1 border-b border-gray-400'>
              <span
                className='inline-block mr-2 px-1 py-0.5 pb-0 rounded 
                bg-purple-600 text-white text-sm'
              >
                <span>Order Date:</span>
                <span className='ml-2'>
                  {moment(data.orderDate).format('DD-MM-YYYY')}
                </span>
              </span>
              <span
                className={`${
                  data?.deliveryDate ? 'bg-red-500' : 'bg-gray-400'
                } inline-block px-1 py-0.5 pb-0 rounded 
                 text-white text-sm`}
              >
                <span>Delivery Date:</span>
                <span className='ml-2'>
                  {data?.deliveryDate
                    ? moment(data.deliveryDate).format('DD-MM-YYYY')
                    : 'Not deliver just yet'}
                </span>
              </span>
            </p>
            <p>
              <span className='text-base text-gray-600'>Status: </span>
              <span
                className={`ml-2 font-Raleway px-2 py-0.5 font-light 
            text-white italic ${
              data.status === DELIVERED || data.status === RATED
                ? 'bg-red-300'
                : 'bg-gray-400'
            }`}
              >
                {statusRender(data.status)}
              </span>
            </p>
          </div>
        </div>
        <div className='order-des mb-3 px-5 pb-2 items-center border-b-4 border-gray-200'>
          <div className='flex text-left'>
            <p className=''>
              <span className='inline-block px-3 py-0.5 rounded bg-gray-400 text-white'>
                <span className='text-base'>User: </span>
                <span className='ml-2 font-Oxygen italic'>{user.username}</span>
              </span>
            </p>
            <p className='ml-3'>
              <span className='inline-block px-3 py-0.5 rounded bg-gray-400 text-white'>
                <span className=''>Name: </span>
                <span className='ml-2 font-Oxygen italic'>{user.fullname}</span>
              </span>
            </p>
            <p className='ml-3'>
              <span className='inline-block px-3 py-0.5 rounded bg-gray-400 text-white'>
                <span className=''>Phone: </span>
                <span className='ml-2 font-Oxygen italic'>{user.sdt}</span>
              </span>
            </p>
          </div>
        </div>
        <div className='order-body px-5 mb-3'>
          <div className='flex mb-2'>
            <p className=''>
              <span className='inline-block px-3 py-0.5 rounded bg-green-400 text-white'>
                <span className='text-base'>Receiver:</span>
                <span className='ml-2 font-Oxygen italic'>
                  {receiver.receiver}
                </span>
              </span>
            </p>
            <p className='ml-2'>
              <span className='inline-block px-3 py-0.5 rounded bg-green-400 text-white'>
                <span className='text-base'>Location: </span>
                <span className='ml-2 font-Oxygen capitalize italic'>
                  {receiver.address}
                </span>
              </span>
            </p>
            <p className='ml-auto'>
              <span className='inline-block px-3 py-0.5 rounded bg-green-400 text-white'>
                <span className='text-base'>Phone: </span>
                <span className='ml-2 font-Oxygen italic'>
                  {receiver.phone}
                </span>
              </span>
            </p>
          </div>
          <div
            className='product-ctn overflow-y-auto'
            style={{ maxHeight: '40vh' }}
          >
            {data.products.map((item) => (
              <Product
                key={item.productId}
                product={item}
                className='mx-5 py-3 border-b-4 border-dotted border-green-500'
              />
            ))}
          </div>
        </div>
        <div className='order-foot flex mb-2 px-5 items-center'>
          <p className='ml-auto pl-5'>
            <span className='text-xl text-red-500'>Total: </span>
            <span className='ml-2 text-3xl text-red-500 underline italic'>
              {Intl.NumberFormat('vi-VI', {
                style: 'currency',
                currency: 'VND',
              }).format(data.total)}
            </span>
          </p>
        </div>
        <div>
          {data.status !== DELIVERED && data.status !== RATED ? (
            <button
              type='button'
              className='px-20 py-1 bg-green-500 hover:bg-blue-400 
            text-white text-2xl rounded outline-none focus:outline-none 
            transition-all duration-300 ease-in-out'
              onClick={() => {
                onStatusChange(data.id, data.status);
              }}
            >
              Change status
              <FontAwesomeIcon
                className='ml-2 text-xl'
                icon={faAngleDoubleRight}
              />
            </button>
          ) : (
            <Tooltip title='Cant Change anymore' placement='top'>
              <button
                type='button'
                className='px-20 py-1 bg-gray-500 cursor-not-allowed
            text-white text-2xl rounded outline-none focus:outline-none'
              >
                Change status
                <FontAwesomeIcon
                  className='ml-2 text-xl'
                  icon={faAngleDoubleRight}
                />
              </button>
            </Tooltip>
          )}
        </div>

        <Tooltip title='Close' placement='bottomRight'>
          <button
            type='button'
            className='absolute -top-3 -right-3.5 w-7 h-7 p-0.5 rounded-full
          bg-red-500 hover:bg-red-600 font-bold text-white
           outline-none focus:outline-none '
            onClick={() => handleNo(false)}
          >
            X
          </button>
        </Tooltip>
      </div>
    </div>
  );
};

export default Detail;
