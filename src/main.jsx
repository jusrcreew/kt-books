import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import './index.css';
import Root, { action as rootAction, loader as rootLoader } from './routes/root.jsx';
import Book, { loader as bookLoader } from './routes/book.jsx';
import { action as deleteAction } from './routes/delete.jsx';
import ErrorPage from './routes/error-page.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <p className="placeholder">Выберите книгу из списка</p>,
          },
          {
            path: 'books/:bookId',
            element: <Book />,
            loader: bookLoader,
          },
          {
            path: 'books/:bookId/delete',
            action: deleteAction,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);