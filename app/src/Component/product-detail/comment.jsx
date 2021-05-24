import React from 'react';
import moment from 'moment';
import Star from './star';

const Comment = (props) => {
  const { className, comment } = props;
  return (
    <div className={`comment ${className} flex mb-5 p-2 rounded`}>
      <div className='user flex'>
        <div className='wImage square rounded-full w-20 mr-4'>
          <span className='image cover'>
            <img src={comment.user.avatar} alt={comment.user.username} />
          </span>
        </div>
      </div>
      <div className='mr-4 py-2 '>
        <p className='font-bold italic'>{comment.user.username}</p>
        <p className='italic text-gray-400'>
          {comment.score} <Star score={comment.score} />
        </p>
        <p className='text-sm text-gray-400 italic'>
          {moment(comment.date).format('DD-MM-YYYY')}
        </p>
      </div>
      <div className='comment py-2 pr-2'>
        <p>{comment.title}</p>
      </div>
    </div>
  );
};

export default Comment;
