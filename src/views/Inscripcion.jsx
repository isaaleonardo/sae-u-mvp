// src/views/Inscripcion.jsx
export default function Inscripcion() {
    return (
        <div className="flex gap-6 animate-fade-in">
            {/* Columna Principal - Materias */}
            <div className="flex-1 space-y-6">

                {/* Wizard */}
                <div className="flex items-center justify-between bg-white p-4 rounded shadow-sm text-sm font-bold text-gray-400">
                    <span className="text-ucvGold">1. Seleccionar</span>
                    <span>2. Horarios</span>
                    <span>3. Confirmar</span>
                </div>

                <div>
                    <h2 className="text-2xl font-heading font-bold text-ucvBlue mb-4">Materias Sugeridas</h2>

                    <div className="space-y-4">
                        {/* Materia Disponible */}
                        <div className="bg-white p-4 rounded shadow-sm border border-gray-200 flex justify-between items-center">
                            <div>
                                <h3 className="font-bold text-lg">Cálculo Diferencial</h3>
                                <p className="text-xs text-gray-500">MAT-101 • Requisito para: Cálculo Integral</p>
                                <p className="text-sm mt-2">🕒 L J 08:00 - 10:00</p>
                            </div>
                            <span className="text-sm font-bold text-gray-500">4 Créditos</span>
                        </div>

                        {/* Materia Seleccionada */}
                        <div className="bg-blue-50 p-4 rounded shadow-sm border-2 border-ucvGold flex justify-between items-center relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-1 h-full bg-ucvGold"></div>
                            <div>
                                <h3 className="font-bold text-lg flex items-center gap-2">
                                    <span className="text-ucvGold">✓</span> Física I
                                </h3>
                                <p className="text-xs text-gray-500">FIS-101 • Requisito: Ninguno</p>
                                <p className="text-sm mt-2 inline-block bg-white border border-gray-200 px-2 py-1 rounded">🕒 M V 09:00 - 11:30</p>
                            </div>
                            <span className="text-sm font-bold text-gray-500">3 Créditos</span>
                        </div>

                        {/* Materia Bloqueada */}
                        <div className="bg-gray-50 p-4 rounded shadow-sm border border-gray-200 flex justify-between items-center opacity-75">
                            <div>
                                <h3 className="font-bold text-lg text-gray-400">Programación I</h3>
                                <p className="text-xs text-gray-400">INF-101 • Requisito: Ninguno</p>
                                <p className="text-sm mt-2 text-statusRed font-bold flex items-center gap-1">
                                    ⚠️ Conflicto de horario con Física I
                                </p>
                            </div>
                            <span className="text-sm font-bold text-gray-400">4 Créditos</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sidebar Horario Preliminar */}
            <div className="w-80 space-y-4">
                <div className="bg-white p-4 rounded shadow-sm border border-gray-200">
                    <h3 className="font-heading font-bold text-ucvBlue mb-4">Horario Preliminar</h3>
                    <div className="h-64 border-t border-l border-gray-100 relative text-xs text-gray-400">
                        {/* Simulación visual de un bloque en el horario */}
                        <div className="absolute top-1/4 left-1/4 w-1/4 h-1/4 bg-yellow-100 border-l-4 border-ucvGold p-1 text-gray-800 font-bold rounded-r">
                            FIS-101
                        </div>
                    </div>
                </div>

                {/* Footer flotante */}
                <div className="bg-white p-4 rounded shadow-sm border border-gray-200 flex flex-col gap-3">
                    <div className="flex justify-between items-center font-bold">
                        <span className="text-gray-500">Total Créditos:</span>
                        <span className="text-lg">3 / 18</span>
                    </div>
                    <button className="w-full bg-ucvGold text-white font-bold py-2 rounded shadow-md hover:bg-opacity-90">
                        CONTINUAR
                    </button>
                </div>
            </div>
        </div>
    );
}