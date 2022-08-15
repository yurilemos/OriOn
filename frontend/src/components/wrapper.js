import React from 'react';
import { Index } from '../pages/index/index';
import useToken from '../utils/useToken';

const Wrapper = ({ children }) => {
  const { token } = useToken();
  console.log(token);
  if (!token || token === '' || token === undefined) {
    return <Index />;
  }
  return children;
};

export default Wrapper;
