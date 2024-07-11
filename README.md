# Cotizaciones API


Este proyecto es una API para obtener cotizaciones de diferentes tipos de dólar desde el sitio [DolarHoy](https://dolarhoy.com/).

La información se guarda en una base de datos local y se proporciona una API para recuperar las cotizaciones almacenadas. El proyecto fue generado con intenciones académicas y no busca obtener beneficios económicos del mismo.

## Tabla de Contenidos

- [Instalación](#instalación)
- [Configuración](#configuración)
- [Uso](#uso)
- [Rutas de la API](#rutas-de-la-api)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Licencia](#licencia)

## Instalación

1. Clona el repositorio:

    ```sh
    git clone https://github.com/miguelbritos91/api-quotes.git
    cd api-quotes
    ```

2. Instala las dependencias:

    ```sh
    npm install
    ```

## Configuración

Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```env
PORT=3000
TIME_CACHE=900
```

- `PORT`: El puerto en el que se ejecutará el servidor.
- `TIME_CACHE`: El tiempo en segundos para la caché de los datos (por defecto, 15 minutos).

## Uso

Para iniciar el servidor:

```sh
npm start
```

El servidor estará ejecutándose en `http://localhost:3000`.

## Rutas de la API

### `GET /price`

Obtiene la cotización actual. Si la última cotización guardada es menor al tiempo de caché definido, devuelve esa cotización. De lo contrario, obtiene una nueva cotización del sitio [DolarHoy](https://dolarhoy.com/).

#### Respuesta

```json
{
  "ok": true,
  "msg": "Cotizacion actualizada",
  "response": {
    "blue": { "compra": 1430, "venta": 1450 },
    "oficial": { "compra": 897.5, "venta": 937.5 },
    "bolsa": { "compra": 1370.1, "venta": 1373 },
    "liqui": { "compra": 1387, "venta": 1392.3 },
    "cripto": { "compra": 1410, "venta": 1525 },
    "tarjeta": { "compra": 0, "venta": 1500 },
    "update": "Actualizado el 11/07/24 03:26 AM"
  }
}
```

## Estructura del Proyecto

```plaintext
.
├── db/                     # Directorio para la base de datos local
│   └── Quotes.json         # Archivo de la base de datos de cotizaciones
├── index.js                # Punto de entrada de la aplicación
├── config.js               # Archivo de configuración
├── quotes.js               # Lógica de obtención y almacenamiento de cotizaciones
├── quote-repository.js     # Repositorio para gestionar cotizaciones en la base de datos
├── logger.js               # Logger para gestionar errores
└── README.md               # Este archivo
```

### `index.js`

El archivo principal de la aplicación. Configura y arranca el servidor Express.

### `config.js`

Archivo de configuración que obtiene las variables de entorno.

### `quotes.js`

Módulo que contiene la lógica para obtener las cotizaciones desde el sitio [DolarHoy](https://dolarhoy.com/) usando Playwright y gestionar la caché.

### `quote-repository.js`

Módulo que define y gestiona el esquema y la base de datos local de las cotizaciones usando `db-local`.

### `logger.js`

Módulo que configura y usa `winston` para la gestión de logs de errores.

## Propósito Académico
Este proyecto fue desarrollado con fines académicos y no tiene intención de generar beneficios económicos

## Licencia

Este proyecto está licenciado bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.