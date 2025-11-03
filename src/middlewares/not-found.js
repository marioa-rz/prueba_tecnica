/**
 * @function notFound
 * @description Middleware que se ejecuta cuando ninguna ruta definida ha coincidido
 * con la solicitud del cliente. Se utiliza para manejar el error 404 (Not Found).
 * Debe colocarse al final de todas las definiciones de rutas de la aplicación.
 * @param {Object} req - Objeto de solicitud de Express (Request).
 * @param {Object} res - Objeto de respuesta de Express (Response).
 * @param {Function} next - Función para pasar el control (no se usa aquí ya que es el fin de la cadena).
 * @returns {void} Envía una respuesta JSON con estado 404.
 */
export const notFound = (req, res, next) => {
    // Establece el código de estado 404
    res.status(404).json({
        // Mensaje descriptivo indicando la URL que no se pudo encontrar
        msg: `Ruta no encontrada: ${req.originalUrl}`
    })
}