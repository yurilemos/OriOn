import { message } from 'antd';
import { api } from '../../../utils/api';
import { useQuery, useMutation, useQueryClient } from 'react-query';

export const useDiscussion = ({ discussionId }) => {
  const queryClient = useQueryClient();

  const getDiscussion = async () => {
    message.loading('Analizando os dados');

    try {
      const res = await api.main.get(`/discussao?id=${discussionId}`);

      message.destroy();
      return res.data;
    } catch (e) {
      message.destroy();
      message.error(e.response.data.message);
    }
  };

  const {
    isLoading,
    isSuccess,
    isError,
    isIdle,
    data: discussao,
  } = useQuery(['discussao', discussionId], getDiscussion, {
    enabled: !!discussionId,
  });

  const invalidateQuery = async () => {
    await queryClient.invalidateQueries('discussao');
  };

  const putDados = useMutation(async (payload) => {
    message.loading('Analizando os dados');

    const response = await api.main.put(`/discussao`, {
      ...payload,
      discussao_id: discussionId,
    });
    message.destroy();

    invalidateQuery();
    return response;
  });

  const editDiscussion = (payload) => {
    putDados.mutate(payload, {
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

  const postDadosTopic = useMutation(async (payload) => {
    message.loading('Analizando os dados');

    const response = await api.main.post(`/assunto`, {
      ...payload,
      discussao_id: discussionId,
    });
    message.destroy();

    invalidateQuery();
    return response;
  });

  const createTopic = (payload) => {
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

  const putDadosTopic = useMutation(async (payload) => {
    const response = await api.main.put(`/assunto`, {
      ...payload,
    });

    invalidateQuery();
    return response;
  });

  const editTopic = (payload) => {
    message.loading('Analizando os dados');
    putDadosTopic.mutate(payload, {
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

  const deleteDados = useMutation(async () => {
    message.loading('Analizando os dados');

    const response = await api.main.delete(
      `/discussao?discussionId=${discussionId}`
    );
    message.destroy();

    invalidateQuery();
    return response;
  });

  const deleteDiscussion = (payload) => {
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

  const deleteDadosTopic = useMutation(async (payload) => {
    message.loading('Analizando os dados');

    const response = await api.main.delete(
      `/assunto?assuntoId=${payload.assuntoId}`
    );
    message.destroy();

    invalidateQuery();
    return response;
  });

  const deleteTopic = (payload) => {
    deleteDadosTopic.mutate(payload, {
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
    discussao,
    editDiscussion,
    deleteDiscussion,
    createTopic,
    editTopic,
    deleteTopic,
    queryClient,
  };
};

export default useDiscussion;
