import { useRouteError } from 'react-router';

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <div className="error-page">
      <h1>Ой!</h1>
      <p>{error.statusText || error.message}</p>
    </div>
  );
}