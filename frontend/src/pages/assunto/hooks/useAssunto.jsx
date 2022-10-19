import { message } from 'antd';
import { api } from '../../../utils/api';
import { useQuery, useQueryClient } from 'react-query';

export const useAssunto = ({ assuntoId }) => {
  const queryClient = useQueryClient();

  const getAssunto = async () => {
    message.loading('Analizando os dados');

    try {
      const res = await api.main.get(`/assunto?id=${assuntoId}`);

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
    data: assunto,
  } = useQuery(['assunto', assuntoId], getAssunto, {});

  return {
    isLoading,
    isError,
    isIdle,
    isSuccess,
    assunto,
    queryClient,
  };
};

export default useAssunto;
