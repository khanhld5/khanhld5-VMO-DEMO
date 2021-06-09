import React, { useEffect, useState } from 'react';
import axios_base from '../../../request/baseRequest';

import Table from '../../../component/table';
import Pagination from '../../../component/pagination';
import { useHistory, useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { handleCheckAdmin } from '../../../state/actions/adminAction';

const ListProduct = (props) => {
  const dispatch = useDispatch();
  const { url } = props;
  const [data, setData] = useState([]);
  const history = useHistory();
  const { page } = useParams();
  const thead = [
    'title',
    'image',
    'price',
    'category',
    'quantity',
    'left',
    'brand',
    'origin',
  ];
  const [reload, setReload] = useState(false);
  const [pagination, setPagination] = useState({});
  const [error, setError] = useState({ visible: true, message: '' });

  const handleGetList = async (url) => {
    try {
      const res = await axios_base().get(url);
      setError({ visible: false, message: '' });
      setPagination(res.data.pagination);
      setData(res.data.list);
    } catch (err) {
      setError({ visible: true, message: err.response.data.message });
    }
  };

  const handlePagination = (page) => {
    const location = {
      pathname: `/dashboard/productsManage/${page}`,
      state: { page },
    };
    history.push(location);
  };
  const handleRemove = async (productId) => {
    const valid = await dispatch(handleCheckAdmin());
    if (valid === false) {
      return;
    }
    try {
      const res = await axios_base().delete('/admin/removeProduct', {
        data: { productId },
      });
      setError({ visible: false, message: '' });
    } catch (err) {
      setError({ visible: true, message: err.response.data.message });
    }
  };

  useEffect(() => {
    if (page) {
      handleGetList(`/admin/products?page=${page}&limit=12`);
      return;
    }
    handleGetList(`/admin/products?page=1&limit=12`);
    return;
  }, [page, reload]);
  return (
    <div>
      {data.length ? (
        <>
          <Table
            className={`w-full font-Raleway mb-5`}
            thead={thead}
            data={data}
            addUrl={`${url}/addProduct`}
            editUrl={`${url}/editProduct`}
            onRemove={handleRemove}
            onReload={setReload}
          />
          {pagination.total > pagination.limit ? (
            <Pagination
              pagination={pagination}
              handlePagination={handlePagination}
            />
          ) : (
            <></>
          )}
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ListProduct;
