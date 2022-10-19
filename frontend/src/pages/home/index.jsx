import React from 'react';
import CardContent from '../../components/cardContent';
import { useNavigate } from 'react-router-dom';
import Search from '../../components/search';
import Button from '../../components/button';
import { useState } from 'react';
import { useContext } from 'react';
import AuthContext from '../../utils/auth';
import GrupoDiscussaoModal from './modals/grupoDiscussao';
import DiscussaoModal from './modals/discussao';
import DeleteModal from '../../components/modals/deleteModal';
import useGroup from './hooks/groupHooks';
import UserModal from './modals/userModal';
import { dateHandlingWithoutMinutes } from '../../utils/handleDate';

export const Home = () => {
  const navigate = useNavigate();
  const handleDiscussaoClick = (id) => {
    navigate(`/discussao/${id}`);
  };
  const { currentUser } = useContext(AuthContext);

  const [group, setGroup] = useState(null);

  const {
    grupos = [],
    createGroup,
    editGroup,
    deleteGroup,
    createDiscussion,
  } = useGroup({});

  const handleCreateGroup = (values) => {
    createGroup(values);
  };

  const handleEditGroup = (values) => {
    editGroup({ ...values, grupo_id: group.id });
  };

  const handleDeleteGroup = () => {
    deleteGroup({ grupo_id: group.id });
  };

  const handleCreateDiscussion = (values) => {
    createDiscussion({
      ...values,
      grupo_id: group.id,
    });
  };

  const handleEditDiscussion = (values) => {};

  const [addGroupModal, setAddGroupModal] = useState(false);
  const [editGroupModal, setEditGroupModal] = useState(false);
  const [editDiscussionModal, setEditDiscussionModal] = useState(false);
  const [deleteGroupModal, setDeleteGroupModal] = useState(false);
  const [addDiscussionModal, setAddDiscussionModal] = useState(false);
  const [userModal, setUserModal] = useState(false);
  const [searchText, setSearchText] = useState('');

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
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />
      </div>
      <h1 style={{ margin: '1rem 0' }}>Grupos públicos:</h1>
      <div style={{ gap: '2rem', display: 'flex', flexWrap: 'wrap' }}>
        {grupos
          .filter((group) => group.visibilidade === 1)
          .filter(
            (grupo) =>
              grupo.nome.toLowerCase().match(searchText.toLowerCase()) ||
              grupo.descricao?.toLowerCase().match(searchText.toLowerCase())
          )
          .map((grupo) => (
            <div
              style={{ minWidth: '300px', width: '100%', maxWidth: '550px' }}
              key={grupo.id}
            >
              <CardContent
                title={grupo.nome}
                description={grupo.descricao}
                canEdit={grupo.podeEditar}
                creation={dateHandlingWithoutMinutes(grupo.data_criacao)}
                onCreate={() => {
                  setAddDiscussionModal(true);
                  setGroup(grupo);
                }}
                onDelete={() => {
                  setDeleteGroupModal(true);
                  setGroup(grupo);
                }}
                onEdit={() => {
                  setEditGroupModal(true);
                  setGroup(grupo);
                }}
                onUserEdit={() => {
                  setUserModal(true);
                  setGroup(grupo);
                }}
                isDisable={!grupo.podeEditar}
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
                      canEdit={grupo.podeEditar}
                      description={discussao.descricao}
                      creation={dateHandlingWithoutMinutes(
                        discussao.data_criacao
                      )}
                      key={discussao.id}
                      onClick={() => handleDiscussaoClick(discussao.id)}
                      groupDiscussion={false}
                      isDisable={!discussao.podeEditar}
                    />
                  ))}
                </div>
              </CardContent>
            </div>
          ))}
      </div>
      <h1 style={{ margin: '1rem 0' }}>Grupos privados:</h1>
      <div style={{ gap: '2rem', display: 'flex', flexWrap: 'wrap' }}>
        {grupos
          .filter((group) => group.visibilidade === 2)
          .filter(
            (grupo) =>
              grupo.nome.toLowerCase().match(searchText.toLowerCase()) ||
              grupo.descricao?.toLowerCase().match(searchText.toLowerCase())
          )
          .map((grupo) => (
            <div
              style={{ minWidth: '300px', width: '100%', maxWidth: '550px' }}
              key={grupo.id}
            >
              <CardContent
                title={grupo.nome}
                description={grupo.descricao}
                visibility={grupo.visibilidade}
                canEdit={grupo.podeEditar}
                creation={dateHandlingWithoutMinutes(grupo.data_criacao)}
                onCreate={() => {
                  setAddDiscussionModal(true);
                  setGroup(grupo);
                }}
                onDelete={() => {
                  setDeleteGroupModal(true);
                  setGroup(grupo);
                }}
                onEdit={() => {
                  setEditGroupModal(true);
                  setGroup(grupo);
                }}
                onUserEdit={() => {
                  setUserModal(true);
                  setGroup(grupo);
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
                      canEdit={grupo.podeEditar}
                      description={discussao.descricao}
                      creation={dateHandlingWithoutMinutes(
                        discussao.data_criacao
                      )}
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
        title="Criar um novo grupo de discussão"
      />
      <GrupoDiscussaoModal
        onClose={() => {
          setEditGroupModal(false);
        }}
        open={editGroupModal}
        onFinish={(e) => {
          handleEditGroup(e);
          setEditGroupModal(false);
        }}
        title="Editar um novo grupo de discussão"
        formValue={group}
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
        title="Criar uma nova discussão"
        form={group}
      />
      <DiscussaoModal
        onClose={() => {
          setEditDiscussionModal(false);
        }}
        open={editDiscussionModal}
        onFinish={(e) => {
          handleEditDiscussion(e);
          setEditDiscussionModal(false);
        }}
        title="Editar uma nova discussão"
      />
      <DeleteModal
        onClose={() => {
          setDeleteGroupModal(false);
        }}
        open={deleteGroupModal}
        onFinish={(e) => {
          setDeleteGroupModal(false);
          handleDeleteGroup(group.id);
        }}
        title="Deletar o grupo de discussão"
        subtitle="Tem certeza que deseja excluir esse grupo de discussão?"
        description="Ao apaga-lo todos os temas relacionados a ele também serão excluidos"
      />
      <UserModal
        onClose={() => {
          setUserModal(false);
        }}
        open={userModal}
        groupId={group?.id ?? ''}
        userId={currentUser.userId}
      />
    </>
  );
};
