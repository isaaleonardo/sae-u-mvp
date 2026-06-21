import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './views/Dashboard';
import PagoMovil from './views/PagoMovil';
import Inscripcion from './views/Inscripcion';

function App() {
  // Estado para simular la solvencia administrativa
  const [isSolvente, setIsSolvente] = useState(false);

  return (
    <Router>
      <Layout isSolvente={isSolvente} setIsSolvente={setIsSolvente}>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard isSolvente={isSolvente} />} />
          <Route path="/pago" element={<PagoMovil setIsSolvente={setIsSolvente} />} />
          {/* Protección de ruta: Si es insolvente, redirige a pago */}
          <Route
            path="/inscripcion"
            element={isSolvente ? <Inscripcion /> : <Navigate to="/pago" />}
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;