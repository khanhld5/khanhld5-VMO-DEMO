import React, { useEffect, useRef, useState } from 'react';
import { debounce } from 'debounce';
import { Link } from 'react-router-dom';
import logo from '../../assets/image/logo-black.png';
import shopDes from '../../assets/image/img-shop-description.png';
import '../../assets/css/login.css';

const LoginTemplate = (props) => {
  const { title, children, headerHeight } = props;
  const [templateHeight, setTemplateHeight] = useState(0);
  const template = useRef();
  useEffect(() => {
    const handleResize = debounce(
      () => setTemplateHeight(template?.current?.clientHeight - headerHeight),
      50
    );
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  });
  return (
    <>
      <div style={{ height: templateHeight }} className='w-full h-screen'></div>
      <section ref={template} className='login absolute w-full top-0 right-0'>
        <div className='container flex m-auto p-5 pb-20'>
          <Link to='/' className='inline-block px-3'>
            <img id='logo' src={logo} alt='logo' />
          </Link>
          <h1 className='flex items-center'>
            <span className='text-3xl font-bold underline capitalize'>
              {title}
            </span>
          </h1>
        </div>
        <div className='login-form mb-32'>
          <div className='container flex m-auto p-5'>
            <aside className='w-1/3 ml-5'>
              <div className='wImage square'>
                <div className='image cover'>
                  <img src={shopDes} alt='shop now' />
                </div>
              </div>
            </aside>
            <aside className='form-ctn text-center w-1/3 ml-auto rounded-xl'>
              <h2 className='w-full text-4xl font-bold mt-10 mb-5 capitalize'>
                {title}
              </h2>
              {children}
            </aside>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginTemplate;
