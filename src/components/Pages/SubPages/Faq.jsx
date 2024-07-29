import React, { useState } from "react";


const Faq = () => {
  const [openAccordion, setOpenAccordion] = useState(null);

  const toggleAccordion = (index) => {
    if (openAccordion === index) {
      setOpenAccordion(null);
    } else {
      setOpenAccordion(index);
    }
  };

  const faqs = [
    {
      question: "¿Cuál es la garantía de los productos electrónicos?",
      answer: "La garantía de los productos electrónicos varía según el fabricante y el tipo de producto. En general, la mayoría de los productos electrónicos tienen una garantía estándar que cubre defectos de fabricación. Te recomendamos leer los términos de garantía específicos de cada producto antes de realizar la compra."
    },
    {
      question: "¿Cuáles son los métodos de pago aceptados en la tienda en línea?",
      answer: "Aceptamos varios métodos de pago, incluyendo tarjetas de crédito, tarjetas de débito y opciones de pago en línea. Puedes ver la lista completa de métodos de pago disponibles durante el proceso de compra en la página de pago."
    },
    {
      question: "¿Cómo puedo hacer un seguimiento de mi pedido de productos electrónicos?",
      answer: "Puedes hacer un seguimiento de tu pedido iniciando sesión en tu cuenta y visitando la sección de seguimiento de pedidos. También recibirás un correo electrónico con el número de seguimiento y un enlace directo para rastrear tu pedido en tiempo real."
    },
    {
      question: "¿Qué debo hacer si el producto electrónico que recibí está dañado o no funciona?",
      answer: "Si recibes un producto electrónico dañado o que no funciona correctamente, contáctanos de inmediato. Te ayudaremos a resolver el problema, ya sea mediante el reemplazo del producto, la reparación o la devolución, según corresponda y de acuerdo con nuestra política de devoluciones."
    },
    {
      question: "¿Cuánto tiempo se tarda en entregar los productos electrónicos?",
      answer: "El tiempo de entrega puede variar según tu ubicación y el método de envío que elijas. Por lo general, proporcionamos estimaciones de tiempo de entrega durante el proceso de compra. Asegúrate de revisar esta información antes de confirmar tu pedido."
    },
    {
      question: "¿Qué debo hacer si me equivoqué al realizar un pedido de productos electrónicos?",
      answer: "Si cometiste un error al realizar tu pedido, comunícate con nuestro equipo de atención al cliente lo antes posible. Dependiendo del estado de tu pedido, podemos ayudarte a corregir detalles como la dirección de envío o el producto seleccionado antes de su envío."
    },
    {
      question: "¿Ofrecen asesoramiento técnico para los productos electrónicos que venden?",
      answer: "Sí, proporcionamos asesoramiento técnico para la mayoría de los productos electrónicos que vendemos. Puedes contactarnos con cualquier pregunta técnica o problema que tengas, y nuestro equipo de soporte técnico estará encantado de ayudarte."
    },
    {
      question: "¿Cómo funcionan las devoluciones y reembolsos para productos electrónicos?",
      answer: "Nuestra política de devoluciones y reembolsos varía según el producto y las circunstancias. En general, ofrecemos un período de devolución en el que puedes devolver un producto no deseado o defectuoso. Te recomendamos leer nuestra política de devoluciones y contactarnos para obtener asistencia específica si necesitas realizar una devolución o solicitar un reembolso."
    },
    {
      question: "¿Ofrecen servicios de instalación para productos electrónicos?",
      answer: "Sí, para algunos productos electrónicos, ofrecemos servicios de instalación profesionales por un costo adicional. Si deseas que un técnico cualificado instale tu producto, contáctanos para obtener más detalles y programar una cita de instalación."
    },
    {
      question: "¿Cómo puedo obtener información sobre las especificaciones técnicas de un producto electrónico antes de comprarlo?",
      answer: "Puedes encontrar información detallada sobre las especificaciones técnicas de cada producto en la página del producto en nuestro sitio web. Si necesitas información adicional o tienes preguntas específicas, no dudes en contactarnos, y estaremos encantados de proporcionarte más detalles."
    },
    {
      question: "¿Ofrecen descuentos o promociones en productos electrónicos?",
      answer: "Sí, ofrecemos descuentos y promociones en productos electrónicos en diferentes momentos del año. Puedes estar al tanto de nuestras ofertas visitando nuestra página de ofertas especiales o suscribiéndote a nuestro boletín informativo para recibir notificaciones sobre descuentos y promociones exclusivas."
    }
  ];

  return (

    <div className="w-full bg-gray-50 bg-cover" style={{ backgroundImage: `url("/images/faq2.avif")` }}>
      {/* :TITLE & IMAGE */}
      <div className="my-8 mx-auto max-w-4xl flex flex-col items-center">
        <img src="src/images/faq.png" alt="Frequently Asked Questions" className="w-full h-full" />
        <h2 className="text-center text-2xl sm:text-4xl text-teal-600 tracking-widest">Preguntas frecuentes</h2>
      </div>

      {/* :FAQ */}
      <dl className="mx-auto mb-10 p-2 max-w-4xl flex flex-col items-center">
        {faqs.map((faq, index) => (
          <div key={index}>
            {/* ::Accordion Panel */}
            <div
              className={`w-full border-b-2 border-sky-600 text-teal-600 hover:bg-amber-100 hover:text-teal-600 ${openAccordion === index ? "bg-teal-600 text-amber-100" : ""
                }`}
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="py-5 px-3 w-full flex justify-between items-center"
              >
                <span className="text-lg md:text-xl text-left font-semibold">{faq.question}</span>
                <svg
                  className={`flex-shrink-0 ml-2 w-7 h-7 text-sky-600 group-hover:text-white ${openAccordion === index ? "transform rotate-180 text-white" : ""
                    }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
            </div>
            {/* Answer */}
            {openAccordion === index && (
              <div className="w-full text-base text-gray-500 px-4 pt-4 pb-2">{faq.answer}</div>
            )}
          </div>
        ))}
      </dl>
    </div>
  );
};

export default Faq;