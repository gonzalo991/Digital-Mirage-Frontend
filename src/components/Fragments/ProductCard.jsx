import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../Context/ShoppingCartContext";
import "../Css/card.css"

function formatPrice(price) {
    return price.toLocaleString("es-AR", {
        style: "currency",
        currency: "ARS"
    });
}

function ProductCard({ _id, modelo, marca, descripcion, precio, url_image, onProductClick, darkMode, }) {
    const [cart, setCart] = useContext(CartContext);
    const [rating, setRating] = useState(0);
    const [isRemoveButtonVisible, setIsRemoveButtonVisible] = useState(false);

    useEffect(() => {
        const randomRating = (Math.random() * (5 - 3.5) + 3.5).toFixed(1);
        setRating(parseFloat(randomRating));
    }, []);

    const starColor = (starIndex) => {
        return starIndex <= rating ? 'text-yellow-300' : 'text-gray-200 dark:text-gray-600';
    };

    const renderStars = () => {
        const maxRating = 5;
        const stars = [];
        for (let i = 1; i <= maxRating; i++) {
            stars.push(
                <svg
                    key={i}
                    className={`w-4 h-4 ${starColor(i)}`}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                </svg>
            );
        }
        return stars;
    };

    const addToCart = () => {
        setCart((currItems) => {
            const isItemFound = currItems.find((item) => item._id === _id);
            if (isItemFound) {
                return currItems.map((item) => {
                    if (item._id === _id) {
                        return { ...item, quantity: item.quantity + 1 };
                    } else {
                        return item;
                    }
                });
            } else {
                return [...currItems, { _id, modelo, marca, descripcion, url_image, quantity: 1, precio }];
            }
        });
        setIsRemoveButtonVisible(true); // Mostrar el botón "Quitar" al agregar un producto
    };

    const removeItem = (id) => {
        setCart((currItems) => {
            if (currItems.find((item) => item._id === id)?.quantity === 1) {
                return currItems.filter((item) => item._id !== id);
            } else {
                return currItems.map((item) => {
                    if (item._id === id) {
                        return { ...item, quantity: item.quantity - 1 };
                    } else {
                        return item;
                    }
                });
            }
        });
        if (quantityPerItem <= 1) {
            setIsRemoveButtonVisible(false); // Ocultar el botón "Quitar" cuando la cantidad sea 0 o 1
        }
    };

    const getQuantityById = (id) => {
        return cart.find((item) => item._id === id)?.quantity || 0;
    };

    const quantityPerItem = getQuantityById(_id);

    const imgEstilo = {
        width: '25rem',
        height: '19rem'
    };

    return (
<div className={`w-full h-full max-w-sm ${darkMode ? 'bg-gray-800' : 'bg-white'} border border-gray-200 rounded-lg shadow ${darkMode ? 'dark:border-gray-700' : 'dark:border-gray-200'} product-card`}>
            <a href={`/productdetail/${_id}`} onClick={onProductClick}>
                <img className="p-8 rounded-t-lg object-contain" src={url_image} alt="product image" style={imgEstilo} />
            </a>
            <div className="px-5 pb-5">
                <a href="#">
                    <h5 className={`text-xl font-semibold tracking-tight ${darkMode ? 'text-gray-900' : 'dark:text-white'}`}>
                        {modelo}
                    </h5>
                </a>
                <p className={`text-xl font-bold ${darkMode ? 'text-gray-900' : 'text-gray-900'} mb-2`}>{marca}</p>
                <p className={`text-sm py-2 ${darkMode ? 'text-gray-500' : 'text-gray-500'} mb-2`}>{descripcion}</p>
                
                <div className="mt-2.5 mb-5">
                    <span className={`text-3xl font-bold ${darkMode ? 'text-gray-900' : 'dark:text-cyan-600'}`}>
                        {formatPrice(precio)}
                    </span>
                    <div className="mt-2 py-2">
                        <div className="flex p-3 justify-evenly">
                            <button
                                className={`text-white bg-blue-700 p-2 hover-bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ${darkMode ? 'dark:bg-blue-600 dark:hover-bg-blue-700 dark:focus:ring-blue-800' : 'bg-blue-700 hover-bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover-bg-blue-700 dark:focus:ring-blue-800'}`}
                                onClick={() => addToCart()}
                            >
                                Agregar
                            </button>
                            {isRemoveButtonVisible && (
                                <button
                                    className={`text-white bg-red-700 hover-bg-red-700 focus-ring-4 focus:outline-none focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center ${darkMode ? 'dark:bg-red-600 dark:hover-bg-red-700 dark:focus-ring-red-900' : 'bg-red-700 hover-bg-red-700 focus-ring-4 focus:outline-none focus:ring-red-400 dark:bg-red-600 dark:hover-bg-red-700 dark:focus-ring-red-900'}`}
                                    onClick={() => removeItem(_id)}
                                >
                                    Quitar
                                </button>
                            )}
                        </div>
                        <div className="mt-2 py-2">
                            <div className="flex items-center">
                                {renderStars()}
                                <p className={`ml-2 text-sm font-medium ${darkMode ? 'text-gray-500' : 'dark:text-gray-400'}`}>{rating} de 5</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;
