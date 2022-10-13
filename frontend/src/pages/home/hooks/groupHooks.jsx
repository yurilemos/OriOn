import { message } from 'antd';
import axios from 'axios';
import { api, API_URL } from '../../../utils/api';
import { useQuery, useMutation, useQueryClient } from 'react-query';

export const useGroup = ({ userId, myGroup, shelveGroups, visibilidade }) => {
  const queryClient = useQueryClient();

  const getAllGroups = async () => {
    message.loading('Analizando os dados');

    try {
      if (myGroup) {
        const res = await axios.get(
          `${API_URL}/meus-grupos?userId=${userId}&visibilidade=${visibilidade}`
        );

        message.destroy();
        return res.data;
      }
      if (shelveGroups) {
        const res = await axios.get(
          `${API_URL}/meus-grupos-arquivados?userId=${userId}&visibilidade=${visibilidade}`
        );

        message.destroy();
        return res.data;
      }
      const res = await api.main.get(`/grupo?userId=${userId}`);

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
    data: grupos,
  } = useQuery(
    ['group', userId, myGroup, shelveGroups, visibilidade],
    getAllGroups,
    {
      enabled: !!userId,
    }
  );

  const invalidateQuery = async () => {
    await queryClient.invalidateQueries('group');
  };

  const postDados = useMutation(async (payload) => {
    message.loading('Analizando os dados');

    const response = await axios.post(`${API_URL}/grupo`, {
      ...payload,
      usuario_id: userId,
    });
    message.destroy();

    invalidateQuery();
    return response;
  });

  const createGroup = (payload) => {
    postDados.mutate(payload, {
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

  const putDados = useMutation(async (payload) => {
    message.loading('Analizando os dados');

    const response = await axios.put(`${API_URL}/grupo`, {
      ...payload,
      usuario_id: userId,
    });
    message.destroy();

    invalidateQuery();
    return response;
  });

  const editGroup = (payload) => {
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

  const deleteDados = useMutation(async (payload) => {
    message.loading('Analizando os dados');

    const response = await axios.delete(
      `${API_URL}/grupo?userId=${userId}&groupId=${payload.grupo_id}`
    );
    message.destroy();

    invalidateQuery();
    return response;
  });

  const deleteGroup = (payload) => {
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

  const createDadosDiscussion = useMutation(async (payload) => {
    message.loading('Analizando os dados');

    const response = await axios.post(`${API_URL}/discussao`, {
      ...payload,
      usuario_id: userId,
    });
    message.destroy();

    invalidateQuery();
    return response;
  });

  const createDiscussion = (payload) => {
    createDadosDiscussion.mutate(payload, {
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
    grupos,
    getAllGroups,
    createGroup,
    editGroup,
    deleteGroup,
    createDiscussion,
    queryClient,
  };
};

export default useGroup;
