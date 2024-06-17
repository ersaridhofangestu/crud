import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Crud from './crud.tsx';
import Login from './Login.tsx';
import ProtectedRoute, { RouterToLogin } from './ProtectedRoute.tsx';
import NotFound from './NotFound.tsx';

const router = createBrowserRouter([
  {
    path: "*",
    element: <NotFound />
  },
  {
    path: '/',
    element: (
      <RouterToLogin>
        <Login />
      </RouterToLogin>
    ),
  },
  {
    path: 'create',
    element: (
      <ProtectedRoute>
        <Crud />
      </ProtectedRoute>
    ),
  },
  {
    path: '/login',
    element: <Login />,
  },

  {
    path: '/edit/:id',
    element: (
      <ProtectedRoute>
        <Crud />
      </ProtectedRoute>),
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />,
);
