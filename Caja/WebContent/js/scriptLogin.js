(function(yourcode) {
	yourcode(window.jQuery, window, document);

}(function($, window, document) {

	$(function() {
		
		/**DOCUMENT.READY**/
		$('#btnLogin').click(function(){
			if($('#usuario').val()==''){
				notificacionAlerta('El campo usuario es requerido.');
				$('#usuario').focus();
			}else if($('#clave').val()==''){
				notificacionAlerta('La clave es requerida.');
				$('#clave').focus();
			}else{
				Login($('#usuario').val(), $('#clave').val()).done(function(data){
					console.log(data);
					if(data=='0'){
						notificacionAlerta('Usuario o Clave err\u00F3nea.');
					}else if(data =='1'){
						notificacionAlerta('No tiene caja asignada, necesita tenerla, solic\u00EDtela.');
					}else if(data=='2'){
						location.href = 'caja.jsp';
					}
				});
			}
			
		});
	});
	/**FUNCIONES**/
	
	function Login(usuario, clave){
		return $.ajax({
		      url: "InicioSesion",
		      method: "POST",
		      dataType: 'html',
		      data: {
		    	  usuario : usuario,
		    	  clave: clave,
		    	  objeto: 'factura'
		      },
		      error: function(data) {
		    	  console.log(JSON.stringify(data));
				   var obj = JSON.parse(JSON.stringify(data));
				   notificacionError(obj.responseText);
			  },
		});
	}
	
	function notificacionError(mensaje){
		$.notify({
			// options
			message: mensaje 
		},{
			// settings
			element: 'body',
			type: 'danger',
			delay: 10000,
			spacing: 2,
			showProgressbar: false,
			placement: {
				from: "bottom",
				align: "center"
			},
			animate: {
				enter: 'animated fadeInDown',
				exit: 'animated fadeOutUp'
			},
			newest_on_top: true,
			allow_dismiss: true,
		});
	}
	function notificacionExito(mensaje){
		$.notify({
			// options
			message: mensaje 
		},{
			// settings
			element: 'body',
			type: 'success',
			delay: 2500,
			spacing: 2,
			showProgressbar: false,
			placement: {
				from: "top",
				align: "right"
			},
			animate: {
				enter: 'animated fadeInDown',
				exit: 'animated fadeOutUp'
			},
			newest_on_top: true,
			allow_dismiss: false,
			template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
			'<span data-notify="title">{1}</span>' +
			'<span data-notify="message"><strong>{2}</strong></span>' +
		'</div>'
		});
	}
	function notificacionInfo(mensaje){
		$.notify({
			// options
			message: mensaje 
		},{
			// settings
			element: 'body',
			type: 'info',
			delay: 5000,
			spacing: 2,
			showProgressbar: false,
			placement: {
				from: "top",
				align: "left"
			},
			animate: {
				enter: 'animated fadeInDown',
				exit: 'animated fadeOutUp'
			},
			newest_on_top: true,
			allow_dismiss: true,
			template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
			'<span data-notify="title">{1}</span>' +
			'<span data-notify="message"><strong>{2}</strong></span>' +
		'</div>'
		});
	}
	function notificacionAlerta(mensaje){
		$.notify({
			// options
			message: mensaje 
		},{
			// settings
			element: 'body',
			type: 'warning',
			delay: 10000,
			spacing: 2,
			showProgressbar: false,
			placement: {
				from: "top",
				align: "center"
			},
			animate: {
				enter: 'animated fadeInDown',
				exit: 'animated fadeOutUp'
			},
			newest_on_top: true,
			allow_dismiss: true
		});
	}
}));