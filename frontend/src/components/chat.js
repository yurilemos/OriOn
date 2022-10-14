import { Avatar, Comment, message } from 'antd';
import React, { useEffect, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { api } from '../utils/api';
import Editor from './editor';
import DeleteModal from './modals/deleteModal';

const Chat = ({ assuntoId }) => {
  const [comments, setComments] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState('');
  const [falaId, setFalaId] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);

  const RecursiveComponent = ({ comment }) => {
    const hasChildren =
      comment.children !== undefined && comment.children.length > 0;

    return (
      <Comment
        id={comment.id}
        author={comment.author}
        avatar="https://joeschmoe.io/api/v1/random"
        content={
          <div dangerouslySetInnerHTML={{ __html: comment.content }}></div>
        }
        actions={[
          <span
            key={comment.id}
            onClick={() => {
              setFalaId(comment.id);
            }}
          >
            Responder
          </span>,
          <span
            key={comment.id}
            onClick={() => {
              setFalaId(comment.id);
              setValue(comment.content);
            }}
          >
            Editar
          </span>,
          <span
            key={comment.id}
            onClick={() => {
              setFalaId(comment.id);
              setDeleteModal(comment.content);
            }}
          >
            Excluir
          </span>,
        ]}
      >
        {falaId === comment.id && !deleteModal && (
          <Editor
            onSubmit={handleSubmit}
            submitting={submitting}
            defaultValue={value}
            onCancel={() => {
              setFalaId(null);
              setValue('');
            }}
          />
        )}
        {hasChildren ? (
          comment.children.map((children) => (
            <RecursiveComponent key={children.id} comment={children} />
          ))
        ) : (
          <></>
        )}
      </Comment>
    );
  };

  const CommentList = ({ comments }) => {
    return (
      <>
        {comments.map((comment) => {
          return <RecursiveComponent key={comment.id} comment={comment} />;
        })}
      </>
    );
  };

  const getFalas = async () => {
    message.loading('Analizando os dados');

    try {
      const response = await api.main.get(`/fala?id=${assuntoId}`);

      setComments(response.data);
      message.destroy();
    } catch (e) {
      message.destroy();
      message.error(e.response.data.message);
    }
  };

  const handleDeleteFala = async (id) => {
    message.loading('Analizando os dados');

    try {
      await api.main.delete(`/fala?falaId=${id}`);

      getFalas();
      message.destroy();
    } catch (e) {
      message.destroy();
      message.error(e.response.data.message);
    }
  };

  const handleSubmit = async (e) => {
    if (!e) return;
    setSubmitting(true);
    await handleCreateTopic({ ...e, fala_id: falaId });
    setValue('');
    setSubmitting(false);
  };

  const handleCreateTopic = async (values) => {
    message.loading('Analizando os dados');

    try {
      await api.main.post(`/fala`, {
        ...values,
        assunto_id: assuntoId,
      });
      message.destroy();
      getFalas();
    } catch (e) {
      message.destroy();
      message.error(e.response.data.message);
    }
  };

  useEffect(() => {
    getFalas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {comments.length > 0 && <CommentList comments={comments} />}
      <hr></hr>
      {!falaId && (
        <Comment
          style={{ padding: '1rem' }}
          avatar={
            <Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
          }
          content={
            <Editor
              onSubmit={handleSubmit}
              submitting={submitting}
              disable={falaId}
            />
          }
        />
      )}
      <DeleteModal
        onClose={() => {
          setDeleteModal(false);
          setFalaId(null);
        }}
        open={deleteModal}
        onFinish={(e) => {
          setDeleteModal(false);
          handleDeleteFala(falaId);
        }}
        title="Deletar a fala"
        subtitle="Tem certeza que deseja excluir essa fala?"
        description="Ao apaga-la não será possível mais visualizá-la"
      />
    </>
  );
};

export default Chat;
