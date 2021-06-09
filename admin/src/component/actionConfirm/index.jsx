import React from 'react';

const ActionConfirm = (props) => {
  const { handleYes, handleNo, title } = props;

  return (
    <div className='fixed z-50 w-screen h-screen bg-black bg-opacity-40 top-0 left-0 text-center'>
      <div className='w-2/5 mx-auto mt-72 p-8 bg-white rounded-lg'>
        <p className='mb-3 text-2xl italic text-red-500'>{title}</p>
        <div className='flex'>
          <button
            type='button'
            className='w-2/5 px-4 py-2 bg-red-500 text-white rounded-md border border-red-500 outline-none focus:outline-none'
            onClick={() => {
              handleYes();
              handleNo(false);
            }}
          >
            YES
          </button>
          <button
            type='button'
            className='w-2/5 ml-auto  px-4 py-2 rounded-md border border-gray-400 outline-none focus:outline-none'
            onClick={() => handleNo(false)}
          >
            NO
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActionConfirm;
