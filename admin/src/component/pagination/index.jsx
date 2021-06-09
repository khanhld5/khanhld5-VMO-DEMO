import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLongArrowAltRight,
  faLongArrowAltLeft,
} from '@fortawesome/free-solid-svg-icons';
import './index.css';

const pageCount = (total, limit) => {
  if (total % limit > 0) return Math.floor(total / limit) + 1;
  return total / limit;
};

const Pagination = (props) => {
  const { className, pagination, handlePagination } = props;
  const { page, limit, total } = pagination;
  const [listLength, setListLength] = useState(0);

  const [numbers, setNumbers] = useState([]);

  useEffect(() => {
    setListLength(pageCount(total, limit));
  }, [total]);

  useEffect(() => {
    let pageNum = [];
    for (let i = 1; i <= listLength; i++) {
      pageNum[i] = i;
    }
    setNumbers(pageNum);
  }, [listLength]);

  return (
    <ul className={`${className} pagination flex justify-center`}>
      <li
        className='rounded-md border border-solid
        mr-4 shadow-md'
        onClick={page > 1 ? () => handlePagination(page - 1) : () => {}}
      >
        <button type='button' className='px-3 py-1'>
          <FontAwesomeIcon icon={faLongArrowAltLeft} />
        </button>
      </li>
      {numbers.length !== 0 ? (
        numbers.map((item) => (
          <li
            className={`${
              parseInt(page) === item ? 'active' : ''
            } rounded-md border border-solid shadow-md ${
              item == 1 ? '' : 'ml-4'
            }`}
            key={item}
            onClick={
              parseInt(page) !== item ? () => handlePagination(item) : () => {}
            }
          >
            <button type='button' className={`px-3 py-1`}>
              {item}
            </button>
          </li>
        ))
      ) : (
        <li>{page}</li>
      )}
      <li
        className='rounded-md border border-solid shadow-md ml-4'
        onClick={page !== total ? () => handlePagination(page + 1) : () => {}}
      >
        <button type='button' className='px-3 py-1'>
          <FontAwesomeIcon icon={faLongArrowAltRight} />
        </button>
      </li>
    </ul>
  );
};

export default Pagination;
