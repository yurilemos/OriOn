import { message } from 'antd';
import { api } from '../../../utils/api';
import { useQuery, useMutation, useQueryClient } from 'react-query';

export const useGroup = ({ myGroup, shelveGroups, visibilidade }) => {
  const queryClient = useQueryClient();

  const getAllGroups = async () => {
    message.loading('Analizando os dados');

    try {
      if (myGroup) {
        const res = await api.main.get(
          `/meus-grupos?visibilidade=${visibilidade}`
        );

        message.destroy();
        return res.data;
      }
      if (shelveGroups) {
        const res = await api.main.get(
          `/meus-grupos-arquivados?visibilidade=${visibilidade}`
        );

        message.destroy();
        return res.data;
      }
      const res = await api.main.get(`/grupo`);

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
    ['group', myGroup, shelveGroups, visibilidade],
    getAllGroups,
    {}
  );

  const invalidateQuery = async () => {
    await queryClient.invalidateQueries('group');
  };

  const postDados = useMutation(async (payload) => {
    message.loading('Analizando os dados');

    const response = await api.main.post(`/grupo`, {
      ...payload,
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

    const response = await api.main.put(`/grupo`, {
      ...payload,
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

    const response = await api.main.delete(
      `/grupo?groupId=${payload.grupo_id}`
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

    const response = await api.main.post(`/discussao`, {
      ...payload,
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
