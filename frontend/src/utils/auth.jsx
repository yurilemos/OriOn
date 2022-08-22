import { message } from 'antd';
import axios from 'axios';
import React, { createContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { API_URL } from './api';

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
        console.log(error.response);
        console.log(error.response.status);
        console.log(error.response.headers);
        message.error(error.response);
      }
    }
  };

  function removeToken() {
    localStorage.removeItem('token');
    setToken(null);
  }

  const logout = async () => {
    try {
      await axios.post(`${API_URL}/sair`);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setToken(null);
      setCurrentUser({});
    } catch (error) {
      if (error.response) {
        console.log(error.response);
        console.log(error.response.status);
        console.log(error.response.headers);
        message.error(error.response);
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
