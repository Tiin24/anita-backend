import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Servicio } from "./Servicio.js";

export const Cita = sequelize.define("cita", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  fecha: {
    type: DataTypes.DATE,
  },
  estado: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [["aceptado", "pendiente", "cancelado"]],
    },
  },
});

// Relación muchos a muchos entre Cita y Servicio (si es necesario)
Cita.belongsToMany(Servicio, { through: "CitaServicio" });
Servicio.belongsToMany(Cita, { through: "CitaServicio" });
