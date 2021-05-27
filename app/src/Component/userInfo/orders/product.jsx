import React from 'react';

const Product = (props) => {
  const { product } = props;
  return (
    <div className='flex px-5 py-2'>
      <div className='w-16 wImage square'>
        <span className='image cover'>
          <img src={product.image} alt={product.title} />
        </span>
      </div>
      <div className='ml-2'>
        <p>
          <span>{product.title}</span>
        </p>
        <p>
          <span>X</span>
          <span>{product.quantity}</span>
        </p>
      </div>
      <div className='ml-auto pl-2'>
        <p>
          <span>{product.price}</span>
        </p>
      </div>
    </div>
  );
};

export default Product;
