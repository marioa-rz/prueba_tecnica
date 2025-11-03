import { useEffect, useState } from "react";
// Importa las funciones de la API para Entidades
import { getEntidades, createEntidad, deleteEntidad, updateEntidad } from "../api/entidades";

/**
 * @component EntidadesPage
 * @description Componente para la gestión completa (CRUD) de Entidades.
 */
export const EntidadesPage = () => {

    // 1. ESTADOS

    // Almacena la lista de todas las entidades cargadas.
    const [entidades, setEntidades] = useState([]);

    // Estado del formulario: Si `id` es null, estamos Creando. Si tiene valor, Editando.
    const [form, setForm] = useState({ id: null, nombre: "", tipo: "" });

    // Estado para controlar si los datos están siendo cargados.
    const [loading, setLoading] = useState(true);

    // 2. EFECTOS DE MONTAJE

    // Carga la lista de entidades al montar el componente.
    useEffect(() => {
        refreshEntidades();
    }, []);

    // 3. FUNCIONES DE LÓGICA DE DATOS

    /**
     * @function refreshEntidades
     * @description Obtiene la lista de entidades de la API y actualiza el estado, controlando el indicador de carga.
     */
    const refreshEntidades = async () => {
        setLoading(true); // Activa el indicador de carga
        try {
            const response = await getEntidades();
            // Asume que la lista se encuentra en `response.result`
            setEntidades(response.result || []);
        } catch (error) {
            console.error("Error al cargar entidades:", error);
        } finally {
            setLoading(false); // Desactiva el indicador de carga, independientemente del resultado
        }
    };

    /**
     * @function handleEditClick
     * @description Carga los datos de una entidad en el formulario para iniciar la edición.
     * @param {Object} entidad - El objeto entidad a editar.
     */
    const handleEditClick = (entidad) => {
        setForm({
            id: entidad.id,
            nombre: entidad.nombre,
            tipo: entidad.tipo
        });
    }

    /**
     * @function handleCancelEdit
     * @description Restablece el formulario a su estado inicial (modo 'Crear').
     */
    const handleCancelEdit = () => {
        setForm({ id: null, nombre: "", tipo: "" });
    }


    /**
     * @function handleSubmit
     * @description Maneja el envío del formulario, realizando la creación o actualización de la entidad.
     * @param {Event} e - Evento de envío del formulario.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (form.id) {
                // Modo ACTUALIZAR: Si el ID está presente.
                const id = form.id;
                await updateEntidad(id, form);
            } else {
                // Modo CREAR: Si el ID es null.
                await createEntidad(form);
            }

            // Limpiar formulario y recargar lista
            handleCancelEdit();
            refreshEntidades();

        } catch (error) {
            console.error("Error al guardar entidad:", error);
            alert(`Hubo un error al ${form.id ? 'actualizar' : 'crear'} la entidad. Revisa la consola.`);
        }
    };

    /**
     * @function handleDelete
     * @description Elimina una entidad específica por su ID.
     * @param {string} id - ID de la entidad a eliminar.
     */
    const handleDelete = async (id) => {
        // Podríamos añadir un `window.confirm` aquí, aunque no estaba en el original.
        try {
            await deleteEntidad(id);
            refreshEntidades();
        } catch (error) {
            console.error("Error al eliminar entidad:", error);
            alert("No se pudo eliminar la entidad. Puede tener tasas históricas asociadas.");
        }
    };

    // 4. RENDERIZADO DEL COMPONENTE

    return (
        // Se reutiliza la clase CSS 'monedas-page-container' para el diseño
        <div className="monedas-page-container">
            {/* Título dinámico */}
            <h1>{form.id ? 'Editar Entidad' : 'Gestión de Entidades'}</h1>

            {/* --- FORMULARIO DE CREACIÓN/EDICIÓN --- */}
            <form onSubmit={handleSubmit} className="moneda-form">

                {/* Input Nombre */}
                <input
                    type="text"
                    placeholder="Nombre de Entidad (Ej: Banco Central)"
                    value={form.nombre}
                    onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                    required
                    className="moneda-input"
                />

                {/* Input Tipo */}
                <input
                    type="text"
                    placeholder="Tipo (Ej: Banco Comercial)"
                    value={form.tipo}
                    onChange={(e) => setForm({ ...form, tipo: e.target.value })}
                    required
                    className="moneda-input"
                />

                {/* Botón de Enviar (Texto y clase dinámicos) */}
                <button type="submit" className={`create-button ${form.id ? 'update-mode' : ''}`}>
                    {form.id ? 'Actualizar Entidad' : 'Crear Entidad'}
                </button>

                {/* Botón de Cancelar (Visible solo en modo Edición) */}
                {form.id && (
                    <button
                        type="button"
                        onClick={handleCancelEdit}
                        className="cancel-button"
                    >
                        Cancelar
                    </button>
                )}
            </form>

            <h2 className="list-title">Lista de Entidades</h2>

            {/* --- LISTA DE ENTIDADES (Condicional) --- */}
            {loading ? (
                // Muestra un mensaje mientras los datos se cargan
                <p style={{ textAlign: 'center' }}>Cargando entidades...</p>
            ) : (
                <ul className="monedas-list">
                    {entidades.map((entidad) => (
                        <li key={entidad.id} className="moneda-item">
                            <span className="moneda-info">
                                {entidad.nombre} ({entidad.tipo})
                            </span>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                {/* Botón de Editar */}
                                <button
                                    onClick={() => handleEditClick(entidad)}
                                    className="edit-button"
                                >
                                    Editar
                                </button>
                                {/* Botón de Eliminar */}
                                <button
                                    onClick={() => handleDelete(entidad.id)}
                                    className="delete-button"
                                >
                                    Eliminar
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
            {/* Muestra un mensaje si no hay datos después de la carga */}
            {!loading && entidades.length === 0 && (
                <p style={{ textAlign: 'center' }}>No hay entidades registradas.</p>
            )}
        </div>
    );
}