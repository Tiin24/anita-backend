import { Cita } from "../models/Cita.js";
import { Client } from "../models/Client.js";
import { Servicio } from "../models/Servicio.js";

export const createCita = async (req, res) => {
  const { fecha, estado, citaServicio, clientId } = req.body;
  try {
    const nuevaCita = await Cita.create({ fecha, estado, clientId });

    if (citaServicio && citaServicio.length > 0) {
      await nuevaCita.setServicios(citaServicio);
    }

    res.status(201).json(nuevaCita);
  } catch (error) {
    console.error("Error al crear la cita:", error);
    res.status(500).json({ message: "Error al crear la cita" });
  }
};

export const getAllCitas = async (req, res) => {
  try {
    const citas = await Cita.findAll({
      include: [
        {
          model: Client,
          attributes: ["id", "name", "email", "telefono"],
        },
        {
          model: Servicio,
          attributes: ["id", "nombre", "price"],
        },
      ],
    });
    res.status(200).json(citas);
  } catch (error) {
    console.error("Error al obtener las citas:", error);
    res.status(500).json({ message: "Error al obtener las citas" });
  }
};

export const getCitaById = async (req, res) => {
  const { id } = req.params;
  try {
    const cita = await Cita.findByPk(id, {
      include: [
        {
          model: Client,
          attributes: ["id", "name", "email", "telefono"],
        },
        {
          model: Servicio,
          attributes: ["id", "nombre", "price"],
        },
      ],
    });
    if (!cita) {
      return res
        .status(404)
        .json({ message: `Cita con ID ${id} no encontrada` });
    }
    res.status(200).json(cita);
  } catch (error) {
    console.error("Error al obtener la cita:", error);
    res.status(500).json({ message: "Error al obtener la cita" });
  }
};

export const getCitasByClientId = async (req, res) => {
  const { clientId } = req.params;

  try {
    const citas = await Cita.findAll({
      where: { clientId: clientId },
      include: [
        {
          model: Client,
          attributes: ["id", "name", "email", "telefono"],
        },
        {
          model: Servicio,
          attributes: ["id", "nombre", "price"],
        },
      ],
    });

    if (citas.length === 0) {
      return res
        .status(404)
        .json({ message: "No se encontraron citas para este cliente" });
    }

    res.status(200).json(citas);
  } catch (error) {
    console.error("Error al obtener las citas del cliente:", error);
    res.status(500).json({ message: "Error al obtener las citas del cliente" });
  }
};

export const getCitasAceptadas = async (req, res) => {
  try {
    const citasAceptadas = await Cita.findAll({
      where: {
        estado: "aceptado",
      },
      include: [
        {
          model: Client,
          attributes: ["id", "name", "email", "telefono"],
        },
        {
          model: Servicio,
          attributes: ["id", "nombre", "price"],
        },
      ],
      order: [
        ["fecha", "DESC"],
      ],
    });

    if (citasAceptadas.length === 0) {
      return res
        .status(404)
        .json({ message: "No se encontraron citas aceptadas" });
    }

    res.status(200).json(citasAceptadas);
  } catch (error) {
    console.error("Error al obtener las citas aceptadas:", error);
    res.status(500).json({ message: "Error al obtener las citas aceptadas" });
  }
};

export const updateCitaById = async (req, res) => {
  const { id } = req.params;
  const { fecha, estado, citaServicio, clientId } = req.body; 
  try {
    const citaExistente = await Cita.findByPk(id);
    if (!citaExistente) {
      return res.status(404).json({ message: "Cita no encontrada" });
    }

    const updatedCita = await citaExistente.update({
      fecha: fecha,
      estado: estado,
      clientId: clientId,
    });

    if (citaServicio && citaServicio.length > 0) {
      await updatedCita.setServicios(citaServicio);
    }
    const citaActualizada = await Cita.findByPk(id, {
      include: [
        {
          model: Client,
          attributes: ["id", "name", "email", "telefono"],
        },
        {
          model: Servicio,
          attributes: ["id", "nombre", "price"],
        },
      ],
    });

    res.status(200).json(citaActualizada);
  } catch (error) {
    console.error("Error al actualizar la cita:", error);
    res.status(500).json({ message: "Error al actualizar la cita" });
  }
};
