import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Importar useLocation para obtener la palabra clave de la URL
import ProductList from './ProductList';
import Buscador from './Buscador';

const Resultados = () => {
    const navigate = useNavigate();
    const location = useLocation(); // Obtener la ubicación actual para acceder a la query string
    const [resultados, setResultados] = useState([]);
    const [loading, setLoading] = useState(true);

    // Obtener la palabra clave de la URL
    const query = new URLSearchParams(location.search);
    const keyword = query.get('keyword') || ''; // Manejo de palabra clave vacía

    // Realiza la solicitud HTTP para buscar productos que coincidan con la palabra clave
    useEffect(() => {
        if (keyword) {
            setLoading(true);
            axios.get(`https://digital-mirage-backend-old-shape-7317.fly.dev/productos/buscar/${keyword}`)
                .then((response) => {
                    setResultados(response.data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error(`Error al obtener productos: ${error}`);
                    setLoading(false);
                });
        } else {
            setResultados([]); // Si no hay keyword, limpia los resultados
            setLoading(false);
        }
    }, [keyword]);

    // Maneja la navegación al hacer clic en un producto
    const handleProductClick = (productId) => {
        navigate(`/productdetail/${productId}`);
    };

    return (
        <>
            <Buscador /> {/* Componente de búsqueda */}
            {loading ? (
                <h2>Cargando...</h2> // Muestra "Cargando..." mientras se cargan los datos.
            ) : resultados.length > 0 ? (
                <ProductList products={resultados} onProductClick={handleProductClick} />
            ) : (
                <h2>No se encontraron productos.</h2> // Mensaje si no hay resultados.
            )}
        </>
    );
};

export default Resultados;