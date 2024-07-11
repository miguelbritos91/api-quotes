import express from "express";
import { PORT } from "./config.js";
import { Quotes } from "./quotes.js";

const app = express();

app.use(express.json());

app.get("/price", async (req, res) => {
  let response = { ok: false, msg: "No se encontraron datos", response: null };
  try {
    const data = await Quotes.get();
    if (data) {
      response.ok = true;
      response.msg = "Cotizacion actualizada";
      response.response = data;
    }
    res.status(200).json(response);  
  } catch (error) {
    response.msg = error.message;
    res.status(500).json(response);
  }
  
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
