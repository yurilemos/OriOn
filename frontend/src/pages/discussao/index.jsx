import { message } from 'antd';
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/button';
import CardContent from '../../components/cardContent';
import AssuntoModal from './modals/assunto';
import Search from '../../components/search';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { API_URL } from '../../utils/api';
import axios from 'axios';
import { useContext } from 'react';
import AuthContext from '../../utils/auth';

export const Discussao = () => {
  const navigate = useNavigate();
  const { discussionId } = useParams();
  const [discussion, setDiscussion] = useState({});
  const { currentUser } = useContext(AuthContext);

  const handleDiscussaoClick = (id) => {
    navigate(`/assunto/${id}`);
  };

  const handleGetDiscussion = async () => {
    message.loading('Analizando os dados');

    try {
      const res = await axios.get(`${API_URL}/discussao?id=${discussionId}`);

      setDiscussion(res.data);
      message.destroy();
    } catch (e) {
      console.log(e);
      message.destroy();
      message.error(e.response.data);
    }
  };

  const handleCreateTopic = async (values) => {
    message.loading('Analizando os dados');

    try {
      await axios.post(`${API_URL}/assunto`, {
        ...values,
        usuario_id: currentUser.userId,
        discussao_id: discussionId,
      });
      message.destroy();
      handleGetDiscussion();
    } catch (e) {
      message.destroy();
      message.error(e.response.data);
    }
  };

  useEffect(() => {
    const handleGetDiscussionEffect = async () => {
      message.loading('Analizando os dados');

      try {
        const res = await axios.get(`${API_URL}/discussao?id=${discussionId}`);

        setDiscussion(res.data);
        message.destroy();
      } catch (e) {
        console.log(e);
        message.destroy();
        message.error(e.response.data);
      }
    };
    handleGetDiscussionEffect();
  }, [discussionId]);

  const [addModal, setAddModal] = useState(false);

  return (
    <>
      <h1 style={{ fontSize: '20px' }}>{discussion.titulo}</h1>
      <div
        style={{
          display: 'flex',
          gap: '3rem',
          margin: '1rem 0',
          alignItems: 'center',
        }}
      >
        <Button
          onClick={() => {
            setAddModal(true);
          }}
        >
          Adicionar um novo assunto
        </Button>
        <Search
          onSearch={(e) => {
            console.log(e);
          }}
        />
      </div>
      <div style={{ gap: '2rem', display: 'flex', flexWrap: 'wrap' }}>
        {discussion?.assuntos?.map((assunto) => (
          <div
            style={{ minWidth: '300px', width: '100%', maxWidth: '550px' }}
            key={assunto.id}
          >
            <CardContent
              title={assunto.nome}
              description={assunto.descricao}
              creation={assunto.data_criacao}
              onClick={() => handleDiscussaoClick(assunto.id)}
            />
          </div>
        ))}
      </div>
      <AssuntoModal
        onClose={() => {
          setAddModal(false);
        }}
        open={addModal}
        onFinish={(e) => {
          handleCreateTopic(e);
          setAddModal(false);
        }}
      />
    </>
  );
};
