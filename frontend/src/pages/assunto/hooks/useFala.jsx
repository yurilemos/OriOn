import { message } from 'antd';
import { api } from '../../../utils/api';
import { useMutation, useQuery, useQueryClient } from 'react-query';

export const useFala = ({ assuntoId }) => {
  const queryClient = useQueryClient();

  const getFala = async () => {
    message.loading('Analizando os dados');

    try {
      const res = await api.main.get(`/fala?id=${assuntoId}`);

      message.destroy();
      return res.data;
    } catch (e) {
      message.destroy();
      message.error(e.response.data.message);
    }
  };

  const { isLoading, isSuccess, isError, isIdle, data } = useQuery(
    ['fala', assuntoId],
    getFala,
    {}
  );

  const getRelacao = async () => {
    message.loading('Analizando os dados');
    try {
      const response = await api.main.get(`/relacao`);

      message.destroy();
      return response.data;
    } catch (e) {
      message.destroy();
      message.error(e.response.data.message);
    }
  };

  const { data: relations } = useQuery(['relacao', assuntoId], getRelacao, {});

  const invalidateQuery = async () => {
    await queryClient.invalidateQueries('fala');
  };

  const postDadosTopic = useMutation(async (payload) => {
    message.loading('Analizando os dados');

    const response = await api.main.post(`/fala`, {
      ...payload,
      assunto_id: assuntoId,
    });
    message.destroy();

    invalidateQuery();
    return response;
  });

  const createFala = (payload) => {
    postDadosTopic.mutate(payload, {
      onSuccess: async (res) => {
        if (res?.status === 200 || res?.status === 201) {
          message.destroy();
        }
      },
      onError: async (e) => {
        message.destroy();
        message.error(e.response.data.message);
      },
    });
  };

  const deleteDados = useMutation(async (payload) => {
    message.loading('Analizando os dados');

    const response = await api.main.delete(`/fala?falaId=${payload.id}`);

    message.destroy();

    invalidateQuery();
    return response;
  });

  const deleteFala = (payload) => {
    deleteDados.mutate(payload, {
      onSuccess: async (res) => {
        if (res?.status === 200 || res?.status === 201) {
          message.destroy();
        }
      },
      onError: async (e) => {
        message.destroy();
        message.error(e.response.data.message);
      },
    });
  };

  return {
    isLoading,
    isError,
    isIdle,
    isSuccess,
    data,
    relations,
    queryClient,
    createFala,
    deleteFala,
  };
};

export default useFala;
