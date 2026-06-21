// src/views/Inscripcion.jsx
import { useState } from 'react';
import { Clock, AlertTriangle, RotateCcw, Check, Calendar, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const SUBJECTS = [
    {
        id: 'MAT-101',
        name: 'Cálculo Diferencial',
        req: 'Requisito para: Cálculo Integral',
        scheduleText: 'L J 08:00 - 10:00',
        credits: 4,
        conflictWith: null,
        blocks: [
            { day: 'L', start: 8, duration: 2, left: '0%' },
            { day: 'J', start: 8, duration: 2, left: '60%' }
        ]
    },
    {
        id: 'FIS-101',
        name: 'Física I',
        req: 'Requisito: Ninguno',
        scheduleText: 'M V 10:00 - 11:30',
        credits: 3,
        conflictWith: null,
        blocks: [
            { day: 'M', start: 10, duration: 1.5, left: '20%' },
            { day: 'V', start: 10, duration: 1.5, left: '80%' }
        ]
    },
    {
        id: 'INF-101',
        name: 'Programación I',
        req: 'Requisito: Ninguno',
        scheduleText: 'M V 10:00 - 12:00',
        credits: 4,
        conflictWith: 'FIS-101',
        blocks: [
            { day: 'M', start: 10, duration: 2, left: '20%' },
            { day: 'V', start: 10, duration: 2, left: '80%' }
        ]
    }
];

export default function Inscripcion({ setIsInscrito, selectedIds, setSelectedIds }) {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);

    const totalCredits = SUBJECTS.filter(s => selectedIds.includes(s.id)).reduce((sum, s) => sum + s.credits, 0);

    const toggleSubject = (subject) => {
        if (selectedIds.includes(subject.id)) {
            setSelectedIds(selectedIds.filter(id => id !== subject.id));
        } else {
            // No permitir si hay conflicto
            const conflictId = isConflict(subject);
            if (conflictId) return;

            if (totalCredits + subject.credits > 18) {
                alert("Límite de créditos excedido (Máx 18).");
                return;
            }

            setSelectedIds([...selectedIds, subject.id]);
        }
    };

    const isConflict = (subject) => {
        if (selectedIds.includes(subject.id)) return false;
        
        // El subject tiene un conflicto explícito con algo seleccionado
        if (subject.conflictWith && selectedIds.includes(subject.conflictWith)) {
            return SUBJECTS.find(s => s.id === subject.conflictWith).name;
        }
        
        // Algo seleccionado tiene conflicto explícito con este subject
        const conflictFromSelected = selectedIds.find(id => {
            const s = SUBJECTS.find(sub => sub.id === id);
            return s.conflictWith === subject.id;
        });
        if (conflictFromSelected) {
            return SUBJECTS.find(s => s.id === conflictFromSelected).name;
        }

        return false;
    };

    return (
        <div className="flex gap-12 animate-fade-in mx-auto max-w-5xl items-start">
            {/* Columna Principal */}
            <div className="flex-1 space-y-8">

                {/* Wizard */}
                <div className="flex items-center justify-between bg-white px-8 py-4 rounded-full shadow-sm text-sm font-bold w-full mx-auto border border-gray-50">
                    {/* Paso 1 */}
                    <div className={`flex items-center gap-2 ${step >= 1 ? 'text-[#2C3E50]' : 'text-gray-300'}`}>
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 1 ? 'bg-[#E5A91A] text-white' : 'bg-gray-100 text-gray-400'}`}>
                            {step > 1 ? <Check className="w-3.5 h-3.5" /> : 1}
                        </div>
                        <span>Seleccionar</span>
                    </div>
                    <div className={`flex-1 h-[2px] mx-4 ${step >= 2 ? 'bg-[#E5A91A]' : 'bg-gray-100'}`}></div>
                    
                    {/* Paso 2 */}
                    <div className={`flex items-center gap-2 ${step >= 2 ? 'text-[#2C3E50]' : 'text-gray-300'}`}>
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 2 ? 'bg-[#E5A91A] text-white' : 'bg-gray-100 text-gray-400'}`}>
                            {step > 2 ? <Check className="w-3.5 h-3.5" /> : 2}
                        </div>
                        <span>Horarios</span>
                    </div>
                    <div className={`flex-1 h-[2px] mx-4 ${step >= 3 ? 'bg-[#E5A91A]' : 'bg-gray-100'}`}></div>
                    
                    {/* Paso 3 */}
                    <div className={`flex items-center gap-2 ${step >= 3 ? 'text-[#2C3E50]' : 'text-gray-300'}`}>
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 3 ? 'bg-[#E5A91A] text-white' : 'bg-gray-100 text-gray-400'}`}>
                            3
                        </div>
                        <span>Confirmar</span>
                    </div>
                </div>

                {/* Contenido Dinámico por Paso */}
                <div className="min-h-[400px]">
                    {step === 1 && (
                        <div className="animate-fade-in">
                            <h2 className="text-3xl text-[#2C3E50] mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                                Materias Sugeridas
                            </h2>
                            <p className="text-gray-500 text-sm mb-6">
                                Selecciona las materias que deseas cursar. El sistema verificará los requisitos previos.
                            </p>

                            <div className="space-y-4">
                                {SUBJECTS.map((subject) => {
                                    const isSelected = selectedIds.includes(subject.id);
                                    const conflictName = isConflict(subject);
                                    
                                    let cardClasses = "bg-white border-gray-200 cursor-pointer hover:border-gray-300";
                                    if (isSelected) cardClasses = "bg-[#FFFDF8] border-[#E5A91A] cursor-pointer";
                                    if (conflictName) cardClasses = "bg-white border-red-200 opacity-90 cursor-not-allowed";

                                    return (
                                        <div 
                                            key={subject.id} 
                                            onClick={() => toggleSubject(subject)}
                                            className={`p-5 rounded-2xl shadow-sm border-2 flex flex-col gap-4 transition-all ${cardClasses}`}
                                        >
                                            <div className="flex items-start gap-4">
                                                <div className={`w-5 h-5 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0 ${
                                                    isSelected ? 'bg-[#E5A91A]' : conflictName ? 'border-2 border-gray-300' : 'border-2 border-gray-300'
                                                }`}>
                                                    {isSelected && <Check className="w-3.5 h-3.5 text-white stroke-[3]" />}
                                                </div>
                                                
                                                <div className="flex-1">
                                                    <h3 className="font-bold text-lg text-[#2C3E50]">{subject.name}</h3>
                                                    <p className="text-xs text-gray-500 mt-1">{subject.id} • {subject.req}</p>
                                                    <div className="mt-3 flex items-center">
                                                        <span className={`text-xs border rounded-full px-3 py-1 flex items-center gap-1.5 ${
                                                            isSelected ? 'text-[#E5A91A] border-[#F4E1B3] bg-white' : 
                                                            conflictName ? 'text-gray-400 border-gray-200 bg-white' : 
                                                            'text-gray-500 border-gray-200 bg-white'
                                                        }`}>
                                                            <Clock className="w-3.5 h-3.5" /> {subject.scheduleText}
                                                        </span>
                                                    </div>

                                                    {conflictName && (
                                                        <div className="mt-4 bg-[#FEF2F2] text-red-500 text-xs font-medium px-3 py-2 rounded-lg flex items-center gap-1.5">
                                                            <AlertTriangle className="w-4 h-4" />
                                                            Conflicto de horario con {conflictName}
                                                        </div>
                                                    )}
                                                </div>
                                                
                                                <div className="bg-gray-50 text-gray-600 text-xs font-bold px-3 py-1.5 rounded-lg flex-shrink-0">
                                                    {subject.credits} Créditos
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="animate-fade-in flex flex-col items-center justify-center h-full py-12 text-center">
                            <Calendar className="w-16 h-16 text-[#E5A91A] mb-4" />
                            <h2 className="text-3xl text-[#2C3E50] mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                                Revisa tu Horario
                            </h2>
                            <p className="text-gray-500 text-sm mb-6 max-w-md">
                                Verifica que no haya cruces y que el horario se adapte a tus necesidades antes de confirmar tu inscripción.
                            </p>
                            <div className="bg-[#FFFDF8] border border-[#E5A91A] p-6 rounded-2xl shadow-sm text-left w-full max-w-md">
                                <h4 className="font-bold text-[#2C3E50] mb-4 border-b border-[#F4E1B3] pb-2">Resumen</h4>
                                <ul className="space-y-3">
                                    {SUBJECTS.filter(s => selectedIds.includes(s.id)).map(s => (
                                        <li key={s.id} className="flex justify-between items-center text-sm">
                                            <span className="font-bold text-gray-700">{s.name}</span>
                                            <span className="text-gray-500">{s.scheduleText}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="animate-fade-in flex flex-col items-center justify-center h-full py-12 text-center">
                            <CheckCircle2 className="w-20 h-20 text-statusGreen mb-4" />
                            <h2 className="text-3xl text-[#2C3E50] mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                                ¡Inscripción Exitosa!
                            </h2>
                            <p className="text-gray-500 text-sm mb-6 max-w-md">
                                Tus materias han sido inscritas oficialmente para el período 2024-II.
                            </p>
                            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm w-full max-w-md flex justify-between items-center">
                                <span className="font-bold text-gray-600">Total Créditos Inscritos:</span>
                                <span className="text-2xl font-bold text-[#2C3E50]">{totalCredits}</span>
                            </div>
                        </div>
                    )}
                </div>
                
                {/* Bottom Bar: Total y Continuar */}
                <div className="bg-white p-4 px-6 rounded-full shadow-sm border border-gray-100 flex justify-between items-center mt-4 transition-all">
                    {step < 3 ? (
                        <>
                            <div className="text-[#2C3E50]">
                                <span className="text-sm text-gray-400 mr-2">Total Créditos:</span>
                                <span className="text-xl font-bold">{totalCredits} <span className="text-sm font-normal text-gray-400">/ 18</span></span>
                            </div>
                            <div className="flex gap-4">
                                {step > 1 && (
                                    <button 
                                        onClick={() => setStep(step - 1)}
                                        className="text-gray-500 font-bold py-2.5 px-6 rounded-full hover:bg-gray-50 text-sm transition-colors"
                                    >
                                        VOLVER
                                    </button>
                                )}
                                <button 
                                    onClick={() => setStep(step + 1)}
                                    disabled={totalCredits === 0}
                                    className="bg-[#E5A91A] text-white font-bold py-2.5 px-8 rounded-full hover:bg-opacity-90 flex items-center gap-2 text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {step === 1 ? 'CONTINUAR' : 'CONFIRMAR'} &rarr;
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="w-full flex justify-center">
                            <button 
                                onClick={() => {
                                    setIsInscrito(true);
                                    navigate('/dashboard');
                                }}
                                className="bg-[#1C2B4F] text-white font-bold py-3 px-12 rounded-full hover:bg-opacity-90 flex items-center gap-2 text-sm transition-colors"
                            >
                                VOLVER AL DASHBOARD
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Sidebar Horario Preliminar (Solo visible en pasos 1 y 2) */}
            {step < 3 && (
                <div className="w-80 mt-16 animate-fade-in hidden lg:block">
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-bold text-[#2C3E50]">Horario Preliminar</h3>
                            <div className="flex items-center gap-1 text-gray-400 text-[10px] font-medium">
                                <RotateCcw className="w-3 h-3" /> Autoguardado
                            </div>
                        </div>
                        
                        {/* Rejilla de Horario */}
                        <div className="relative text-[10px] text-gray-400 font-medium">
                            <div className="flex justify-between mb-2 pl-8 pr-2">
                                <span>L</span>
                                <span>M</span>
                                <span>M</span>
                                <span>J</span>
                                <span>V</span>
                            </div>
                            
                            <div className="space-y-4 relative">
                                {[8, 9, 10, 11, 12].map(hour => (
                                    <div key={hour} className="flex gap-2">
                                        <span className="w-6 text-right">{hour.toString().padStart(2, '0')}:00</span>
                                        <div className="flex-1 border-t border-gray-100 mt-1.5"></div>
                                    </div>
                                ))}

                                {/* Render dinámico de bloques de horario */}
                                <div className="absolute top-0 left-8 right-0 bottom-0 pointer-events-none">
                                    {SUBJECTS.filter(s => selectedIds.includes(s.id)).map(subject => (
                                        subject.blocks.map((block, idx) => {
                                            // Cálculos básicos para la posición (8am es top 0, cada hora es ~28px aprox, simplificado para MVP)
                                            const topOffset = (block.start - 8) * 28;
                                            const height = block.duration * 28;
                                            return (
                                                <div 
                                                    key={`${subject.id}-${idx}`}
                                                    className="absolute bg-[#FFF4D6] border-l-4 border-[#E5A91A] p-1 shadow-sm overflow-hidden"
                                                    style={{ 
                                                        top: `${topOffset}px`, 
                                                        left: block.left, 
                                                        width: '18%', 
                                                        height: `${height}px`,
                                                        marginTop: '6px' // Ajuste por el texto de la hora
                                                    }}
                                                >
                                                    <span className="text-[#2C3E50] font-bold text-[8px] leading-none block">
                                                        {subject.id}
                                                    </span>
                                                </div>
                                            )
                                        })
                                    ))}
                                </div>
                            </div>
                        </div>
                        
                        <div className="mt-12 flex items-center gap-2 text-xs text-gray-400">
                            <div className="w-3 h-3 border border-gray-300 rounded-sm bg-[#FFF4D6]"></div>
                            Materia seleccionada
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}