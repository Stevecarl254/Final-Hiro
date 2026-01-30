import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config(); // must be called at top

const sequelize = new Sequelize(
  process.env.DB_NAME,      // hiro_db
  process.env.DB_USER,      // postgres
  process.env.DB_PASSWORD,  // Stephenmaisiba11
  {
    host: process.env.DB_HOST, // localhost
    port: process.env.DB_PORT, // 5432
    dialect: process.env.DB_DIALECT, // postgres
    logging: false,
  }
);

export default sequelize;