const sql = require("mssql");

const dbSettings = {
  user: "admin",
  password: "Meekmill..1",
  server: "68.64.164.91",
  database: "inventaire_db",
  port: 15873, // Update this line with your new port number
  options: {
    encrypt: false,
    // You can add other options as needed
  },
};

exports.getConnection = async () => {
  try {
    const pool = await sql.connect(dbSettings);
    return pool;
  } catch (error) {
    console.error(error);
  }
};

exports.getSql = () => {
  return sql;
};

// Query user by email
exports.getUserByEmail = async (email) => {
  try {
    // Connect to SQL Server
    await sql.connect(dbSettings);

    // Query user by email
    const result = await sql.query`SELECT * FROM users WHERE email = ${email}`;
    const user = result.recordset[0];

    return user;
  } catch (error) {
    throw error;
  } finally {
    // Close SQL Server connection
    sql.close();
  }
};
