import { Cita } from '../models/Cita.js';
import { Client } from '../models/Client.js';
import { Servicio } from '../models/Servicio.js'; // Asegúrate de importar el modelo de Servicio

// Controlador para crear una nueva cita
export const createCita = async (req, res) => {
    const { fecha, estado, citaServicio, clientId } = req.body;
    try {
        // Crear la cita
        const nuevaCita = await Cita.create({ fecha, estado, clientId });

        // Asociar servicios a la cita
        if (citaServicio && citaServicio.length > 0) {
            await nuevaCita.setServicios(citaServicio);
        }

        res.status(201).json(nuevaCita);
    } catch (error) {
        console.error('Error al crear la cita:', error);
        res.status(500).json({ message: 'Error al crear la cita' });
    }
};


export const getAllCitas = async (req, res) => {
    try {
        const citas = await Cita.findAll({
            include: [
                {
                    model: Client,
                    attributes: ['id', 'name', 'email', 'telefono']
                },
                {
                    model: Servicio,
                    attributes: ['id', 'nombre', 'price']
                }
            ]
        });
        res.status(200).json(citas);
    } catch (error) {
        console.error('Error al obtener las citas:', error);
        res.status(500).json({ message: 'Error al obtener las citas' });
    }
};

export const getCitaById = async (req, res) => {
    const { id } = req.params;
    try {
        const cita = await Cita.findByPk(id, {
            include: [
                {
                    model: Client,
                    attributes: ['id', 'name', 'email', 'telefono']
                },
                {
                    model: Servicio,
                    attributes: ['id', 'nombre', 'price']
                }
            ]
        });
        if (!cita) {
            return res.status(404).json({ message: `Cita con ID ${id} no encontrada` });
        }
        res.status(200).json(cita);
    } catch (error) {
        console.error('Error al obtener la cita:', error);
        res.status(500).json({ message: 'Error al obtener la cita' });
    }
};

export const getCitasByClientId = async (req, res) => {
    const { clientId } = req.params; // Obtener el id del cliente de los parámetros de la ruta

    try {
        // Buscar todas las citas del cliente por su ID
        const citas = await Cita.findAll({
            where: { clientId: clientId }, // Filtrar por clientId
            include: [
                {
                    model: Client,
                    attributes: ['id', 'name', 'email', 'telefono'] // Incluir solo ciertos atributos del cliente si es necesario
                },
                {
                    model: Servicio,
                    attributes: ['id', 'nombre', 'price'] // Incluir solo ciertos atributos del servicio si es necesario
                }
            ]
        });

        // Verificar si se encontraron citas para el cliente
        if (citas.length === 0) {
            return res.status(404).json({ message: 'No se encontraron citas para este cliente' });
        }

        // Devolver el listado de citas encontradas
        res.status(200).json(citas);
    } catch (error) {
        console.error('Error al obtener las citas del cliente:', error);
        res.status(500).json({ message: 'Error al obtener las citas del cliente' });
    }
};

export const getCitasAceptadas = async (req, res) => {
    try {
        // Buscar todas las citas aceptadas y ordenarlas DESC
        const citasAceptadas = await Cita.findAll({
            where: {
                estado: 'aceptado' // Filtrar por estado aceptado
            },
            order: [
                ['fecha', 'DESC'] // Ordenar por fecha de creación en orden descendente
                // Puedes cambiar 'createdAt' por el campo que desees ordenar
            ]
        });

        // Verificar si se encontraron citas aceptadas
        if (citasAceptadas.length === 0) {
            return res.status(404).json({ message: 'No se encontraron citas aceptadas' });
        }

        // Devolver el listado de citas aceptadas encontradas
        res.status(200).json(citasAceptadas);
    } catch (error) {
        console.error('Error al obtener las citas aceptadas:', error);
        res.status(500).json({ message: 'Error al obtener las citas aceptadas' });
    }
}


export const updateCitaById = async (req, res) => {
    const { id } = req.params; // Obtener el id de la cita de los parámetros de la ruta
    const { fecha, estado, citaServicio, clientId } = req.body; // Obtener los datos actualizados de la cita desde el cuerpo de la solicitud

    try {
        // Verificar si la cita existe
        const citaExistente = await Cita.findByPk(id);
        if (!citaExistente) {
            return res.status(404).json({ message: 'Cita no encontrada' });
        }

        // Actualizar la cita en la base de datos
        const updatedCita = await citaExistente.update({
            fecha: fecha,
            estado: estado,
            clientId: clientId
        });

        // Actualizar los servicios asociados a la cita si es necesario
        if (citaServicio && citaServicio.length > 0) {
            await updatedCita.setServicios(citaServicio);
        }

        // Buscar la cita actualizada con la información del cliente y los servicios asociados
        const citaActualizada = await Cita.findByPk(id, {
            include: [
                {
                    model: Client,
                    attributes: ['id', 'name', 'email', 'telefono'] // Incluir solo ciertos atributos del cliente si es necesario
                },
                {
                    model: Servicio,
                    attributes: ['id', 'nombre', 'price'] // Incluir solo ciertos atributos del servicio si es necesario
                }
            ]
        });

        // Devolver la cita actualizada
        res.status(200).json(citaActualizada);
    } catch (error) {
        console.error('Error al actualizar la cita:', error);
        res.status(500).json({ message: 'Error al actualizar la cita' });
    }
};



