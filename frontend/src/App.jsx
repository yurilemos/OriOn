import React from 'react';
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
        <Router />
      </QueryClientProvider>
    </AuthProvider>
  );
};

export default App;
