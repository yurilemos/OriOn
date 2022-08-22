import React from 'react';
import { Breadcrumb, Layout as LayoutAntd, Menu, Button } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../utils/auth';

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
  const { logout } = useContext(AuthContext);
  let navigate = useNavigate();
  const location = useLocation();

  const handlePageName = {
    '/home': 'Grupo de Discussão',
  };

  return (
    <LayoutAntd style={{ height: '100%', width: '100%', overflow: 'scroll' }}>
      <Header
        className="site-page-header"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
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
            <Breadcrumb.Item>
              <h1 style={{ fontSize: '20px' }}>
                {handlePageName[location.pathname]}
              </h1>
            </Breadcrumb.Item>
          </Breadcrumb>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              overflow: 'scroll',
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
