const bcrypt = require("bcrypt");

/**
 * Generates a hash for the given password.
 * @param {string} password - The plain-text password.
 * @returns {Promise<string>} Resolves with the hashed password.
 * @throws {Error} If an error occurs during hashing.
 */
async function hashing(password) {
  try {
    // Number of salt rounds (adjust as needed)
    const saltRounds = 5;

    // Perform the hasing.
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
  } catch (error) {
    throw new Error("error hasing your passwords!");
  }
}

module.exports = hashing;
