import React from 'react';
import Product from './product';

const ListProduct = (props) => {
  const { minHeight, list, itemPerLine } = props;
  return (
    <div
      style={{ paddingLeft: `${5 / 2}%`, paddingRight: `${5 / 2}%`, minHeight }}
      className='item-contain flex flex-wrap justify-left w-full'
    >
      {list.length
        ? list.map((item, index) => {
            const itemWidth = 90 / itemPerLine;
            let marginRight = `${10 / (itemPerLine - 1)}%`;
            if ((index + 1) % itemPerLine === 0) marginRight = 0;
            return (
              <Product
                key={item.id}
                item={item}
                itemWidth={itemWidth}
                marginRight={marginRight}
              />
            );
          })
        : ''}
    </div>
  );
};

export default ListProduct;
