import 'dotenv/config'

export const { 
    PORT = 3000,
    TIME_CACHE = 900 // tiempo en segundos para cache de datos
} = process.env