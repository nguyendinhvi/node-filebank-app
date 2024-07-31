module.exports = {
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "dinhvi2022",
  database: process.env.DB_NAME || "travel_app",
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 3306,
  logging: false,
  dialect: "mysql",
  seederStorage: "sequelize",
};
