import { redirect } from 'react-router';
import { deleteBook } from '../storage';

export async function action({ params }) {
  await deleteBook(params.bookId);
  return redirect('/');
}