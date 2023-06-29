window.addEventListener("load", () => {

    let form = document.querySelector("#form");

    let erroresHtml = document.querySelector("#erroresAdd");

    form.addEventListener("submit", (event) => {


        /* Creo un array de errores vacio. 
        En caso de ir detectando errores  los iremos agregando aquí */

        let errores = [];

        /* Nombre Producto */

        if (form.name.value == "") {
            errores.push("El campo producto es obligatorio");
            form.name.classList.remove("es-valido")
            form.name.classList.add("es-invalido")
        } else if (form.name.value.length < 5 ) {
            errores.push("El campo producto debe tener al menos 5 carácteres");
            form.name.classList.remove("es-valido")
            form.name.classList.add("es-invalido")
        } else {
            form.name.classList.remove("es-invalido")
            form.name.classList.add("es-valido")

        }


         /* Descripción  */

        if (form.description.value.length < 20)  {
            errores.push("El campo descripción debe tener al menos 20 carácteres");
            form.description.classList.remove("es-valido")
            form.name.classList.add("es-invalido")
        } else {
            form.description.classList.remove("es-invalido")
            form.description.classList.add("es-valido")

        }

         /* La imagen Deberá ser un archivo válido (JPG, JPEG, PNG, GIF).*/

         let imagenUsuario = form.imagenUsuario;
         if (imagenUsuario.files.length === 0) {
             errores.push("Debe seleccionar una imagen");
         } else {
             let file = imagenUsuario.files[0];
             let allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
             if (!allowedExtensions.test(file.name)) {
                 errores.push("La imagen debe tener una extensión válida (JPG, JPEG, PNG, GIF)");
             }
         }
       


        /* Chequeo de errores en pantalla  */


        if (errores.length > 0) {

            event.preventDefault();

            erroresHtml.innerHTML = "";
            for (let i = 0; i < errores.length; i++) {
                erroresHtml.innerHTML += "<li>" + errores[i] + "</li>";
            };
            erroresHtml.classList.remove("hidden"); // Mostrar el elemento <ul>
        } else {
            erroresHtml.innerHTML = "";
            erroresHtml.classList.add("hidden"); // Ocultar el elemento <ul>
            form.submit();


        }



    })

})

