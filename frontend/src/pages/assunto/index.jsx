import React from 'react';
import { useParams } from 'react-router-dom';
import Chat from './components/chat';
import useAssunto from './hooks/useAssunto';
import useFala from './hooks/useFala';

export const Assunto = () => {
  const { assuntoId } = useParams();

  const { assunto = [] } = useAssunto({ assuntoId });
  const {
    data = { falas: [], podeEditar: false },
    createFala,
    deleteFala,
    relations,
  } = useFala({ assuntoId });

  return (
    <>
      <h1 style={{ fontSize: '20px' }}>{assunto.titulo}</h1>

      <Chat
        comments={data.falas ?? []}
        isDisable={!data.podeEditar}
        createFala={createFala}
        deleteFala={deleteFala}
        relations={relations}
        participantes={data.participantes ?? []}
      />
    </>
  );
};
