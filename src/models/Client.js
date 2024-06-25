import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Cita } from "./Cita.js"; // Asegúrate de importar el modelo de Cita si hay relaciones

export const Client = sequelize.define("client", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  telefono: {
    type: DataTypes.INTEGER,
  },
});

Client.hasMany(Cita, {
  foreignKey: "clientId",
  sourceKey: "id",
});
Cita.belongsTo(Client, {
  foreignKey: "clientId",
  targetKey: "id",
});