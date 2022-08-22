import React from 'react';
import { ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from 'react-query';
import 'antd/dist/antd.min.css';
import './styles/global.css';
import { Router } from './router';
import { AuthProvider } from './utils/auth';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <ToastContainer />
        <Router />
      </QueryClientProvider>
    </AuthProvider>
  );
};

export default App;
