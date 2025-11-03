// =======================================
// 1. IMPORTACIONES
// Importa las dependencias necesarias de React y los componentes de las páginas.
// =======================================

import React, { useState } from 'react';
// Importación de las páginas que se mostrarán en la aplicación
import { MonedasPage } from './pages/MonedasPage';
import { EntidadesPage } from './pages/EntidadesPage';
import { HistoricasPage } from './pages/HistoricasPage';

// =======================================
// 2. COMPONENTE NAVBAT
// Componente de presentación para la barra de navegación.
// Recibe el estado actual de la página y la función para cambiarlo.
// =======================================

const Navbar = ({ currentPage, setCurrentPage }) => {
    // Definición de las páginas disponibles para la navegación
    const pages = [
        { name: 'Monedas', component: 'Monedas' },
        { name: 'Entidades', component: 'Entidades' },
        { name: 'Historicas', component: 'Historicas' }
    ];

    return (
        <nav className="app-navbar">
            <ul className="nav-list">
                {/* Mapea la lista de páginas para crear un botón por cada una */}
                {pages.map((page) => (
                    <li key={page.component} className="nav-item">
                        <button
                            // Aplica la clase 'active' si la página actual coincide con el componente
                            className={`nav-button ${currentPage === page.component ? 'active' : ''}`}
                            // Al hacer clic, actualiza el estado de la página principal (App)
                            onClick={() => setCurrentPage(page.component)}
                        >
                            {page.name}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
};


// =======================================
// 3. COMPONENTE PRINCIPAL (App)
// Gestiona el estado de navegación y renderiza la página correspondiente.
// =======================================

function App() {
    // Estado para controlar qué componente de página se muestra actualmente.
    // Inicia mostrando el componente 'Monedas'.
    const [currentPage, setCurrentPage] = useState('Monedas');

    /**
     * @function renderPage
     * @description Selecciona y retorna el componente de página a mostrar
     * basándose en el estado `currentPage`.
     * @returns {JSX.Element} El componente de página seleccionado.
     */
    const renderPage = () => {
        switch (currentPage) {
            case 'Monedas':
                return <MonedasPage />;
            case 'Entidades':
                return <EntidadesPage />;
            case 'Historicas':
                return <HistoricasPage />;
            default:
                // Si el estado es inválido (nunca debería pasar), vuelve a MonedasPage
                return <MonedasPage />;
        }
    };

    return (
        <div className="App">
            {/* 1. Barra de Navegación */}
            <Navbar
                currentPage={currentPage} // Pasa el estado actual
                setCurrentPage={setCurrentPage} // Pasa la función para cambiar el estado
            />

            {/* 2. Contenido de la Página Actual */}
            <div className="page-content">
                {/* Llama a la función que renderiza dinámicamente el componente de página */}
                {renderPage()}
            </div>
        </div>
    );
}

// Exporta el componente App para que pueda ser montado en el index.
export default App;