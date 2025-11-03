/**
 * @function handleErrors
 * @description Middleware de Manejo Centralizado de Errores.
 * Esta función es la última en la cadena de middleware de Express
 * y se encarga de formatear y enviar una respuesta JSON consistente
 * a cualquier error que ocurra en la aplicación.
 * @param {Error} err - El objeto de error que fue pasado a next(err). Puede contener statusCode, message y/o errores.
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @param {Function} next - Función para pasar el control (no se usa aquí ya que este es el fin de la cadena).
 * @returns {void} Envía una respuesta JSON de error al cliente.
 */
export const handleErrors = (err, req, res, next) => {
    // 1. Registro del Error (Crucial para la depuración)
    console.error("Error encontrado: ", err);

    // 2. Formato de la Respuesta
    res.status(err.statusCode || 500).json({
        // Utiliza el código de estado adjunto al error (si existe) o un 500 (Internal Server Error) por defecto.
        
        // Muestra el mensaje de error específico o un mensaje genérico
        msg: err.message || "Error inesperado", 
        
        // Si el error contiene una lista de errores detallados (ej: de express-validator), los incluye
        errors: err.erros, 

        // 3. Pila de Llamadas (Stack Trace)
        // Solo incluye la pila de llamadas (stack) si el entorno es de desarrollo,
        // para evitar exponer detalles internos en producción.
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined
    })
}