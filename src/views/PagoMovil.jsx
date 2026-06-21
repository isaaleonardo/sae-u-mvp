// src/views/PagoMovil.jsx
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function PagoMovil({ setIsSolvente }) {
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);

    const handlePago = (e) => {
        e.preventDefault();
        setIsProcessing(true);

        // Simulamos una llamada a la API de 2 segundos
        setTimeout(() => {
            setIsSolvente(true);
            setIsProcessing(false);
            navigate('/dashboard');
        }, 2000);
    };

    return (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md animate-fade-in">
            <h2 className="text-2xl font-heading font-bold text-ucvBlue mb-2">Registro de Pago Móvil</h2>
            <p className="text-gray-600 mb-8 text-sm">Ingrese los datos exactos de su transferencia para la validación administrativa. Este proceso asegura su inscripción.</p>

            <form onSubmit={handlePago} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Banco Emisor</label>
                        <select className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:border-ucvGold" required>
                            <option value="">Seleccione el banco...</option>
                            <option value="bdv">Banco de Venezuela</option>
                            <option value="mercantil">Mercantil</option>
                            <option value="banesco">Banesco</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Número de Referencia</label>
                        <input type="text" placeholder="# Ej. 123456" maxLength="6" className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:border-ucvGold" required />
                        <p className="text-xs text-gray-500 mt-1">Debe contener exactamente los últimos 6 dígitos</p>
                    </div>
                </div>

                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50">
                    <p className="text-gray-500 font-bold">Sube un archivo o arrastra y suelta</p>
                    <p className="text-xs text-gray-400 mt-1">PDF, JPG, PNG HASTA 2MB</p>
                </div>

                <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full bg-ucvGold text-white font-bold py-3 rounded-lg hover:bg-opacity-90 transition-colors"
                >
                    {isProcessing ? 'Validando con el banco...' : 'REGISTRAR PAGO'}
                </button>
            </form>
        </div>
    );
}