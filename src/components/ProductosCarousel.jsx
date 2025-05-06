import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function ProductosCarousel() {
  const productos = [
    {
      titulo: 'Sombrero Vueltiao',
      descripcion: 'Elaborado a mano. Símbolo nacional de Colombia.',
      imagen: '/v.jpg'
    },
    {
      titulo: 'Pulseras de Caña Flecha',
      descripcion: 'Accesorios únicos con diseños tradicionales y modernos.',
      imagen: '/pulsera.jpeg'
    },
    {
      titulo: 'Carteras Artesanales',
      descripcion: 'Combinan la caña flecha con un estilo auténtico y elegante.',
      imagen: '/cartera.jpeg'
    },
    {
      titulo: 'Pavas',
      descripcion: 'Diseños tradicionales con técnica de caña flecha.',
      imagen: '/pava.jpeg'
    },
    {
      titulo: 'Tapete',
      descripcion: 'Textura natural y duradera hecha con trenzado de caña flecha.',
      imagen: '/tap.jpeg'
    },
    {
      titulo: 'Vestidos',
      descripcion: 'Moda y tradición artesanal con caña flecha.',
      imagen: '/vestido.jpeg'
    },
    {
      titulo: 'seleccion colomia',
      descripcion: 'tradición y amor por la selecion colombia .',
      imagen: '/colombia.jpeg'
    },
    {
      titulo: 'sombrero y mochila ',
      descripcion: 'con estos accesorios unes Moda y tradición artesanal.',
      imagen: '/par.jpeg'
    }
  ];

  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={30}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 4000 }}
      breakpoints={{
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 }
      }}
    >
      {productos.map((p, index) => (
        <SwiperSlide key={index}>
          <div className="bg-gray-100 rounded-lg shadow-md p-4 h-full flex flex-col">
            <img
              src={p.imagen}
              alt={p.titulo}
              className="w-full h-48 object-cover rounded mb-4"
            />
            <h3 className="text-xl text-amber-400 font-semibold mb-2">{p.titulo}</h3>
            <p className="text-sm text-black">{p.descripcion}</p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
