import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleUserGetOrders } from '../../../State/actions/userAction';
import OrderList from './orderList';

const OrderInfo = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(handleUserGetOrders('/auth/orders'));
  }, []);
  return (
    <div>
      <OrderList list={user.orders} />
    </div>
  );
};

export default OrderInfo;
