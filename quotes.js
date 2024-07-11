import { chromium } from "playwright";
import { Logger } from "./logger.js";

export class Quotes {
  static async get() {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    try {
      // Navegar a la página con las cotizaciones
      await page.goto("https://dolarhoy.com/");

      // Esperar a que cargue la sección de cotizaciones
      await page.waitForSelector(".modulo.modulo__cotizaciones");

      // Extraer los datos de cada tipo de cambio y la fecha de actualización
      const data = await page.evaluate(() => {
        const blueCompra = parseFloat(
          document
            .querySelector(".cotizacion .dolar .compra .val")
            .textContent.replace("$", "")
        );
        const blueVenta = parseFloat(
          document
            .querySelector(".cotizacion .dolar .venta .val")
            .textContent.replace("$", "")
        );

        const oficialCompra = parseFloat(
          document
            .querySelector(".cotizacion .is-child:nth-child(2) .compra .val")
            .textContent.replace("$", "")
        );
        const oficialVenta = parseFloat(
          document
            .querySelector(".cotizacion .is-child:nth-child(2) .venta .val")
            .textContent.replace("$", "")
        );

        const bolsaCompra = parseFloat(
          document
            .querySelector(".cotizacion .is-child:nth-child(3) .compra .val")
            .textContent.replace("$", "")
        );
        const bolsaVenta = parseFloat(
          document
            .querySelector(".cotizacion .is-child:nth-child(3) .venta .val")
            .textContent.replace("$", "")
        );

        const liquiCompra = parseFloat(
          document
            .querySelector(".cotizacion .is-child:nth-child(4) .compra .val")
            .textContent.replace("$", "")
        );
        const liquiVenta = parseFloat(
          document
            .querySelector(".cotizacion .is-child:nth-child(4) .venta .val")
            .textContent.replace("$", "")
        );

        const criptoCompra = parseFloat(
          document
            .querySelector(".cotizacion .is-child:nth-child(5) .compra .val")
            .textContent.replace("$", "")
        );
        const criptoVenta = parseFloat(
          document
            .querySelector(".cotizacion .is-child:nth-child(5) .venta .val")
            .textContent.replace("$", "")
        );

        const tarjetaCompra = 0;
        const tarjetaVenta = parseFloat(
          document
            .querySelector(".cotizacion .is-child:nth-child(6) .venta .val")
            .textContent.replace("$", "")
        );

        const update = document.querySelector(".tile.update span").textContent;

        return {
          blue: { compra: blueCompra, venta: blueVenta },
          oficial: { compra: oficialCompra, venta: oficialVenta },
          bolsa: { compra: bolsaCompra, venta: bolsaVenta },
          liqui: { compra: liquiCompra, venta: liquiVenta },
          cripto: { compra: criptoCompra, venta: criptoVenta },
          tarjeta: { compra: tarjetaCompra, venta: tarjetaVenta },
          update: update.trim(), // Agregar la fecha de actualización
        };
      });

      return data;
    } catch (error) {
      const errorMessage =
        "Error al obtener las cotizaciones: " + error.message;
      Logger.write({ msg: errorMessage });
      return null;
    } finally {
      await browser.close();
    }
  }
}
