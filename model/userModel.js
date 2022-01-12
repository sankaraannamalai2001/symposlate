var sequelize = require("../utils/db");
const Sequelize = require("sequelize");

const User = sequelize.define("user", {
  user_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  username: { type: Sequelize.STRING, allowNull: false },
  password: { type: Sequelize.STRING, allowNull: false },
  email: { type: Sequelize.STRING, allowNull: false },
  myDate: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
  mycalendar: { type: Sequelize.STRING, defaultValue: "[]" },
  registerId: Sequelize.STRING,
  yourname: Sequelize.STRING,
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
});

module.exports = User;
