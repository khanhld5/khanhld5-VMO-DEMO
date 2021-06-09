import React from 'react';

const Product = (props) => {
  const { product, className } = props;

  return (
    <div className={`${className} flex items-center`}>
      <div className='w-16 wImage square rounded-tr-xl rounded-bl-xl shadow-md'>
        <span className='image cover'>
          <img src={product.image} alt={product.title} />
        </span>
      </div>
      <div className='ml-5 font-Raleway text-gray-600'>
        <p>
          <span>{product.title}</span>
        </p>
        <p>
          <span className='inline-block px-1 py-0 align-middle font-bold text-white bg-blue-400 rounded-md'>
            <span>X</span>
            <span className='inline-block ml-1 transform rotate-12'>
              {product.quantity}
            </span>
          </span>
        </p>
      </div>
      <div className='ml-auto pl-2 text-right'>
        <p className='text-red-600 font-Raleway'>
          <span>
            {Intl.NumberFormat('vi-VI', {
              style: 'currency',
              currency: 'VND',
            }).format(product.price)}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Product;
