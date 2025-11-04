import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

//Middleware
app.use(cors());
app.use(express.json());

//Teste inicial
app.get("/", (req, res) => {
    res.send("API Farmahub funcionando!");
});

export default app;