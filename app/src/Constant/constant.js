//cart action
export const CART_INIT = 'handleCartInit';
export const CART_DESTROY = 'handleCartDestroy';
export const CART_ADD_PRODUCT = 'handleCartAddProduct';
export const CART_REMOVE_PRODUCT = 'handleCartRemoveProduct';
export const CART_INCREASE_QUANTITY = 'handleCartIncreaseQuantity';
export const CART_DECREASE_QUANTITY = 'handleCartDecreaseQuantity';
export const CART_ORDER = 'handleCartOrder';
export const CART_CHECK_OUT = 'handleCartCheckout';

//user action

export const USER_INIT = 'handleUserInit';
export const USER_LOGIN = 'handleUserLogin';
export const USER_LOGIN_ERROR = 'handleUserLoginError';
export const USER_REGISTER_ERROR = 'handleUserRegisterError';
export const USER_REGISTER = 'handleUserRegister';
export const USER_EDIT_INFORMATION = 'handleUserEditInformation';
export const USER_CHANGE_PASSWORD = 'handleUserChangePassword';
export const USER_CHANGE_PASSWORD_ERROR = 'handleUserChangePasswordError';
export const USER_ADD_RECEIVER = 'handleUserAddReceiver';
export const USER_REMOVE_RECEIVER = 'handleUserRemoveReceiver';
export const USER_GET_ORDERS = 'handleUserGetOrders';
export const USER_RENEW_TOKEN = 'handleUserRenewToken';
export const USER_LOGOUT = 'handleUserLogOut';

// baseUrl
export const BASE_URL = 'http://localhost:8080';

//order status
export const ORDER_SAVED = 'Saved';
export const RECEIVE_ORDER = 'Received';
export const DELIVER_ORDER = 'Delivering';
export const DELIVERED = 'Delivered';
export const RATED = 'User rated';
