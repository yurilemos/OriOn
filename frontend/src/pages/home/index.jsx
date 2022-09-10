import React from 'react';
import CardContent from '../../components/cardContent';
import { useNavigate } from 'react-router-dom';
import Search from '../../components/search';
import Button from '../../components/button';
import { useState } from 'react';
import { message } from 'antd';
import axios from 'axios';
import { API_URL } from '../../utils/api';
import { useContext } from 'react';
import AuthContext from '../../utils/auth';
import { useEffect } from 'react';
import GrupoDiscussaoModal from './modals/grupoDiscussao';
import DiscussaoModal from './modals/discussao';

export const Home = () => {
  const navigate = useNavigate();
  const handleDiscussaoClick = (id) => {
    navigate(`/discussao/${id}`);
  };
  const { currentUser } = useContext(AuthContext);

  const [groups, setGroups] = useState([]);
  const [groupId, setGroupId] = useState(null);

  const handleGetGroup = async () => {
    message.loading('Analizando os dados');

    try {
      const res = await axios.get(
        `${API_URL}/grupo?userId=${currentUser.userId}`
      );

      setGroups(res.data);
      message.destroy();
    } catch (e) {
      message.destroy();
      message.error(e.response.data);
    }
  };

  const handleCreateGroup = async (values) => {
    message.loading('Analizando os dados');

    try {
      await axios.post(`${API_URL}/grupo`, {
        ...values,
        usuario_id: currentUser.userId,
      });
      message.destroy();
      handleGetGroup();
    } catch (e) {
      message.destroy();
      message.error(e.response.data);
    }
  };

  const handleCreateDiscussion = async (values) => {
    message.loading('Analizando os dados');

    try {
      await axios.post(`${API_URL}/discussao`, {
        ...values,
        usuario_id: currentUser.userId,
        grupo_id: groupId,
      });
      message.destroy();
      handleGetGroup();
    } catch (e) {
      message.destroy();
      message.error(e.response.data);
    }
  };

  useEffect(() => {
    const handleGetGroupEffect = async () => {
      message.loading('Analizando os dados');

      try {
        const res = await axios.get(
          `${API_URL}/grupo?userId=${currentUser.userId}`
        );

        setGroups(res.data);
        message.destroy();
      } catch (e) {
        console.log(e);
        message.destroy();
        message.error(e.response.data);
      }
    };
    if (currentUser.userId) {
      handleGetGroupEffect();
    }
  }, [currentUser]);

  const [addGroupModal, setAddGroupModal] = useState(false);
  const [addDiscussionModal, setAddDiscussionModal] = useState(false);
  return (
    <>
      <div
        style={{
          display: 'flex',
          gap: '3rem',
          marginBottom: '1rem',
          alignItems: 'center',
        }}
      >
        <Button
          onClick={() => {
            setAddGroupModal(true);
          }}
        >
          Adicionar um novo grupo
        </Button>
        <Search
          onSearch={(e) => {
            console.log(e);
          }}
        />
      </div>
      <div style={{ gap: '2rem', display: 'flex', flexWrap: 'wrap' }}>
        {groups.map((grupo) => (
          <div
            style={{ minWidth: '300px', width: '100%', maxWidth: '550px' }}
            key={grupo.id}
          >
            <CardContent
              title={grupo.nome}
              description={grupo.descricao}
              visibility={grupo.visibilidade}
              creation={grupo.data_criacao}
              onCreate={() => {
                setAddDiscussionModal(true);
                setGroupId(grupo.id);
              }}
            >
              <div
                style={{
                  gap: '2rem',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {grupo.discussoes.map((discussao) => (
                  <CardContent
                    title={discussao.nome}
                    description={discussao.descricao}
                    creation={discussao.data_criacao}
                    key={discussao.id}
                    onClick={() => handleDiscussaoClick(discussao.id)}
                  />
                ))}
              </div>
            </CardContent>
          </div>
        ))}
      </div>
      <GrupoDiscussaoModal
        onClose={() => {
          setAddGroupModal(false);
        }}
        open={addGroupModal}
        onFinish={(e) => {
          handleCreateGroup(e);
          setAddGroupModal(false);
        }}
      />
      <DiscussaoModal
        onClose={() => {
          setAddDiscussionModal(false);
        }}
        open={addDiscussionModal}
        onFinish={(e) => {
          handleCreateDiscussion(e);
          setAddDiscussionModal(false);
        }}
      />
    </>
  );
};
