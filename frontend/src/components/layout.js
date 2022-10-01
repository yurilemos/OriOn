import React from 'react';
import { Breadcrumb, Layout as LayoutAntd, Menu, Button, Dropdown } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../utils/auth';
import { ArrowLeftOutlined, UserOutlined } from '@ant-design/icons';

const { Header, Content, Sider } = LayoutAntd;

const items = [
  {
    key: 1,
    icon: null,
    label: `Todos os grupos`,
  },
  {
    key: 2,
    icon: null,
    label: `Grupos públicos`,
    children: [
      {
        key: 3,
        label: `Meus grupos`,
      },
      {
        key: 4,
        label: `Grupos arquivados`,
      },
    ],
  },
  {
    key: 5,
    icon: null,
    label: `Grupos privados`,
    children: [
      {
        key: 6,
        label: `Meus Grupos`,
      },
      {
        key: 7,
        label: `Grupos arquivados`,
      },
    ],
  },
  {
    key: 8,
    icon: null,
    label: `Grupos de usuários`,
  },
];

const Layout = ({ children }) => {
  const { logout, currentUser } = useContext(AuthContext);
  let navigate = useNavigate();
  const location = useLocation();

  const handlePageName = {
    '/home': 'Grupo de Discussão',
    '/discussao': 'Discussão',
    '/assunto': 'Assunto',
  };

  const onMenuClick = (e) => {
    if (e.key === '3') {
      logout();
      navigate('/login');
    }
  };

  return (
    <LayoutAntd style={{ height: '100%', width: '100%', overflow: 'scroll' }}>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '90px',
        }}
      >
        <h1 style={{ color: 'white', fontSize: '3rem' }}>OriOn</h1>

        <div
          style={{
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            gap: '0.2rem',
          }}
        >
          <Dropdown
            style={{ width: '40px', height: '40px' }}
            placement="bottom"
            overlay={
              <Menu
                onClick={onMenuClick}
                items={[
                  {
                    key: 1,
                    label: 'Perfil',
                  },
                  {
                    key: 2,
                    label: 'Configurações',
                  },
                  {
                    key: 3,
                    label: 'Sair',
                  },
                ]}
              />
            }
          >
            <Button
              icon={<UserOutlined />}
              shape="circle"
              style={{ width: '40px', height: '40px' }}
            />
          </Dropdown>
          <span
            style={{ display: 'flex', alignItems: 'center', height: '20px' }}
          >
            {currentUser.name}
          </span>
        </div>
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
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '2rem',
                  cursor: 'pointer',
                }}
              >
                {location.pathname !== '/home' && (
                  <ArrowLeftOutlined
                    style={{ fontSize: '30px' }}
                    onClick={() => {
                      navigate(-1);
                    }}
                  />
                )}
                <h1 style={{ fontSize: '20px', marginBottom: '0px' }}>
                  {handlePageName[location.pathname]}
                </h1>
              </div>
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
