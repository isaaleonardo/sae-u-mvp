// src/components/Layout.jsx
import { Link } from 'react-router-dom';

export default function Layout({ children, isSolvente, setIsSolvente }) {
    return (
        <div className="flex h-screen bg-bgLight text-slate-800 font-sans">
            {/* Sidebar Básico */}
            <aside className="w-64 bg-white shadow-md p-6 flex flex-col">
                <h1 className="text-2xl font-heading font-bold text-ucvBlue mb-8">SAE-U</h1>
                <nav className="flex flex-col gap-4">
                    <Link to="/dashboard" className="hover:text-ucvGold font-bold">Inicio</Link>
                    <Link to="/inscripcion" className="hover:text-ucvGold font-bold">Materias</Link>
                </nav>
            </aside>

            <main className="flex-1 overflow-y-auto p-8">
                {/* Header con el Simulador */}
                <header className="flex justify-between items-center mb-8 border-b pb-4">
                    <h2 className="text-xl font-heading">Bienvenido, Andrés Silva</h2>

                    {/* SIMULADOR DE ESTATUS PARA EL MVP */}
                    <div className="flex items-center gap-3 bg-white p-3 rounded shadow-sm border border-gray-200">
                        <span className="text-sm font-bold">Simulador de Estatus:</span>
                        <button
                            onClick={() => setIsSolvente(!isSolvente)}
                            className={`px-4 py-1 rounded text-white font-bold transition-colors ${isSolvente ? 'bg-statusGreen' : 'bg-statusOrange'
                                }`}
                        >
                            {isSolvente ? 'Solvente' : 'Pendiente'}
                        </button>
                    </div>
                </header>

                {children}
            </main>
        </div>
    );
}