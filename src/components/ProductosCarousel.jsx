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
        <SwiperSlide key={index} className="pb-12">
          <div className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 h-full flex flex-col group border border-amber-50">
            <div className="relative overflow-hidden h-64">
              <img
                src={p.imagen}
                alt={p.titulo}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-300"></div>
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-2xl text-amber-800 font-bold mb-3 font-['Playfair_Display']">{p.titulo}</h3>
              <p className="text-stone-600 leading-relaxed text-sm mb-4">{p.descripcion}</p>
              <button className="mt-auto inline-flex items-center text-amber-700 font-bold hover:text-amber-500 transition-colors">
                Ver detalles 
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
