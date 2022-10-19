import React from 'react';
import { useParams } from 'react-router-dom';
import Chat from './components/chat';
import useAssunto from './hooks/useAssunto';

export const Assunto = () => {
  const { assuntoId } = useParams();

  const { assunto = [] } = useAssunto({ assuntoId });

  return (
    <>
      <h1 style={{ fontSize: '20px' }}>{assunto.titulo}</h1>

      <Chat assuntoId={parseInt(assuntoId)} />
    </>
  );
};
