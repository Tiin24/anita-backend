import express from "express";
import morgan from "morgan";
import cors from "cors";

const app = express();

import servicesRoutes from "./routes/service.routes.js";
import clietnRoutes from "./routes/client.routes.js";
import citaRoutes from "./routes/cita.routes.js";

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

// Routes
app.use("/servicios", servicesRoutes);
app.use("/client", clietnRoutes);
app.use("/citas", citaRoutes);

export default app;
