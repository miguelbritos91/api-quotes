import express from "express";
import { PORT } from "./config.js";

const app = express();

app.use(express.json());

app.get("/price", async (req, res) => {
  const response = {
    blue: { compra: 1430, venta: 1450 },
    oficial: { compra: 897.5, venta: 937.5 },
    bolsa: { compra: 1370.1, venta: 1373 },
    liqui: { compra: 1387, venta: 1392.3 },
    cripto: { compra: 1412, venta: 1490 },
    tarjeta: { compra: 0, venta: 1500 },
    update: "Actualizado el 11/07/24 01:46 AM",
  };
  res.status(200).json(response);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
