import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const endpoint = `https://digital-mirage-backend-old-shape-7317.fly.dev/productos/byid/${productId}`;

    axios
      .get(endpoint)
      .then((response) => {
        const data = response.data;
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        alert("No se encontró el artículo");
        setLoading(false);
      });
  }, [productId]);

  if (loading) {
    return <h2>Cargando...</h2>;
  }

  if (!product) {
    return <p>Producto no encontrado</p>;
  }

  return (
    <section className="text-gray-700 body-font overflow-hidden bg-white">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <img
            alt={product.modelo}
            className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200"
            src={product.url_image}
          />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">
              {product.marca}
            </h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
              {product.modelo}
            </h1>
            <p className="leading-relaxed">
              {product.descripcion}
            </p>
            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
              <div className="flex">

              </div>
              <div className="flex ml-6 items-center">

                <div className="relative">


                </div>
              </div>
            </div>
            <div className="flex">
              <span className="title-font font-medium text-2xl text-gray-900">${product.precio}</span>
              <button className="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover-bg-red-600 rounded">
                Agregar
              </button>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductDetail;

