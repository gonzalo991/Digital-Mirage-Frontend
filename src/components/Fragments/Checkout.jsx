import React, { useContext, useState } from "react";
import { CartContext } from "../Context/ShoppingCartContext";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jsPDF from 'jspdf';


function formatPrice(price) {
  return price.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS"
  });
}
const placeOrder = (cart, totalPrice, selectedShippingOption) => {
  // Validación de campos obligatorios
  if (!document.getElementById('first_name').value ||
    !document.getElementById('last_name').value ||
    !document.getElementById('country').value ||
    !document.getElementById('street_address').value ||
    !document.getElementById('region').value ||
    !document.getElementById('phone').value ||
    !document.getElementById('email').value ||
    !document.querySelector('input[name="enviarPedido"]:checked')) {
    toast.error("Faltan datos para cargar");
  } else {
    toast.success("El pedido se acaba de realizar. Ahora se descargará un PDF de tu pedido.");
    generatePDF(cart, totalPrice, selectedShippingOption);
  }
};

const generatePDF = (cart, totalPrice, selectedShippingOption) => {
  const doc = new jsPDF();
  doc.setFontSize(14);

  // Encabezado personalizado
  doc.setFontSize(12);
  doc.text("Información del Cliente:", 20, 30);
  doc.text(`Nombre: ${document.getElementById('first_name').value} ${document.getElementById('last_name').value}`, 20, 40);

  // Detalles del pedido (productos en el carrito)
  doc.setFontSize(12);
  doc.text("Detalles del Pedido:", 20, 60);
  let y = 70;
  cart.forEach((producto) => {
    const itemText = `${producto.marca} ${producto.modelo} - Cantidad: ${producto.quantity} - Precio: ${formatPrice(producto.precio)}`;
    doc.text(itemText, 20, y);
    y += 10;
  });

  // Información de envío, subtotal y total
  doc.setFontSize(12);
  doc.text("Información de Envío:", 20, y + 10);
  // ... (información de envío) ...
  doc.text("Subtotal: " + formatPrice(totalPrice), 20, y + 30);
  doc.text("Total: " + formatPrice(totalPrice + selectedShippingOption.cost), 20, y + 40);

  // Guardar y descargar el PDF automáticamente
  doc.save('pedido.pdf');
};

function Checkout() {
  const shippingOptions = [
    {
      id: 1,
      name: "Correo Argentino",
      cost: 2500,
      deliveryTime: "2-4 Días",
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/14/Correo_Argentino_Logo.png",
    },
    {
      id: 2,
      name: "Andreani",
      cost: 3500,
      deliveryTime: "2-3 Días",
      imageUrl: "http://www.cabb.org.ar/wp-content/uploads/2020/11/Andreani.png",
    },
    {
      id: 3,
      name: "Retiro en la sucursal",
      cost: 0,
      deliveryTime: "Retirar dentro de las 48hs",
      imageUrl: "https://img.freepik.com/iconos-gratis/marcador-posicion_318-154768.jpg?w=2000",
    },
  ];
  const [cart, setCart] = useContext(CartContext);
  const [selectedShippingOption, setSelectedShippingOption] = useState(shippingOptions[0]);

  const totalPrice = cart.reduce((acc, curr) => {
    return acc + curr.quantity * curr.precio;
  }, 0);

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
  };

  const handleShippingOptionChange = (option) => {
    setSelectedShippingOption(option);
  };

  return (
    <div className="mb-5">
      {/* ... Otro contenido del encabezado ... */}

      {/* Main Content Section */}
      <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
        <div className="px-4 pt-8">
          <p className="text-xl font-medium">Resumen del pedido</p>
          <p className="text-gray-400">
            Revisa tus artículos. Y selecciona un método de envío adecuado.
          </p>

          {/* Product Cards */}
          <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
            {cart.map((producto) => (
              <div className="flex flex-col rounded-lg bg-white sm:flex-row" key={producto._id}>
                <img
                  className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                  src={producto.url_image}
                  alt={`imagen del producto ${producto.marca} ${producto.modelo}`}
                />
                <div className="flex w-full flex-col px-4 py-4">
                  <span className="font-semibold">{producto.marca} {producto.modelo}</span>
                  <p className="text-lg font-bold">{formatPrice(producto.precio)}</p>
                  <div className="flex items-center">
                    <button onClick={() => removeItem(producto._id)}>❌</button>
                    <span className="ml-2">Cantidad: {producto.quantity}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-8 text-lg font-medium">Métodos de Envios</p>

          {/* Shipping Options */}
          <form className="mt-5 grid gap-6">
            {shippingOptions.map((option) => (
              <div key={option.id} className="relative">
                <input
                  className="peer hidden"
                  id={`radio_${option.id}`}
                  type="radio"
                  name="radio"
                  checked={option === selectedShippingOption}
                  onChange={() => handleShippingOptionChange(option)}
                />
                <span
                  className={`peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white ${option === selectedShippingOption ? 'bg-blue-500' : ''
                    }`}
                ></span>
                <label
                  className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                  htmlFor={`radio_${option.id}`}
                >
                  <img className="w-14 object-contain" src={option.imageUrl} alt={option.name} />
                  <div className="ml-5">
                    <span className="mt-2 font-semibold">{option.name}</span>
                    <p className="text-slate-500 text-sm leading-6">
                      Envío: {option.deliveryTime} | {formatPrice(option.cost)}
                    </p>
                  </div>
                </label>
              </div>
            ))}
          </form>
        </div>

        <div className="mt-10 bg-gray-50 px-4 pt-16 lg:mt-0 md:py-4 ">
          <br></br>
          <br></br>
          <br></br>

          <br></br>
          <br></br>

          <p className="text-xl font-medium">Detalles del pago</p>
          <p className="text-gray-400">Complete su pedido proporcionando sus datos de pago.</p>

          {/* Payment Form */}



          {/* Other input fields go here... */}

          <label className="block text-sm font-medium mt-4 mb-2">DETALLES DE FACTURACIÓN</label>

          <label htmlFor="first_name" className="mt-4 mb-2 block text-sm font-medium">Nombre *</label>
          <div className="relative">
            <input
              type="text"
              id="first_name"
              name="first_name"
              className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus-border-blue-500 focus-ring-blue-500"
              placeholder="Nombre"
            />
          </div>

          <label htmlFor="last_name" className="mt-4 mb-2 block text-sm font-medium">Apellidos *</label>
          <div className="relative">
            <input
              type="text"
              id="last_name"
              name="last_name"
              className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus-border-blue-500 focus-ring-blue-500"
              placeholder="Apellidos"
            />
          </div>

          <div className="relative">
            <label htmlFor="country" className="mt-4 mb-2 block text-sm font-medium">País *</label>

            <input
              type="text"
              id="country"
              name="country"
              className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus-border-blue-500 focus-ring-blue-500"
              placeholder="País / Región"
            />
          </div>

          <label htmlFor="street_address" className="mt-4 mb-2 block text-sm font-medium">Dirección de la calle *</label>
          <div className="relative">
            <input
              type="text"
              id="street_address"
              name="street_address"
              className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus-border-blue-500 focus-ring-blue-500"
              placeholder="Dirección de la calle"
            />
          </div>



          <label htmlFor="region" className="mt-4 mb-2 block text-sm font-medium">Región / Provincia *</label>
          <div className="relative">
            <input
              type="text"
              id="region"
              name="region"
              className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus-border-blue-500 focus-ring-blue-500"
              placeholder="Provincia / Región "
            />
          </div>

          <label htmlFor="postal_code" className="mt-4 mb-2 block text-sm font-medium">Código postal *</label>
          <div className="relative">
            <input
              type="text"
              id="postal_code"
              name="postal_code"
              className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus-border-blue-500 focus-ring-blue-500"
              placeholder="Código postal"
            />
          </div>

          <label htmlFor="phone" className="mt-4 mb-2 block text-sm font-medium">Teléfono *</label>
          <div className="relative">
            <input
              type="text"
              id="phone"
              name="phone"
              className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus-border-blue-500 focus-ring-blue-500"
              placeholder="Teléfono"
            />
          </div>

          <label htmlFor="email" className="mt-4 mb-2 block text-sm font-medium">Dirección de correo electrónico *</label>
          <div className="relative">
            <input
              type="email"
              id="email"
              name="email"
              className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus-border-blue-500 focus-ring-blue-500"
              placeholder="Dirección de correo electrónico"
            />
          </div>

          <label htmlFor="dni" className="mt-4 mb-2 block text-sm font-medium">DNI (opcional)</label>
          <div className="relative">
            <input
              type="text"
              id="dni"
              name="dni"
              className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus-border-blue-500 focus-ring-blue-500"
              placeholder="DNI (opcional)"
            />
          </div>




          <br></br>
          <label htmlFor="order_notes" className="block text-sm font-medium">Notas del pedido (opcional)</label>
          <div className="relative">
            <textarea
              id="order_notes"
              name="order_notes"
              className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus-border-blue-500 focus-ring-blue-500"
              rows="4"
              placeholder="Notas del pedido (opcional)"
            ></textarea>
            <div className="mt-4">
              <label className="block text-sm font-medium">¿Quieres que te enviemos al correo este pedido?</label>
              <div className="flex space-x-4">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="enviarPedidoSi"
                    name="enviarPedido"
                    value="si"
                    required
                  />
                  <label htmlFor="enviarPedidoSi" className="ml-2">Sí</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="enviarPedidoNo"
                    name="enviarPedido"
                    value="no"
                    required
                  />
                  <label htmlFor="enviarPedidoNo" className="ml-2">No</label>
                </div>
              </div>
            </div>

            <button onClick={placeOrder} className="mt-4 mb-8 mx-auto w-medium text-center rounded-md bg-gray-900 px-6 py-3 font-medium text-white">
              REALIZAR PEDIDO
            </button>

          </div>

          {/* Total Section */}
          <div className="mt-6 border-t border-b py-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">Subtotal</p>
              <p className="font-semibold text-gray-900"> {formatPrice(totalPrice)}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">Envío</p>
              <p className="font-semibold text-gray-900">
                {formatPrice(selectedShippingOption.cost)}
              </p>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm font-medium text-gray-900">Total</p>
            <p className="text-2xl font-semibold text-gray-900">
              {formatPrice(totalPrice + selectedShippingOption.cost)}
            </p>
          </div>
        </div>


      </div>
      <ToastContainer />

    </div>
  );
}

export default Checkout;
