import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoadingScreen from './components/Fragments/LoadingScreen.jsx';
import Header from './components/layout/Header.jsx';
import Footer from './components/layout/Footer.jsx';
import Router from './Router.jsx';
import { ShoppingCartProvider } from './components/Context/ShoppingCartContext.jsx';
import CartButton from './components/Fragments/CartButton.jsx';
import { LoginProvider } from './components/Context/LoginContext.jsx';
import Banner from './components/Fragments/Banner.jsx';
import Banner2 from './components/Fragments/Banner2.jsx';
import Filter from './components/Fragments/Filter.jsx';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Oculta la pantalla de carga después de 1.5 segundos
  }, []);

  return (
    <LoginProvider>
      <ShoppingCartProvider>
        <BrowserRouter>
          {isLoading ? (
            <LoadingScreen /> // Muestra la pantalla de carga mientras isLoading sea true
          ) : (
            <div>
              <Header />
              <Banner />
              {/* Condicional para mostrar o no el Banner en función de la ruta */}
              {/* {window.location.pathname !== '/faq' && window.location.pathname !== '/checkout' && window.location.pathname !== '/contacto' && window.location.pathname !== '/nosotros' && window.location.pathname !== '/wishlist' && window.location.pathname !== '/productdetail' && <Banner />} */}
              <main>
                <Router />
              </main>
              {/* Condicional para mostrar o no el Banner2 en función de la ruta */}
              {/* {window.location.pathname !== '/faq' && window.location.pathname !== '/checkout' && window.location.pathname !== '/wishlist' && window.location.pathname !== '/contacto' && window.location.pathname !== '/nosotros' && window.location.pathname !== '/productdetail' && <Banner2 />} */}

              <CartButton />
              <Banner2 />
              <Footer />
            </div>
          )}
        </BrowserRouter>
      </ShoppingCartProvider>
    </LoginProvider>
  );
}

export default App;
