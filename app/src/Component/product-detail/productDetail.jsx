import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import parse from 'html-react-parser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { handleCartAddProduct } from '../../State/actions/cartAction';
import { BASE_URL } from '../../Constant/constant';
import Comment from './comment';
import Star from './star';
import ShopDescription from '../home/shopDescription';
import ListProduct from '../product-list/listProduct';
import Title from '../home/title';
import axios from 'axios';

const ProductDetail = (props) => {
  const cart = useSelector((state) => state.cart);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState({});
  const [avScore, setAvScore] = useState(5);
  const [quantity, setQuantity] = useState(1);
  const [hoverCart, setHoverCart] = useState(false);
  const [clickable, setClickable] = useState(true);
  const [error, setError] = useState({ visible: false, message: '' });

  //get product

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    const getDetail = async () => {
      try {
        const res = await axios
          .get(`${BASE_URL}/product-detail`, {
            params: { id },
          })
          .then((result) => result.data);
        if (res) {
          if (res.comments[0].hasOwnProperty('title')) {
            const avScoreInit =
              res.comments.reduce((acc, cur) => acc.score + cur.score) /
              res.comments.length;
            setAvScore(Math.round(avScoreInit * 10) / 10);
          }
          if (res.left === 0) setQuantity(0);
          setProduct(res);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getDetail();
  }, [id]);

  useEffect(() => {
    if (cart.hasOwnProperty('products')) {
      const productInCart = cart.products.find(
        (item) => item.product.id === product.id
      );
      if (
        productInCart &&
        productInCart.quantity === productInCart.product.left
      )
        setClickable(false);
    }
  });

  //handle
  const handleIncreaseQuantity = () => {
    if (product.left === 0) return;
    if (quantity === product.left) return;
    setQuantity(quantity + 1);
  };
  const handleDecreaseQuantity = () => {
    if (product.left === 0) return;
    if (quantity === 1) return;
    setQuantity(quantity - 1);
  };
  const handleAddToCart = () => {
    const productInCart = cart.products.find(
      (item) => item.product.id === product.id
    );
    const productPush = {
      id: product.id,
      title: product.title,
      category: product.category,
      image: product.image,
      price: product.price,
      quantity: product.quantity,
      left: product.left,
      brand: product.brand,
      origin: product.origin,
    };
    if (productInCart && productInCart.quantity + quantity > product.left) {
      dispatch(
        handleCartAddProduct(productPush, product.left - productInCart.quantity)
      );
      setClickable(false);
      setError({
        visible: true,
        message: 'You have reached to the limit item left of this product!',
      });
      return;
    }
    dispatch(handleCartAddProduct(productPush, quantity));
  };
  if (Object.keys(product).length) {
    return (
      <div>
        <div className='flex container m-auto px-12 py-14'>
          <aside className='w-2/5'>
            <div className='wImage square rounded-xl border-4 border-blue-200 border-dashed'>
              <span className='image cover'>
                <img src={product.image} alt={product.title} />
              </span>
            </div>
          </aside>
          <aside className='flex-1 ml-16'>
            <h1
              className='mb-5 text-5xl text-transparent bg-clip-text 
              bg-gradient-to-tr from-blue-200 to-green-200 font-bold italic'
            >
              {product.title}
            </h1>
            <div className='ratingStats flex ml-1 mb-5'>
              <p className='text-gray-400 underline pr-3 border-r border-gray-200'>
                {avScore}
                <Star className='ml-2' score={avScore} />
              </p>
              <p className='ml-3 pr-3 border-r border-gray-200'>
                <span className='text-sm'>Số lượt đánh giá: </span>
                <span className='ml-2 text-gray-400 underline'>
                  {product.comments[0].hasOwnProperty('title')
                    ? product.comments.length
                    : '0'}
                </span>
              </p>
              <p className='ml-2'>
                <span className='text-sm'>Số sản phẩm đã bán: </span>
                <span className='ml-2 text-gray-400 underline'>
                  {product.quantity - product.left}
                </span>
              </p>
            </div>
            <div className='ml-5'>
              <p className='mb-3'>
                <span className='text-xl'>Price: </span>
                <span className='italic font-bold'>
                  {Intl.NumberFormat('vi-VI', {
                    style: 'currency',
                    currency: 'VND',
                  }).format(product.price)}
                </span>
              </p>
              <p className='mb-3'>
                <span className='text-xl'>Delivery: </span>
                <span className='text-sm italic'>By shop </span>
                <span className='font-bold italic'>
                  {Intl.NumberFormat('vi-VI', {
                    style: 'currency',
                    currency: 'VND',
                  }).format(15000)}
                </span>
              </p>
              <div className='mb-5'>
                <span className='text-xl'>Quantity: </span>
                <span className='inline-block rounded-md border border-gray-200 ml-2'>
                  <button
                    onClick={
                      product.left !== 0 && clickable
                        ? handleDecreaseQuantity
                        : () => {}
                    }
                    className={`bg-gray-100 w-10 px-3 py-1 rounded-l-md focus:outline-none border-r ${
                      product.left !== 0 && clickable
                        ? 'text-gray-800 hover:bg-blue-100'
                        : 'text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    -
                  </button>
                  <span
                    className={`px-5 select-none ${
                      product.left !== 0 && clickable
                        ? 'text-gray-800'
                        : 'text-gray-400'
                    }`}
                  >
                    {quantity}
                  </span>
                  <button
                    onClick={
                      product.left !== 0 && clickable
                        ? handleIncreaseQuantity
                        : () => {}
                    }
                    className={`bg-gray-100 w-10 px-3 py-1 rounded-r-md  focus:outline-none border-l ${
                      product.left !== 0 && clickable
                        ? 'text-gray-800 hover:bg-blue-100'
                        : 'text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    +
                  </button>
                </span>
                <span className='ml-2'>
                  Remain:
                  {product.left !== 0 ? (
                    <>
                      <span className='italic underline text-yellow-600 px-2'>
                        {product.left}
                      </span>
                      <span>left</span>
                    </>
                  ) : (
                    <span className='pl-2 text-red-500 italic underline'>
                      Sold out!
                    </span>
                  )}
                </span>
              </div>
              <div className={`${error.visible ? '' : 'hidden'}`}>
                {error.message}
              </div>
              <div>
                {product.left !== 0 && clickable ? (
                  <button
                    onMouseEnter={() => setHoverCart(true)}
                    onMouseLeave={() => setHoverCart(false)}
                    onClick={handleAddToCart}
                    className='px-3 py-1 rounded bg-green-300 text-white text-xl hover:bg-blue-200 transition-all duration-300 outline-none focus:outline-none'
                  >
                    <span className='mr-2'>Add to cart </span>
                    <FontAwesomeIcon
                      style={{ transform: 'translateX(-2px)' }}
                      icon={hoverCart ? faCartPlus : faShoppingCart}
                    />
                  </button>
                ) : (
                  <button className='px-3 py-1 rounded bg-gray-300 text-white text-xl outline-none focus:outline-none cursor-not-allowed'>
                    <span className='mr-2'>Add to cart </span>
                    <FontAwesomeIcon
                      style={{ transform: 'translateX(-2px)' }}
                      icon={faShoppingCart}
                    />
                  </button>
                )}
              </div>
            </div>
          </aside>
        </div>
        {product.relatedList.length ? (
          <div className='lated-list container m-auto p-5'>
            <Title>Related product</Title>
            <ListProduct list={product.relatedList} itemPerLine={4} />
          </div>
        ) : (
          ''
        )}

        <div className='container m-auto p-5'>
          <section className='detail mb-5'>
            <Title>Product infomation</Title>
            <div className='px-16'>
              <p className='mb-5'>
                <span className='italic text-xl text-gray-400'>Category: </span>
                {product.category[0].hasOwnProperty('title') ? (
                  product.category.map((item, index) => (
                    <span key={item.id} className='capitalize'>
                      {item.title}
                      {`${index === product.category.length - 1 ? '.' : ', '}`}
                    </span>
                  ))
                ) : (
                  <span className='capitalize'>{product.category[0]}</span>
                )}
              </p>
              <p className='mb-5'>
                <span className='italic text-xl text-gray-400'>Brand: </span>
                <span>{product.brand}.</span>
              </p>
              <p className='mb-5'>
                <span className='italic text-xl text-gray-400'>Made in: </span>
                <span>{product.origin}.</span>
              </p>
            </div>
            <Title>Description</Title>
            <p className='whitespace-pre-wrap px-16'>
              {parse(product.description)}
            </p>
          </section>
          <section className='comment-ctn'>
            <Title>Comments</Title>
            <div className='px-16'>
              {product.comments[0].hasOwnProperty('title') ? (
                product.comments.map((item, index) => (
                  <Comment
                    key={item.id}
                    comment={item}
                    className={`${
                      index % 2 === 0 ? 'bg-gray-200' : 'bg-white'
                    }`}
                  />
                ))
              ) : (
                <div>
                  <p>{product.comments[0]}</p>
                </div>
              )}
            </div>
          </section>
        </div>
        <ShopDescription />
      </div>
    );
  } else return <div>No infomation given for this product</div>;
};

export default ProductDetail;
