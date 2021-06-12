import React, { useEffect, useState } from 'react';
import { Form, Input, InputNumber, Button, Select, message } from 'antd';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router';

import axios_base from '../../../request/baseRequest';
import ImageCtn from '../../../component/imageCtn';
import AddCategory from '../../../component/formPopUp/addCategory';
import { handleCheckAdmin } from '../../../state/actions/adminAction';
import produce from 'immer';

const { Option } = Select;

const AddProduct = (props) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();
  const [form] = Form.useForm();
  const [oldProduct, setOldProduct] = useState({});
  const [edit, setEdit] = useState(false);

  const [reload, setReload] = useState(false);
  const [loading, setLoading] = useState(false);
  const [addCategory, setAddCategory] = useState(false);
  const [image, setImage] = useState(
    'https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png'
  );

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

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.readAsDataURL(img);
    reader.onloadend = () => {
      callback(reader.result);
    };
  };

  const handleFileChange = (e) => {
    getBase64(e.currentTarget.files[0], setImage);
  };

  const formatData = (data) =>
    produce(data, (draft) => {
      delete draft.id;
      draft.price = parseInt(draft.price);
      draft.quantity = parseInt(draft.quantity);
      draft.left = parseInt(draft.quantity);
      draft.category = draft.category.map((cate) => cate.id);
      draft.description = draft.description
        .replace('<span>', '')
        .replace('</span>', '')
        .replace(/<br\/\>/g, '\n');
    });
  const formatDes = (des) => `<span>${des.replace(/\n/g, '<br/>')}</span>`;

  const compareOldNew = (oldData, newData) =>
    Object.keys(oldData).every(
      (item) => JSON.stringify(oldData[item]) === JSON.stringify(newData[item])
    );
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
    product.image = image;
    const newData = JSON.parse(JSON.stringify(product));
    product.description = formatDes(product.description || '');
    // setLoading(true);
    const valid = await dispatch(handleCheckAdmin());
    if (valid === false) return;
    try {
      setError({ visible: false, message: '' });
      let successMessage;
      if (edit) {
        const oldData = JSON.parse(JSON.stringify(formatData(oldProduct)));
        if (compareOldNew(oldData, newData)) {
          message.warning('You didnt change anything?');
          setLoading(false);
          return;
        }

        product.id = oldProduct.id;
        const res = await axios_base().patch('/admin/editProduct', {
          product,
        });
        successMessage = 'Product Edit Complete';
        message.success(successMessage);
      } else {
        const res = await axios_base().post('/admin/addProduct', { product });
        successMessage = 'Product Has Been Added Successfully';
        message.success(successMessage);
      }
      setTimeout(
        () => history.push({ pathname: '/dashboard/productsManage' }),
        1000
      );
      setSuccess({ visible: true, message: successMessage });
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
      setImage(location.state.data.image);
    }
  }, []);

  useEffect(() => {
    if (oldProduct.hasOwnProperty('id')) {
      const oldData = formatData(oldProduct);
      form.setFieldsValue({ ...oldData });
    }
  }, [oldProduct]);

  return (
    <div>
      <h1 className='text-3xl text-center mb-5'>
        {edit ? `Edit Product ${oldProduct.title}` : 'Add new Product'}
      </h1>

      <Form
        form={form}
        name={`${edit ? 'edit_product' : 'add_product'}`}
        onFinish={loading ? () => {} : handleSubmit}
        validateMessages={validateMessages}
      >
        <Form.Item
          name='title'
          label='Name'
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <div className='flex items-center' style={{ marginBottom: 24 }}>
          <p>Image: </p>
          <div className='flex items-center'>
            <ImageCtn
              className={'square rounded w-32 ml-3 shadow-md'}
              link={' '}
              notLink={true}
              src={image?.length ? image : oldProduct.image}
              alt={'this is product image'}
            />
            <div className='text-center ml-3'>
              <label
                style={{ fontFamily: "'Pattaya', sans-serif" }}
                className='inline-block m-auto px-3 py-1 rounded 
              bg-green-100 text-gray-700'
              >
                Choose image
                <input
                  type='file'
                  accept='image/png, image/jpeg'
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                />
              </label>
            </div>
          </div>
        </div>

        <div className='flex items-center' style={{ marginBottom: 24 }}>
          <Form.Item
            className='mb-0'
            name='price'
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
          name='quantity'
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
          name='left'
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
            name='category'
            label='Category'
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
          <Button type='primary' htmlType={loading ? 'button' : 'submit'}>
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
