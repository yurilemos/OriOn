import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/button';
import CardContent from '../../components/cardContent';
import AssuntoDiscussionModal from './modals/addEdit';
import Search from '../../components/search';
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../../utils/auth';
import DeleteModal from '../../components/modals/deleteModal';
import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import useDiscussion from './hooks/discussionHooks';

export const Discussao = () => {
  const navigate = useNavigate();
  const { discussionId } = useParams();
  const { currentUser } = useContext(AuthContext);
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteAssuntoModal, setDeleteAssuntoModal] = useState(false);
  const [chosenAssunto, setChosenAssunto] = useState(null);

  const {
    discussao = {},
    deleteDiscussion,
    createTopic,
    deleteTopic,
    editDiscussion,
  } = useDiscussion({
    userId: currentUser.userId,
    discussionId,
  });

  const handleDiscussaoClick = (id) => {
    navigate(`/assunto/${id}`);
  };

  const handleCreateTopic = async (values) => {
    createTopic(values);
  };

  const handleEditTopic = async (values) => {
    editDiscussion(values);
  };

  const handleDeleteDiscussion = async (id) => {
    deleteDiscussion();
    navigate(-1);
  };

  const handleEditDiscussion = async (id) => {};

  const handleDeleteAssunto = async (id) => {
    deleteTopic({ assuntoId: id });
  };

  return (
    <>
      <h1 style={{ fontSize: '20px' }}>{discussao.titulo}</h1>
      <div
        style={{
          display: 'flex',
          gap: '3rem',
          margin: '1rem 0',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: '1rem',
            margin: '1rem 0',
            alignItems: 'center',
          }}
        >
          <Button
            variant="primary"
            icon={<PlusOutlined />}
            style={{ width: '50px' }}
            onClick={(event) => {
              setAddModal(true);
            }}
          />
          <Button
            variant="primary"
            icon={<EditOutlined />}
            style={{ width: '50px' }}
            onClick={() => {
              setEditModal(true);
            }}
          />
          <Button
            variant="primary"
            icon={<DeleteOutlined />}
            style={{ width: '50px' }}
            onClick={() => {
              setDeleteModal(true);
            }}
          />
        </div>
        <Search onSearch={(e) => {}} />
      </div>
      <div style={{ gap: '2rem', display: 'flex', flexWrap: 'wrap' }}>
        {discussao?.assuntos?.map((assunto) => (
          <div
            style={{ minWidth: '300px', width: '100%', maxWidth: '550px' }}
            key={assunto.id}
          >
            <CardContent
              title={assunto.nome}
              description={assunto.descricao}
              creation={assunto.data_criacao}
              onClick={() => handleDiscussaoClick(assunto.id)}
              onDelete={() => {
                setDeleteAssuntoModal(true);
                setChosenAssunto(assunto);
              }}
            />
          </div>
        ))}
      </div>
      <AssuntoDiscussionModal
        onClose={() => {
          setAddModal(false);
        }}
        open={addModal}
        onFinish={(e) => {
          handleCreateTopic(e);
          setAddModal(false);
        }}
        title="Criar um novo assunto"
      />
      <AssuntoDiscussionModal
        onClose={() => {
          setEditModal(false);
        }}
        open={editModal}
        onFinish={(e) => {
          handleEditTopic(e);
          setEditModal(false);
          handleEditDiscussion(discussionId);
        }}
        title="Editar a discussão"
        formValue={discussao}
      />
      <DeleteModal
        onClose={() => {
          setDeleteModal(false);
        }}
        open={deleteModal}
        onFinish={(e) => {
          setDeleteModal(false);
          handleDeleteDiscussion(discussionId);
        }}
        title="Deletar a discussão"
        subtitle="Tem certeza que deseja excluir essa discussão?"
        description="Ao apaga-la todos os temas relacionados a ela (assuntos e falas) também serão excluidos"
      />
      <DeleteModal
        onClose={() => {
          setDeleteModal(false);
          setChosenAssunto(null);
        }}
        open={deleteAssuntoModal}
        onFinish={(e) => {
          setDeleteAssuntoModal(false);
          handleDeleteAssunto(chosenAssunto.id);
        }}
        title="Deletar o assunto"
        subtitle="Tem certeza que deseja excluir esse assunto?"
        description="Ao apaga-lo todos os temas relacionados a ele (falas) também serão excluidos"
      />
    </>
  );
};
