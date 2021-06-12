import React, { useEffect, useRef, useState } from 'react';
import ListProduct from '../product-list/listProduct';
import Pagination from './pagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { faCheckSquare as faCheckSquareRgl } from '@fortawesome/free-regular-svg-icons';
import '../../assets/css/collection.css';

import axios_base from '../../authen/baseRequest';
import { LOW_TO_HIGH, HIGH_TO_LOW } from '../../Constant/constant';
import { useParams } from 'react-router';

const Collection = (props) => {
  const top = useRef();
  const [list, setList] = useState([]);
  const { search, category } = useParams();
  const [pagination, setPagination] = useState({});
  const [error, setError] = useState({ visible: true, message: '' });
  const [categorys, setCategorys] = useState([]);
  const [filters, setFilters] = useState({ category: '', price: LOW_TO_HIGH });

  const handleGetList = async (url) => {
    try {
      const res = await axios_base().get(url);
      setError({ visible: false, message: '' });
      setPagination(res.data.pagination);
      if (
        res.data.list.length &&
        res.data.list[0].hasOwnProperty('productId')
      ) {
        const newList = res.data.list.map((item) => item.product);
        setList(newList);
        return;
      }
      setList(res.data.list);
    } catch (err) {
      setError({ visible: true, message: err });
    }
  };
  const handleGetCategory = async () => {
    try {
      const res = await axios_base().get('/categories');
      setCategorys(res.data);
      setError({ visible: false, message: '' });
    } catch (err) {
      setError({ visible: true, message: err });
    }
  };
  const pageCount = (total, limit) => {
    if (total % limit > 0) return Math.floor(total / limit) + 1;
    return total / limit;
  };
  useEffect(() => {
    if (!categorys.length) {
      handleGetCategory();
    }
    if (filters.category === '') {
      handleGetList(
        `/products?page=1&limit=12${
          search?.length ? '&s=' + search : ''
        }&sort=price&order=${filters.price}`
      );
      return;
    }
    handleGetList(
      `/products?page=1&limit=12${
        search?.length ? '&s=' + search : ''
      }&categoryId=${filters.category}&sort=price&order=${filters.price}`
    );
  }, [search, filters.price, filters.category]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [list]);

  const handleFilterCategory = (category) => {
    if (category !== filters.category) {
      setFilters({ ...filters, category });
      return;
    }
    setFilters({ ...filters, category: '' });
    return;
  };
  const handleFilterPrice = (price) => {
    setFilters({ ...filters, price });
  };

  const handlePagination = (page) => {
    if (filters.category === '') {
      handleGetList(
        `/products?page=${page}&limit=12${
          search?.length ? '&s=' + search : ''
        }&sort=price&order=${filters.price}`
      );
      return;
    }
    handleGetList(
      `/products?page=${page}&limit=12${
        search?.length ? '&s=' + search : ''
      }&categoryId=${filters.category}&sort=price&order=${filters.price}`
    );
  };
  return (
    <section ref={top} className='collection container flex mt-10 m-auto'>
      <aside className='w-1/5 mr-auto py-5'>
        <h3 className='tiltle text-blue-400 text-4xl font-bold text-center mb-5 pb-1 rounded border-b-4 border-solid border-blue-100'>
          Filter
        </h3>
        <div className='filter-group bg-gray-50 rounded'>
          <ul>
            <li
              onClick={() => handleFilterCategory('NewArrival')}
              className={`${
                filters.category === 'NewArrival' ? 'active' : ''
              } select-none text-xl mb-2 px-3 py-1 rounded-b-md`}
            >
              <p>New Arrival</p>
            </li>
            <li
              onClick={() => handleFilterCategory('Trendding')}
              className={`${
                filters.category === 'Trendding' ? 'active' : ''
              } select-none text-xl mb-2 px-3 py-1 rounded-b-md `}
            >
              <p>Trendding</p>
            </li>
            <li
              className={`${
                filters.price.length ? 'active' : ''
              } select-none mb-2 px-3 py-1 rounded-b-md `}
            >
              <p className='text-xl'>Filter by price</p>
              <ul className='ml-3'>
                <li onClick={() => handleFilterPrice(LOW_TO_HIGH)}>
                  <span>
                    <FontAwesomeIcon
                      icon={
                        filters.price === LOW_TO_HIGH
                          ? faCheckSquare
                          : faCheckSquareRgl
                      }
                    />
                  </span>
                  <span className='ml-3 text-lg'>From lowest</span>
                </li>
                <li onClick={() => handleFilterPrice(HIGH_TO_LOW)}>
                  <span>
                    <FontAwesomeIcon
                      icon={
                        filters.price === HIGH_TO_LOW
                          ? faCheckSquare
                          : faCheckSquareRgl
                      }
                    />
                  </span>
                  <span className='ml-3 text-lg'>From highest</span>
                </li>
              </ul>
            </li>
            <li
              className={`${
                categorys.some((item) => item.id === filters.category)
                  ? 'active'
                  : ''
              } select-none mb-2 px-3 py-1 rounded-b-md `}
            >
              <p className='text-xl'>Filter by category</p>
              <ul className='ml-3'>
                {categorys.length
                  ? categorys.map((item) => (
                      <li
                        key={item.id}
                        onClick={() => handleFilterCategory(item.id)}
                      >
                        <span>
                          <FontAwesomeIcon
                            icon={
                              filters.category === item.id
                                ? faCheckSquare
                                : faCheckSquareRgl
                            }
                          />
                        </span>
                        <span className='ml-3 text-lg capitalize'>
                          {item.title}
                        </span>
                      </li>
                    ))
                  : ''}
              </ul>
            </li>
          </ul>
        </div>
      </aside>
      <aside className='w-4/5 pl-10'>
        <ListProduct
          list={list.length ? list : []}
          itemPerLine={3}
          minHeight='1000px'
        />
        <div className='paging mb-5'>
          <Pagination
            page={pagination._page}
            handlePagination={handlePagination}
            listLength={pageCount(pagination._totalRows, pagination._limit)}
          />
        </div>
      </aside>
    </section>
  );
};

export default Collection;
