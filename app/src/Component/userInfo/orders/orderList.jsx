import React from 'react';
import Order from './order';

const OrderList = (props) => {
  const { list } = props;
  return (
    <div>
      {list.map((item) => (
        <Order key={item.id} order={item} />
      ))}
    </div>
  );
};

export default OrderList;
