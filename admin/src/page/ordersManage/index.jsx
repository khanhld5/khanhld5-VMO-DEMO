import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import Pagination from '../../component/pagination';
import Detail from '../../component/popUp/detail';
import Table from '../../component/table';
import axios_base from '../../request/baseRequest';
import { handleCheckAdmin } from '../../state/actions/adminAction';

const OrdersManage = (props) => {
  const dispatch = useDispatch();
  const { page } = useParams();
  const history = useHistory();

  const thead = [
    'No',
    'user',
    'address',
    'products',
    'total',
    'orderDate',
    'deliveryDate',
    'status',
  ];

  const [data, setData] = useState([]);
  const [reload, setReload] = useState(true);
  const [pagination, setPagination] = useState({});
  const [error, setError] = useState({ visible: true, message: '' });

  const handleGetList = async (url) => {
    try {
      const res = await axios_base().get(url);
      setError({ visible: false, message: '' });
      setData(res.data.list);
      if (res.data.pagination.hasOwnProperty('_limit')) {
        const resPagi = { ...res.data.pagination };
        const newPagi = {
          limit: resPagi._limit,
          page: resPagi._page,
          total: resPagi._totalRows,
        };
        setPagination(newPagi);
      } else setPagination(res.data.pagination);
    } catch (err) {
      setError({ visible: true, message: err.response.data.message });
    }
  };

  const handlePagination = (page) => {
    const location = {
      pathname: `/dashboard/ordersManage/${page}`,
      state: { page },
    };
    history.push(location);
  };
  const handleOrderChangeStatus = async (orderId, status) => {
    const valid = await dispatch(handleCheckAdmin());
    if (valid === false) {
      return;
    }
    try {
      const res = await axios_base().patch('/admin/orderStatus', {
        orderId,
        status,
      });
      setError({ visible: false, message: '' });
      setReload(true);
      setTimeout(() => setReload(false), 600);
    } catch (err) {
      setError({ visible: true, message: err.response.data.message });
    }
  };
  useEffect(() => {
    if (page) {
      handleGetList(`/admin/orders?page=${page}&_limit=12`);
      return;
    }
    handleGetList(`/admin/orders?page=1&limit=12`);
  }, [page, reload]);

  return (
    <div>
      <Table
        className='w-full mx-auto mb-5 '
        thead={thead}
        data={data}
        renderDetail={(props) => {
          const { data, handleNo } = props;
          return (
            <Detail
              data={data}
              handleNo={handleNo}
              onStatusChange={handleOrderChangeStatus}
              title='Order Detail'
            />
          );
        }}
        onStatusChange={handleOrderChangeStatus}
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
    </div>
  );
};

export default OrdersManage;
