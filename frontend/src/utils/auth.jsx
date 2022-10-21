import { message } from 'antd';
import axios from 'axios';
import React, { createContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { api, API_URL } from './api';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  function getToken() {
    const userToken = localStorage.getItem('token');
    return userToken && userToken;
  }

  const [token, setToken] = useState(getToken());
  const [currentUser, setCurrentUser] = useState({});

  const login = async ({ login, senha }) => {
    message.loading('Analizando os dados');
    try {
      const res = await axios.post(`${API_URL}/login`, {
        login,
        senha,
      });

      if (res.data.access_token) {
        localStorage.setItem('user', JSON.stringify(res.data.user));
        localStorage.setItem('token', res.data.access_token);
        setCurrentUser(res.data.user);
        setToken(res.data.access_token);
        message.destroy();
      } else {
        message.destroy();
        message.error('Usuário ou senha inválido');
      }
    } catch (error) {
      message.destroy();
      if (error.response) {
        message.destroy();
        message.error(error.response);
      }
    }
  };

  const updateUser = async () => {
    try {
      const res = await api.main.get(`/usuario`);

      const user = {
        avatar: res.data.avatar,
        email: res.data.email,
        name: res.data.nome,
        profile: res.data.nome,
        userId: res.data.id,
      };
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      }
    } catch (error) {
      if (error.response) {
        message.error(error.response);
      }
    }
  };

  const logout = async () => {
    try {
      await axios.post(`${API_URL}/sair`);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setToken(null);
      setCurrentUser({});
    } catch (error) {
      if (error.response) {
        message.error(error.response.data);
      }
    }
  };

  useEffect(() => {
    const storagedUser = localStorage.getItem('user');
    const storagedToken = localStorage.getItem('token');

    if (storagedToken && storagedUser) {
      setCurrentUser(JSON.parse(storagedUser));
      setToken(storagedToken);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signed: currentUser.userId ? true : false,
        login,
        logout,
        token,
        currentUser,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
