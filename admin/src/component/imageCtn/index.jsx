import React from 'react';
import './index.css';

const ImageCtn = (props) => {
  const { className, link, src, alt, notLink } = props;
  return (
    <div className={`wImage ${className}`}>
      {notLink ? (
        <span className='image cover'>
          <img src={src} alt={alt} />
        </span>
      ) : (
        <a href={link} className='image cover'>
          <img src={src} alt={alt} />
        </a>
      )}
    </div>
  );
};

export default ImageCtn;
