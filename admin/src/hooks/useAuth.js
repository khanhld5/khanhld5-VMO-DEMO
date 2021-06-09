import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const useAuth = () => {
  const admin = useSelector((state) => state.admin);
  const [isAuth, setIsAuth] = useState(admin.hasOwnProperty('access_token'));
  useEffect(() => {
    setIsAuth(admin.hasOwnProperty('access_token'));
  }, [admin]);
  return isAuth;
};

export default useAuth;
