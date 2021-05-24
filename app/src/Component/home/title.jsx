import React from 'react';
import '../../assets/css/title.css';

const Title = (props) => {
  const { children } = props;
  return (
    <h3 className='title flex items-center uppercase font-bold text-5xl mb-10'>
      {children}
    </h3>
  );
};

export default Title;
