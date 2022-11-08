const { DataTypes } = require("sequelize");


module.exports = (sequelize) => {
  return sequelize.define("stats", {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      primaryKey: true,
    },
    date: {
      type: DataTypes.CHAR,
      allowNull: true,
    },
    confirmed: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    prev_confirmed: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    prev_confirmed1: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    prev_confirmed2: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    prev_confirmed3: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    prev_confirmed4: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    prev_confirmed5: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    death: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    prev_death: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    hospital: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    prev_hospital: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    critical: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    prev_critical: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  });
};
