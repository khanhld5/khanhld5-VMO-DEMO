import * as act from '../../Constant/constant';
import produce from 'immer';

const userReducer = produce((draft, action) => {
  const payload = action.payload;
  switch (action.type) {
    case act.USER_INIT: {
      const user = JSON.parse(localStorage.getItem(`user`));
      if (user) return (draft = user);
      break;
    }
    // case act.USER_LOGIN:
    //   const user = {};
    //   for (let key of Object.keys(payload.user)) {
    //     user[key] = payload.user[key];
    //   }
    //   return (draft = { ...user });
    case act.USER_LOGIN:
      for (let key of Object.keys(payload.user)) {
        draft[key] = payload.user[key];
      }
      return draft;
    case act.USER_LOGIN_ERROR:
      draft.error = payload.error;
      return draft;

    case act.USER_REGISTER:
      for (let key of Object.keys(payload.user)) {
        draft[key] = payload.user[key];
      }
      return draft;
    case act.USER_REGISTER_ERROR:
      draft.error = payload.error;
      return draft;
    case act.USER_EDIT_INFORMATION:
      for (let key of Object.keys(payload.user)) {
        draft[key] = payload.user[key];
      }
      return draft;
    case act.USER_CHANGE_PASSWORD: {
      if (draft.hasOwnProperty('error')) delete draft.error;
      draft.access_token = payload.access_token;
      return draft;
    }
    case act.USER_CHANGE_PASSWORD_ERROR:
      draft.error = payload.error;
      return draft;
    case act.USER_ADD_RECEIVER:
      draft.receivers = payload.receivers;
      return draft;
    case act.USER_REMOVE_RECEIVER:
      draft.receivers = payload.receivers;
      return draft;
    case act.USER_LOGOUT:
      return (draft = {});

    default:
      break;
  }
}, {});

export default userReducer;
