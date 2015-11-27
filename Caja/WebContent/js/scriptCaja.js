
(function(yourcode) {
	yourcode(window.jQuery, window, document);
}(function($, window, document) {

   $(function() {
	   CargarEncabezadosFacturas();
	   /**DOCUMENTO LISTO**/
//	   $('#textoTarjetaCredito').validateCreditCard(function(result) {
//		   console.log('Tarjeta: ' + (result.card_type == null ? '-' : result.card_type.name));
//		   if(result.valid){
//			   console.log('Tarjeta ingresada es valida');
//		   }
//		   if(result.length_valid){
//			   console.log('Largo de tarjeta valido');
//		   }
//		   if(result.luhn_valid){
//			   console.log('Algoritmo de tarjeta valido');
//		   }else{
//			   console.log('Algoritmo de tarjeta no valido');
//		   }
//	   });
	   $('#datosAPagar').hide();
	   $('#pagoEfectivo').hide();
	   /**EVENTOS BOTONES**/
	   $('#btnSolicitarPago').click(function(){
		   if($('#serie').text()=='' || $('#numeroFactura').text()=='' || $('#nit').text()==''){
			   notificacionAlerta('Necesita seleccionar una factura antes de proceder al pago.');
		   }else{
			   $('#ambasTablas').toggle('fast', function(){
				   $('#tablaEncabezadosFacturas').bootstrapTable('resetView');
				   $('#tablaDetallesFacturas').bootstrapTable('resetView');
			   });
			   $('#datosAPagar').toggle('slow', function(){
				   console.log($('#codigoPago').text());
				   if($('#codigoPago').text()=='1'){
					   
					   $('#pagoEfectivo').show();
				   }else{
					   $('#pagoEfectivo').hide();
				   }
			   });
		   }
	   });
	   $('#btnMenu').click(function(){
		   alert(JSON.stringify($('#tablaEncabezadosFacturas').bootstrapTable('getData')));
	   });
	   $('#btnToggleXS').click(function(){
		   if($('#iconoEncabezadosXS').hasClass('glyphicon-arrow-up')){
			   $('#encabezados').toggle('slow', function(){
				   $('#iconoEncabezadosXS').removeClass('glyphicon-arrow-up').addClass('glyphicon-arrow-down');
				   $('#tablaEncabezadosFacturas').bootstrapTable('resetView');
				   $('#tablaDetallesFacturas').bootstrapTable('resetView');
			   });
			   
		   }else{
			   $('#encabezados').toggle('slow', function(){
				   $('#tablaEncabezadosFacturas').bootstrapTable('resetView');
				   $('#tablaDetallesFacturas').bootstrapTable('resetView'); 
				   $('#iconoEncabezadosXS').removeClass('glyphicon-arrow-down').addClass('glyphicon-arrow-up');
			   });
		   }
		   
	   });
	   $('#btnToggle').click(function(){
		   if($('#detalles').hasClass('col-md-8')||$('#detalles').hasClass('col-lg-8')){
			   $('#encabezados').toggle('fast', function(){
				   $('#detalles').removeClass('col-md-8 col-lg-8').addClass('col-md-12 col-lg-12');
				   $('#iconoEncabezados').removeClass('glyphicon-resize-full').addClass('glyphicon-resize-small');
				   $('#tablaEncabezadosFacturas').bootstrapTable('resetView');
				   $('#tablaDetallesFacturas').bootstrapTable('resetView');
			   });
			   
		   }else{

			   $('#detalles').removeClass('col-md-12 col-lg-12').addClass('col-md-8 col-lg-8');
			   $('#encabezados').toggle('slow', function(){
				   $('#tablaEncabezadosFacturas').bootstrapTable('resetView');
				   $('#tablaDetallesFacturas').bootstrapTable('resetView'); 
				   $('#iconoEncabezados').removeClass('glyphicon-resize-small').addClass('glyphicon-resize-full');
			   });
		   }
		   
	   });

	   $('#btnCerrarSesion').click(function(){
		   location.href = 'CerrarSesion';
	   });
	   $('#btnPagarEfectivo').click(function(){
		  if($('#pago').val()==''){
			  notificacionAlerta('El pago no puede quedar vac\u00CDa');
			  $('#pago').focus();
		  }else if($('#vuelto').val()<0 || $('#vuelto').val()==''){
			  notificacionAlerta('El pago debe ser mayor al monto a pagar');
			  $('#vuelto').focus();
		  }else{
			  
		  }
	   });
	   $(function () {
		   $('#tablaEncabezadosFacturas').bootstrapTable(); // init via javascript

		   $(window).resize(function () {
			   $('#tablaEncabezadosFacturas').bootstrapTable('resetView');
			   $('#tablaDetallesFacturas').bootstrapTable('resetView');
		   });
	   });
	   /**EVENTOS TABLA BOOTSTRAP**/
	   $('#tablaEncabezadosFacturas').on('click', 'tbody tr', function(e) {
		    $(this).addClass('filaSeleccionada').siblings().removeClass('filaSeleccionada');
	   });
	   $('#tablaDetallesFacturas').on('click-cell.bs.table', function (e, field, value, row, $element) {
//		   alert('click en: ' + JSON.stringify(field));
		   if($element.children().hasClass('formatoTextosLargos')){
			   
			   $element.children().tooltip({
				   title: value,
				   placement: 'top',
				   trigger: 'click hover'
			   });
		   }
	   });
	   $('#tablaEncabezadosFacturas').on('click-row.bs.table', function (e, row, $element) {
		   if($('#btnToggleXS').is(':visible')){
			   $('#btnToggleXS').click();
		   }
		   $('#tablaDetallesFacturas').bootstrapTable('destroy');
		   $('#nit').text('');
		   $('#nombre').text('');
		   $('#fecha').text('');
		   $('#tipoPago').text('');
		   $('#codigoPago').text('');
		   $('#serie').text('');
		   $('#numeroFactura').text('');
		   $('#observaciones').text('');
		   //
		   $('#nit').text(row.nit);
		   $('#nombre').text($.trim(row.nombreFactura));
		   $('#fecha').text(row.fechaFormato);
		   $('#tipoPago').text(row.tipoPago);
		   $('#codigoPago').text(row.codigoPago);
		   $('#serie').text(row.serie);
		   $('#numeroFactura').text(row.numeroFactura);
		   $('#observaciones').text(row.observaciones);
		   console.log($('#codigoPago').text());
		   $tabla = $('#tablaDetallesFacturas');
		   $tabla.bootstrapTable({
			   method: 'POST',
			   url: 'CargarDetalleFactura',
			   contentType: 'application/x-www-form-urlencoded',
			   queryParams: function(p) {
				   p.serie= row.serie;
				   p.numeroFactura = row.numeroFactura
				   return p;
			   },
			   classes: 'table table-condensed table-hover',
			   height : 550,
			   undefinedText: '-',
			   search: true,
			   pageSize: 25,
			   pagination: true,
			   pageList: '[10, 25, 50, 100]',
			    columns: [{
			        field: 'correlativo',
			        title: 'Corr.'
			    },{
			        field: 'descripcion',
			        title: 'Producto',
			        formatter: formatoTextosLargos
			    },{
			        field: 'cantidad',
			        title: 'Cantidad',
			        halign: 'center'
			    },{
			        field: 'precio',
			        title: 'Precio',
			        formatter: formatoPrecio
			    },{
			        field: 'unidadMedida',
			        title: 'UM'
			    },{
			        field: 'porDescuento',
			        title: '%',
			        formatter: formatoDecimal
			    },{
			        field: 'descuento',
			        title: 'Desc.',
			        formatter: formatoPrecio
			    },{
			        field: 'envia',
			        title: 'Envia'
			    },{
			        field: 'codigoBodega',
			        title: 'Bodega',
			        formatter: formatoTextosLargos
			    },{
			        field: 'totalLinea',
			        title: 'Total',
			        formatter: formatoPrecio
			    },{
			        field: 'observaciones',
			        title: 'Observaciones',
			        formatter: formatoTextosLargos
			    }]
			});
		   $('#montoAPagar').val($.trim(parseFloat(row.monto).toFixed(2)));
		   $('#montoTotalFactura').text('Total: ' +formatoPrecio(row.monto));
		   $('#montoPagar').text(row.monto);
//		   datosDetallesFacturas($.trim(row.serie), $.trim(row.numeroFactura)).done(function(data){
//			   
//		   });
	   });
	   /**EVENTOS INPUT**/
	   $(document).on('keyup', '#pago', function(){
		   var vuelto, pago, monto;
	       monto = Number($('#montoAPagar').val());
	       pago = parseFloat($(this).val()).toFixed(2);
	       vuelto = pago - monto ;
	       $('#vuelto').val(parseFloat(vuelto).toFixed(2));
	   });
	   $(document).on('keydown', '#pago', function(e){
		// Allow: backspace, delete, tab, escape, enter and .
	        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
	             // Permitir: Ctrl+A
	            (e.keyCode == 65 && e.ctrlKey === true) ||
	             // Permitir: Ctrl+C
	            (e.keyCode == 67 && e.ctrlKey === true) ||
	             // Permitir: Ctrl+X
	            (e.keyCode == 88 && e.ctrlKey === true) ||
	             // Permitir: home, end, left, right
	            (e.keyCode >= 35 && e.keyCode <= 39)) {
	                 // let it happen, don't do anything
	                 return;
	        }
	        // Ensure that it is a number and stop the keypress
	        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
	            e.preventDefault();
	        }
	        
	   });
	   
   });
   	/**FUNCIONES**/
   function CargarEncabezadosFacturas(){
	   $tabla = $('#tablaEncabezadosFacturas');
	   $tabla.bootstrapTable({
		   method: 'POST',
		   classes: 'table table-condensed table-hover',
		   height : 550,
		   url: 'CargarFacturas',
		   showRefresh: true,
		   undefinedText: '-',
		   search: true,
		   pageSize: 25,
		   showColumns: true,
		   pagination: true,
		   pageList: '[10, 25, 50, 100]',
		    columns: [{
		        field: 'serie',
		        title: 'Serie',
		        width: '100px',
		        sortable: true
		    },{
		        field: 'numeroFactura',
		        title: '#Fac.',
		        width: '100px',
		        sortable: true
		    },{
		        field: 'nit',
		        title: 'NIT',
		        width: '100px',
		        formatter: formatoTextosLargos
		    },{
		        field: 'nombreFactura',
		        title: 'Nombre',
		        formatter: formatoTextosLargos
		    },{
		        field: 'fechaFormato',
		        title: 'Fecha',
		        width: '100px'
		    },{
		        field: 'monto',
		        title: 'Monto',
		        width: '100px',
		        formatter: formatoPrecio
		    },{
		        field: 'tipoPago',
		        title: 'Tipo Pago',
		        width: '100px',
		        formatter: formatoTextosLargos
		    },{
		        field: 'observaciones',
		        title: 'Observaciones',
		        width: '200px',
		        formatter: formatoTextosLargos
		    },{
		        field: 'codigoPago',
		        title: 'C.P.',
		        width: '200px',
		        visible: false
		    }
		    ]
		});
   }
   function datosDetallesFacturas(serie, numeroFactura){
	   return $.ajax({
		   method: 'POST',
		   url: 'CargarDetalleFactura',
		   dataType: 'json',
		   data: {
			   serie: serie,
			   numeroFactura: numeroFactura
		   },
		   error: function(data) {
		    	  console.log(JSON.stringify(data));
				   var obj = JSON.parse(JSON.stringify(data));
				   notificacionError(obj.responseText);
		   }
	   });
   }
   function formatoPrecio(value){
	   
	   var valorMonetario = parseFloat(value).toFixed(2);
	   var parts = valorMonetario.toString().split(".");
	   parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	   return 'Q' + parts.join(".");
//	   return 'Q.' + parseFloat(value).toFixed(2);
   }
   function formatoDecimal(value){
	   
	   return parseFloat(value).toFixed(2);
   }
   function formatoTextosLargos(value){
	   if(typeof value === 'undefined'){
		    value='-';
	   };
	   return '<div class="formatoTextosLargos">'+value+'</div>'
   }
   /**FUNCIONES NOTIFICACIONES**/
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