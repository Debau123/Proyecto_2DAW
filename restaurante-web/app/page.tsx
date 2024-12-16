'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';

export default function Home() {
  return (
    <div>
      

      {/* Sección Carrusel */}
      <div className="relative h-screen flex items-center justify-center">
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 4000 }}
          loop={true}
          className="absolute top-0 left-0 w-full h-full"
        >
          <SwiperSlide>
            <img
              src="/restaurant.jpg"
              alt="Restaurante"
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="/imagen1.jpg"
              alt="Naturaleza"
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="/imagen2.jpg"
              alt="Piscina"
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
        </Swiper>
        <div className="absolute text-white text-center z-10">
          <h2 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
            Bienvenido a Nuestro Restaurante
          </h2>
        </div>
      </div>

      {/* Sección Intermedia */}
      <div className="text-center py-10 px-5 bg-gray-50">
        <h2 className="text-3xl font-bold text-blue-900 mb-4">
          EXPERIENCIA NATURAL EN LA SIERRA DEL ESPADÁN
        </h2>
        <p className="text-xl text-gray-700 mb-6">
          Un restaurante que surge de lo más profundo de la naturaleza
        </p>
        <div className="flex justify-center mb-6">
          <img
            src="/sierra.jpg"
            alt="Naturaleza"
            className="rounded-lg shadow-lg w-full md:w-3/4 lg:w-2/4"
          />
        </div>
        <p className="text-gray-600 max-w-4xl mx-auto">
          Somos un restaurante comprometido con el turismo sostenible. Ofrecemos una experiencia única en plena Sierra del Espadán, con gastronomía local elaborada con productos frescos y sin químicos. Nuestra ubicación natural y la atención especial harán de tu visita un momento inolvidable.
        </p>
      </div>

    {/* Sección con Cajas */}
<div className="bg-gray-200 py-10 px-5">
  <h2 className="text-3xl font-bold text-center mb-6 text-blue-900">Descubre Nuestro Restaurante</h2>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    <div className="bg-white p-6 rounded-lg shadow-lg text-center transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl">
      <h3 className="text-2xl font-semibold mb-3 text-blue-900">Gastronomía Local</h3>
      <p className="text-gray-700">Disfruta de platos elaborados con ingredientes frescos y de temporada.</p>
    </div>
    <div className="bg-white p-6 rounded-lg shadow-lg text-center transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl">
      <h3 className="text-2xl font-semibold mb-3 text-blue-900">Ubicación Inigualable</h3>
      <p className="text-gray-700">Rodeado de naturaleza en plena Sierra del Espadán.</p>
    </div>
    <div className="bg-white p-6 rounded-lg shadow-lg text-center transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl">
      <h3 className="text-2xl font-semibold mb-3 text-blue-900">Reserva Fácil</h3>
      <p className="text-gray-700">Realiza tu reserva online en tan solo unos clics.</p>
    </div>
  </div>
</div>

    </div>
  );
}
