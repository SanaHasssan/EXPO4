import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('cart.db');

export const initDatabase = () => {
  db.transaction((tx) => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS cart (id INTEGER PRIMARY KEY AUTOINCREMENT, productId INTEGER, title TEXT, price REAL, quantity INTEGER);'
    );
  });
};

export const addToCart = (product) => {
  db.transaction((tx) => {
    tx.executeSql(
      'SELECT * FROM cart WHERE productId = ?',
      [product.id],
      (_, { rows }) => {
        if (rows.length > 0) {
          tx.executeSql(
            'UPDATE cart SET quantity = quantity + 1 WHERE productId = ?',
            [product.id]
          );
        } else {
          tx.executeSql(
            'INSERT INTO cart (productId, title, price, quantity) VALUES (?, ?, ?, 1)',
            [product.id, product.title, product.price]
          );
        }
      }
    );
  });
};