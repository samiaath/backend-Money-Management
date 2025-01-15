const db = require('../config/db');

// Get all depenses
const getAllDepenses = async () => {
  const [rows] = await db.query('SELECT * FROM depense');
  return rows;
};

// Get a single depense by ID
const getDepenseById = async (id) => {
  const [rows] = await db.query('SELECT * FROM depense WHERE id = ?', [id]);
  return rows[0];
};

// Create a new depense (no user_id)
const createDepense = async (data) => {
  const { category, amount, description, date } = data;
  const query = 'INSERT INTO depense (amount, date, category, description) VALUES (?, ?, ?, ?)';
  const [result] = await db.query(query, [amount, date, category, description]);
  return { id: result.insertId, ...data }; // Return the inserted ID and data
};


// Update a depense
const updateDepense = async (id, data) => {
  const { category, amount, description, date } = data;
  try {
    const [result] = await db.query(
      'UPDATE depense SET category = ?, amount = ?, description = ?, date = ? WHERE id = ?',
      [category, amount, description, date, id]
    );
    return result.affectedRows;  // This should return the number of affected rows
  } catch (error) {
    console.error('Error updating depense:', error);
    throw error;  // Ensure the error is caught and logged
  }
};


// Delete a depense
const deleteDepense = async (id) => {
  const [result] = await db.query('DELETE FROM depense WHERE id = ?', [id]);
  return result.affectedRows;  // Returns the number of rows affected
};

// Get total amount by category
const getTotalByCategory = async (category) => {
  try {
    const [rows] = await db.query(`
      SELECT SUM(amount) AS total
      FROM depense
      WHERE category = ?`, [category]);

    console.log('Total by category:', rows); // Log the result to see what is returned

    // If no rows or no total found, return 0
    return rows.length > 0 && rows[0].total !== null ? rows[0].total : 0;
  } catch (err) {
    console.error('Error fetching total by category:', err);
    throw new Error('Error calculating total by category: ' + err.message);
  }
};

// Get total amount of all expenses
const getTotalExpenses = async () => {
  try {
    const [rows] = await db.query(`
      SELECT SUM(amount) AS total
      FROM depense`);

    console.log('Total expenses:', rows); // Log the result to see what is returned

    // If no rows or no total found, return 0
    return rows.length > 0 && rows[0].total !== null ? rows[0].total : 0;
  } catch (err) {
    console.error('Error fetching total expenses:', err);
    throw new Error('Error calculating total expenses: ' + err.message);
  }
};


module.exports = {
  getAllDepenses,
  getDepenseById,
  createDepense,
  updateDepense,
  deleteDepense,
  getTotalByCategory,    
  getTotalExpenses,       
};
