// src/views/Dashboard.jsx
import { CalendarCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard({ isSolvente, isInscrito }) {
    const navigate = useNavigate();

    return (
        <div className="space-y-6 animate-fade-in max-w-5xl">
            {/* Banner de Cita */}
            <div className="bg-[#1C2B4F] text-white p-6 rounded-xl shadow-sm flex items-center gap-4">
                <div className="bg-[#D4A373] p-2 rounded-lg flex-shrink-0">
                    <CalendarCheck className="w-5 h-5 text-white" />
                </div>
                <div>
                    <h3 className="font-bold text-lg">Cita horaria: 14 sept, 09:30 AM</h3>
                    <p className="text-sm text-gray-300">Tu turno ha sido asignado basado en tu promedio académico actual.</p>
                </div>
            </div>

            {/* Tarjetas de Estatus */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="font-bold text-[#2C3E50] mb-4">Estatus</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-[#F8F9FA] p-4 py-6 rounded-lg flex flex-col items-center justify-center gap-1">
                        <div className="w-3 h-3 rounded-full bg-statusGreen mb-2"></div>
                        <p className="text-[10px] text-gray-400 font-bold tracking-widest">ACADÉMICO</p>
                        <p className="text-statusGreen font-bold text-sm">SOLVENTE</p>
                    </div>
                    
                    <div className="bg-[#F8F9FA] p-4 py-6 rounded-lg flex flex-col items-center justify-center gap-1">
                        <div className={`w-3 h-3 rounded-full mb-2 ${isSolvente ? 'bg-statusGreen' : 'bg-[#E67E22]'}`}></div>
                        <p className="text-[10px] text-gray-400 font-bold tracking-widest">ADMINISTRATIVO</p>
                        <p className={`font-bold text-sm ${isSolvente ? 'text-statusGreen' : 'text-[#E67E22]'}`}>
                            {isSolvente ? 'SOLVENTE' : 'PENDIENTE'}
                        </p>
                    </div>
                    
                    <div className="bg-[#F8F9FA] p-4 py-6 rounded-lg flex flex-col items-center justify-center gap-1">
                        <div className="w-3 h-3 rounded-full bg-statusGreen mb-2"></div>
                        <p className="text-[10px] text-gray-400 font-bold tracking-widest">BIBLIOTECA</p>
                        <p className="text-statusGreen font-bold text-sm">SIN DEUDAS</p>
                    </div>
                </div>
            </div>

            {/* Progreso */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex items-center gap-12">
                {/* Círculo de Progreso */}
                <div className="flex-shrink-0 relative w-32 h-32 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90 absolute" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="45" fill="none" stroke="#F4F4F4" strokeWidth="8" />
                        <circle 
                            cx="50" cy="50" r="45" 
                            fill="none" 
                            stroke="#C9A03D" 
                            strokeWidth="8" 
                            strokeDasharray="283" 
                            strokeDashoffset="50" 
                            strokeLinecap="round" 
                        />
                    </svg>
                    <div className="flex flex-col items-center z-10 mt-1">
                        <span className="font-bold text-3xl text-[#2C3E50]">16.5</span>
                        <span className="text-xs text-gray-400 font-medium">/ 20</span>
                    </div>
                </div>

                <div className="flex-1">
                    <h3 className="font-bold text-[#2C3E50] mb-4">Tu Progreso Académico</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-[#F8F9FA] p-5 rounded-lg flex flex-col justify-center">
                            <p className="text-[10px] text-gray-400 font-bold tracking-widest mb-1">CRÉDITOS APROBADOS</p>
                            <p className="text-2xl font-bold text-[#2C3E50]">
                                112 <span className="text-sm text-gray-400 font-normal">/ 160</span>
                            </p>
                        </div>
                        <div className="bg-[#F8F9FA] p-5 rounded-lg flex flex-col justify-center">
                            <p className="text-[10px] text-gray-400 font-bold tracking-widest mb-1">MATERIAS CURSADAS</p>
                            <p className="text-2xl font-bold text-[#2C3E50]">28</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Call to Action (CTA) */}
            {isInscrito ? (
                <button 
                    onClick={() => navigate('/horario')}
                    className="bg-[#1C2B4F] text-white hover:text-[#C9A03D] w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-colors shadow-sm mt-4"
                >
                    VER HORARIO →
                </button>
            ) : !isSolvente ? (
                <button 
                    onClick={() => navigate('/pago')}
                    className="bg-[#E67E22] text-white hover:bg-opacity-90 w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-colors shadow-sm mt-4"
                >
                    REALIZAR PAGO PARA INSCRIBIRSE →
                </button>
            ) : (
                <button 
                    onClick={() => navigate('/inscripcion')}
                    className="bg-[#1C2B4F] text-white hover:text-[#C9A03D] w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-colors shadow-sm mt-4"
                >
                    INICIAR INSCRIPCIÓN →
                </button>
            )}
        </div>
    );
}