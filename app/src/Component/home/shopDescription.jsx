import React from 'react';
import imageDes from '../../assets/image/img-shop-description.png';
import '../../assets/css/shopDescription.css';

const ShopDescription = (props) => {
  return (
    <section className='shop-description relative overflow-hidden flex py-10 shadow-inner'>
      <h5
        style={{ color: '#19456b' }}
        className='title w-2/5 px-14 py-16 font-bold select-none'
      >
        <span className='first block relative text-8xl'>Keep calm</span>
        <span className='second block relative mt-16 text-center text-4xl'>
          with
        </span>
        <span className='last block relative mt-10 text-right text-7xl'>
          Food & drink
        </span>
      </h5>
      <div className='bg-introduce w-3/5 py-24'>
        <div className='wImage square w-96 rounded transform translate-x-1/3'>
          <span className='image cover'>
            <img src={imageDes} alt='our shop' />
          </span>
        </div>
      </div>
    </section>
  );
};

export default ShopDescription;
