import axios_auth from '../../authen/authenRequest';
import * as act from '../../Constant/constant';

const storeCart = (user, cart) => {
  const cartStore = JSON.parse(
    localStorage.getItem(`cart_${user.username}_${user.id}`)
  );
  if (cartStore) localStorage.removeItem(`cart_${user.username}_${user.id}`);

  localStorage.setItem(
    `cart_${user.username}_${user.id}`,
    JSON.stringify(cart)
  );
};

export const handleCartInit = () => (dispatch, getState) => {
  const user = getState().user;
  if (user.error) return;
  dispatch({
    type: act.CART_INIT,
    payload: {
      user,
    },
  });
  storeCart(getState().user, getState().cart);
};

export const handleCartDestroy = () => (dispatch) => {
  dispatch({
    type: act.CART_DESTROY,
  });
};

export const handleCartOrder = (date) => (dispatch, getState) => {
  dispatch({
    type: act.CART_ORDER,
    payload: {
      date,
    },
  });
  storeCart(getState().user, getState().cart);
};

export const handleCartCheckout =
  (url, payload) => async (dispatch, getState) => {
    const token = getState().user.access_token;
    try {
      await axios_auth(token).post(url, { payload });
      dispatch({
        type: act.CART_CHECK_OUT,
      });
      console.log('helo');
      storeCart(getState().user, getState().cart);
    } catch (err) {
      if (err.response.status === 401) {
        dispatch({
          type: act.USER_LOGOUT,
        });
        localStorage.removeItem(`user`);
      }
    }
  };

export const handleCartAddProduct =
  (product, quantity) => (dispatch, getState) => {
    dispatch({
      type: act.CART_ADD_PRODUCT,
      payload: {
        product,
        quantity,
      },
    });
    storeCart(getState().user, getState().cart);
  };
export const handleCartRemoveProduct = (productId) => (dispatch, getState) => {
  dispatch({
    type: act.CART_REMOVE_PRODUCT,
    payload: {
      productId,
    },
  });
  storeCart(getState().user, getState().cart);
};
export const handleCartIncreaseQuantity =
  (productId) => (dispatch, getState) => {
    dispatch({
      type: act.CART_INCREASE_QUANTITY,
      payload: {
        productId,
      },
    });
    storeCart(getState().user, getState().cart);
  };
export const handleCartDecreaseQuantity =
  (productId) => (dispatch, getState) => {
    dispatch({
      type: act.CART_DECREASE_QUANTITY,
      payload: {
        productId,
      },
    });
    storeCart(getState().user, getState().cart);
  };
