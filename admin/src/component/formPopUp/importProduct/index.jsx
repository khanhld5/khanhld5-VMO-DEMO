import React, { useState } from 'react';
import axios_base from '../../../request/baseRequest';
import { InputNumber } from 'antd';
import { useDispatch } from 'react-redux';
import { handleCheckAdmin } from '../../../state/actions/adminAction';

const ImportProduct = (props) => {
  const dispatch = useDispatch();
  const { handleYes, handleNo, productId, title } = props;
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState({ visiable: false, message: '' });
  const handleSubmit = async () => {
    if (quantity === 0) {
      setError({
        visiable: true,
        message: 'Quantity cant be zero or lower than zero',
      });
      return;
    }
    const valid = await dispatch(handleCheckAdmin());
    if (valid === false) {
      return;
    }
    try {
      const res = await axios_base().patch('/admin/importProduct', {
        productId,
        quantity,
      });
      setError({ visiable: false, message: '' });
      handleYes(res.data);
      handleNo(false);
    } catch (err) {
      setError({ visiable: true, message: err.response.data.message });
    }
  };

  return (
    <div className='fixed z-50 w-screen h-screen bg-black bg-opacity-40 top-0 left-0 text-center'>
      <div className='w-2/5 mx-auto mt-72 p-8 bg-white rounded-lg'>
        <p className='mb-3 text-2xl italic text-red-500'>{title}</p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <p>{error.visiable ? <span>{error.message}</span> : ''}</p>
          <div>
            <InputNumber
              className=''
              min={1}
              precision={0}
              defaultValue={1}
              onChange={setQuantity}
            />
          </div>
          <div className='flex'>
            <button
              type='submit'
              className='w-2/5 px-4 py-2 bg-red-500 text-white rounded-md border border-red-500 outline-none focus:outline-none'
            >
              YES
            </button>
            <button
              type='button'
              className='w-2/5 ml-auto  px-4 py-2 rounded-md border border-gray-400 outline-none focus:outline-none'
              onClick={() => handleNo(false)}
            >
              NO
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ImportProduct;
