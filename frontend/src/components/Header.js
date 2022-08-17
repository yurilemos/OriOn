import React from 'react';
import { PageHeader, Button } from 'antd';
import useToken from '../utils/useToken';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { logout } = useToken();
  let navigate = useNavigate();
  return (
    <PageHeader
      className="site-page-header"
      style={{ background: '#0077B6', border: '#0077B6', color: 'white' }}
      onBack={() => null}
      title="Title"
      subTitle="This is a subtitle"
      extra={[
        <Button
          onClick={() => {
            logout();
            navigate('/login');
          }}
        >
          sair
        </Button>,
      ]}
    />
  );
};

export default Header;
