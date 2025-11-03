import { useEffect, useState } from "react";
// Importa las funciones de la API para Registros Históricos
import { getHistoricas, createHistorica, deleteHistorica, updateHistorica } from "../api/historicas";

/**
 * @component HistoricasPage
 * @description Componente para gestionar la lista y el formulario de Registros Históricos (Tasas de Cambio).
 */
export const HistoricasPage = () => {

    // 1. ESTADOS

    // Estado para almacenar la lista de registros históricos.
    const [historicas, setHistoricas] = useState([]);

    // Estado para gestionar los datos del formulario (Creación/Edición).
    // Incluye `id: null` para el modo Creación.
    const [form, setForm] = useState({
        id: null, // Identificador para modo edición (null = Crear)
        fecha_hora: "",
        tipo_transaccion: "",
        valor_tasa: "", // Se mantiene como string en el estado para inputs tipo 'text' o 'number'
        entidad_id: "",
        moneda_base_id: "",
        moneda_objetivo_id: ""
    });

    // 2. EFECTOS DE MONTAJE

    // Carga inicial de los registros históricos al montar el componente.
    useEffect(() => {
        refreshHistoricas();
    }, []);

    // 3. FUNCIONES DE LÓGICA DE DATOS

    /**
     * @function refreshHistoricas
     * @description Obtiene los registros históricos de la API y formatea `valor_tasa` como flotante.
     */
    const refreshHistoricas = async () => {
        try {
            const data = await getHistoricas();

            // Sanitización: Asegura que valor_tasa sea un número para el display
            const sanitizedHistoricas = (data.result || []).map(h => ({
                ...h,
                valor_tasa: parseFloat(h.valor_tasa)
            }));

            setHistoricas(sanitizedHistoricas);

        } catch (error) {
            console.error("Error al cargar registros históricos:", error);
        }
    }

    /**
     * @function handleEditClick
     * @description Carga los datos de un registro histórico en el formulario para su edición.
     * Realiza el formateo de fecha para compatibilidad con el input.
     * @param {Object} historica - El registro histórico a editar.
     */
    const handleEditClick = (historica) => {
        // Formatea la fecha/hora: Convierte a ISO y recorta para ser compatible con input datetime-local/text.
        const formattedDate = historica.fecha_hora ? new Date(historica.fecha_hora).toISOString().slice(0, 19) : '';

        setForm({
            id: historica.id,
            fecha_hora: formattedDate,
            tipo_transaccion: historica.tipo_transaccion,
            // Importante: Convertir el número de la API de nuevo a string para el input
            valor_tasa: String(historica.valor_tasa),
            entidad_id: historica.entidad_id,
            moneda_base_id: historica.moneda_base_id,
            moneda_objetivo_id: historica.moneda_objetivo_id
        });
    }

    /**
     * @function handleCancelEdit
     * @description Restablece el formulario a su estado inicial (modo 'Crear').
     */
    const handleCancelEdit = () => {
        setForm({
            id: null, fecha_hora: "", tipo_transaccion: "", valor_tasa: "",
            entidad_id: "", moneda_base_id: "", moneda_objetivo_id: ""
        });
    }

    /**
     * @function handleSubmit
     * @description Maneja el envío del formulario, realizando la conversión de `valor_tasa` a número.
     * Decide si llamar a la función de Creación o Actualización.
     * @param {Event} e - Evento de envío del formulario.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Prepara los datos a enviar, convirtiendo `valor_tasa` a tipo Number
            const dataToSend = {
                ...form,
                valor_tasa: Number(form.valor_tasa),
            }

            if (form.id) {
                // Modo ACTUALIZAR: Llama a la API de actualización.
                const id = form.id;
                await updateHistorica(id, dataToSend);
            } else {
                // Modo CREAR: Llama a la API de creación.
                await createHistorica(dataToSend);
            }

            // Limpiar formulario y recargar la lista
            handleCancelEdit();
            refreshHistoricas();

        } catch (error) {
            // Manejo de errores para el usuario
            console.error("Error al guardar el registro histórico:", error.response?.data || error);
            alert(`Hubo un error al ${form.id ? 'actualizar' : 'crear'}. Revisa la consola y los IDs.`);
        }
    }

    /**
     * @function handleDelete
     * @description Solicita confirmación y elimina el registro si el usuario acepta.
     * @param {string} id - ID del registro histórico a eliminar.
     */
    const handleDelete = async (id) => {
        if (window.confirm("¿Estás seguro de que quieres eliminar este registro?")) {
            try {
                await deleteHistorica(id);
                refreshHistoricas();
            } catch (error) {
                console.error("Error al eliminar el registro:", error);
                alert("Hubo un error al eliminar el registro.");
            }
        }
    }

    // 4. RENDERIZADO DEL COMPONENTE

    return (
        <div className="historicas-page-container">
            {/* Título dinámico para reflejar el modo (Crear vs. Editar) */}
            <h1>{form.id ? 'Editar Registro Histórico' : 'Histórico de Tasas'}</h1>

            {/* --- FORMULARIO DE CREACIÓN/EDICIÓN --- */}
            <form onSubmit={handleSubmit} className="historica-form">

                {/* Campo Fecha y Hora */}
                <input
                    type="text" // Usaríamos "datetime-local" si el formato es compatible en todos los navegadores
                    placeholder="Fecha y Hora (Ej: 2023-01-01T10:00:00)"
                    value={form.fecha_hora}
                    onChange={(e) =>
                        setForm({ ...form, fecha_hora: e.target.value })}
                    required
                    className="historica-input"
                />

                {/* Campo Tipo de Transacción */}
                <input
                    type="text"
                    placeholder="Tipo Transacción (Ej: Venta)"
                    value={form.tipo_transaccion}
                    onChange={(e) =>
                        setForm({ ...form, tipo_transaccion: e.target.value })}
                    required
                    className="historica-input"
                />

                {/* Campo Valor Tasa */}
                <input
                    type="number"
                    step="0.0001" // Permite decimales
                    placeholder="Valor Tasa (Ej: 500.50)"
                    value={form.valor_tasa}
                    onChange={(e) =>
                        setForm({ ...form, valor_tasa: e.target.value })}
                    required
                    className="historica-input"
                />

                {/* Campos de UUIDs (Entidades y Monedas) */}
                <input
                    type="text"
                    placeholder="UUID Entidad"
                    value={form.entidad_id}
                    onChange={(e) => setForm({ ...form, entidad_id: e.target.value })}
                    required
                    className="historica-input"
                />
                <input
                    type="text"
                    placeholder="UUID Moneda Base"
                    value={form.moneda_base_id}
                    onChange={(e) => setForm({ ...form, moneda_base_id: e.target.value })}
                    required
                    className="historica-input"
                />
                <input
                    type="text"
                    placeholder="UUID Moneda Objetivo"
                    value={form.moneda_objetivo_id}
                    onChange={(e) => setForm({ ...form, moneda_objetivo_id: e.target.value })}
                    required
                    className="historica-input"
                />

                {/* Botón de Enviar (Texto y estilo dinámico) */}
                <button type="submit" className={`create-button ${form.id ? 'update-mode' : ''}`}>
                    {form.id ? 'Actualizar Registro' : 'Crear Registro'}
                </button>

                {/* Botón de Cancelar Edición (Solo visible en modo edición) */}
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

            <h2 className="list-title">Lista de Registros Históricos</h2>

            {/* --- TABLA DE REGISTROS HISTÓRICOS --- */}
            <table className="historicas-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Fecha/Hora</th>
                        <th>Entidad</th>
                        <th>Tipo</th>
                        <th>Tasa</th>
                        <th>Base</th>
                        <th>Objetivo</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Mapea y renderiza cada registro en una fila de tabla */}
                    {historicas.map((h) => (
                        <tr key={h.id} className="historica-row">
                            {/* Muestra solo los primeros 4 caracteres del ID para ahorrar espacio */}
                            <td>{h.id.substring(0, 4)}...</td>
                            {/* Formatea la fecha y hora para una visualización amigable */}
                            <td>{new Date(h.fecha_hora).toLocaleString()}</td>
                            {/* Se asume que estos campos vienen adjuntos en la respuesta de la API (h.entidad_nombre, etc.) */}
                            <td>{h.entidad_nombre}</td>
                            <td>{h.tipo_transaccion}</td>
                            {/* Muestra el valor de la tasa con 4 decimales */}
                            <td>{h.valor_tasa.toFixed(4)}</td>
                            <td>{h.moneda_base_iso}</td>
                            <td>{h.moneda_objetivo_iso}</td>
                            <td>
                                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                    {/* Botón de Editar */}
                                    <button
                                        onClick={() => handleEditClick(h)}
                                        className="edit-button"
                                    >
                                        Editar
                                    </button>
                                    {/* Botón de Eliminar */}
                                    <button
                                        onClick={() => handleDelete(h.id)}
                                        className="delete-button"
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}