import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('Updated the database');
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transcation('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const request = store.put({ value: content, id: 1 });
  const result = await request;
  console.log('result.value', result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('Retrieved from the database');
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transcation('jate', 'readonly');
  const store = tx.objectStore('jate');
  const request = store.get(1);
  const result = await request;
  console.log('result.value', result);
  return result?.value;
}

initdb();