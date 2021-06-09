import * as act from '../../constant';
import axios_base from '../../request/baseRequest';
import axios_auth from '../../request/authenRequest';

const removeUser = () => {
  localStorage.removeItem(`admin`);
};
const storeUser = (admin) => {
  removeUser();
  localStorage.setItem(`admin`, JSON.stringify(admin));
};

export const handleLogin =
  ({ username, password }) =>
  async (dispatch, getState) => {
    const dataSend = { username, password };
    try {
      const res = await axios_base().post('/admin/login', dataSend);
      dispatch({
        type: act.REMOVE_LOGIN_ERROR,
      });
      dispatch({
        type: act.LOGIN,
        payload: {
          admin: res.data,
        },
      });
      storeUser(getState().admin);
    } catch (err) {
      if (err.response.status === 401)
        dispatch({
          type: act.LOGIN_FAIL,
          payload: {
            error: err.response.data.message,
          },
        });
      console.log(err);
    }
  };
export const handleRemoveError = () => (dispatch) => {
  dispatch({
    type: act.REMOVE_LOGIN_ERROR,
  });
};

export const handleCheckAdmin = () => async (dispatch, getState) => {
  const { access_token } = getState().admin;
  try {
    const res = await axios_auth(access_token).get('/admin/checkAvaiable');
    if (res.data.message === act.STILL_VALID) {
      return true;
    }
    dispatch({
      type: act.RENEW_TOKEN,
      payload: {
        access_token: res.data.access_token,
      },
    });
    storeUser(getState().admin);
    return true;
  } catch (err) {
    dispatch({
      type: act.LOGOUT,
      payload: {
        error: err.response.data.message,
      },
    });
    removeUser();
    return false;
  }
};
export const handleLogout = () => async (dispatch) => {
  dispatch({
    type: act.LOGOUT,
  });
  removeUser();
};
