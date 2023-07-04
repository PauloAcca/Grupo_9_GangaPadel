const discountInput = document.getElementById('discount');
const discountValue = document.getElementById('discountValue');

// Mostrar el valor actual seleccionado al cargar la página
discountValue.textContent = discountInput.value;

// Actualizar el valor mostrado cuando cambia la posición de la barra deslizante
discountInput.addEventListener('input', () => {
discountValue.textContent = discountInput.value;
});