# 🚀 Tasas de Cambio CRC - API Backend

Este es el *backend* de una API RESTful diseñada para gestionar y proporcionar datos sobre tasas de cambio históricas, monedas y entidades relacionadas. Construido con **Node.js**, **Express** y **PostgreSQL**.

## 🌟 Características Principales

* **Arquitectura Modular:** Separación clara entre Modelos, Controladores y Rutas para una fácil escalabilidad.
* **CRUD Completo:** Operaciones completas de Crear, Leer, Actualizar y Eliminar para Monedas, Entidades y Registros Históricos.
* **Validación de Datos:** Uso de `express-validator` como *middleware* para asegurar la integridad de los datos en todas las peticiones (códigos 400 Bad Request).
* **Manejo de Errores:** Gestión centralizada y consistente de errores (404 Not Found, 500 Internal Server Error).
* **Conexión Robusta a DB:** Pool de conexiones con PostgreSQL gestionado por `pg`.

## 🛠️ Tecnologías Utilizadas

| Tecnología | Descripción |
| :--- | :--- |
| **Node.js** | Entorno de ejecución de JavaScript. |
| **Express** | Framework web para Node.js. |
| **PostgreSQL** | Base de datos relacional. |
| **express-validator** | Middlewares para la validación de datos. |
| **dotenv** | Gestión de variables de entorno. |

## ⚙️ Configuración e Instalación

Sigue estos pasos para levantar el proyecto localmente:

### 1. Variables de Entorno

Crea un archivo llamado `.env` en la raíz del proyecto. **No debe subirse al repositorio.**

```env
# Configuración del servidor
PORT=4000
NODE_ENV=development # Cambiar a production para despliegue

# Cadena de conexión a PostgreSQL
DATABASE_URL="postgresql://user:password@host:port/database_name"
