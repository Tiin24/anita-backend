import express from "express";
import morgan from "morgan";

const app = express();

// Import routes
import servicesRoutes from "./routes/service.routes.js";
import clietnRoutes from "./routes/client.routes.js";
import citaRoutes from "./routes/cita.routes.js";

// Middlewares
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/servicios", servicesRoutes);
app.use("/client", clietnRoutes);
app.use("/citas", citaRoutes);

export default app;