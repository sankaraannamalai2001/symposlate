var sequelize = require("../utils/db");
const Sequelize = require("sequelize");

const Event = sequelize.define("events", {
  event_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  eventName: { type: Sequelize.STRING, allowNull: false },
  eventDesc: { type: Sequelize.STRING, allowNull: false },
  eventUrl: { type: Sequelize.STRING, allowNull: false },
  eventDate: Sequelize.DATE,
  start: Sequelize.TIME,
  end: Sequelize.TIME,
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    foreignKey: true,
  },
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
});

module.exports = Event;
