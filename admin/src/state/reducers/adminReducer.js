import * as act from '../../constant';
import produce from 'immer';

const adminReducer = produce((draft, action) => {
  const payload = action.payload;
  switch (action.type) {
    case act.REMOVE_LOGIN_ERROR: {
      if (draft.hasOwnProperty('error')) delete draft.error;
      return draft;
    }
    case act.LOGIN:
      for (let key of Object.keys(payload.admin))
        draft[key] = payload.admin[key];
      return draft;

    case act.LOGIN_FAIL:
      draft.error = payload.error;
      return draft;
    case act.RENEW_TOKEN:
      draft.access_token = payload.access_token;
      return draft;
    case act.LOGOUT: {
      if (payload) return (draft = { error: payload.error });
      return (draft = {});
    }
    default:
      return;
  }
}, JSON.parse(localStorage.getItem(`admin`)) || {});
export default adminReducer;
