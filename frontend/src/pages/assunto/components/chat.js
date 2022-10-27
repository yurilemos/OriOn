import { Comment, Tag } from 'antd';
import React, { useContext, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { dateHandlingWithMinutes } from '../../../utils/handleDate';
import Editor from './editor';
import DeleteModal from '../../../components/modals/deleteModal';
import { setColor } from '../../../utils/relationColor';
import { AvatarPic } from '../../../components/avatarPic';
import AuthContext from '../../../utils/auth';

const Chat = ({
  comments,
  isDisable,
  createFala,
  deleteFala,
  relations,
  participantes,
}) => {
  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState('');
  const [falaId, setFalaId] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const RecursiveComponent = ({ comment }) => {
    const hasChildren =
      comment.children !== undefined && comment.children.length > 0;

    const getParticipantes = (id) => {
      const usuario = participantes.filter((p) => p.id === id);
      return usuario[0]?.avatar ?? '';
    };

    return (
      <Comment
        id={comment.id}
        author={comment.author}
        avatar={<AvatarPic avatar={getParticipantes(comment.usuario_id)} />}
        content={
          <div dangerouslySetInnerHTML={{ __html: comment.content }}></div>
        }
        datetime={dateHandlingWithMinutes(comment.datetime)}
        actions={[
          <>
            {!isDisable && (
              <span
                key={comment.id}
                onClick={() => {
                  setFalaId(comment.id);
                }}
              >
                Responder
              </span>
            )}
          </>,
          <>
            {!isDisable && comment.podeExcluir && (
              <span
                key={comment.id}
                onClick={() => {
                  setFalaId(comment.id);
                  setDeleteModal(comment.content);
                }}
              >
                Excluir
              </span>
            )}
          </>,
          <>
            {relations.find((r) => r.id === comment.relacao_id)?.nome && (
              <Tag
                color={setColor(
                  relations.find((r) => r.id === comment.relacao_id)?.estilo
                )}
              >
                {relations.find((r) => r.id === comment.relacao_id)?.nome}
              </Tag>
            )}
          </>,
        ]}
      >
        {falaId === comment.id && !deleteModal && (
          <Editor
            onSubmit={handleSubmit}
            submitting={submitting}
            value={value}
            onCancel={() => {
              setFalaId(null);
              setValue('');
            }}
            disable={isDisable}
            relations={relations}
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

  const handleDeleteFala = async (id) => {
    deleteFala({ id: id });
  };

  const handleSubmit = (e) => {
    if (!e) return;
    setSubmitting(true);
    createFala({
      ...e,
      fala_id: falaId,
    });
    setValue('');
    setSubmitting(false);
  };

  return (
    <>
      {comments.length > 0 && <CommentList comments={comments} />}
      <hr></hr>
      {!falaId && (
        <Comment
          style={{ padding: '1rem' }}
          avatar={!isDisable && <AvatarPic avatar={currentUser?.avatar} />}
          content={
            <Editor
              onSubmit={handleSubmit}
              submitting={submitting}
              disable={isDisable}
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
