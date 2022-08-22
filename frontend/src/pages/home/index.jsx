import React from 'react';
import CardContent from '../../components/cardContent';
import { useNavigate } from 'react-router-dom';

const mockGrupoDiscussão = [
  {
    id: '1',
    nome_grupo: 'Grupo de Discussão 1',
    descricao_grupo: 'esse é um grupo de discussão 1',
    data_criacao_grupo: '21/08/2022',
    visibilidade_grupo: 0,
    status_grupo: 1,
    usuario_id: '2',
    discussoes: [
      {
        id: '4',
        titulo: 'Discussao 1',
        descricao: 'essa é a discussão 1',
        data_criacao_descricao: '22/08/2022',
        grupo_id: '1',
        usuario_id: '2',
      },
      {
        id: '5',
        titulo: 'Discussao 2',
        descricao: 'essa é a discussão 2',
        data_criacao_descricao: '22/08/2022',
        grupo_id: '1',
        usuario_id: '2',
      },
    ],
  },
  {
    id: '3',
    nome_grupo: 'Grupo de Discussão 2',
    descricao_grupo: 'esse é um grupo de discussão 2',
    data_criacao_grupo: '21/08/2022',
    visibilidade_grupo: 0,
    status_grupo: 1,
    usuario_id: '2',
    discussoes: [
      {
        id: '6',
        titulo: 'Discussao 3',
        descricao: 'essa é a discussão 3',
        data_criacao_descricao: '22/08/2022',
        grupo_id: '3',
        usuario_id: '2',
      },
    ],
  },
  {
    id: '7',
    nome_grupo: 'Grupo de Discussão 3',
    descricao_grupo: 'esse é um grupo de discussão 1',
    data_criacao_grupo: '21/08/2022',
    visibilidade_grupo: 0,
    status_grupo: 1,
    usuario_id: '2',
    discussoes: [
      {
        id: '8',
        titulo: 'Discussao 1',
        descricao: 'essa é a discussão 1',
        data_criacao_descricao: '22/08/2022',
        grupo_id: '7',
        usuario_id: '2',
      },
      {
        id: '9',
        titulo: 'Discussao 2',
        descricao: 'essa é a discussão 2',
        data_criacao_descricao: '22/08/2022',
        grupo_id: '7',
        usuario_id: '2',
      },
      {
        id: '10',
        titulo: 'Discussao 3',
        descricao: 'essa é a discussão 3',
        data_criacao_descricao: '22/08/2022',
        grupo_id: '7',
        usuario_id: '2',
      },
      {
        id: '11',
        titulo: 'Discussao 4',
        descricao: 'essa é a discussão 4',
        data_criacao_descricao: '22/08/2022',
        grupo_id: '7',
        usuario_id: '2',
      },
    ],
  },
  {
    id: '12',
    nome_grupo: 'Grupo de Discussão 4',
    descricao_grupo: 'esse é um grupo de discussão 2',
    data_criacao_grupo: '21/08/2022',
    visibilidade_grupo: 0,
    status_grupo: 1,
    usuario_id: '2',
    discussoes: [],
  },
];

export const Home = () => {
  const navigate = useNavigate();
  const handleDiscussaoClick = () => {
    navigate('/discussao');
  };
  return (
    <div style={{ gap: '2rem', display: 'flex', flexWrap: 'wrap' }}>
      {mockGrupoDiscussão.map((grupo) => (
        <div
          style={{ minWidth: '300px', width: '100%', maxWidth: '550px' }}
          key={grupo.id}
        >
          <CardContent
            title={grupo.nome_grupo}
            description={grupo.descricao_grupo}
            visibility={grupo.visibilidade_grupo}
            creation={grupo.data_criacao_grupo}
          >
            <div
              style={{ gap: '2rem', display: 'flex', flexDirection: 'column' }}
            >
              {grupo.discussoes.map((discussao) => (
                <CardContent
                  title={discussao.titulo}
                  description={discussao.descricao}
                  creation={discussao.data_criacao_descricao}
                  key={discussao.id}
                  onClick={() => handleDiscussaoClick()}
                />
              ))}
            </div>
          </CardContent>
        </div>
      ))}
    </div>
  );
};
