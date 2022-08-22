import React from 'react';
import { useNavigate } from 'react-router-dom';
import CardContent from '../../components/cardContent';
import Search from '../../components/search';

const mockAssunto = [
  {
    id: '1',
    titulo: 'Assunto 1',
    descricao: 'Esse é o assunto da discussão 1',
    data_criacao_descricao: '12/08/2022',
    data_ult_atualizacao: '21/08/2022',
    discussao_id: '1',
    usuario_id: '2',
  },
  {
    id: '3',
    titulo: 'Assunto 1',
    descricao: 'Esse é o assunto da discussão 2',
    data_criacao_descricao: '12/08/2022',
    data_ult_atualizacao: '21/08/2022',
    discussao_id: '1',
    usuario_id: '2',
  },
  {
    id: '4',
    titulo: 'Assunto 3',
    descricao: 'Esse é o assunto da discussão 3',
    data_criacao_descricao: '12/08/2022',
    data_ult_atualizacao: '21/08/2022',
    discussao_id: '1',
    usuario_id: '2',
  },
  {
    id: '5',
    titulo: 'Assunto 4',
    descricao: 'Esse é o assunto da discussão 4',
    data_criacao_descricao: '12/08/2022',
    data_ult_atualizacao: '21/08/2022',
    discussao_id: '1',
    usuario_id: '2',
  },
  {
    id: '6',
    titulo: 'Assunto 5',
    descricao: 'Esse é o assunto da discussão 5',
    data_criacao_descricao: '12/08/2022',
    data_ult_atualizacao: '21/08/2022',
    discussao_id: '1',
    usuario_id: '2',
  },
];

export const Discussao = () => {
  const navigate = useNavigate();
  const handleDiscussaoClick = () => {
    navigate('/assunto');
  };
  return (
    <>
      <Search
        onSearch={(e) => {
          console.log(e);
        }}
        style={{ marginBottom: '1rem' }}
      />
      <div style={{ gap: '2rem', display: 'flex', flexWrap: 'wrap' }}>
        {mockAssunto.map((assunto) => (
          <div
            style={{ minWidth: '300px', width: '100%', maxWidth: '550px' }}
            key={assunto.id}
          >
            <CardContent
              title={assunto.titulo}
              description={assunto.descricao}
              creation={assunto.data_criacao_descricao}
              onClick={() => handleDiscussaoClick()}
            />
          </div>
        ))}
      </div>
    </>
  );
};
