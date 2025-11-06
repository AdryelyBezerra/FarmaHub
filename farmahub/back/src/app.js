import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express();

//Middleware
app.use(cors());
app.use(express.json());

//Teste inicial
app.get("/", (req, res) => {
    res.send("API Farmahub funcionando!");
});

app.use('/usuarios', userRoutes);

export default app;