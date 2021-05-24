import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { handleCartAddProduct } from '../../State/actions/cartAction';
import {
  faEye,
  faShoppingCart,
  faCartPlus,
} from '@fortawesome/free-solid-svg-icons';
import { faEye as faEyeRegular } from '@fortawesome/free-regular-svg-icons';
import '../../assets/css/product.css';

const Product = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { item, itemWidth, marginRight } = props;
  const [hoverDetail, setHoverDetail] = useState(false);
  const [hoverCart, setHoverCart] = useState(false);
  const handleAddToCart = () => {
    if (Object.keys(user).length) {
      dispatch(handleCartAddProduct(item, 1));
    }
  };

  return (
    <div
      className='item mb-12 relative self-start rounded-tl-sm rounded-tr-2xl rounded-br-sm rounded-bl-3xl hover:shadow-xl'
      style={{ width: `${itemWidth}%`, marginRight: marginRight }}
    >
      <div className='wImage rounded-tr-2xl rounded-tl-sm'>
        <Link to={`/productDetail/${item.id}`} className='image cover'>
          <img src={item.image} alt={item.title} />
        </Link>
      </div>
      <div className='itemTitle text-center text-white rounded-bl-3xl rounded-br-sm'>
        <div className='btn-contain flex py-4 border-b-4 border-dotted border-gray-50'>
          <Link
            to={`/productDetail/${item.id}`}
            className='inline-block btn text-2xl w-12 h-12 text-center align-middle m-auto p-1 rounded-full'
            onMouseEnter={() => setHoverDetail(true)}
            onMouseLeave={() => setHoverDetail(false)}
          >
            <FontAwesomeIcon
              className='w-full h-full'
              icon={hoverDetail ? faEye : faEyeRegular}
            />
          </Link>
          <button
            className='inline-block btn w-12 h-12 text-2xl text-center 
            align-middle m-auto p-1 rounded-full outline-none focus:outline-none'
            onMouseEnter={() => setHoverCart(true)}
            onMouseLeave={() => setHoverCart(false)}
            onClick={handleAddToCart}
          >
            <FontAwesomeIcon
              style={{ transform: 'translateX(-2px)' }}
              className='w-full h-full'
              icon={hoverCart ? faCartPlus : faShoppingCart}
            />
          </button>
        </div>
        <h4 className='font-bold italic text-2xl'>
          <Link to={`/productDetail/${item.id}`} className='block px-3 py-3'>
            {item.title}
          </Link>
        </h4>
        <p>
          <Link to={`/productDetail/${item.id}`} className='block px-3 pb-3'>
            {Intl.NumberFormat('vi-VI', {
              style: 'currency',
              currency: 'VND',
            }).format(item.price)}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Product;
