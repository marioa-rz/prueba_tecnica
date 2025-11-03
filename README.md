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

```

### 2. PostgreSQL

Base de datos utilizada para el proyecto

```env
-- 1. CREACIÓN DE LA BASE DE DATOS
CREATE DATABASE prueba_db; 

-- 2. CREACIÓN DEL ESQUEMA
CREATE SCHEMA tasas_crc;

-- 3. TABLA PARA MONEDAS
CREATE TABLE tasas_crc.monedas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    codigo_iso VARCHAR(3) UNIQUE NOT NULL,
    nombre TEXT NOT NULL,
    pais TEXT NOT NULL
);

-- 4. TABLA PARA ENTIDADES
CREATE TABLE tasas_crc.entidades (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(), 
    nombre TEXT NOT NULL,
    tipo TEXT NOT NULL
);

-- 5.1 TABLA DE TASAS HISTORICAS
CREATE TYPE tipo_transaccion_enum AS ENUM ('compra', 'venta');
-- 5.2 TABLA DE 
CREATE TABLE tasas_crc.historicas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    fecha_hora TIMESTAMP WITH TIME ZONE NOT NULL,
    tipo_transaccion tipo_transaccion_enum NOT NULL,
    valor_tasa DECIMAL(10, 4) NOT NULL,
    
    entidad_id UUID NOT NULL REFERENCES tasas_crc.entidades(id) ON DELETE CASCADE,
    moneda_base_id UUID NOT NULL REFERENCES tasas_crc.monedas(id) ON DELETE RESTRICT, 
    moneda_objetivo_id UUID NOT NULL REFERENCES tasas_crc.monedas(id) ON DELETE RESTRICT,
    
    UNIQUE (fecha_hora, entidad_id, moneda_objetivo_id, tipo_transaccion) 
);

-- INSERCIÓN DE DATOS

-- 7. Monedas
INSERT INTO tasas_crc.monedas (codigo_iso, nombre, pais) VALUES
('CRC', 'Colón Costarricense', 'Costa Rica'),
('USD', 'Dólar Estadounidense', 'Estados Unidos'),
('EUR', 'Euro', 'Zona Euro'),
('GTQ', 'Quetzal Guatemalteco', 'Guatemala');

-- 8. Entidades
INSERT INTO tasas_crc.entidades (nombre, tipo) VALUES
('Banco Central de CR', 'Regulador Oficial'),
('Banco Popular CR', 'Banco Comercial'),
('Casa de Cambio Colones', 'Casa de Cambio'),
('Coopenae', 'Cooperativa'),
('Banco Nacional de CR', 'Banco Comercial');

-- 9. Tasas historicas
INSERT INTO tasas_crc.historicas (
    fecha_hora, tipo_transaccion, valor_tasa, entidad_id, moneda_base_id, moneda_objetivo_id
) VALUES
-- Tasa oficial de venta y compra de dolar
('2025-11-03 10:00:00-06', 'venta', 504.73, 
 (SELECT id FROM tasas_crc.entidades WHERE nombre = 'Banco Central de CR'), -- ID de BCCR
 (SELECT id FROM tasas_crc.monedas WHERE codigo_iso = 'CRC'), -- ID de Moneda Base
 (SELECT id FROM tasas_crc.monedas WHERE codigo_iso = 'USD') -- ID de Moneda Objetivo
), 
('2025-11-03 10:05:00-06', 'compra', 498.37,
 (SELECT id FROM tasas_crc.entidades WHERE nombre = 'Banco Popular CR'), 
 (SELECT id FROM tasas_crc.monedas WHERE codigo_iso = 'CRC'),
 (SELECT id FROM tasas_crc.monedas WHERE codigo_iso = 'USD')
);
