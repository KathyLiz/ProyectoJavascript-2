
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

