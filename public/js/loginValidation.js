window.addEventListener("load", () => {


    let form = document.querySelector(".forms");

    let erroresHtml = document.querySelector("#erroresLogin");

    form.addEventListener("submit", (event) => {

         /* Creo un array de errores vacio. 
        En caso de ir detectando errores  los iremos agregando aquí */

        let errores = [];

        
        /* Email */


        let regEmail = /\S+@\S+\.\S+/;
        
        if (form.email.value == ""){
            errores.push("El campo email es obligatorio");
            form.email.classList.remove("es-valido")
            form.email.classList.add("es-invalido");
        } else if (!regEmail.test(form.email.value)) {
            errores.push("Debe ingresar un email válido");
            form.email.classList.remove("es-valido")
            form.email.classList.add("es-invalido")
        } else {
            form.email.classList.add("is-valid");
            form.email.classList.remove("is-invalid");

        };




         /* Contraseña  */

         if (form.password.value == "") {
            errores.push("La contraseña no puede estar vacía");
            form.password.classList.remove("is-valid");
            form.password.classList.add("is-invalid");
        } else if (form.password.value.length < 8) {
            errores.push("La contraseña debe tener al menos 8 caracteres");
            form.password.classList.remove("is-valid");
            form.password.classList.add("is-invalid");
        } else {
            form.password.classList.add("is-valid");
            form.password.classList.remove("is-invalid");

        };

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
