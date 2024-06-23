import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Servicio } from '../models/Servicio.js';

// Obtener la ruta del directorio actual (ECMAScript modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const uploadServicesJsonToDB = async (req, res) => {
    try {
        // Ruta absoluta al archivo JSON
        const filePath = path.join(__dirname, '../utils/Services.json');
        // Leer el archivo JSON
        const data = await fs.readFile(filePath, 'utf-8');
        // Convertir el contenido a JSON
        const services = JSON.parse(data);

        // Crear registros en la base de datos
        const createdServices = await Servicio.bulkCreate(services);

        // Enviar los datos creados como respuesta
        res.json(createdServices);
    } catch (error) {
        console.error('Error al procesar el archivo JSON y subir los datos a la base de datos:', error);
        res.status(500).json({ message: 'Error al procesar los servicios' });
    }
};


export const getallServices = async (req,res) => {
    try {
        const servicios = await Servicio.findAll();
        res.json(servicios)
    } catch (error) {
        console.error('Error al obtener todos los servicios:', error);
    }
}

