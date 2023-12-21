const sql = require("mssql");

const dbSettings = {
  user: "admin",
  password: "Meekmill..1",
  server: "163.123.183.91",
  database: "inventaire_db",
  port: 18679,
  options: {
    encrypt: false,
  },
};

// Create a connection pool
const pool = new sql.ConnectionPool(dbSettings);
const poolConnect = pool.connect();

exports.getConnection = async () => {
  try {
    // Wait for the pool to connect before returning it
    await poolConnect;
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
    // Wait for the pool to connect before executing queries
    await poolConnect;

    // Query user by email
    const result = await pool.request()
      .query`SELECT * FROM users WHERE email = ${email}`;
    const user = result.recordset[0];

    return user;
  } catch (error) {
    throw error;
  }
};
