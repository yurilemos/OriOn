import { message } from 'antd';
import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Chat from '../../components/chat';
import Search from '../../components/search';
import { API_URL } from '../../utils/api';

export const Assunto = () => {
  const { assuntoId } = useParams();
  const [topic, setTopic] = useState([]);

  useEffect(() => {
    const handleGetDiscussionEffect = async () => {
      message.loading('Analizando os dados');

      try {
        const res = await axios.get(`${API_URL}/assunto?id=${assuntoId}`);

        setTopic(res.data);
        message.destroy();
      } catch (e) {
        message.destroy();
        message.error(e.response.data.message);
      }
    };
    handleGetDiscussionEffect();
  }, [assuntoId]);

  return (
    <>
      <h1 style={{ fontSize: '20px' }}>{topic.titulo}</h1>
      <div
        style={{
          display: 'flex',
          gap: '3rem',
          marginBottom: '1rem',
          alignItems: 'center',
        }}
      >
        <Search onSearch={(e) => {}} />
      </div>
      <Chat assuntoId={parseInt(assuntoId)} />
    </>
  );
};
