import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contacto = () => {
  const [formData, setFormData] = useState({ nombre: '', apellido: '', email: '', mensaje: '' });

  // Añade una nueva función para enviar el formulario al servidor
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (formData.nombre === '' || formData.apellido === '' || formData.email === '' || formData.mensaje === '') {
      toast.error('Faltan datos. Por favor, complete todos los campos.', { autoClose: 7000 });
    } else {
      fetch('https://send-email.digital-mirage.ar/enviar-correo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message) {
            toast.success(data.message, {
              autoClose: 7000,
              onClose: () => {
                // Aquí puedes redirigir al menú principal después de que se cierre el mensaje de éxito.
                // Por ejemplo: window.location.href = '/menu-principal';
              },
            });
          } else {
            toast.error('Hubo un problema al enviar el correo.', { autoClose: 7000 });
          }
        })
        .catch((error) => {
          toast.error('Hubo un problema al enviar el correo.', { autoClose: 7000 });
        });
    }
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="container px-6 py-12 mx-auto">
        <div>
          <p className="font-medium text-blue-500 dark:text-white-400">Contactanos</p>
          <br></br>
          <h1 className="xl:text-4xl  p-7 sm:p-12 dark:text-white text-3xl text-center text-gray-800 font-extrabold pb-6 sm:w-4/6 w-5/6 mx-auto title-margin">
            Contactate con nosotros
          </h1>
          <p className="text-gray-500 text-lg text-center font-normal pb-3">
            Nos encantaría saber cuál es su consulta. Por favor complete este formulario o envíenos un correo electrónico.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 mt-10 lg:grid-cols-1">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <div>
              <span className="inline-block p-3 text-blue-500 rounded-full bg-blue-100/80 dark:bg-gray-800">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </span>
              <h2 className="mt-4 text-base font-medium text-gray-800 dark:text-white">Email</h2>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Nuestro equipo está aquí para ayudarlo.
              </p>
              <p className="mt-2 text-sm text-blue-500 dark:text-blue-400">consulta@digital-mirage.com</p>
            </div>

            <div>
              <span className="inline-block p-3 text-blue-500 rounded-full bg-blue-100/80 dark:bg-gray-800">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
              </span>
              <h2 className="mt-4 text-base font-medium text-gray-800 dark:text-white">24 hs Activos</h2>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Podes contactarnos las 24 hs asi resolvemos tu inconveniente</p>
            </div>

            <div>
              <span className="inline-block p-3 text-blue-500 rounded-full bg-blue-100/80 dark:bg-gray-800">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
              </span>
              <h2 className="mt-4 text-base font-medium text-gray-800 dark:text-white">Oficina</h2>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Conoce nuestras oficinas</p>
              <p className="mt-2 text-sm text-blue-500 dark:text-blue-400">Av Libertador 4250 Oficina 5 - CABA</p>
            </div>

            <div>
              <span className="inline-block p-3 text-blue-500 rounded-full bg-blue-100/80 dark:bg-gray-800">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002..25 4.5v2.25z" />
                </svg>
              </span>
              <h2 className="mt-4 text-base font-medium text-gray-800 dark:text-white">Teléfono</h2>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Contactanos via Whatsapp</p>
              <p className="mt-2 text-sm text-blue-500 dark:text-blue-400">+1 (555) 000-0000</p>
            </div>
          </div>
        </div>
        <br></br>
        <div className="p-4 py-6 rounded-lg bg-gray-50 dark:bg-gray-800 md:p-8">
          <form onSubmit={handleFormSubmit}>
            <div className="-mx-2 md:items-center md:flex">
              <div className="flex-1 px-2">
                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Nombre</label>
                <input
                  type="text"
                  name="nombre"
                  placeholder="Nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  className="block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus-border-blue-400 focus-ring-blue-400 focus:outline-none focus-ring focus-ring-opacity-40"
                />
              </div>
              <div className="flex-1 px-2 mt-4 md:mt-0">
                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Apellido</label>
                <input
                  type="text"
                  name="apellido"
                  placeholder="Apellido"
                  value={formData.apellido}
                  onChange={handleInputChange}
                  className="block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus-border-blue-400 focus-ring-blue-400 focus:outline-none focus-ring focus-ring-opacity-40"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Correo electrónico</label>
              <input
                type="email"
                name="email"
                placeholder="Contacto@digital-mirage.com"
                value={formData.email}
                onChange={handleInputChange}
                className="block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus-border-blue-400 dark:focus-border-blue-400 focus-ring-blue-400 focus:outline-none focus-ring focus-ring-opacity-40"
              />
            </div>

            <div className="w-full mt-4">
              <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Mensaje</label>
              <textarea
                name="mensaje"
                value={formData.mensaje}
                onChange={handleInputChange}
                className="block w-full h-32 px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg md:h-56 dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus-border-blue-400 dark:focus-border-blue-400 focus-ring-blue-400 focus:outline-none focus-ring focus-ring-opacity-40"
                placeholder="Mensaje"
              ></textarea>
            </div>

            <button className="w-full px-6 py-3 mt-4 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover-bg-blue-400 focus:outline-none focus-ring focus-ring-blue-300 focus-ring-opacity-50">
              Enviar
            </button>
          </form>
        </div>
        <ToastContainer />
      </div>
    </section>
  );
};

export default Contacto;