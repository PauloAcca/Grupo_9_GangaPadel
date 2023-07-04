// Obtén referencias a los elementos relevantes de los carruseles
const carousel1 = document.getElementById('carousel1');
const contenedorProductos1 = carousel1.querySelector('.contenedor-productos');
const arrowPrev1 = carousel1.querySelector('.arrow-prev');
const arrowNext1 = carousel1.querySelector('.arrow-next');

const carousel2 = document.getElementById('carousel2');
const contenedorProductos2 = carousel2.querySelector('.contenedor-productos');
const arrowPrev2 = carousel2.querySelector('.arrow-prev');
const arrowNext2 = carousel2.querySelector('.arrow-next');

// Configura los eventos de las flechas del primer carrusel
arrowPrev1.addEventListener('click', () => {
  contenedorProductos1.scrollBy({
    left: -contenedorProductos1.offsetWidth,
    behavior: 'smooth'
  });
});

arrowNext1.addEventListener('click', () => {
  contenedorProductos1.scrollBy({
    left: contenedorProductos1.offsetWidth,
    behavior: 'smooth'
  });
});

// Configura los eventos de las flechas del segundo carrusel
arrowPrev2.addEventListener('click', () => {
  contenedorProductos2.scrollBy({
    left: -contenedorProductos2.offsetWidth,
    behavior: 'smooth'
  });
});

arrowNext2.addEventListener('click', () => {
  contenedorProductos2.scrollBy({
    left: contenedorProductos2.offsetWidth,
    behavior: 'smooth'
  });
});