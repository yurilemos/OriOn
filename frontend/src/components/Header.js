import React from 'react';
import { PageHeader, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../utils/auth';

const Header = () => {
  const { logout } = useContext(AuthContext);
  let navigate = useNavigate();
  return (
    <PageHeader
      className="site-page-header"
      style={{ background: '#0077B6', border: '#0077B6', color: 'white' }}
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
