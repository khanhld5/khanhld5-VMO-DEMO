import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../Constant/constant';
import BannerContain from './bannerContain';
import ListProduct from '../product-list/listProduct';
import HomeListProduct from './homeListProduct';
import ShopDescription from './shopDescription';
import '../../assets/css/home.css';
import bannerImage from '../../assets/image/bg-food.jpg';

const Home = (props) => {
  const [listTrend, setListTrend] = useState([]);
  const [listNewArrival, setListNewArrival] = useState([]);
  const [listCurrent, setListCurrent] = useState([]);
  const [banners, setBanners] = useState([]);
  const [error, setError] = useState({ visible: true, message: '' });

  const handleGetList = async (url, setState) => {
    await axios.get(url).then(
      (result) => {
        setError({ visible: false, message: '' });
        setState(result.data.list);
      },
      (err) => {
        setError({ visible: true, message: err });
      }
    );
  };
  useEffect(() => {
    const bannersInit = [
      {
        id: 1,
        image:
          'https://d1uz88p17r663j.cloudfront.net/original/5b069c3ed2feea79377014f6766fcd49_Original_NTH_Chocolate_Chip_Cookie.jpg',
      },
      {
        id: 2,
        image: bannerImage,
      },
    ];
    setBanners(bannersInit);
    handleGetList(`${BASE_URL}/products?_page=1&_limit=4`, setListTrend);

    handleGetList(`${BASE_URL}/products?_page=2&_limit=4`, setListNewArrival);

    handleGetList(`${BASE_URL}/products?_page=3&_limit=4`, setListCurrent);
  }, []);

  return (
    <>
      <BannerContain banners={banners} />
      <div className='container m-auto'>
        <section className='list-service flex mb-10'>
          <div className='service w-1/3 mx-5 px-5 py-12 text-center text-2xl shadow-md cursor-pointer select-none'>
            <p className='font-bold mb-1'>Giao Hàng tận nơi</p>
            <p className='text-lg relative after italic'>0366203881</p>
          </div>
          <div className='service w-1/3 mx-5 px-5 py-12 text-center text-2xl shadow-md  cursor-pointer select-none'>
            <p className='font-bold mb-1'>Dịch vụ 24/7</p>
            <p className='text-lg relative after italic'>0323880923</p>
          </div>
          <div className='service w-1/3 mx-5 px-5 py-12 text-center text-2xl shadow-md cursor-pointer select-none'>
            <p className='font-bold mb-1'>Món ngon chất lượng</p>
            <p className='text-lg relative after italic'>0334566717</p>
          </div>
        </section>

        <HomeListProduct className='list-trending' title='Sản phẩm bán chạy'>
          <ListProduct list={listTrend} itemPerLine={4} />
        </HomeListProduct>
      </div>
      <div className='bg-food bg-gray-100'>
        <HomeListProduct
          className='container m-auto py-10 list-newArrival'
          title='Sản phẩm mới'
        >
          <ListProduct list={listNewArrival} itemPerLine={4} />
        </HomeListProduct>
      </div>
      <div className='container m-auto'>
        <HomeListProduct
          className='list-current-product'
          title='Sản phẩm hiện có'
        >
          <ListProduct list={listCurrent} itemPerLine={4} />
        </HomeListProduct>
      </div>
      <ShopDescription />
    </>
  );
};

export default Home;
