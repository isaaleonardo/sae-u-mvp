// src/views/Dashboard.jsx
import { useNavigate } from 'react-router-dom';

export default function Dashboard({ isSolvente }) {
    const navigate = useNavigate();

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Tarjetas de Estatus */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm text-center border-t-4 border-statusGreen">
                    <p className="text-xs text-gray-500 font-bold tracking-widest">ACADÉMICO</p>
                    <p className="text-statusGreen font-bold text-lg">SOLVENTE</p>
                </div>
                <div className={`bg-white p-4 rounded-lg shadow-sm text-center border-t-4 ${isSolvente ? 'border-statusGreen' : 'border-statusOrange'}`}>
                    <p className="text-xs text-gray-500 font-bold tracking-widest">ADMINISTRATIVO</p>
                    <p className={`font-bold text-lg ${isSolvente ? 'text-statusGreen' : 'text-statusOrange'}`}>
                        {isSolvente ? 'SOLVENTE' : 'PENDIENTE'}
                    </p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm text-center border-t-4 border-statusGreen">
                    <p className="text-xs text-gray-500 font-bold tracking-widest">BIBLIOTECA</p>
                    <p className="text-statusGreen font-bold text-lg">SIN DEUDAS</p>
                </div>
            </div>

            {/* Banner de Cita */}
            <div className="bg-blue-50 border-l-4 border-ucvBlue p-4 rounded shadow-sm">
                <h3 className="font-heading font-bold text-ucvBlue">Cita horaria: 14 sept, 09:30 AM</h3>
                <p className="text-sm text-gray-600">Tu turno ha sido asignado basado en tu promedio académico actual.</p>
            </div>

            {/* Progreso y CTA */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
                <div className="bg-white p-6 rounded-lg shadow-sm flex items-center gap-6 col-span-2">
                    <div className="w-24 h-24 rounded-full border-8 border-ucvGold flex items-center justify-center flex-col">
                        <span className="font-bold text-2xl">16.5</span>
                        <span className="text-xs">/20</span>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 font-bold">CRÉDITOS APROBADOS</p>
                        <p className="text-xl font-bold text-ucvBlue">112 / 160</p>
                    </div>
                </div>

                {/* Botón con Lógica Condicional */}
                <button
                    onClick={() => navigate(isSolvente ? '/inscripcion' : '/pago')}
                    className="bg-ucvBlue text-white hover:bg-opacity-90 w-full py-6 rounded-lg font-heading font-bold text-lg transition-all shadow-md"
                >
                    INICIAR INSCRIPCIÓN →
                </button>
            </div>
        </div>
    );
}