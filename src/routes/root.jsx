import { useEffect } from 'react';
import { Form, NavLink, Outlet, redirect, useLoaderData, useNavigation } from 'react-router';
import { createBook, getBooks } from '../storage';

export async function loader() {
  const books = await getBooks();
  return { books };
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const book = await createBook({
    title: data.title,
    author: data.author,
    year: Number(data.year),
  });
  return redirect(`/books/${book.id}`);
}

export default function Root() {
  const { books } = useLoaderData();
  const navigation = useNavigation();
  const adding = navigation.state === 'submitting' && navigation.formData?.has('title');

  useEffect(() => {
    document.title = `Книг: ${books.length}`;
  }, [books.length]);

  return (
    <div className="layout">
      <aside className="sidebar">
        <h1>Библиотека</h1>
        <nav>
          <Form method="post" action="/" key={books.length}>
            <label>
              Название
              <input name="title" required autoComplete="off" />
            </label>
            <label>
              Автор
              <input name="author" required autoComplete="off" />
            </label>
            <label>
              Год
              <input name="year" type="number" required />
            </label>
            <button type="submit" disabled={adding}>
              {adding ? 'Добавляем...' : 'Добавить'}
            </button>
          </Form>
          {books.length === 0 ? (
            <p className="empty">Книг пока нет</p>
          ) : (
            <ul>
              {books.map((book) => (
                <li key={book.id}>
                  <NavLink
                    to={`/books/${book.id}`}
                    className={({ isActive, isPending }) => {
                      if (isPending) return 'pending';
                      if (isActive) return 'active';
                      return undefined;
                    }}
                  >
                    {book.title} — {book.author}
                  </NavLink>
                </li>
              ))}
            </ul>
          )}
        </nav>
      </aside>
      <main className="detail">
        <Outlet />
      </main>
    </div>
  );
}