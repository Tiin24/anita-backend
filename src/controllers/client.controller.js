import { Client } from "../models/Client.js";

export const createClient = async (req, res) => {
    try {
        const { name, email, telefono } = req.body;
        
        // Validar los datos
        if (!name || !email || !telefono) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }

        // Crear el nuevo cliente en la base de datos
        const newClient = await Client.create({ name, email, telefono });

        // Enviar el cliente creado como respuesta
        res.status(201).json(newClient);
    } catch (error) {
        console.error('Error al crear el cliente:', error);
        res.status(500).json({ message: 'Error al crear el cliente' });
    }
};


export const getClients = async (req, res) => {
    try {
        const clients = await Client.findAll();
        res.json(clients);
    } catch (error) {
        console.error('Error al obtener los clientes:', error);
        res.status(500).json({ message: 'Error al obtener los clientes' });
    }
};

export const getClientById = async (req, res) => {
    const { id } = req.params;

    try {
        // Buscar el cliente por su ID en la base de datos
        const client = await Client.findByPk(id);

        // Verificar si el cliente fue encontrado
        if (!client) {
            return res.status(404).json({ message: 'Cliente no encontrado' });
        }

        // Enviar el cliente encontrado como respuesta
        res.json(client);
    } catch (error) {
        console.error('Error al obtener el cliente por ID:', error);
        res.status(500).json({ message: 'Error al obtener el cliente por ID' });
    }
};

