import { Button } from 'antd';
import React from 'react';
import useToken from '../../utils/useToken';

export const Home = () => {
  const { logout } = useToken();
  return (
    <Button
      onClick={() => {
        logout();
      }}
    >
      sair
    </Button>
  );
};
