export const handleErrors = (err, req, res, next) => {
    console.error("Error encontrado: ", err);

    res.status(err.statusCode || 500).json({
        msg: err.message || "Error inesperado",
        errors: err.erros,
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined
    })
}