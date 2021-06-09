import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import AddCategory from '../../component/formPopUp/addCategory';
import Pagination from '../../component/pagination';
import Table from '../../component/table';
import axios_base from '../../request/baseRequest';
import { handleCheckAdmin } from '../../state/actions/adminAction';

const CategoryManage = (props) => {
  const dispatch = useDispatch();
  const { page } = useParams();
  const history = useHistory();

  const thead = ['title'];

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
      pathname: `/dashboard/categoryManage/${page}`,
      state: { page },
    };
    history.push(location);
  };
  const handleRemove = async (categoryId) => {
    const valid = await dispatch(handleCheckAdmin());
    if (valid === false) {
      return;
    }
    try {
      const res = await axios_base().delete('/admin/removeCategory', {
        data: { categoryId },
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
      handleGetList(
        `/categories?_page=${page}&_limit=12&_sort=title&_order=asc`
      );
      return;
    }
    handleGetList(`/categories?_page=1&_limit=12&_sort=title&_order=asc`);
  }, [page, reload]);

  return (
    <div>
      <Table
        className='w-full mx-auto mb-5 '
        thead={thead}
        data={data}
        renderAdd={(props) => {
          const { handleNo } = props;
          return (
            <AddCategory
              handleNo={handleNo}
              onReload={setReload}
              title='Add Category'
            />
          );
        }}
        renderEdit={(props) => {
          const { handleNo, name, oldData } = props;
          return (
            <AddCategory
              handleNo={handleNo}
              onReload={setReload}
              title={`Edit ${name} category`}
              oldData={oldData}
            />
          );
        }}
        onReload={setReload}
        onRemove={handleRemove}
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

export default CategoryManage;
