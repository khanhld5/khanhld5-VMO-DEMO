import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useSelector } from 'react-redux';
import {
  ORDER_SAVED,
  RECEIVE_ORDER,
  DELIVER_ORDER,
  DELIVERED,
  RATED,
} from '../../../Constant/constant';
import Product from './product';
const Order = (props) => {
  const { order } = props;
  const user = useSelector((state) => state.user);
  const [receivers, setReceivers] = useState(
    user.receivers.find((item) => item.id === order.user.receiverId)
  );
  const [comment, setComment] = useState(false);
  const statusRender = (status) => {
    switch (status) {
      case ORDER_SAVED:
        return 'Waiting for handle';
      case RECEIVE_ORDER:
        return 'Shop has received your order';
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
  useEffect(() => {
    switch (order.status) {
      case DELIVERED:
        setComment(true);
        break;
      default:
        setComment(false);
        break;
    }
  }, []);

  return (
    <div className='mb-10 py-3 pb-7 rounded-b-3xl shadow-lg bg-yellow-50 '>
      <div className='order-head mb-3 px-5 pb-2 flex items-center border-b-4 border-gray-200'>
        <p className='px-3 py-0.5 rounded-lg bg-green-400 text-white'>
          <span className='text-xl'>Receiver:</span>
          <span className='ml-2 font-Oxygen italic'>{receivers.receiver}</span>
        </p>
        <p className='ml-4 px-3 py-0.5 rounded-lg bg-green-400 text-white'>
          <span className='text-xl'>Location: </span>
          <span className='ml-2 font-Oxygen capitalize italic'>
            {receivers.address}
          </span>
        </p>
        <p className='ml-auto px-3 py-0.5 rounded-lg bg-purple-600 text-white'>
          <span>Order Date:</span>
          <span className='ml-2'>
            {moment(order.orderDate).format('DD-MM-YYYY')}
          </span>
        </p>
      </div>
      <div className='order-body px-5 mb-3'>
        {order.products.map((item) => (
          <Product
            key={item.productId}
            product={item}
            commentAble={comment}
            className='mx-5 py-3 border-b-4 border-dotted border-green-500'
          />
        ))}
      </div>
      <div className='order-foot flex px-5'>
        <p className=''>
          <span className='text-xl text-gray-600'>Status: </span>
          <span
            className={`ml-2 font-Raleway px-2 py-0.5 font-light 
            text-white italic ${
              order.status === DELIVERED || order.status === RATED
                ? 'bg-red-300'
                : 'bg-gray-400'
            }`}
          >
            {statusRender(order.status)}
          </span>
        </p>
        <p className='ml-auto pl-5'>
          <span className='text-xl text-red-500'>Total: </span>
          <span className='ml-2 text-3xl text-red-500 underline italic'>
            {Intl.NumberFormat('vi-VI', {
              style: 'currency',
              currency: 'VND',
            }).format(order.total)}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Order;
