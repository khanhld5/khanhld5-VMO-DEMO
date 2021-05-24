import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <button className={className} style={{ ...style }} onClick={onClick}>
      <FontAwesomeIcon icon={faChevronRight} style={{ fontSize: '2em' }} />
    </button>
  );
};

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <button className={className} style={{ ...style }} onClick={onClick}>
      <FontAwesomeIcon icon={faChevronLeft} style={{ fontSize: '2em' }} />
    </button>
  );
};

const BannerContain = (props) => {
  const settings = {
    infinite: true,
    speed: 2000,
    autoplay: true,
    autoplaySpeed: 3500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipe: false,
    pauseOnHover: true,
    pauseOnFocus: true,
    lazyLoad: true,
    dots: true,
    cssEase: 'cubic-bezier(0.600, -0.280, 0.735, 0.045)',
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    customPaging: () => (
      <span className='border-circle'>
        <span className='inner-circle'></span>
      </span>
    ),
  };

  const { banners } = props;

  return (
    <section className='banner-contain mb-10'>
      <Slider {...settings}>
        {banners.length ? (
          banners.map((item) => (
            <div className='wImage' key={item.id}>
              <Link to='/' className='image cover'>
                <img src={item.image} alt='banner' />
              </Link>
            </div>
          ))
        ) : (
          <div className='wImage'>
            <Link to='/' className='image cover'>
              Loading...
            </Link>
          </div>
        )}
      </Slider>
    </section>
  );
};

export default BannerContain;
