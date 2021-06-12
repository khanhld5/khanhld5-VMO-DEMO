import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

import ActionConfirm from '../actionComfirm/actionComfirm';
import { handleCartCheckout } from '../../State/actions/cartAction';
import AddNewAddress from '../userInfo/receivers/addNewAddress';
import CartTable from '../cart/cartTable';

const CheckOut = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const [receiver, setReceiver] = useState('');

  const [addReceiver, setAddReceiver] = useState(false);
  const [placeOrder, setPlaceOrder] = useState(false);

  useEffect(() => {
    if (user.receivers && user.receivers.length) {
      setReceiver(user.receivers[0].id);
    }
  }, [user]);

  const handlePlaceOrder = async () => {
    const products = cart.products.map((item) => ({
      productId: item.product.id,
      title: item.product.title,
      image: item.product.image,
      price: item.product.price,
      quantity: item.quantity,
    }));
    await dispatch(
      handleCartCheckout('/auth/checkout', {
        userId: user.id,
        products,
        receiver,
        total: cart.total + 15000,
      })
    );
    history.push('/');
  };

  return (
    <>
      <section className='container m-auto px-10 pt-14 pb-24'>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setPlaceOrder(true);
          }}
        >
          <div className='w-full mb-10 px-5 py-2 bg-blue-50 shadow-xl rounded'>
            <h1 className='mb-4 text-8xl text-green-300 font-Pattaya underline'>
              Order
            </h1>
            <p className='mb-2 ml-5 text-2xl text-gray-500 font-Raleway'>
              <span className='font-semibold'>Delivery to: </span>
              <span className='ml-2 '>{user.username}</span>
            </p>
            <p className='mb-2 ml-5 text-xl text-gray-500 font-Raleway'>
              <span className='font-semibold'>
                How could we deliver to you:{' '}
              </span>
              <span>
                {user.receivers && user.receivers.length ? (
                  <select
                    className='bg-transparent italic'
                    value={receiver}
                    onChange={(e) => setReceiver(e.currentTarget.value)}
                  >
                    {user.receivers.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.receiver} {item.address}
                      </option>
                    ))}
                  </select>
                ) : (
                  <></>
                )}
              </span>
              <span>
                <button
                  type='button'
                  className='ml-2 hover:text-green-400 transition-all ease-in-out duration-300'
                  onClick={(e) => {
                    e.preventDefault();
                    setAddReceiver(true);
                  }}
                >
                  <span>
                    {user.receivers && user.receivers.length
                      ? 'Add Receiver'
                      : 'You dont have any receiver just yet, pls create one'}
                  </span>
                  <FontAwesomeIcon className='ml-3 text-3xl' icon={faEdit} />
                </button>
              </span>
            </p>
          </div>

          <CartTable
            shipping={15000}
            checkout={
              <button
                type='submit'
                className='inline-block ml-5 px-3 py-2 bg-green-400 
            hover:bg-green-300 rounded text-xl text-white'
              >
                Place Order
              </button>
            }
          />
        </form>
        {placeOrder ? (
          <ActionConfirm
            title='Do you want to place order now?'
            handleYes={handlePlaceOrder}
            handleNo={setPlaceOrder}
          />
        ) : (
          <></>
        )}
        {addReceiver ? <AddNewAddress handleNo={setAddReceiver} /> : <></>}
      </section>
    </>
  );
};

export default CheckOut;
