import { message } from 'antd';
import axios from 'axios';
import { API_URL } from '../../../utils/api';
import { useQuery, useMutation, useQueryClient } from 'react-query';

export const useUserList = ({ groupId }) => {
  const queryClient = useQueryClient();

  const getAllUserList = async () => {
    message.loading('Analizando os dados');

    try {
      const res = await axios.get(
        `${API_URL}/gerencia-usuario?groupId=${groupId}`
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

  const invalidateQuery = async () => {
    await queryClient.invalidateQueries('userList');
  };

  return {
    isLoading,
    isError,
    isIdle,
    isSuccess,
    userList,
    getAllUserList,
    queryClient,
  };
};

export default useUserList;
