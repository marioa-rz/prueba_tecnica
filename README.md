# 🚀 Sistema de Gestión de Monedas, Entidades y Tasas Históricas - Frontend

Este es el **Frontend** de la aplicación, diseñado para interactuar con la [API Backend de Tasas de Cambio CRC](link_a_tu_repo_backend) para gestionar Monedas, Entidades y Registros Históricos de Tasas. Construido con **React**, el enfoque principal es la gestión de estado (State Management) y la experiencia del usuario.

## 🌟 Características Principales

* **CRUD Frontend:** Interfaz completa para las operaciones de Crear, Leer, Actualizar y Eliminar en todas las entidades.
* **Navegación Intuitiva:** Router simple basado en el estado (`useState`) de React.
* **Theming Dinámico:** Soporte nativo para **Modo Oscuro** (por defecto) y **Modo Claro** utilizando variables CSS y Media Queries. 
* **Composición de Componentes:** Uso de componentes funcionales con Hooks (`useState`, `useEffect`) para manejar la lógica de datos y el ciclo de vida.
* **Capa de Servicios Limpia:** Uso de **Axios** para encapsular las llamadas REST de la API en funciones asíncronas dedicadas.

## 🛠️ Tecnologías Utilizadas

| Tecnología | Descripción |
| :--- | :--- |
| **React** | Biblioteca principal para construir la interfaz de usuario. |
| **JavaScript (ES6+)** | Lógica del cliente, manejo de estado y formularios. |
| **CSS3** | Estilos, con uso de variables CSS para el theming. |
| **Axios** | Cliente HTTP basado en promesas para la comunicación con el Backend. |

## ⚙️ Configuración e Instalación

### ⚠️ Requisitos Previos

1.  **Backend Operativo:** El [Backend de Tasas de Cambio CRC](link_a_tu_repo_backend) debe estar corriendo en `http://localhost:4000`.
2.  **Node.js y npm:** Entorno de ejecución y gestor de paquetes.

### 1. Clonación e Instalación

1.  Clona este repositorio (Frontend):
    ```bash
    git clone [URL_DEL_REPO_FRONTEND]
    cd [nombre_del_proyecto_frontend]
    ```

2.  Instala las dependencias de React:
    ```bash
    npm install
    # o yarn install
    ```

### 2. Ejecución del Proyecto

Inicia el servidor de desarrollo. La aplicación estará accesible en `http://localhost:5173/` (o un puerto similar).

```bash
npm run dev
# o yarn dev
