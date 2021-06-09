import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import axios_base from '../../../request/baseRequest';
import { useDispatch } from 'react-redux';
import { handleCheckAdmin } from '../../../state/actions/adminAction';

const { Option } = Select;

const AddCategory = (props) => {
  const dispatch = useDispatch();
  const { handleNo, productId, productCategories, onChange } = props;
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('');
  const [addNewCategory, setAddNewCategory] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState({ visible: false, message: '' });

  const handleSelectChange = (value) => {
    setCategory(value);
  };

  const handleGetListCategory = async () => {
    try {
      const res = await axios_base().get('/categories');
      setError({ visible: false, message: '' });

      setCategories(filterAvaiCate(res.data));
    } catch (err) {
      setError({ visible: true, message: err.response.data.message });
    }
  };

  const filterAvaiCate = (categories) => {
    const availCategory = categories.filter((item) => {
      let avail = true;
      productCategories.forEach((ele) => {
        if (ele.id === item.id) {
          avail = false;
        }
      });
      return avail;
    });
    return availCategory;
  };

  const handleAddCateForProduct = async () => {
    const valid = await dispatch(handleCheckAdmin());
    if (valid === false) {
      return;
    }
    try {
      const res = await axios_base().post('/admin/addProductCategory', {
        productId,
        categoryId: category,
      });
      setError({ visible: false, message: '' });

      setNewCategory('');
      setSuccess(res.data.message);
      onChange(res.data.product);
      setTimeout(() => {
        handleNo(false);
      }, 1000);
    } catch (err) {
      console.log(err.response.data.message);
      setError({ visible: true, message: err.response.data.message });
    }
  };
  const handleAddNewCategory = async () => {
    const valid = await dispatch(handleCheckAdmin());
    if (valid === false) {
      return;
    }
    try {
      const res = await axios_base().post('/admin/addCategory', {
        title: newCategory,
      });
      setCategories(filterAvaiCate(res.data.categories));
      setError({ visible: false, message: '' });

      setNewCategory('');
    } catch (err) {
      setError({ visible: true, message: err.response.data.message });
    }
  };

  useEffect(() => {
    handleGetListCategory();
  }, []);
  return (
    <div className='fixed z-50 w-screen h-screen bg-black bg-opacity-40 top-0 left-0 text-center transition-all duration-300'>
      <div className='w-3/5 mx-auto mt-32 p-8 bg-white rounded-lg'>
        <p className='mb-3 text-4xl text-red-500 font-Raleway font-thin'>
          Add Category
        </p>
        <p className='mb-1 text-red-400 transition-all duration-300'>
          {success.length ? <span>{success}</span> : <></>}
        </p>
        <p className='mb-1 text-red-400 transition-all duration-300'>
          {error ? <span>{error.message}</span> : <></>}
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddCateForProduct();
          }}
        >
          <div className='flex px-5 mb-10 text-xl justify-center'>
            <Select
              className='w-1/2'
              showSearch
              placeholder='Select a category'
              optionFilterProp='children'
              onChange={handleSelectChange}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {categories.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.title}
                </Option>
              ))}
            </Select>
            <div className='ml-2'>
              <button
                className='px-2 py-0.5 bg-gray-100 hover:bg-green-100 rounded-md'
                type='button'
                onClick={(e) => {
                  e.preventDefault();
                  setAddNewCategory(!addNewCategory);
                }}
              >
                New
              </button>
            </div>
          </div>

          {addNewCategory ? (
            <div>
              <p className='text-red-400'>{error.message}</p>
              <div className='flex mb-5 justify-center'>
                <input
                  className='mr-2 px-2 py-0.5 w-1/4 text-xl bg-green-50 rounded outline-none focus:bg-green-200'
                  type='text'
                  onFocus={() => setError({ ...error, visible: false })}
                  onChange={(e) => setNewCategory(e.currentTarget.value)}
                  value={newCategory}
                  placeholder='New category'
                />
                <button
                  className='bg-blue-300 hover:bg-blue-500 text-white px-2 py-0.5 rounded-md'
                  type='button'
                  onClick={(e) => {
                    e.preventDefault();
                    handleAddNewCategory();
                  }}
                >
                  Add
                </button>
              </div>
            </div>
          ) : (
            <></>
          )}
          <div className='flex'>
            <button
              type='submit'
              className='w-2/5 px-4 py-2 bg-red-500 text-white rounded-md border border-red-500 outline-none focus:outline-none'
            >
              ADD
            </button>
            <button
              type='button'
              className='w-2/5 ml-auto  px-4 py-2 rounded-md border border-gray-400 outline-none focus:outline-none'
              onClick={() => {
                handleNo(false);
              }}
            >
              CANCLE
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
