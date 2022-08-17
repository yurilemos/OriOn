import React from 'react';
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout as LayoutAntd, Menu, Button } from 'antd';
import useToken from '../utils/useToken';
import { useNavigate } from 'react-router-dom';

const { Header, Content, Sider } = LayoutAntd;

const items = [
  {
    key: 1,
    icon: null,
    label: `Grupos públicos`,
    children: [
      {
        key: 2,
        label: `grupo público 1`,
      },
      {
        key: 3,
        label: `grupo público 2`,
      },
    ],
  },
  {
    key: 4,
    icon: null,
    label: `Grupos privados`,
    children: [
      {
        key: 5,
        label: `grupo privados 1`,
      },
      {
        key: 6,
        label: `grupo privados 2`,
      },
    ],
  },
  {
    key: 7,
    icon: null,
    label: `Grupos privados`,
    children: [
      {
        key: 8,
        label: `grupo privados 1`,
      },
      {
        key: 9,
        label: `grupo privados 2`,
      },
    ],
  },
];

const Layout = ({ children }) => {
  const { logout } = useToken();
  let navigate = useNavigate();

  return (
    <LayoutAntd style={{ height: '100%' }}>
      <Header
        className="site-page-header"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: '#0077B6',
          border: '#0077B6',
          color: 'white',
        }}
        onBack={() => null}
      >
        <h1 style={{ color: 'white' }}>OriOn</h1>
        <Button
          onClick={() => {
            logout();
            navigate('/login');
          }}
        >
          sair
        </Button>
      </Header>
      <LayoutAntd>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{
              height: '100%',
              background: '#0077B6',
              color: 'white',
            }}
            items={items}
          />
        </Sider>
        <LayoutAntd
          style={{
            padding: '0 24px 24px',
          }}
        >
          <Breadcrumb
            style={{
              margin: '16px 0',
            }}
          >
            <Breadcrumb.Item>Home</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            {children}
          </Content>
        </LayoutAntd>
      </LayoutAntd>
    </LayoutAntd>
  );
};

export default Layout;
