/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import FloatingWhatsApp from './components/FloatingWhatsApp';

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* Placeholder routes for others to maintain structure */}
            <Route path="/casas" element={<Home />} />
            <Route path="/apartamentos" element={<Home />} />
            <Route path="/sobre" element={<Home />} />
            <Route path="/localizacao" element={<Home />} />
            <Route path="/contato" element={<Home />} />
          </Routes>
        </main>
        <Footer />
        <FloatingWhatsApp />
      </div>
    </Router>
  );
}

