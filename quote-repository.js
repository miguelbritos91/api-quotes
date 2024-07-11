import dbLocal from "db-local";
import { Logger } from "./logger.js";
const { Schema } = new dbLocal({ path: "./db" });

const Quote = Schema("Quote", {
  _id: { type: String, required: true },
  quote: { type: String, required: true },
  timestamp: { type: String, required: true },
});

export class QuoteRepository {
  static create({ quotes, dateNow }) {
    try {
      const id = crypto.randomUUID();

      Quote.create({
        _id: id,
        quote: JSON.stringify(quotes),
        timestamp: dateNow.toISOString(),
      }).save();

      return id;
    } catch (error) {
      const msg = "Error al crear el nuevo registro: " + error.message;
      Logger.write({ msg: msg });
      return null;
    }
  }

  static async getLast() {
    try {
      const quotes = await Quote.find();
      if (!quotes || quotes.length === 0) {
        return null;
      }

      const lastQuote = quotes.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))[0];
      return lastQuote;
    } catch (error) {
      const msg = "Error al obtener el último registro: " + error.message;
      Logger.write({ msg: msg });
      return null;
    }
  }
}
