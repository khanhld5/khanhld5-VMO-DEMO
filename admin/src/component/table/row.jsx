import React, { useEffect, useState } from 'react';
import axios_base from '../../request/baseRequest';
import { DELIVERED, RATED } from '../../constant';
import { Link } from 'react-router-dom';
import { Tooltip } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleDoubleRight,
  faEdit,
  faEye,
  faPlus,
  faUpload,
} from '@fortawesome/free-solid-svg-icons';

import AddCategory from '../formPopUp/addCateForProduct';
import ActionConfirm from '../actionConfirm';
import ImportProduct from '../formPopUp/importProduct';
import ImageCtn from '../imageCtn';
import moment from 'moment';

const Row = (props) => {
  const {
    index,
    rowData,
    thead,
    edit,
    renderEdit,
    renderDetail,
    onRemove,
    onReload,
    onStatusChange,
  } = props;
  const [confirmRemove, setConfirmRemove] = useState(false);
  const [addCategory, setAddCategory] = useState(false);
  const [removeCategory, setRemoveCategory] = useState(false);
  const [editCategory, setEditCategory] = useState(false);
  const [importProduct, setImportProduct] = useState(false);
  const [detail, setDetail] = useState(false);
  const [error, setError] = useState({ visiable: false, message: '' });
  const [data, setData] = useState(rowData);

  const editLocation = {
    pathname: edit ? `${edit}/${data.title}` : '',
    state: {
      data,
    },
  };
  const cellStyle = `${
    index % 2 !== 0 ? 'bg-gray-100 ' : ''
  }p-1 text-center font-Oxygen text-base border border-green-400 border-solid`;

  const handleRemoveCategory = async (categoryId) => {
    try {
      const res = await axios_base().delete('admin/removeProductCategory', {
        data: { categoryId, productId: data.id },
      });
      setError({ visiable: false, message: '' });
      // console.log(res.data);
      setData(res.data.product);
    } catch (err) {
      setError({ visiable: true, message: err.response.data.message });
    }
  };

  useEffect(() => {
    setData(rowData);
  }, [rowData]);

  return (
    <tr>
      {data && Object.keys(data).length
        ? thead.map((title) => {
            switch (title) {
              case 'No':
                return (
                  <td
                    key={`${data.id}_No${index + 1}`}
                    className={`${cellStyle}`}
                  >
                    {index + 1}
                  </td>
                );
              case 'id':
                return;

              case 'price':
                return (
                  <td key={`${data.id}_${title}`} className={`${cellStyle}`}>
                    {Intl.NumberFormat('vi-VI', {
                      style: 'currency',
                      currency: 'VND',
                    }).format(data[title])}
                  </td>
                );
              case 'category':
                return (
                  <td key={`${data.id}_${title}`} className={`${cellStyle}`}>
                    {data[title].length
                      ? data[title].map((ele, index) => (
                          <span
                            className='inline-block mb-1'
                            key={`${ele.id}_${data.id}`}
                          >
                            <Tooltip
                              title='Remove'
                              placement={`${
                                index === 0
                                  ? 'bottomLeft'
                                  : index === data[title].length - 1
                                  ? 'bottomRight'
                                  : 'bottom'
                              }`}
                            >
                              <button
                                onClick={() => setRemoveCategory(true)}
                                className={`inline-block px-1 py-0.5 ${
                                  index === data[title].length - 1
                                    ? ''
                                    : 'mr-2 '
                                }bg-green-300 text-white rounded-md cursor-pointer hover:line-through hover:bg-red-500 transition-all duration-200 ease-in `}
                              >
                                {ele.title}
                              </button>
                            </Tooltip>
                            {removeCategory ? (
                              <ActionConfirm
                                handleNo={setRemoveCategory}
                                handleYes={() => handleRemoveCategory(ele.id)}
                                title={`Do you want to remove this category from current product?`}
                              />
                            ) : (
                              <></>
                            )}
                          </span>
                        ))
                      : 'Not Classify'}
                    <button
                      onClick={() => setAddCategory(true)}
                      className='ml-2 px-1.5 py-0.5 rounded-md bg-red-300 hover:bg-red-600 text-white'
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                    {addCategory ? (
                      <AddCategory
                        handleNo={setAddCategory}
                        productId={data.id}
                        productCategories={data.category}
                        onChange={setData}
                      />
                    ) : (
                      <></>
                    )}
                  </td>
                );
              case 'image':
                return (
                  <td key={`${data.id}_${title}`} className={`${cellStyle}`}>
                    <ImageCtn
                      className={'square rounded w-12 mx-auto'}
                      notLink={true}
                      src={data[title]}
                      alt={data.title}
                    />
                  </td>
                );
              case 'user':
                return (
                  <td key={`${data.id}_${title}`} className={`${cellStyle}`}>
                    {data.user.user.username}
                  </td>
                );
              case 'address':
                return (
                  <td key={`${data.id}_${title}`} className={`${cellStyle}`}>
                    <div className='w-4/5 mx-auto'>
                      <p className='flex py-0.5 text-left border-b border-gray-400'>
                        Receiver:
                        <span className='block ml-auto italic'>
                          {data.user.receiver.receiver}
                        </span>
                      </p>
                      <p className='flex py-0.5 text-left border-b border-gray-400'>
                        Address:
                        <span className='block ml-auto pl-1 italic'>
                          {data.user.receiver.address}
                        </span>
                      </p>
                      <p className='flex py-0.5 text-left '>
                        Phone:
                        <span className='block ml-auto italic'>
                          {data.user.receiver.phone}
                        </span>
                      </p>
                    </div>
                  </td>
                );
              case 'products':
                return (
                  <td key={`${data.id}_${title}`} className={`${cellStyle}`}>
                    <div className='flex flex-wrap justify-center'>
                      {data[title].map((product) => (
                        <span
                          key={product.productId}
                          className='inline-block  mb-1 mr-1 px-1 pr-0 bg-blue-400 rounded-md text-white'
                        >
                          <span>{product.title}</span>
                          <span className='inline-block h-full ml-1 px-1 py-0.5 bg-red-400 rounded-r font-Raleway font-bold'>
                            x {product.quantity}
                          </span>
                        </span>
                      ))}
                    </div>
                  </td>
                );
              case 'total':
                return (
                  <td key={`${data.id}_${title}`} className={`${cellStyle}`}>
                    <span className='text-red-400 underline'>
                      {Intl.NumberFormat('vi-VI', {
                        style: 'currency',
                        currency: 'VND',
                      }).format(data[title])}
                    </span>
                  </td>
                );
              case 'orderDate':
                return (
                  <td key={`${data.id}_${title}`} className={`${cellStyle}`}>
                    {moment(data[title]).format('DD-MM-YYYY')}
                  </td>
                );
              case 'deliveryDate': {
                return (
                  <td key={`${data.id}_${title}`} className={`${cellStyle}`}>
                    {data.status === DELIVERED
                      ? moment(data[title]).format('DD-MM-YYYY')
                      : 'Not deliver just yet'}
                  </td>
                );
              }
              case 'status':
                return (
                  <td key={`${data.id}_${title}`} className={`${cellStyle}`}>
                    {data[title]}
                  </td>
                );
              default:
                return (
                  <td key={`${data.id}_${title}`} className={`${cellStyle}`}>
                    {data[title]}
                  </td>
                );
            }
          })
        : thead.map((title) => (
            <td key={`${title}`} className={`${cellStyle}`}></td>
          ))}
      <td className={`${cellStyle}`}>
        {data && data.hasOwnProperty('quantity') ? (
          <>
            <button
              className='mr-2 px-1.5 py-0.5 rounded-md bg-blue-300 hover:bg-blue-600 text-white'
              onClick={() => setImportProduct(true)}
            >
              <FontAwesomeIcon icon={faUpload} />
            </button>
            {importProduct ? (
              <ImportProduct
                handleNo={setImportProduct}
                handleYes={setData}
                productId={data.id}
                title={`Import More of this product: ${data.title}`}
              />
            ) : (
              <></>
            )}
          </>
        ) : (
          <></>
        )}
        {edit && edit.length ? (
          <Link
            className='inline-block mr-2 pl-1.5 pr-0.5 py-0.5 rounded-md 
          bg-green-300 hover:bg-green-600 text-white'
            to={editLocation}
          >
            <FontAwesomeIcon icon={faEdit} />
          </Link>
        ) : (
          <></>
        )}
        {renderEdit && renderEdit.length ? (
          <button
            className='inline-block mr-2 pl-1.5 pr-0.5 py-0.5 rounded-md 
        bg-green-300 hover:bg-green-600 text-white'
            onClick={() => setEditCategory(true)}
          >
            <FontAwesomeIcon icon={faEdit} />
          </button>
        ) : (
          <></>
        )}
        {editCategory ? (
          renderEdit({
            handleNo: setEditCategory,
            name: data.title,
            oldData: data,
          })
        ) : (
          <></>
        )}
        {renderDetail && renderDetail.length ? (
          <button
            className='inline-block mr-2 px-1 py-0.5 rounded-md 
          bg-pink-300 hover:bg-pink-500 text-white
           outline-none focus:outline-none focus:bg-pink-600'
            onClick={() => setDetail(true)}
          >
            <FontAwesomeIcon icon={faEye} />
          </button>
        ) : (
          <></>
        )}
        {detail ? renderDetail({ data: data, handleNo: setDetail }) : <></>}
        {onRemove ? (
          <button
            onClick={data ? () => setConfirmRemove(true) : () => {}}
            className={` px-2 py-0.5 rounded bg-red-300 ${
              data ? 'hover:bg-red-600' : 'cursor-not-allowed'
            }  text-white outline-none focus:outline-none`}
          >
            x
          </button>
        ) : (
          <></>
        )}
        {onStatusChange ? (
          <Tooltip
            title={
              data.status !== DELIVERED && data.status !== RATED
                ? 'Change Status'
                : 'Cant Change anymore'
            }
            placement='bottomRight'
          >
            <button
              type='button'
              className={`px-2 py-0.5  
          text-white rounded outline-none focus:outline-none 
          transition-all duration-300 ease-in-out ${
            data.status !== DELIVERED && data.status !== RATED
              ? 'bg-green-500 hover:bg-blue-400'
              : 'bg-gray-400 cursor-not-allowed'
          }`}
              onClick={
                data.status !== DELIVERED && data.status !== RATED
                  ? () => {
                      onStatusChange(data.id, data.status);
                    }
                  : () => {}
              }
            >
              <FontAwesomeIcon icon={faAngleDoubleRight} />
            </button>
          </Tooltip>
        ) : (
          <></>
        )}

        {confirmRemove ? (
          <ActionConfirm
            handleNo={setConfirmRemove}
            handleYes={() => {
              onRemove(data.id);
              onReload(true);
              setTimeout(() => {
                onReload(false);
              }, 500);
            }}
            title='Are you sure want to remove this item'
          />
        ) : (
          <></>
        )}
      </td>
    </tr>
  );
};

export default Row;
