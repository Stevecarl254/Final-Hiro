import sequelize from "./config/database.js";

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection successful!");
  } catch (err) {
    console.error("Connection failed:", err);
  }
})();