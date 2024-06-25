import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Servicio = sequelize.define("servicio", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
  },
  price: {
    type: DataTypes.FLOAT,
  },
});
