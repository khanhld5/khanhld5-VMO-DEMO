import { Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import axios_base from '../../../request/baseRequest';
import { handleCheckAdmin } from '../../../state/actions/adminAction';

const AddProduct = (props) => {
  const dispatch = useDispatch();
  const { className, handleNo, onReload, title, oldData } = props;

  const [loading, setLoading] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [success, setSuccess] = useState({ visible: false, message: '' });
  const [error, setError] = useState({ visible: false, message: '' });

  const handleOnNo = () => {
    handleNo(false);
    setNewCategory('');
    setError({ visible: false, message: '' });
    setSuccess({ visible: true, message: '' });
  };

  const handleAddNewCategory = async () => {
    setLoading(true);
    const valid = await dispatch(handleCheckAdmin());
    if (valid === false) {
      return;
    }
    try {
      setError({ visible: false, message: '' });
      let res;
      if (oldData?.hasOwnProperty('id')) {
        res = await axios_base().patch('/admin/editCategory', {
          id: oldData.id,
          title: newCategory,
        });
      } else {
        res = await axios_base().post('/admin/addCategory', {
          title: newCategory,
        });
      }
      setSuccess({ visible: true, message: res.data.message });
      onReload(true);
      setTimeout(() => {
        handleOnNo();
        onReload(false);
      }, 800);
    } catch (err) {
      setError({ visible: true, message: err.response.data.message });
    }
  };

  useEffect(() => {
    if (oldData) setNewCategory(oldData.title);
  }, []);

  return (
    <div className='fixed z-50 w-screen h-screen bg-black bg-opacity-40 top-0 left-0 text-center transition-all duration-300'>
      <div
        className={`${className} relative w-3/5 mx-auto mt-32 p-8 bg-white rounded-lg`}
      >
        <p className='mb-3 text-4xl text-red-500 font-Raleway font-thin'>
          {title}
        </p>
        {error.visible ? (
          <p className='text-red-400 mb-2'>{error.message}</p>
        ) : (
          <></>
        )}
        {success.visible ? (
          <p className='text-red-400 mb-2'>{success.message}</p>
        ) : (
          <></>
        )}
        <Tooltip title='Cancel' placement='bottomRight'>
          <button
            type='button'
            className='absolute -top-3 -right-3.5 w-7 h-7 p-0.5 rounded-full
          bg-red-500 hover:bg-red-600 font-bold text-white
           outline-none focus:outline-none '
            onClick={handleOnNo}
          >
            X
          </button>
        </Tooltip>
        <form
          className='flex mb-5 justify-center'
          onSubmit={(e) => {
            e.preventDefault();
            if (!loading) handleAddNewCategory();
          }}
        >
          <label className='flex items-center'>
            <span className='text-lg mr-4'>Name:</span>
            <input
              className='mr-2 px-2 py-0.5 w-full text-xl bg-green-50 rounded outline-none focus:bg-green-200'
              type='text'
              onFocus={() => setError({ ...error, visible: false })}
              onChange={(e) => setNewCategory(e.currentTarget.value)}
              value={newCategory}
              placeholder='New category'
            />
          </label>
          <button
            className={`bg-blue-300 hover:bg-blue-500 
            text-white px-2 py-0.5 rounded-md ${
              loading ? 'cursor-not-allowed' : ''
            }`}
            type='submit'
          >
            {oldData ? 'Edit' : 'Add'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
