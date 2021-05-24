import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLongArrowAltRight,
  faLongArrowAltLeft,
} from '@fortawesome/free-solid-svg-icons';
import '../../assets/css/pagination.css';

const Pagination = (props) => {
  const { page, handlePagination, listLength } = props;

  const [numbers, setNumbers] = useState([]);

  useEffect(() => {
    let pageNum = [];
    for (let i = 1; i <= listLength; i++) {
      pageNum[i] = i;
    }
    setNumbers(pageNum);
  }, [listLength]);

  return (
    <ul className='pagination flex justify-center'>
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
              page === item ? 'active' : ''
            } rounded-md border border-solid shadow-md ${
              item === 1 ? '' : 'ml-4'
            }`}
            key={item}
            onClick={page !== item ? () => handlePagination(item) : () => {}}
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
        onClick={
          page !== listLength ? () => handlePagination(page + 1) : () => {}
        }
      >
        <button type='button' className='px-3 py-1'>
          <FontAwesomeIcon icon={faLongArrowAltRight} />
        </button>
      </li>
    </ul>
  );
};

export default Pagination;
