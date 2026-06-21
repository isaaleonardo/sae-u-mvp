import { Calendar as CalendarIcon } from 'lucide-react';
import { SUBJECTS } from './Inscripcion';

export default function Horario({ selectedIds }) {
    const activeSubjects = SUBJECTS.filter(s => selectedIds.includes(s.id));

    return (
        <div className="animate-fade-in max-w-5xl mx-auto space-y-8">
            <div>
                <h2 className="text-3xl text-[#2C3E50] mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                    Tu Horario
                </h2>
                <p className="text-gray-500 text-sm mb-6">
                    Estas son las materias en las que te has inscrito para el período 2024-II.
                </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 w-full flex">
                <div className="w-1/3 border-r border-gray-100 pr-8">
                    <h3 className="font-bold text-[#2C3E50] mb-6 flex items-center gap-2">
                        <CalendarIcon className="w-5 h-5 text-ucvGold" />
                        Materias Inscritas
                    </h3>
                    <ul className="space-y-4">
                        {activeSubjects.map(s => (
                            <li key={s.id} className="bg-[#F8F9FA] p-4 rounded-xl border border-gray-100">
                                <p className="font-bold text-[#2C3E50]">{s.name}</p>
                                <p className="text-sm text-gray-500 mt-1">{s.scheduleText}</p>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="w-2/3 pl-8">
                    {/* Rejilla de Horario Grande */}
                    <div className="relative text-xs text-gray-400 font-medium h-[400px]">
                        <div className="flex justify-between mb-4 pl-12 pr-4 font-bold text-gray-500">
                            <span className="w-1/5 text-center">Lunes</span>
                            <span className="w-1/5 text-center">Martes</span>
                            <span className="w-1/5 text-center">Miércoles</span>
                            <span className="w-1/5 text-center">Jueves</span>
                            <span className="w-1/5 text-center">Viernes</span>
                        </div>
                        
                        <div className="space-y-[32px] relative mt-6">
                            {[8, 9, 10, 11, 12, 13].map(hour => (
                                <div key={hour} className="flex gap-4">
                                    <span className="w-8 text-right">{hour.toString().padStart(2, '0')}:00</span>
                                    <div className="flex-1 border-t border-gray-100 mt-2 relative"></div>
                                </div>
                            ))}

                            {/* Render dinámico de bloques de horario */}
                            <div className="absolute top-0 left-12 right-0 bottom-0 pointer-events-none">
                                {activeSubjects.map(subject => (
                                    subject.blocks.map((block, idx) => {
                                        // Cada hora mide 32px de margen superior + 16px de línea base = aprox 48px
                                        const hourHeight = 48; 
                                        const topOffset = (block.start - 8) * hourHeight;
                                        const height = block.duration * hourHeight;
                                        return (
                                            <div 
                                                key={`${subject.id}-${idx}`}
                                                className="absolute bg-[#FFF4D6] border-l-4 border-[#E5A91A] p-2 shadow-sm rounded-r-lg overflow-hidden flex flex-col justify-center"
                                                style={{ 
                                                    top: `${topOffset}px`, 
                                                    left: block.left, 
                                                    width: '19%', 
                                                    height: `${height}px`,
                                                    marginTop: '8px'
                                                }}
                                            >
                                                <span className="text-[#2C3E50] font-bold text-sm block">
                                                    {subject.id}
                                                </span>
                                                <span className="text-gray-500 text-xs block truncate mt-1 font-normal">
                                                    {subject.name}
                                                </span>
                                            </div>
                                        )
                                    })
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
