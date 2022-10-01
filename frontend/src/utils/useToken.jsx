import { useState } from 'react';
import { API_URL } from '../utils/api';
import axios from 'axios';
import { message } from 'antd';

function useToken() {
  function getToken() {
    const userToken = localStorage.getItem('token');
    return userToken && userToken;
  }

  const [token, setToken] = useState(getToken());

  function saveToken(userToken) {
    localStorage.setItem('token', userToken);
    setToken(userToken);
  }

  function removeToken() {
    localStorage.removeItem('token');
    setToken(null);
  }

  const logout = async () => {
    try {
      await axios.post(`${API_URL}/sair`);
      removeToken();
    } catch (error) {
      if (error.response) {
        message.error(error.response.data);
      }
    }
  };

  return {
    setToken: saveToken,
    token,
    logout,
  };
}

export default useToken;
