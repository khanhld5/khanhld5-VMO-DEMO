import React, { useState } from 'react';
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
import AddComment from './addComment/addComment';
const Order = (props) => {
  const { order } = props;
  const user = useSelector((state) => state.user);
  const [receivers, setReceivers] = useState(
    user.receivers.find((item) => item.id === order.user.receiverId)
  );
  const [comment, setComment] = useState(true);
  const statusRender = (status) => {
    switch (status) {
      case ORDER_SAVED:
        return 'Waiting for handle';
      case RECEIVE_ORDER:
        return 'Has been received';
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
    <div>
      <div className='order-head flex'>
        <p>
          <span>Receiver:</span>
          <span className='ml-2'>{receivers.receiver}</span>
          <span className='ml-4'>Location: </span>
          <span className='ml-2'>{receivers.address}</span>
        </p>
        <p className='ml-auto'>
          <span>Order Date:</span>
          <span> {moment(order.orderDate).format('DD-MM-YYYY')}</span>
        </p>
      </div>
      <div className='order-body'>
        {order.products.map((item) => (
          <Product key={item.id} product={item} />
        ))}
      </div>
      <div className='order-foot'>
        <p>
          <span>Status: </span>
          <span>{statusRender(order.status)}</span>
        </p>
        <p>
          <span>Total: </span>
          <span>
            {Intl.NumberFormat('vi-VI', {
              style: 'currency',
              currency: 'VND',
            }).format(order.total)}
          </span>
        </p>
        <div>
          <button onClick={() => setComment(true)}>Rate this product</button>
        </div>
      </div>
      {comment ? <AddComment handleNo={setComment} /> : <></>}
    </div>
  );
};

export default Order;
