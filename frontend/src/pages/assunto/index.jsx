import { message } from 'antd';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Chat from '../../components/chat';
import { api } from '../../utils/api';

export const Assunto = () => {
  const { assuntoId } = useParams();
  const [topic, setTopic] = useState([]);

  useEffect(() => {
    const handleGetDiscussionEffect = async () => {
      message.loading('Analizando os dados');

      try {
        const res = await api.main.get(`/assunto?id=${assuntoId}`);

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

      <Chat assuntoId={parseInt(assuntoId)} />
    </>
  );
};
