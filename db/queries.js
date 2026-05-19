const pool = require("./pool");

async function createUser({ firstname, lastname, email, hashedPassword }) {
  await pool.query("INSERT INTO users (firstname, lastname, email, password) VALUES ($1, $2, $3, $4)", [
    firstname, 
    lastname, 
    email,
    hashedPassword,
  ]);
}

async function getUserByEmail(email) {
  const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [email]); 
  return rows[0]; 
}

async function getUserById(id) {
  const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]); 
  return rows[0];
}

module.exports = {
  createUser,
  getUserByEmail, 
  getUserById, 
};
