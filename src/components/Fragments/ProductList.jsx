import React, { useState } from 'react';
import ProductCard from "./ProductCard";
import Pagination from './Pagination';
import Filter from './Filter';

function ProductList({ products, onProductClick }) {

  //    Paginación
  const productosPorPagina = 15;
  const totalDePaginas = Math.ceil(products.length / productosPorPagina);
  const [currentPage, setCurrentPage] = useState(1);
  // Calcula el índice inicial y final de las noticias a mostrar en la página actual
  const startIndex = (currentPage - 1) * productosPorPagina;
  const endIndex = startIndex + productosPorPagina - 1;

  const productosActuales = products.slice(startIndex, endIndex + 1);

  //Función para cambiar de página
  const handleGoToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Función para manejar el evento del botón "Anterior"
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Función para manejar el evento del botón "Siguiente"
  const handleNextPage = () => {
    if (currentPage < totalDePaginas) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center gap-6 mb-5">
        <br></br>

        <h2 className="text-2xl font-semibold text-white ">Todos nuestros productos</h2>
        <div className="flex justify-center flex-wrap gap-4">
          {productosActuales.map((product) => (
            <ProductCard
              key={product._id}
              onProductClick={() => onProductClick(product._id)}
              {...product}
            />
          ))}
        </div>
        <Pagination totalDePaginas={totalDePaginas}
          currentPage={currentPage} handleGoToPage={handleGoToPage}
          handlePreviousPage={handlePreviousPage} handleNextPage={handleNextPage} />
      </div>
    </>
  );
}

export default ProductList;
