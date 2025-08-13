import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const prisma = new PrismaClient();


// Middleware
app.use(cors()); // Permitir acceso desde cualquier origen (puedes configurarlo)
app.use(express.json()); // Parsear JSON en peticiones

// Rutas de ejemplo
app.get("/", (req, res) => {
  res.json({ message: "API Express funcionando" });
});

app.get("/products", async (req, res) => {
  const products = await prisma.product.findMany();
  res.json(products);
});

app.post("/products", async (req, res) => {
  const { name, price } = req.body;
  const product = await prisma.product.create({
    data: { name, price: Number(price) },
  });
  res.json(product);
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor backend corriendo en http://localhost:${port}`);
});
