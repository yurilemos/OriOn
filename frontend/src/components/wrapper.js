import React, { useEffect } from 'react';
import useToken from '../utils/useToken';
import { useNavigate } from 'react-router-dom';
import Layout from './layout';

const Wrapper = ({ children }) => {
  const { token } = useToken();
  console.log(token);
  let navigate = useNavigate();

  useEffect(() => {
    if (!token || token === '' || token === undefined) {
      navigate('/login');
    }
  }, [token, navigate]);

  return <Layout>{children}</Layout>;
};

export default Wrapper;
