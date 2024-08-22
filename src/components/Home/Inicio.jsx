import React, { useEffect, useState } from "react";
import ProductList from "../Fragments/ProductList";
import Buscador from "../Fragments/Buscador";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Filter from "../Fragments/Filter";

function Inicio() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const endpoint = "https://digital-mirage-backend-old-shape-7317.fly.dev/productos";

    axios
      .get(endpoint)
      .then((response) => {
        const data = response.data;
        if (selectedCategory) {

          if (selectedCategory === "Todos los articulos") {
            setProducts(data);
          } else {
            const filteredData = data.filter(
              (product) => product.categoria[0].name.toUpperCase() === selectedCategory.toUpperCase());
            setProducts(filteredData);
          }
          
        } else {
          setProducts(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        alert("No se encontraron artículos");
        setLoading(false);
      });
  }, [selectedCategory]);

  const handleProductClick = (productId) => {
    navigate(`/productdetail/${productId}`);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category); // Actualiza la categoría seleccionada
  };

  return (
    <>
      <Buscador />

      <div className="flex flex-col items-center gap-6 mb-5">
        <Filter onCategorySelect={handleCategorySelect} />


        {loading ? (
          <h2>Cargando...</h2>
        ) : (
          <ProductList products={products} onProductClick={handleProductClick} />
        )}
      </div>
    </>
  );
}

export default Inicio;
