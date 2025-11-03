/**
 * Módulo de Conexión y Pool de PostgreSQL.
 * Este módulo configura el pool de conexiones a la base de datos PostgreSQL,
 * asegurando la gestión eficiente de las conexiones y el manejo de errores.
 */
import pg from "pg";
import dotenv from "dotenv";

// Carga las variables de entorno desde el archivo .env
dotenv.config();

const { Pool } = pg;

/**
 * @const pool
 * @description Instancia del Pool de conexiones de PostgreSQL.
 * Configuración para la gestión eficiente de múltiples conexiones.
 */
const pool = new Pool({
    // Cadena de conexión obtenida de las variables de entorno (ej: .env)
    connectionString: process.env.DATABASE_URL, 
    // Máximo número de clientes (conexiones) activos en el pool
    max: 20, 
    // Tiempo en milisegundos que un cliente inactivo puede permanecer en el pool antes de ser cerrado
    idleTimeoutMillis: 30000, 
    // Tiempo máximo para intentar establecer una conexión antes de fallar
    connectionTimeoutMillis: 2000 
});

// --- Manejo de Eventos del Pool ---

/**
 * Evento 'connect'.
 * Se dispara cada vez que se establece una nueva conexión exitosa en el pool.
 */
pool.on('connect', () => {
    console.log("PostgreSQL | Nueva conexion exitosa");
});

/**
 * Evento 'error'.
 * Se dispara cuando ocurre un error inactivo en el pool (ej: desconexión repentina de la DB).
 * Es un error crítico que debe manejar la finalización del proceso.
 */
pool.on('error', (err) => {
    console.error("PostgreSQL | Error inesperado: ", err);
    // Finaliza el proceso de la aplicación para evitar estados inconsistentes
    process.exit(-1);
});

// --- Función de Prueba ---

/**
 * @function testConnection
 * @description Prueba la conexión con la base de datos. 
 * Intenta obtener un cliente del pool y lo libera inmediatamente.
 * Se utiliza al iniciar el servidor para verificar la conectividad.
 * @returns {Promise<void>}
 * @throws {Error} Si falla al conectar, lanza el error para que el servidor pueda manejar la caída.
 */
export const testConnection = async() => {
    let client;
    try{
        // Intenta obtener una conexión (cliente) del pool
        client = await pool.connect();
        console.log("PostgreSQL | Conexion prueba exitosa");
    }catch(err){
        console.error("PostgreSQL | Error al conectar con la base de datos:", err);
        throw err; // Propaga el error para que initServer lo capture
    }finally{
        // Asegura la liberación del cliente para devolverlo al pool
        if(client) client.release();
    }
}

/**
 * @default
 * @description Exporta el pool de conexiones para que sea importado y utilizado por los Modelos.
 */
export default pool;