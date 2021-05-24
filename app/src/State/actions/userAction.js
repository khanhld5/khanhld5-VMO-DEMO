import * as act from '../../Constant/constant';
import axios from 'axios';
import axios_auth from '../../authen/authenRequest';

const storeUser = (user) => {
  localStorage.removeItem(`user`);

  localStorage.setItem(`user`, JSON.stringify(user));
};

export const handleUserInit = () => async (dispatch) => {
  dispatch({
    type: act.USER_INIT,
  });
};

export const handleUserLogin =
  (url, username, password) => async (dispatch, getState) => {
    const dataSend = { username, password };
    try {
      // const res = await fetch(url, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(dataSend),
      // });
      const res = await axios.post(url, dataSend);
      // if (!res.access_token) return new Error(res.message);
      dispatch({
        type: act.USER_LOGIN,
        payload: {
          user: res.data,
        },
      });
      storeUser(getState().user);
    } catch (err) {
      dispatch({
        type: act.USER_LOGIN_ERROR,
        payload: {
          error: err.response.data.message,
        },
      });
    }
  };
export const handleUserRegister =
  (url, dataSend) => async (dispatch, getState) => {
    try {
      // const res = await fetch(url).then((data) => data.json());
      // return dispatch({
      //   type: act.USER_REGISTER,
      //   payload: {
      //     user: res,
      //   },
      // });
      const res = await axios.post(url, dataSend);
      dispatch({
        type: act.USER_REGISTER,
        payload: {
          user: res.data,
        },
      });
      storeUser(getState().user);
    } catch (err) {
      dispatch({
        type: act.USER_REGISTER_ERROR,
        payload: {
          error: err.response.data.message,
        },
      });
    }
  };
export const handleUserLogout = (url) => async (dispatch) => {
  // try {
  //   const res = await fetch(url).then((data) => data.json());
  // } catch (err) {
  //   console.log(err);
  // }
  dispatch({
    type: act.USER_LOGOUT,
  });
  localStorage.removeItem(`user`);
};
export const handleUserChangeInfomation =
  (url, payload) => async (dispatch, getState) => {
    const token = getState().user.access_token;
    try {
      const res = await axios_auth(token).put(url, { payload });
      dispatch({
        type: act.USER_EDIT_INFORMATION,
        payload: {
          user: res.data,
        },
      });
      storeUser(getState().user);
    } catch (err) {
      if (err.response.status === 401) {
        dispatch({
          type: act.USER_LOGOUT,
        });
        localStorage.removeItem(`user`);
      }
    }
  };
export const handleUserChangePassword =
  (url, payload) => async (dispatch, getState) => {
    const token = getState().user.access_token;
    try {
      const res = await axios_auth(token).put(url, { payload });
      dispatch({
        type: act.USER_CHANGE_PASSWORD,
        payload: {
          access_token: res.data.access_token,
        },
      });
      storeUser(getState().user);
    } catch (err) {
      if (err.response.status === 401) {
        dispatch({
          type: act.USER_LOGOUT,
        });
        localStorage.removeItem(`user`);
      }
      if (err.response.status === 406) {
        dispatch({
          type: act.USER_CHANGE_PASSWORD_ERROR,
          payload: {
            error: err.response.data.message,
          },
        });
      }
    }
  };
export const handleUserAddReceiver =
  (url, payload) => async (dispatch, getState) => {
    const token = getState().user.access_token;
    try {
      const res = await axios_auth(token).post(url, { payload });
      dispatch({
        type: act.USER_ADD_RECEIVER,
        payload: {
          receivers: res.data.receivers,
        },
      });
      storeUser(getState().user);
    } catch (err) {
      if (err.response.status === 401) {
        dispatch({
          type: act.USER_LOGOUT,
        });
        localStorage.removeItem(`user`);
      }
    }
  };
export const handleUserRemoveReceiver =
  (url, payload) => async (dispatch, getState) => {
    const token = getState().user.access_token;
    try {
      const res = await axios_auth(token).post(url, { payload });
      dispatch({
        type: act.USER_ADD_RECEIVER,
        payload: {
          receivers: res.data.receivers,
        },
      });
      storeUser(getState().user);
    } catch (err) {
      if (err.response.status === 401) {
        dispatch({
          type: act.USER_LOGOUT,
        });
        localStorage.removeItem(`user`);
      }
    }
  };
