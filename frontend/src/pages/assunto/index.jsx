import React from 'react';
import Chat from '../../components/chat';
import Search from '../../components/search';

export const Assunto = () => {
  return (
    <>
      <Search
        onSearch={(e) => {
          console.log(e);
        }}
        style={{ marginBottom: '1rem' }}
      />
      <Chat />
    </>
  );
};
