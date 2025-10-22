import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import router from './router/router.jsx';
import { RouterProvider } from 'react-router-dom';
import AuthProvider from './contexts/AuthContext/AuthProvider.jsx';
import { SocketProvider } from './contexts/SocketContext/SocketContext.jsx';

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SocketProvider>
          <RouterProvider 
            router={router} 
            fallbackElement={<div>Loading...</div>} // ✅ Add fallback
          />
        </SocketProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);