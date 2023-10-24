import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoadingScreen from './components/Fragments/LoadingScreen.jsx';
import Header from './components/layout/Header.jsx';
import Footer from './components/layout/Footer.jsx';
import Banner2 from './components/Fragments/Banner2.jsx';
import Banner from './components/Fragments/Banner.jsx';
import Router from './Router';
import Faq from './components/Pages/SubPages/Faq.jsx';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Oculta la pantalla de carga después de 1.5 segundos
  }, []);

  return (
    <BrowserRouter>
      {isLoading ? (
        <LoadingScreen /> // Muestra la pantalla de carga mientras isLoading sea true
      ) : (
        <div>
          <Header />
          {/* Condicional para mostrar o no el Banner en función de la ruta */}
          {window.location.pathname !== '/faq' && window.location.pathname !== '/contacto' && <Banner />}
          <main>
            <Router />
          </main>
          <Banner2 />
          <Footer />
        </div>
      )}
    </BrowserRouter>
  );
}

export default App;