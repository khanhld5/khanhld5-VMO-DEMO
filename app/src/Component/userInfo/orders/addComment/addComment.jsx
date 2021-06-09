import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios_auth from '../../../../authen/authenRequest';
import StarRate from './starRate';

const AddComment = (props) => {
  const { handleNo, productId } = props;
  const user = useSelector((state) => state.user);
  const [comment, setComment] = useState('');
  const [score, setScore] = useState(5);

  const emptyFeild = () => {
    setComment('');
    setScore(5);
  };

  const handleSendReq = async () => {
    try {
      const res = await axios_auth(user.access_token).post('/auth/comment', {
        payload: {
          userId: user.id,
          title: comment,
          productId,
          score,
        },
      });
      console.log(res);
      handleNo(false);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className='fixed z-50 w-screen h-screen bg-black bg-opacity-40 top-0 left-0 text-center transition-all ease-in-out duration-300'>
      <div className='w-3/5 mx-auto mt-32 p-8 bg-white rounded-lg'>
        <p className='mb-3 text-4xl text-red-500 font-Raleway font-medium'>
          Cant wait to hear your review about our product
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendReq();
          }}
        >
          <div className='flex-1 px-5 text-xl'>
            <StarRate
              className='mb-5 text-3xl'
              handleSetScore={setScore}
              score={score}
            />
            <div className='mb-10'>
              <textarea
                className='w-full p-3 outline-none focus:outline-none resize-none 
                focus:bg-green-50 border border-green-200 focus:border-yellow-200 
                rounded-lg focus:shadow-md font-Raleway font-thin transition-all ease-in-out duration-300'
                maxLength='600'
                placeholder='What you feel on our product'
                onChange={(e) => setComment(e.currentTarget.value)}
                value={comment}
              ></textarea>
            </div>
          </div>
          <div className='flex'>
            <button
              type='button'
              className='w-2/5 px-4 py-2 rounded-md border border-gray-400 
              outline-none focus:outline-none opacity-60 hover:opacity-100'
              onClick={() => {
                handleNo(false);
                emptyFeild();
              }}
            >
              CANCEL
            </button>
            <button
              type='submit'
              className='w-2/5 ml-auto px-4 py-2 bg-red-500 text-white
               rounded-md border border-red-500 outline-none
                focus:outline-none opacity-60 hover:opacity-100'
            >
              RATE US!
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddComment;
