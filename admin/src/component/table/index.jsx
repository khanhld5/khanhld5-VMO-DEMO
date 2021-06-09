import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Row from './row';
import './index.css';

const Table = (props) => {
  const {
    className,
    thead,
    data,
    addUrl,
    renderAdd,
    renderEdit,
    renderDetail,
    editUrl,
    onRemove,
    onReload,
    onStatusChange,
  } = props;

  const [add, setAdd] = useState(false);
  return (
    <>
      {addUrl && addUrl.length ? (
        <div>
          <Link
            to={addUrl}
            className='inline-block w-full mb-0.5 px-3 py-1.5 text-center
           rounded border-2 border-dashed border-blue-400 text-xl text-blue-400 opacity-40
            hover:opacity-100 transition-all duration-200 ease-in'
          >
            Add New
            <FontAwesomeIcon className='ml-1' icon={faPlus} />
          </Link>
        </div>
      ) : renderAdd ? (
        <button
          className='inline-block w-full mb-0.5 px-3 py-1.5 text-center
     rounded border-2 border-dashed border-blue-400 text-xl text-blue-400 opacity-40
      hover:opacity-100 transition-all duration-200 ease-in'
          onClick={() => setAdd(true)}
        >
          Add New
          <FontAwesomeIcon className='ml-1' icon={faPlus} />
        </button>
      ) : (
        <></>
      )}
      {/* onReload={onReload} */}
      {add ? renderAdd({ handleNo: setAdd }) : <></>}
      <table className={`${className}`}>
        <thead>
          <tr>
            {thead.map((item) => (
              <th
                className={`${item === 'category' ? 'w-1/6 ' : ''}${
                  item === 'products' ? 'w-1/4 ' : ''
                }${
                  item === 'address' ? 'w-1/5 ' : ''
                }px-0.5 py-2 bg-blue-400 text-white capitalize border-r 
                  border-gray-300 border-solid`}
                key={item}
              >
                {item === 'title' ? 'name' : item}
              </th>
            ))}
            <th className='px-0.5 py-2 bg-blue-400 text-white capitalize border-r border-blue-400 border-solid'>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {data && data.length ? (
            data.map((item, index) => (
              <Row
                index={index}
                key={item.id}
                thead={thead}
                rowData={item}
                edit={editUrl}
                renderEdit={renderEdit}
                renderDetail={renderDetail}
                onStatusChange={onStatusChange}
                onRemove={onRemove}
                onReload={onReload}
              />
            ))
          ) : (
            <Row thead={thead} />
          )}
        </tbody>
      </table>
    </>
  );
};

export default Table;
