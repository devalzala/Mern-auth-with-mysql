const db = require('../config/db');

const createUser = (user) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO users (first_name, last_name, email, password, role) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [user.firstName, user.lastName, user.email, user.password, user.role], (err, result) => {
      if (err) return reject(err);
      resolve(result); // Resolve the result on success
    });
  });
};

const findUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], (err, result) => {
      if (err) return reject(err);
      resolve(result); // Resolve the user result
    });
  });
};

module.exports = { createUser, findUserByEmail };