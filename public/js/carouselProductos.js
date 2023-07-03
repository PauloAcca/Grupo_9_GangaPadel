// Obtén los elementos del carrusel
const carrusel = document.querySelector('.contenedor-productos');
const articulos = Array.from(document.querySelectorAll('.articulo'));
const prevButton = document.querySelector('.arrow-prev');
const nextButton = document.querySelector('.arrow-next');

// Calcula el ancho de cada artículo
const articuloWidth = articulos[0].offsetWidth;

// Configura el desplazamiento inicial
let desplazamiento = 0;

// Mueve el carrusel hacia la izquierda
const moveLeft = () => {
    desplazamiento += articuloWidth;
    if (desplazamiento > 0) {
        desplazamiento = -(articuloWidth * (articulos.length - 1));
    }
    carrusel.style.transform = `translateX(${desplazamiento}px)`;
};

// Mueve el carrusel hacia la derecha
const moveRight = () => {
    desplazamiento -= articuloWidth;
    if (desplazamiento < -(articuloWidth * (articulos.length - 1))) {
        desplazamiento = 0;
    }
    carrusel.style.transform = `translateX(${desplazamiento}px)`;
};

// Agrega los listeners de eventos a los botones de navegación
prevButton.addEventListener('click', moveLeft);
nextButton.addEventListener('click', moveRight);