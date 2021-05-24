import React, { useEffect, useRef, useState } from 'react';
import ListProduct from '../product-list/listProduct';
import Pagination from './pagination';
import '../../assets/css/collection.css';
import axios from 'axios';

const Collection = (props) => {
  const top = useRef();
  const [list, setList] = useState([]);
  const [pagination, setPagination] = useState({});
  const [error, setError] = useState({ visible: true, message: '' });
  const [categorys, setCategorys] = useState([]);
  const [filters, setFilters] = useState({ category: '', price: 'lowToHigh' });

  const handleGetList = (url) => {
    axios.get(url).then(
      (result) => {
        setList(result.data.list);
        setPagination(result.data.pagination);
        setError({ visible: false, message: '' });
      },
      (err) => {
        setError({ visible: true, message: err });
      }
    );
  };
  const pageCount = (total, limit) => {
    if (total % limit > 0) return Math.floor(total / limit) + 1;
    return total / limit;
  };
  useEffect(() => {
    handleGetList('http://localhost:8080/products?_page=1&_limit=12');

    const categorysInit = [
      { id: 1, title: 'food' },
      { id: 2, title: 'drink' },
    ];
    setCategorys(categorysInit);
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [list]);

  const handleFilterCategory = (category) => {
    setFilters({ ...filters, category });
  };
  const handleFilterPrice = (price) => {
    setFilters({ ...filters, price });
  };

  const handlePagination = (page) => {
    handleGetList(`http://localhost:8080/products?_page=${page}&_limit=12`);
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
                <li onClick={() => handleFilterPrice('lowToHigh')}>
                  <input
                    type='checkbox'
                    checked={filters.price === 'lowToHigh'}
                  />
                  <span className='ml-3 text-lg'>From lowest</span>
                </li>
                <li onClick={() => handleFilterPrice('highToLow')}>
                  <input
                    type='checkbox'
                    checked={filters.price === 'highToLow'}
                  />
                  <span className='ml-3 text-lg'>From highest</span>
                </li>
              </ul>
            </li>
            <li
              className={`${
                categorys.some((item) => item.title === filters.category)
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
                        onClick={() => handleFilterCategory(item.title)}
                      >
                        <input
                          type='checkbox'
                          checked={filters.category === item.title}
                        />
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
