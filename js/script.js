//El valor de esta variable se cambia cuando el login es exitoso
var login=false;
//Nombre de usuario que se va a mostrar en la parte superior
var nombre = "Katherine Hurtado";
//Función que carga los eventos en los botones del html
window.onload = function(){
	//login = false;
	//Si no hay login no se muestra el botón de Carrito de compras
	if(!login){
		document.getElementById("carrito").style.visibility = "hidden";
	}

	//Obtiene el evento click del botón de login
	$("#userLogin").on("click",function (){
	var mensaje='<form>'+
  '<div class="form-group">'+
	    '<label for="userName">Nombre de Usuario</label>'+
	    '<input type="text" class="form-control" id="userName" aria-describedby="emailHelp" placeholder="Usuario">'+
	  '</div>'+
	  '<div class="form-group">'+
	    '<label for="clave">Contraseña</label>'+
	    '<input type="password" class="form-control" id="clave" placeholder="Contraseña">'+
	  '</div>'+
	   '<small id="emailHelp" class="form-text text-muted">Por seguridad no comparta sus credenciales</small>'+
	'</form>';

	BootstrapDialog.alert({
		            title: 'LOGIN',
		            message: mensaje,
		            type: BootstrapDialog.TYPE_INFO, // <-- Default value is BootstrapDialog.TYPE_PRIMARY
		            closable: true, // <-- Default value is false
		            draggable: true, // <-- Default value is false
		            buttonLabel: 'Ingresar', // <-- Default value is 'OK',
		            callback: function(result) {
		                // result will be true if button was click, while it will be false if users close the dialog directly.
		                var usuario = $("#userName").val();
		                var clave = $("#clave").val();
		                if(clave ==="kathy123" && usuario === "kathy"){
		                	//El login se pone en true
		                	login = true;
		                	//Se cambia el texto de login por el nombre del usuario
		                	$("#userLogin").text("Bienvenida " + nombre);
		                	//Se habilita el carrito de compras
		                	document.getElementById("carrito").style.visibility = "visible";
		                	BootstrapDialog.alert("Bienvenida! " + usuario);                	
		                	
		                }
		                else
		                {
		                	BootstrapDialog.alert({
					            title: 'ATENCIÓN',
					            message: 'Usuario o Contraseña ingresados son inconrrectos',
					            type: BootstrapDialog.TYPE_WARNING, // <-- Default value is BootstrapDialog.TYPE_PRIMARY
					            closable: true, // <-- Default value is false
					            draggable: true, // <-- Default value is false
					            buttonLabel: 'Aceptar', // <-- Default value is 'OK',
				       		 });
		                }
		            }
		        });


});
}



function validarContactanos(){
	var formita=document.getElementById("contactForm");
	var nombres = $("#lname").val();
	var apellidos = $("#fname").val();
	var correo = $("#correo").val();
	var ubicacion = $('#country').find(":selected").text();
	var mensaje = $("#subject").val();	
	var validar = validarEmail(correo);	
		//se verifican que los campos no esten vacios
		if(nombres==="" || apellidos ==="" || correo ==="" || mensaje ===""){
			 BootstrapDialog.alert({
	            title: 'ATENCIÓN',
	            message: 'No se admiten campos vacíos',
	            type: BootstrapDialog.TYPE_WARNING, // <-- Default value is BootstrapDialog.TYPE_PRIMARY
	            closable: true, // <-- Default value is false
	            draggable: true, // <-- Default value is false
	            buttonLabel: 'Aceptar', // <-- Default value is 'OK',
	            callback: function(result) {
	                // result will be true if button was click, while it will be false if users close the dialog directly.
	                $('html, body').animate({
				        scrollTop: $("#contactanos").offset().top
				    }, 500);
	            }
       		 });
       	}
		else if(!validar){
				BootstrapDialog.alert({
		            title: 'ATENCIÓN',
		            message: 'La dirección de correo electrónico es incorrecta',
		            type: BootstrapDialog.TYPE_WARNING, // <-- Default value is BootstrapDialog.TYPE_PRIMARY
		            closable: true, // <-- Default value is false
		            draggable: true, // <-- Default value is false
		            buttonLabel: 'Aceptar', // <-- Default value is 'OK',
		            callback: function(result) {
		                // result will be true if button was click, while it will be false if users close the dialog directly.
		                $('html, body').animate({
					        scrollTop: $("#contactanos").offset().top
					    }, 500);
		            }
		        });
		}
		else{
				BootstrapDialog.alert({
		            title: 'INFORMACION',
		            message: nombres + ', gracias por tu comentario, nos pondremos en contacto contigo!',
		            type: BootstrapDialog.TYPE_INFO, // <-- Default value is BootstrapDialog.TYPE_PRIMARY
		            closable: true, // <-- Default value is false
		            draggable: true, // <-- Default value is false
		            buttonLabel: 'Aceptar', // <-- Default value is 'OK',
		           /* callback: function(result) {
		                // result will be true if button was click, while it will be false if users close the dialog directly.
		                $('html, body').animate({
					        scrollTop: $("#contactanos").offset().top
					    }, 500);
		            }*/
		        });
			}
}

function validarEmail(email){

	 var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

(function(){
	var tipoMaquillaje = "lipstick"
	var xmlHttp = new XMLHttpRequest();
	var ARRAY_RESPUESTA = [];
	xmlHttp.onreadystatechange = function() { 
	if (xmlHttp.readyState == XMLHttpRequest.DONE) {
		var obj = JSON.parse(xmlHttp.responseText);
		// console.log("RESPUESTA", xmlHttp.responseText);
		if(xmlHttp.responseText){        
			ARRAY_RESPUESTA = obj;
			console.log("Nombre",ARRAY_RESPUESTA[0].name);
			console.log("Precio",ARRAY_RESPUESTA[0].price);
		}
		else
		{
			console.log("No hay respuesta");        
		}
    }
}
xmlHttp.open( "GET", "https://makeup-api.herokuapp.com/api/v1/products.json?product_type="+tipoMaquillaje, true ); // false for synchronous request
xmlHttp.withCredentials = false;
    //xmlHttp.setRequestHeader('Origin', 'http://192.168.73:81');
    xmlHttp.send( null );


})();




