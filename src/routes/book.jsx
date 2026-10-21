import { useEffect, useState } from 'react';
import { Form, useLoaderData } from 'react-router';
import { getBook } from '../storage';

export async function loader({ params }) {
  const book = await getBook(params.bookId);
  if (book === null) {
    throw new Response('', { status: 404, statusText: 'Not Found' });
  }
  return book;
}

export default function Book() {
  const book = useLoaderData();
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    setSeconds(0);
    const timerId = setInterval(() => {
      setSeconds((value) => value + 1);
    }, 1000);
    return () => clearInterval(timerId);
  }, [book.id]);

  return (
    <article className="book">
      <h2>{book.title}</h2>
      <p>Автор: {book.author}</p>
      <p>Год: {book.year}</p>
      <p className="timer">Вы на этой странице: {seconds} с</p>
      <Form
        method="post"
        action="delete"
        onSubmit={(event) => {
          if (!confirm('Удалить книгу?')) {
            event.preventDefault();
          }
        }}
      >
        <button type="submit">Удалить</button>
      </Form>
    </article>
  );
}