import { useEffect, useState } from "react";
// Importa las funciones de la API (asumiendo que están en '../api/monedas')
import { getMonedas, createMoneda, deleteMoneda, updateMoneda } from "../api/monedas";

/**
 * @component MonedasPage
 * @description Componente principal para la gestión de Monedas.
 * Maneja el estado de la lista de monedas y el formulario de CRUD.
 */
export const MonedasPage = () => {
    // 1. ESTADOS

    // Estado para almacenar la lista de todas las monedas cargadas de la API.
    const [monedas, setMonedas] = useState([]);

    // Estado para gestionar los datos del formulario (Creación/Edición).
    // `id: null` indica modo 'Crear'. Un id con valor indica modo 'Editar'.
    const [form, setForm] = useState({ id: null, codigo_iso: "", nombre: "", pais: "" });

    // 2. EFECTOS DE MONTAJE

    // Se ejecuta una vez al montar el componente para cargar la lista inicial.
    useEffect(() => {
        refreshMonedas();
    }, []); // El array vacío asegura que solo se ejecute al montar.

    // 3. FUNCIONES DE LÓGICA DE DATOS

    /**
     * @function refreshMonedas
     * @description Obtiene la lista de monedas de la API y actualiza el estado.
     */
    const refreshMonedas = async () => {
        try {
            const data = await getMonedas();
            // Asume que la lista de monedas se encuentra en 'data.result'
            setMonedas(data.result || []);
        } catch (error) {
            console.error("Error al cargar las monedas:", error);
            // Podrías añadir un manejo de error visible al usuario aquí
        }
    }

    /**
     * @function handleEditClick
     * @description Prepara el formulario para la edición, cargando los datos de la moneda seleccionada.
     * @param {Object} moneda - El objeto moneda a editar.
     */
    const handleEditClick = (moneda) => {
        // Llena el formulario con los datos de la moneda, incluyendo el ID
        setForm({
            id: moneda.id,
            codigo_iso: moneda.codigo_iso,
            nombre: moneda.nombre,
            pais: moneda.pais
        });
    }

    /**
     * @function handleCancelEdit
     * @description Restablece el formulario al estado inicial (modo 'Crear').
     */
    const handleCancelEdit = () => {
        setForm({ id: null, codigo_iso: "", nombre: "", pais: "" });
    }


    /**
     * @function handleSubmit
     * @description Maneja el envío del formulario, decidiendo si Crear o Actualizar.
     * @param {Event} e - Evento de envío del formulario.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (form.id) {
                // Modo ACTUALIZAR: Si el formulario tiene un ID.
                const id = form.id;
                const dataToUpdate = {
                    // Se crea el objeto de datos a enviar para la actualización
                    codigo_iso: form.codigo_iso,
                    nombre: form.nombre,
                    pais: form.pais
                };
                // Se llama a la función de la API para actualizar
                await updateMoneda(id, dataToUpdate);
            } else {
                // Modo CREAR: Si el formulario NO tiene un ID (id es null).
                await createMoneda(form);
            }

            // Limpia el formulario y recarga la lista después de la operación
            handleCancelEdit();
            refreshMonedas();

        } catch (error) {
            // Muestra un error en la consola y una alerta al usuario
            console.error("Error al guardar la moneda:", error.response?.data || error);
            alert(`Hubo un error al ${form.id ? 'actualizar' : 'crear'} la moneda.`);
        }
    }

    /**
     * @function handleDelete
     * @description Solicita confirmación y elimina la moneda si el usuario acepta.
     * @param {number} id - ID de la moneda a eliminar.
     */
    const handleDelete = async (id) => {
        if (window.confirm("¿Estás seguro de que quieres eliminar esta moneda?")) {
            try {
                await deleteMoneda(id);
                // Recarga la lista para reflejar el cambio
                refreshMonedas();
            } catch (error) {
                console.error("Error al eliminar la moneda:", error);
                alert("Hubo un error al eliminar la moneda.");
            }
        }
    }

    // 4. RENDERIZADO DEL COMPONENTE

    return (
        <div className="monedas-page-container">
            {/* Título dinámico: 'Editar Moneda' si hay un ID, sino 'Gestión de Monedas' */}
            <h1>{form.id ? 'Editar Moneda' : 'Gestión de Monedas'}</h1>

            {/* --- FORMULARIO DE CREACIÓN/EDICIÓN --- */}
            <form onSubmit={handleSubmit} className="moneda-form">

                {/* Campo Código ISO */}
                <input
                    type="text"
                    placeholder="Código ISO (Ej: USD)"
                    value={form.codigo_iso}
                    onChange={(e) =>
                        setForm({ ...form, codigo_iso: e.target.value })}
                    required
                    className="moneda-input"
                />
                {/* Campo Nombre */}
                <input
                    type="text"
                    placeholder="Nombre (Ej: Dólar)"
                    value={form.nombre}
                    onChange={(e) =>
                        setForm({ ...form, nombre: e.target.value })}
                    required
                    className="moneda-input"
                />
                {/* Campo País */}
                <input
                    type="text"
                    placeholder="País (Ej: USA)"
                    value={form.pais}
                    onChange={(e) =>
                        setForm({ ...form, pais: e.target.value })}
                    required
                    className="moneda-input"
                />

                {/* Botón de Enviar (Texto y clase dinámicos) */}
                <button type="submit" className={`create-button ${form.id ? 'update-mode' : ''}`}>
                    {form.id ? 'Actualizar Moneda' : 'Crear Moneda'}
                </button>

                {/* Botón de Cancelar (Solo visible en modo Edición) */}
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

            <h2 className="list-title">Lista de Monedas</h2>

            {/* --- LISTA DE MONEDAS --- */}
            <ul className="monedas-list">
                {/* Mapea y renderiza cada moneda */}
                {monedas.map((moneda) => (
                    <li key={moneda.id} className="moneda-item">

                        {/* Información de la moneda */}
                        <span className="moneda-info">
                            {moneda.codigo_iso} ({moneda.nombre} - {moneda.pais})
                        </span>

                        {/* Contenedor de Botones de Acción */}
                        <div style={{ display: 'flex', gap: '8px' }}>
                            {/* Botón de Editar */}
                            <button
                                onClick={() => handleEditClick(moneda)}
                                className="edit-button"
                            >
                                Editar
                            </button>
                            {/* Botón de Eliminar */}
                            <button
                                onClick={() => handleDelete(moneda.id)}
                                className="delete-button"
                            >
                                Eliminar
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}