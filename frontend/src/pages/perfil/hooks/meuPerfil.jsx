import { message } from 'antd';
import { api } from '../../../utils/api';
import { useQuery, useMutation, useQueryClient } from 'react-query';

export const useProfile = ({ updateUser }) => {
  const queryClient = useQueryClient();

  const getProfile = async () => {
    message.loading('Analizando os dados');

    try {
      const res = await api.main.get(`/usuario`);

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
    data: user,
  } = useQuery(['perfil'], getProfile, {});

  const invalidateQuery = async () => {
    await queryClient.invalidateQueries('perfil');
  };

  const putDados = useMutation(async (payload) => {
    message.loading('Analizando os dados');

    const response = await api.main.put(`/usuario`, {
      ...payload,
    });
    message.destroy();

    invalidateQuery();
    return response;
  });

  const editUser = (payload) => {
    putDados.mutate(payload, {
      onSuccess: async (res) => {
        if (res?.status === 200 || res?.status === 201) {
          message.destroy();
          updateUser();
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
    user,
    getProfile,
    editUser,
    queryClient,
  };
};

export default useProfile;
