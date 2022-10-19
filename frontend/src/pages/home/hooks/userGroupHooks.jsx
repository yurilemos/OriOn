import { message } from 'antd';
import { api } from '../../../utils/api';
import { useMutation, useQuery, useQueryClient } from 'react-query';

export const useUserList = ({ groupId, search }) => {
  const queryClient = useQueryClient();

  const getAllUserList = async () => {
    message.loading('Analizando os dados');

    try {
      const res = await api.main.get(`/gerencia-usuario?groupId=${groupId}`);

      message.destroy();
      return res.data;
    } catch (e) {
      message.destroy();
      message.error(e.response.data.message);
    }
  };

  const searchUserList = async () => {
    message.loading('Analizando os dados');

    try {
      const res = await api.main.get(
        `/gerencia-usuario/pesquisa?groupId=${groupId}&search=${search}`
      );

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
    data: userList,
  } = useQuery(['userList', groupId], getAllUserList, {
    enabled: !!groupId,
  });

  const { isLoading: searchLoading, data: searchList } = useQuery(
    ['searchUserList', groupId],
    searchUserList,
    {
      enabled: !!groupId && !!search,
    }
  );

  const invalidateQuery = async () => {
    await queryClient.invalidateQueries('userList');
  };

  const postDados = useMutation(async (payload) => {
    message.loading('Analizando os dados');

    const response = await api.main.post(`/gerencia-usuario`, {
      ...payload,
      groupId,
    });
    message.destroy();

    invalidateQuery();
    return response;
  });

  const addToUserList = (payload) => {
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

    const response = await api.main.put(`/gerencia-usuario`, {
      ...payload,
      groupId,
    });
    message.destroy();

    invalidateQuery();
    return response;
  });

  const changeUserPermission = (payload) => {
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
      `/gerencia-usuario?userId=${payload}&groupId=${groupId}`
    );
    message.destroy();

    invalidateQuery();
    return response;
  });

  const deleteUserFromGroup = (payload) => {
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
    userList,
    searchLoading,
    getAllUserList,
    addToUserList,
    deleteUserFromGroup,
    changeUserPermission,
    queryClient,
    searchList,
  };
};

export default useUserList;
