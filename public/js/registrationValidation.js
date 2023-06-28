window.addEventListener("load", () => {

    let form = document.querySelector(".forms");

    let erroresHtml = document.querySelector("#errores");

    form.addEventListener("submit", (event) => {


        /* Creo un array de errores vacio. 
        En caso de ir detectando errores  los iremos agregando aquí */

        let errores = [];

        /* Nombre */

        if (form.nombre.value == "") {
            errores.push("El campo nombre es obligatorio");
            form.nombre.classList.remove("es-valido")
            form.nombre.classList.add("es-invalido")
        } else if (form.nombre.value.length < 2) {
            errores.push("El nombre debe tener al menos 2 carácteres");
            form.nombre.classList.remove("es-valido")
            form.nombre.classList.add("es-invalido")
        } else {
            form.nombre.classList.remove("es-invalido")
            form.nombre.classList.add("es-valido")

        }


        /* Apellido */

        if (form.apellido.value == "") {
            errores.push("El campo apellido es obligatorio");
            form.apellido.classList.remove("es-valido")
            form.apellido.classList.add("es-invalido")
        } else if (form.apellido.value.length < 2) {
            errores.push("El apellido debe tener al menos 2 carácteres");
            form.apellido.classList.remove("es-valido")
            form.apellido.classList.add("es-invalido")
        } else {
            form.apellido.classList.remove("es-invalido")
            form.apellido.classList.add("es-valido")

        }


        /* Email */


        let regEmail = /\S+@\S+\.\S+/;
        if (!regEmail.test(form.email.value)) {
            errores.push("Debe ingresar un email válido");
            form.email.classList.add("is-invalid");
            form.email.classList.remove("is-valid");
        } else if (form.email.value == "") {
            errores.push("El campo email es obligatorio");
            form.apellido.classList.remove("es-valido")
            form.apellido.classList.add("es-invalido")
        } else {
            form.email.classList.add("is-valid");
            form.email.classList.remove("is-invalid");

        };


        /* Contraseña 1 */

        if (form.password1.value == "") {
            errores.push("La contraseña no puede estar vacía");
            form.password1.classList.remove("is-valid");
            form.password1.classList.add("is-invalid");
        } else if (form.password1.value.length < 8) {
            errores.push("La contraseña debe tener al menos 8 caracteres");
            form.password1.classList.remove("is-valid");
            form.password1.classList.add("is-invalid");
        } else {
            form.password1.classList.add("is-valid");
            form.password1.classList.remove("is-invalid");

        };


        /* Contraseña 2 */


        if (form.password2.value == "") {
            errores.push("La contraseña no puede estar vacía");
            form.password2.classList.remove("is-valid");
            form.password2.classList.add("is-invalid");
        } else if (form.password2.value.length < 8) {
            errores.push("La contraseña debe tener al menos 8 caracteres");
            form.password2.classList.remove("is-valid");
            form.password2.classList.add("is-invalid");
        } else {
            form.password2.classList.add("is-valid");
            form.password2.classList.remove("is-invalid");

        };



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
