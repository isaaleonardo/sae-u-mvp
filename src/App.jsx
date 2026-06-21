import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './views/Dashboard';
import PagoMovil from './views/PagoMovil';
import Inscripcion from './views/Inscripcion';
import Horario from './views/Horario';

function App() {
  // Estados de simulación para el MVP
  const [isSolvente, setIsSolvente] = useState(false);
  const [isInscrito, setIsInscrito] = useState(false);
  const [selectedSubjectsIds, setSelectedSubjectsIds] = useState(['FIS-101']);

  return (
    <Router>
      <Layout 
        isSolvente={isSolvente} setIsSolvente={setIsSolvente}
        isInscrito={isInscrito} setIsInscrito={setIsInscrito}
      >
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard isSolvente={isSolvente} isInscrito={isInscrito} />} />
          <Route path="/pago" element={<PagoMovil setIsSolvente={setIsSolvente} />} />
          <Route
            path="/inscripcion"
            element={
              isSolvente ? (
                <Inscripcion 
                  setIsInscrito={setIsInscrito} 
                  selectedIds={selectedSubjectsIds} 
                  setSelectedIds={setSelectedSubjectsIds} 
                />
              ) : <Navigate to="/pago" />
            }
          />
          <Route path="/horario" element={<Horario selectedIds={selectedSubjectsIds} />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;