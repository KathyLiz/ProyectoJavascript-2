//El valor de esta variable se cambia cuando el login es exitoso
var login=false;
//Nombre de usuario que se va a mostrar en la parte superior
var nombre = "Katherine Hurtado";

var ARRAY_RESPUESTA = [];
//Función que carga los eventos en los botones del html
window.onload = function(){
	$("#lipstick").on("click",getData("lipstick"));
	$("#lip_liner").on("click",getData("lip_liner"));
	$("#eyebrow").on("click",getData("eyebrow"));
	$("#nail_polish").on("click",getData("nail_polish"));

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

function validarRegistro(){
	var forma = document.getElementById("registerForm")
}



function getData(tipoMaquillaje){
	//var tipoMaquillaje = "lipstick"
	var xmlHttp = new XMLHttpRequest();
	
	xmlHttp.onreadystatechange = function() { 
		if (xmlHttp.readyState == XMLHttpRequest.DONE) {
			var obj = JSON.parse(xmlHttp.responseText);
			// console.log("RESPUESTA", xmlHttp.responseText);
			if(xmlHttp.responseText){        
				ARRAY_RESPUESTA = obj;
			}
			else
			{
				console.log("No hay respuesta");        
			}

			switch(tipoMaquillaje){
				case "lipstick":
					document.getElementById("tituloTabla").innerHTML="Nuestro Catalogo con las mejores marcas de " + tipoMaquillaje;
					$('#tablaBusqueda').bootstrapTable('load',ARRAY_RESPUESTA);
					break;
				case "lip_liner":
					document.getElementById("tituloTablaL").innerHTML="Nuestro Catalogo con las mejores marcas de delineadores";
					$('#tablaLabiales').bootstrapTable('load',ARRAY_RESPUESTA);
					break;
				case "eyebrow":
					document.getElementById("tituloTablaC").innerHTML="Nuestro Catalogo con las mejores marcas de productos para Cejas";
					$('#tablaCejas').bootstrapTable('load',ARRAY_RESPUESTA);
					break;
				case "nail_polish":
					document.getElementById("tituloTablaE").innerHTML="Nuestro Catalogo con las mejores marcas de Esmaltes de Uñas";
					$('#tablaEsmaltes').bootstrapTable('load',ARRAY_RESPUESTA);
					break;
			}
	    }
	}
xmlHttp.open( "GET", "https://makeup-api.herokuapp.com/api/v1/products.json?product_type="+tipoMaquillaje, true ); // false for synchronous request
xmlHttp.withCredentials = false;
    //xmlHttp.setRequestHeader('Origin', 'http://192.168.73:81');
    xmlHttp.send( null );
}

//Funciones para adaptar la data 
function nameFormatter(value, row, index) {

    return [
      '<div class="form-inline">',
      '<a title="' + row.name + '" target="_blank">',
      '<img src="'+row.image_link+'" width="150px"> ',
      '</a>',
      '<strong>  '+row.name+' </strong>',
      '</div>'
    ].join('');
  }

  function priceFormatter(value, row, index) {

    return [
      '$ '+ row.price
    ].join('');
  }

  function stockFormatter(value, row, index) {
  	var stock = Math.floor((Math.random() * 100) + 1);
    return [
      stock + ' unidades'
    ].join('');
  }

function buttonFormatter(value, row, index) {
    return [
        '<div class="row">',
		   '<div class="col-sm-6">',
	 			'<button type="button" style="margin: 10px 0px;" class="btn btn-primary" href="javascript:void(0)">',
					'Añadir al Carrito <i class="glyphicon glyphicon-shopping-cart"></i>',
				'</button>',
			'</div>',
	'</div>'
    ].join('');
  }

//Funciones para adaptar la data 
function ratingFormatter(value, row, index) {
	var rating = Math.floor((Math.random() * 4) + 1);
	var ratingStars = '' ;
		for(var i = 0; i<rating;i++){
			ratingStars += '<img src="img/star1.png" class="imgRating">'
		}

    return [
      '<div class="name">',
      ratingStars,
      '<img src="img/star2.png" class="imgRating">',
      '</div>'
    ].join('');
  }

function colorFormatter(value, row, index){
	var array = row.product_colors;
	var $puntos = $(".selectorButtons");
	var contenido  =  '<div class="selectorButtons">';
		for( var i=0; i< array.length; i++ ){
			//console.log("ARRAY", array[i].hex_value);
			contenido += '<div data-idx="'+ i +'" class="selectorButton" style="background-color:'+array[i].hex_value+';"></div>';
		}

		 return [
      contenido,
      '</div>'
    ].join('');
}


