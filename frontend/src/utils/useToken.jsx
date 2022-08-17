import { useState } from 'react';
import { API_URL } from '../utils/api';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const onFinishFailed = (error) => {
  console.log(error);
};

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
      const res = await axios.post(`${API_URL}/sair`);
      removeToken();
      console.log(res);
    } catch (error) {
      if (error.response) {
        console.log(error.response);
        console.log(error.response.status);
        console.log(error.response.headers);
        toast.error(error.response);
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
