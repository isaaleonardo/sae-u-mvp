// src/components/Layout.jsx
import { Link, useLocation } from 'react-router-dom';
import { LayoutGrid, BookOpen, Calendar, GraduationCap, Box, ArrowLeft } from 'lucide-react';

export default function Layout({ children, isSolvente, setIsSolvente, isInscrito, setIsInscrito }) {
    const location = useLocation();

    // Layout especial sin sidebar para la página de Inscripción
    if (location.pathname === '/inscripcion') {
        return (
            <div className="min-h-screen bg-[#F8F9FA] text-slate-800 font-sans flex flex-col">
                {/* Header Inscripción */}
                <header className="bg-white px-8 py-4 flex justify-between items-center shadow-sm z-10">
                    <div className="flex items-center gap-6">
                        <Link to="/dashboard" className="text-gray-500 hover:text-gray-800 transition-colors">
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <div className="flex items-center gap-2 text-ucvBlue">
                            <Box className="w-5 h-5" />
                            <h1 className="text-xl font-bold tracking-tight">SAE-U</h1>
                        </div>
                        <div className="bg-gray-100 text-gray-500 text-[11px] font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
                            Inscripción 2024-II
                        </div>
                    </div>
                    <button className="text-[#2C3E50] font-bold text-sm hover:text-ucvGold transition-colors">
                        Guardar y Salir
                    </button>
                </header>
                <main className="flex-1 w-full mx-auto p-8 max-w-[1400px]">
                    {children}
                </main>
            </div>
        );
    }

    // Si está inscrito, mostramos 'Horario' y ocultamos 'Inscripción'.
    // Si no está inscrito, mostramos 'Inscripción' y ocultamos 'Horario'.
    const menuItems = [
        { path: '/dashboard', label: 'Inicio', icon: LayoutGrid },
        ...(isInscrito 
            ? [{ path: '/horario', label: 'Horario', icon: Calendar }]
            : [{ path: '/inscripcion', label: 'Inscripción', icon: GraduationCap }])
    ];

    return (
        <div className="flex h-screen bg-[#F8F9FA] text-slate-800 font-sans">
            {/* Sidebar Básico */}
            <aside className="w-64 bg-white shadow-sm p-6 flex flex-col border-r border-gray-100">
                <div className="mb-10">
                    <div className="flex items-center gap-2 text-ucvBlue">
                        <Box className="w-6 h-6" />
                        <h1 className="text-2xl font-bold tracking-tight">SAE-U</h1>
                    </div>
                    <p className="text-[10px] text-gray-500 tracking-widest mt-1 uppercase">Académico</p>
                </div>

                <nav className="flex flex-col gap-2">
                    {menuItems.map((item) => {
                        const isActive = location.pathname === item.path || (item.path === '/dashboard' && location.pathname === '/');
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${isActive
                                        ? 'bg-[#FFF9EE] text-[#E67E22]'
                                        : 'text-gray-500 hover:bg-gray-50'
                                    }`}
                            >
                                <Icon className="w-5 h-5" />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>
            </aside>

            <main className="flex-1 overflow-y-auto">
                {/* Header */}
                <header className="flex justify-between items-center p-8 pb-4">
                    <h2 className="text-[28px] text-[#2C3E50]" style={{ fontFamily: 'Georgia, serif' }}>
                        Bienvenido, Andrés Silva
                    </h2>

                    <div className="flex items-center gap-6">
                        {/* SIMULADOR DE ESTATUS PARA EL MVP */}
                        <div className="flex items-center gap-3 bg-white p-2 px-3 rounded shadow-sm border border-gray-100 text-sm">
                            <span className="text-gray-500 text-xs">Simulador:</span>
                            <button
                                onClick={() => setIsSolvente(!isSolvente)}
                                className={`px-2 py-1 rounded text-white text-xs font-bold transition-colors ${isSolvente ? 'bg-statusGreen' : 'bg-statusOrange'
                                    }`}
                            >
                                {isSolvente ? 'Solvente' : 'Pendiente'}
                            </button>
                            <button
                                onClick={() => setIsInscrito(!isInscrito)}
                                className={`px-2 py-1 rounded text-white text-xs font-bold transition-colors ${isInscrito ? 'bg-ucvBlue' : 'bg-gray-400'
                                    }`}
                            >
                                {isInscrito ? 'Inscrito' : 'No Inscrito'}
                            </button>
                        </div>

                        <img
                            src="https://api.dicebear.com/7.x/notionists/svg?seed=Andres"
                            alt="Profile"
                            className="w-10 h-10 rounded-full bg-gray-200 border border-gray-300"
                        />
                    </div>
                </header>

                <div className="p-8 pt-4">
                    {children}
                </div>
            </main>
        </div>
    );
}