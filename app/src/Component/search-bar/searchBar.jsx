import React, { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useHistory, useLocation } from 'react-router';

const SearchBar = (props) => {
  const history = useHistory();
  const location = useLocation();
  const input = useRef();
  const [err, setErr] = useState(false);
  const [firstFocus, setFirstFocus] = useState(true);
  const handleSearch = () => {
    const search = input.current.value;
    if (!search.length) {
      setErr(true);
      return;
    }
    location.pathname = `/collection/${search}`;
    setFirstFocus(true);
    input.current.blur();
    history.push(location);
  };
  const handleDelContent = () => {
    if (firstFocus) {
      input.current.value = '';
      setFirstFocus(false);
    }
  };
  return (
    <form
      style={{ borderColor: '#02f5f5' }}
      className='flex m-auto w-2/5 rounded-md border-2 border-solid'
      onSubmit={(e) => {
        e.preventDefault();
        handleSearch();
      }}
    >
      <input
        ref={input}
        onFocus={handleDelContent}
        type='text'
        placeholder={err ? 'Dont leave this empty' : 'What on your mind ?'}
        className='block bg-transparent w-full px-4 py-2 outline-none text-xl text-gray-800 '
      />
      <button
        style={{ margin: '2px', background: '#02f5f5' }}
        type='submit'
        className='inline-block px-3 outline-none rounded text-white text-2xl'
      >
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </form>
  );
};

export default SearchBar;
