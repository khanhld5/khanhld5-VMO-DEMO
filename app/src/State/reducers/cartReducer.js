import * as act from '../../Constant/constant';
import produce from 'immer';

const cartReducer = produce((draft, action) => {
  const payload = action.payload;
  switch (action.type) {
    case act.CART_INIT: {
      const persitCart = JSON.parse(
        localStorage.getItem(`cart_${payload.user.username}_${payload.user.id}`)
      );
      if (persitCart) {
        draft = persitCart;
      } else {
        draft.user = {
          userId: payload.user.id,
        };
      }
      return draft;
    }

    case act.CART_DESTROY:
      return (draft = {});

    case act.CART_ORDER:
      {
        draft.date = payload.date;
      }
      break;
    case act.CART_CHECK_OUT:
      {
        draft.products = [];
        draft.total = 0;
      }
      break;
    case act.CART_ADD_PRODUCT: {
      if (draft.products && draft.products.length)
        if (
          draft.products.some((item) => item.product.id === payload.product.id)
        ) {
          for (let item of draft.products) {
            if (item.product.id === payload.product.id) {
              if (item.product.left === 0) return;
              if (item.product.left === item.quantity) return;
              item.quantity += payload.quantity;
            }
          }
        } else {
          draft.products.push({
            product: { ...payload.product },
            quantity: payload.quantity,
          });
        }
      else
        draft.products = [
          {
            product: { ...payload.product },
            quantity: payload.quantity,
          },
        ];
      return draft;
    }

    case act.CART_REMOVE_PRODUCT: {
      for (let item of payload.productId) {
        draft.products = draft.products.filter(
          (ele) => ele.product.id !== item
        );
      }
      return draft;
    }
    case act.CART_INCREASE_QUANTITY: {
      for (let item of draft.products) {
        if (item.product.id === payload.productId) {
          item.quantity += 1;
          break;
        }
      }
      return draft;
    }
    case act.CART_DECREASE_QUANTITY: {
      for (let item of draft.products) {
        if (item.product.id === payload.productId) {
          item.quantity -= 1;
          break;
        }
      }
      return draft;
    }
    default:
      break;
  }
}, {});

export default cartReducer;
