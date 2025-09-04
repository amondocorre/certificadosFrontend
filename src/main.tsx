import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { AuthProvider } from './presentation/context/AuthContext';
import {router} from './presentation/routes/Router'
import { container } from './di/container';
const authUseCases = container.resolve('authUseCases')
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider authUseCases={authUseCases}>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
);
