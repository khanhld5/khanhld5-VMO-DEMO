import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import Title from './title';

const HomeListProduct = (props) => {
  const { className, title, children } = props;
  return (
    <section className={`list ${className}  mb-10`}>
      <Title>{title}</Title>
      {children}
      <div className='text-center'>
        <Link
          to='/collection'
          className='inline-block bg-gray-300 px-10 py-3 rounded text-white font-bold text-2xl align-middle hover:bg-gray-400 transition-all duration-200 hover:shadow-lg '
        >
          Xem Thêm
          <FontAwesomeIcon
            icon={faAngleDoubleRight}
            className='ml-3 align-middle'
          />
        </Link>
      </div>
    </section>
  );
};

export default HomeListProduct;
