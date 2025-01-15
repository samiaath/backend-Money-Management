const db = require("../config/db");

// Find a user by username
const findUserByUsername = async (username) => {
  const [rows] = await db.query("SELECT * FROM user WHERE username = ?", [
    username,
  ]);
  return rows[0];
};

// Find a user by ID
const findUserById = async (id) => {
  const [rows] = await db.query("SELECT * FROM user WHERE id = ?", [id]);
  return rows[0];
};

// Create a new user
const createUser = async (data) => {
  const { username, password } = data;
  const [result] = await db.query(
    "INSERT INTO user (username, password) VALUES (?, ?)",
    [username, password]
  );
  return result.insertId;
};
const getUserById = async (userId) => {
  const [rows] = await db.query("SELECT * FROM user WHERE id = ?", [userId]);
  return rows[0];
};

const getUserDepenses = async (userId) => {
  const [rows] = await db.query("SELECT * FROM depense WHERE user_id = ?", [
    userId,
  ]);
  return rows;
};

module.exports = {
  findUserByUsername,
  findUserById,
  createUser,
  getUserById,
  getUserDepenses,
};
