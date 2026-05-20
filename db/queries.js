const pool = require("./pool");

async function createUser({ firstname, lastname, email, hashedPassword }) {
  await pool.query(
    "INSERT INTO users (firstname, lastname, email, password) VALUES ($1, $2, $3, $4)",
    [firstname, lastname, email, hashedPassword],
  );
}

async function getUserByEmail(email) {
  const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  return rows[0];
}

async function getUserById(id) {
  const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  return rows[0];
}

async function getPrivilegePassword(status) {
  const { rows } = await pool.query(
    "SELECT * FROM privilege_credentials WHERE status = $1",
    [status],
  );
  return rows[0].status_password;
}

async function giveMemberStatus(userId) {
  await pool.query("UPDATE users SET is_member = true WHERE id = $1", [userId]);
}

async function giveAdminStatus(userId) {
  await pool.query("UPDATE users SET is_admin = true WHERE id = $1", [userId]); 
}

async function createNewMessage(userId, message) {
  await pool.query("INSERT INTO messages (content, user_id) VALUES ($1, $2)", [
    message,
    userId, 
  ]);
}

async function getAllMessages() {
  const { rows } = await pool.query(`
    SELECT messages.id, added, content, firstname, lastname
    FROM messages
    JOIN users ON users.id = user_id; 
    `);
  return rows; 
}

async function deleteMessage(messageId) {
  await pool.query("DELETE FROM messages WHERE id = $1", [messageId]); 
}

module.exports = {
  createUser,
  getUserByEmail,
  getUserById,
  getPrivilegePassword,
  giveMemberStatus,
  giveAdminStatus, 
  createNewMessage, 
  getAllMessages,
  deleteMessage,  
};
