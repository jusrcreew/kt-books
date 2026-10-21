const KEY = 'kt-books';

const seed = [
  { id: 'b1', title: 'Мастер и Маргарита', author: 'Михаил Булгаков', year: 1967 },
  { id: 'b2', title: 'Преступление и наказание', author: 'Фёдор Достоевский', year: 1866 },
  { id: 'b3', title: 'Маленький принц', author: 'Антуан де Сент-Экзюпери', year: 1943 },
  { id: 'b4', title: '1984', author: 'Джордж Оруэлл', year: 1949 },
];

const pause = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms));

function readAll() {
  const raw = localStorage.getItem(KEY);
  if (raw === null) {
    localStorage.setItem(KEY, JSON.stringify(seed));
    return seed;
  }
  return JSON.parse(raw);
}

function writeAll(list) {
  localStorage.setItem(KEY, JSON.stringify(list));
}

export async function getBooks() {
  return readAll();
}

export async function getBook(id) {
  await pause(300);
  return readAll().find((item) => item.id === id) ?? null;
}

export async function createBook({ title, author, year }) {
  await pause();
  const item = { id: crypto.randomUUID(), title, author, year };
  writeAll([item, ...readAll()]);
  return item;
}

export async function deleteBook(id) {
  await pause();
  writeAll(readAll().filter((item) => item.id !== id));
}