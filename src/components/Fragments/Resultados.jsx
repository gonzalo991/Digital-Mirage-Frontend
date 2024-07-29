import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ProductList from './ProductList';
import Buscador from './Buscador';

const Resultados = () => {
    // Obtiene la palabra clave (keyword) de los parámetros de la URL.
    let query = new URLSearchParams(window.location.search);
    let keyword = query.get('keyword');

    // Estado para almacenar la lista completa de productos.
    const [productos, setProductos] = useState([]);

    // Estado para almacenar los productos filtrados por la palabra clave.
    const [resultados, setResultados] = useState([]);

    // Estado para indicar si se están cargando los datos.
    const [loading, setLoading] = useState(true);

    // Realiza una solicitud HTTP para obtener la lista completa de productos desde el servidor.
    useEffect(() => {
        axios.get("https://digital-mirage-backend-old-shape-7317.fly.dev/productos")
            .then((response) => {
                const data = response.data;
                setProductos(data);
                setLoading(false); // Finaliza la carga de datos.
            })
            .catch((error) => {
                console.error(`Error al obtener productos: ${error}`);
                setLoading(false); // Finaliza la carga de datos en caso de error.
            });
    }, []);

    // Este efecto se activa cuando cambia la palabra clave o la lista de productos.
    useEffect(() => {
        if (keyword) {
            // Filtra los productos que coinciden con la palabra clave (ignorando mayúsculas y minúsculas).
            const productosFiltrados = productos.filter((prod) =>
                prod.marca.toLowerCase() === keyword.toLowerCase()
            );
            setResultados(productosFiltrados);
        } else {
            // Si no se proporciona una palabra clave, muestra todos los productos.
            setResultados(productos);
        }
    }, [keyword, productos]);

    // Maneja el evento de clic en un producto.
    const handleProductClick = (productId) => {
        navigate(`/productdetail/${productId}`);
    };

    return (
        <>
            <Buscador /> {/* Componente de búsqueda */}
            {loading ? (
                <h2>Cargando...</h2> // Muestra "Cargando..." mientras se cargan los datos.
            ) : (
                <ProductList products={resultados} onProductClick={handleProductClick} />
                // Renderiza la lista de productos filtrados.
            )}
        </>
    );
}

export default Resultados;