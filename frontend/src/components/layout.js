import React from 'react';
import { Breadcrumb, Layout as LayoutAntd, Menu, Button, Dropdown } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../utils/auth';
import { ProfilePic } from './profilePic';
import { ArrowLeftOutlined, UserOutlined } from '@ant-design/icons';
import { AvatarPic } from './avatarPic';

const { Header, Content, Sider } = LayoutAntd;

const items = [
  {
    key: 1,
    icon: null,
    label: `Todos os grupos`,
    path: '/home',
  },
  {
    key: 2,
    icon: null,
    label: `Grupos públicos`,
    children: [
      {
        key: 3,
        label: `Meus grupos`,
        path: '/meus-grupos/1',
      },
      {
        key: 4,
        label: `Grupos arquivados`,
        path: '/meus-grupos-arquivados/1',
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
        path: '/meus-grupos/2',
      },
      {
        key: 7,
        label: `Grupos arquivados`,
        path: '/meus-grupos-arquivados/2',
      },
    ],
  },
];

const Layout = ({ children }) => {
  const { logout, currentUser } = useContext(AuthContext);
  const location = useLocation();

  let navigate = useNavigate();

  const handlePageName = () => {
    if (location.pathname.includes('/home')) return 'Grupos de discussão';
    if (location.pathname.includes('/discussao')) return 'Discussões';
    if (location.pathname.includes('/assunto')) return 'Assuntos';
    if (location.pathname.includes('/fala')) return 'Falas';
    if (location.pathname.includes('/meus-grupos')) return 'Meus grupos';
    if (location.pathname.includes('/meus-grupos-arquivados'))
      return 'Meus grupos arquivados';
    return '';
  };

  const onMenuClick = (e) => {
    if (e.key === '1') {
      navigate('/home');
    } else if (e.key === '3') {
      navigate('/meus-grupos/1');
    } else if (e.key === '4') {
      navigate('/meus-grupos-arquivados/1');
    } else if (e.key === '6') {
      navigate('/meus-grupos/2');
    } else if (e.key === '7') {
      navigate('/meus-grupos-arquivados/2');
    }
  };

  const onMiniMenuClick = (e) => {
    if (e.key === '1') {
      navigate('/perfil');
    }
    if (e.key === '3') {
      logout();
      navigate('/login');
    }
  };

  const handleSelectedMenu = () => {
    if (location.pathname.includes('/home')) return ['1'];
    if (location.pathname.includes('/meus-grupos/1')) return ['3', '2'];
    if (location.pathname.includes('/meus-grupos/2')) return ['6', '5'];
    if (location.pathname.includes('/meus-grupos-arquivados/1'))
      return ['4', '2'];
    if (location.pathname.includes('/meus-grupos-arquivados/2'))
      return ['7', '7'];
    return ['1'];
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
                onClick={onMiniMenuClick}
                items={[
                  {
                    key: 1,
                    label: 'Perfil',
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
              icon={<AvatarPic avatar={currentUser.avatar} />}
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
            defaultSelectedKeys={handleSelectedMenu()}
            style={{
              height: '100%',
            }}
            items={items}
            onClick={onMenuClick}
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
                {location.pathname !== '/home' &&
                  !location.pathname.includes('/meus-grupos') &&
                  !location.pathname.includes('/meus-grupos-arquivados') && (
                    <ArrowLeftOutlined
                      style={{ fontSize: '30px' }}
                      onClick={() => {
                        navigate(-1);
                      }}
                    />
                  )}
                <h1 style={{ fontSize: '20px', marginBottom: '0px' }}>
                  {handlePageName()}
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
