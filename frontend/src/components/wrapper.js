import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from './layout';
import { useContext } from 'react';
import AuthContext from '../utils/auth';

const Wrapper = ({ children }) => {
  const { token } = useContext(AuthContext);
  let navigate = useNavigate();

  useEffect(() => {
    if (!token || token === '' || token === undefined) {
      navigate('/login');
    }
  }, [token, navigate]);

  return <Layout>{children}</Layout>;
};

export default Wrapper;
