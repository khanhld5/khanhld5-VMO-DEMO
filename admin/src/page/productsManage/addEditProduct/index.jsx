import React, { useEffect, useState } from 'react';
import { Form, Input, InputNumber, Button, Select } from 'antd';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router';

import axios_base from '../../../request/baseRequest';
import AddCategory from '../../../component/formPopUp/addCategory';
import { handleCheckAdmin } from '../../../state/actions/adminAction';

const { Option } = Select;

const AddProduct = (props) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [oldProduct, setOldProduct] = useState({});
  const [edit, setEdit] = useState(false);

  const [reload, setReload] = useState(false);
  const [loading, setLoading] = useState(false);
  const [addCategory, setAddCategory] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [categories, setCategories] = useState([]);
  const [success, setSuccess] = useState({ visible: false, message: '' });
  const [error, setError] = useState({ visible: false, message: '' });

  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
      url: '${label} must be an url',
      number: '${label} is not a valid number!',
      array: '${label} must have at least one item',
    },
    number: {
      range: '${label} must be greater than ${min}',
    },
  };
  const handleGetListCategory = async () => {
    try {
      const res = await axios_base().get('/categories?_sort=title&_order=asc');
      setError({ visible: false, message: '' });
      setCategories(res.data);
    } catch (err) {
      setError({ visible: true, message: err.response.data.message });
    }
  };

  const handleSubmit = async (product) => {
    setLoading(true);
    product.description = `<span>${product.description.replace(
      /\n/g,
      '<br/>'
    )}</span>`;
    const valid = await dispatch(handleCheckAdmin());
    if (valid === false) return;
    try {
      setError({ visible: false, message: '' });
      let message;
      if (edit) {
        const res = await axios_base().post('/admin/editPrroduct', { product });
        message = 'Product Edit Complete';
      } else {
        const res = await axios_base().post('/admin/addProduct', { product });
        message = 'Product Has Been Added Successfully';
      }
      setSuccess({ visible: true, message });
    } catch (err) {
      setError({ visible: true, message: err.response.data.message });
    }
  };
  useEffect(() => {
    handleGetListCategory();
  }, [reload]);
  useEffect(() => {
    if (location?.state?.data) {
      setEdit(true);
      setOldProduct(location.state.data);
    }
  }, []);

  return (
    <div>
      <h1 className='text-3xl text-center mb-5'>
        {edit ? `Edit Product ${oldProduct.title}` : 'Add new Product'}
      </h1>
      <Form onFinish={handleSubmit} validateMessages={validateMessages}>
        <Form.Item
          name={['title']}
          label='Name'
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={['image']}
          label='Image'
          rules={[
            {
              type: 'url',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <div className='flex items-center' style={{ marginBottom: 24 }}>
          <Form.Item
            className='mb-0'
            name={['price']}
            label='Price'
            rules={[
              {
                required: true,
                type: 'number',
                min: 0,
              },
            ]}
          >
            <InputNumber
              className='w-full'
              precision={0}
              max={Number.MAX_SAFE_INTEGER}
            />
          </Form.Item>
          <p className='ml-2'>
            <span className='text-red-600 underline italic'>Vnđ</span>
          </p>
        </div>
        <Form.Item
          name={['quantity']}
          label='Quantity'
          initialValue={0}
          rules={[
            {
              type: 'number',
              min: 0,
            },
          ]}
        >
          <InputNumber
            precision={0}
            value={quantity}
            onChange={(value) => {
              setQuantity(value);
            }}
          />
        </Form.Item>
        <Form.Item
          name={['left']}
          label='Left'
          initialValue={0}
          rules={[
            {
              type: 'number',
              min: 0,
            },
          ]}
        >
          <InputNumber precision={0} max={quantity} />
        </Form.Item>
        <div className='flex items-center' style={{ marginBottom: 24 }}>
          <Form.Item
            className='flex-1 mb-0'
            name={['categories']}
            label='Categories'
            rules={[
              {
                required: true,
                type: 'array',
              },
            ]}
          >
            <Select mode='multiple' placeholder='Select at least one category'>
              {categories.length ? (
                categories.map((cate) => (
                  <Option key={cate.id} value={cate.id}>
                    {cate.title}
                  </Option>
                ))
              ) : (
                <></>
              )}
            </Select>
          </Form.Item>
          <div className='ml-2'>
            <button
              className='inline-block px-2 py-1 bg-blue-400 hover:bg-blue-600 text-white whitespace-nowrap rounded'
              type='button'
              onClick={(e) => {
                e.preventDefault();
                setAddCategory(true);
              }}
            >
              Add Category
            </button>
          </div>
        </div>

        <Form.Item
          name={['brand']}
          label='Brand'
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={['origin']}
          label='Origin'
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name={['description']} label='Description'>
          <Input.TextArea autoSize />
        </Form.Item>
        <Form.Item className='text-center'>
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
      </Form>
      {addCategory ? (
        <AddCategory
          handleNo={setAddCategory}
          onReload={setReload}
          title='Add Category'
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default AddProduct;
