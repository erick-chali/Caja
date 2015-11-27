
  (function($, window, document) {
	  
   $(function() {
//	   $('#barra').click(function (){
//		   $('#barraNavegacion').toggle('fast');
//	   });
	   cargarFacturas();
	   $('#pagoFactura').click(function(){
		   if($('#detalleSerie').val()=='' || $('#detalleNumero').val() ==''){
			   alert('debe seleccionar una factura en la tabla de la derecha para poder pagar.')
		   }else{
			   $('#pagoSerie').text($('#detalleSerie').val());
			   $('#pagoNombre').text($('#detalleCliente').val());
			   $('#pagoNit').text($('#detalleNit').val());
			   $('#pagoNumero').text($('#detalleNumero').val());
			   $('#pagoFecha').text($('#detalleFecha').val());
			   $('#pagoTipo').text($('#detallePago').val());
			   $('#pagoObservaciones').text($('#detalleObservaciones').val());
			   $('#montoTotal').text(parseFloat($('#detalleMonto').val()).toFixed(2));
			   var textoPago = $('#pagoTipo').text();
			   var arregloPago = textoPago.split('.');
			   if(arregloPago[0]=='1'){
				   $('#pagarEfectivo').prop( "disabled", false );
				   $('#pagarTarjeta').prop( "disabled", true );
				   $('#pagarCheque').prop( "disabled", true );
				   $('#pagarOtras').prop( "disabled", true );
			   }else if(arregloPago[0]=='2'){
				   $('#pagarEfectivo').prop( "disabled", true );
				   $('#pagarTarjeta').prop( "disabled", true );
				   $('#pagarCheque').prop( "disabled", false );
				   $('#pagarOtras').prop( "disabled", true );
			   }else if(arregloPago[0]=='4'){
				   $('#pagarEfectivo').prop( "disabled", true );
				   $('#pagarTarjeta').prop( "disabled", false );
				   $('#pagarCheque').prop( "disabled", true );
				   $('#pagarOtras').prop( "disabled", true );
			   }
			   $('#ingresarPago').modal('toggle');
		   }
	   });
	   $('#pagarFactura').click(function(){
		   
		   if($('#cambio').text()==''){
			   alert('Todav\u00EDa tiene saldo pendiente por pagar en la factura.');
		   }else if(parseFloat($('#cambio').text()).toFixed(2)<0){
			   alert('El saldo no puede ser negativo');
		   }
	   });
	   $(document).on('keyup', '#montoEfectivo', function(e){
		   if($('#montoPagado').text()==' '){
			   var montoIngresado;
		       var saldo;
		       var cambio;
		       montoIngresado = 0;
		       saldo = $('#montoTotal').text();
		       cambio = parseFloat(montoIngresado-saldo).toFixed(2);
		       $('#montoPagado').text(parseFloat(0).toFixed(2));
		       $('#cambio').text(cambio);
		   }else{
			   var montoIngresado;
		       var saldo;
		       var cambio;
		       montoIngresado = 0;
		       saldo = $('#montoTotal').text();
		       cambio = parseFloat($(this).val()-saldo).toFixed(2);
		       $('#montoPagado').text(parseFloat($(this).val()).toFixed(2));
		       $('#cambio').text(cambio);
		   }
		   	
	   });
	   $(document).on('keydown', '#montoEfectivo', function(e){
	        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
	            (e.keyCode == 65 && ( e.ctrlKey === true || e.metaKey === true ) ) || 
	            (e.keyCode >= 35 && e.keyCode <= 40)) {
	                 return;
	        }
	        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
	            e.preventDefault();
	        }
	        
	   });
//	   $(document).on('click', '#tablaFacturas tbody tr', function(){
	   $(document).on('click', '#tablilla tbody tr', function(){
		   $('#detalleSerie').val($(this).find('.serie').text());
		   $('#detalleCliente').val($(this).find('.nombre').text());
		   $('#detalleNit').val($(this).find('.nit').text());
		   $('#detalleNumero').val($(this).find('.numeroFac').text());
		   $('#detalleFecha').val($(this).find('.fecha').text());
		   $('#detalleObservaciones').val($(this).find('.observaciones').text());
		   $('#detalleMonto').val($(this).find('.monto').text());
		   $('#detallePago').val($(this).find('.tipoPago').text());
		   $.ajax({
			   type : 'POST',
			   url : 'CargarDetalleFactura',
			   dataType : 'json',
			   data : {
				   serie : $(this).find('.serie').text(),
				   numeroFactura : $(this).find('.numeroFac').text()
			   },
			   error : function(e){
				   alert(e.responseText);
			   },
		   success : function(data){
			   $('.facturasDetalladas').empty();
			   
			   var tabla = $('<table id="tablaDetalleFacturas" class="table table-striped table-bordered table-condensed table-hover"></table>');
			   var thead = $('<thead></thead>');
			   var detalle = $('<tbody></tbody>');
			   var encabezado = $('<tr> <th></th> <th></th> <th></th> <th></th> <th></th> <th></th> <th></th> <th></th> <th></th> <th></th> <th></th> </tr>');
			   encabezado.children().eq(0).text('Correlativo');
			   encabezado.children().eq(1).text('Producto');
			   encabezado.children().eq(2).text('U.M.');
			   encabezado.children().eq(3).text('Cantidad');
			   encabezado.children().eq(4).text('Precio');
			   encabezado.children().eq(5).text('%');
			   encabezado.children().eq(6).text('Desc.');
			   encabezado.children().eq(7).text('Total');
			   encabezado.children().eq(8).text('Bodega');
			   encabezado.children().eq(9).text('Envia');
			   encabezado.children().eq(10).text('Observaciones');
			   encabezado.appendTo(thead);
			   thead.appendTo(tabla);
			   detalle.appendTo(tabla);
			   tabla.appendTo('.facturasDetalladas');
			   $.each(data, function(index, element) {
				   var filas = $('<tr> <td class="correlativo"></td> <td class="producto"></td> <td class="um"></td> <td class="cantidad"></td> <td class="precio"></td> <td class="porDescuento"></td> <td class="descuento"></td> <td class="total"></td> <td class="bodega"></td> <td class="envia"></td> <td class="observaciones"></td></tr>')
				   filas.find('.correlativo').text(element.correlativo);
				   filas.find('.producto').text(element.descripcion);
				   filas.find('.um').text(element.unidadMedida);
				   filas.find('.cantidad').text(element.cantidad);
				   filas.find('.precio').text(element.precio);
				   filas.find('.porDescuento').text(element.porDescuento);
				   filas.find('.descuento').text(element.descuento);
				   filas.find('.total').text(element.totalLinea);
				   filas.find('.bodega').text($.trim(element.codigoBodega));
				   filas.find('.envia').text($.trim(element.envia));
				   filas.find('.observaciones').text($.trim(element.observaciones));
				   filas.appendTo($('table#tablaDetalleFacturas tbody'));
		        });
		   }
		   });
	   });
   });

   function cargarFacturas(){
	   $.ajax({
		   type : 'POST',
		   url : 'CargarFacturas',
		   dataType : 'json',
		   error : function(e){
			   alert(e.responseText);
		   },
	   success : function(data){
		   
//		   $('.previasFacturas').empty();
//		   console.log(JSON.stringify(data));
//		   var tabla = $('<table id="tablaFacturas" class="table table-striped table-bordered table-condensed table-hover"></table>');
//		   var thead = $('<thead></thead>');
//		   var detalle = $('<tbody></tbody>');
//		   var encabezado = $('<tr> <th></th> <th></th> <th></th> <th></th> <th class=""></th> <th class="previasOculto"></th> <th class="previasOculto"></th> <th class="previasOculto"</th> </tr>');
//		   encabezado.children().eq(0).text('Serie');
//		   encabezado.children().eq(1).text('No. Fac');
//		   encabezado.children().eq(2).text('NIT');
//		   encabezado.children().eq(3).text('Nombre');
//		   encabezado.children().eq(4).text('Fecha');
//		   encabezado.children().eq(5).text('Monto');
//		   encabezado.children().eq(6).text('Observaciones');
//		   encabezado.children().eq(7).text('Tipo Pago');
//		   encabezado.appendTo(thead);
//		   thead.appendTo(tabla);
//		   detalle.appendTo(tabla);
//		   tabla.appendTo('.previasFacturas');
//		   $.each(data, function(index, element) {
//			   var filas = $('<tr> <td class="serie"></td> <td class="numeroFac"></td> <td class="nit"></td> <td class="nombre"></td> <td class="fecha"></td> <td class="monto previasOculto"></td> <td class="observaciones previasOculto"></td> <td class="tipoPago previasOculto"></td></tr>')
//			   filas.find('.serie').text(element.serie);
//			   filas.find('.numeroFac').text(element.numeroFactura);
//			   filas.find('.nit').text(element.nit);
//			   filas.find('.nombre').text(element.nombreFactura);
//			   filas.find('.fecha').text(element.fechaFormato);
//			   filas.find('.monto').text(element.monto);
//			   filas.find('.observaciones').text(element.observaciones);
//			   filas.find('.tipoPago').text($.trim(element.tipoPago));
//			   filas.appendTo($('table#tablaFacturas tbody'));
//	        });
//		   $('.previasOculto').hide();
//		   $("#tablaFacturas").dataTable( {
//	    	   "columnDefs": [
//								{ "width": "25px", "targets": 0 },
//								{ "width": "30px", "targets": 1 },
//								{ "width": "25px", "targets": 2 },
//								{ "width": "350px", "targets": 3 },
//								{ "width": "30px", "targets": 4 }
//		                     ],
//	    	   "scrollY" : 400,
//	    	   "scrollX" : true,
//		        "language": {
//		            "url": "//cdn.datatables.net/plug-ins/1.10.7/i18n/Spanish.json"   	
//		        }
//		        
//		    });
		   $('#tablaFacturas').bootstrapTable({
		        data: data,
		        height : 500,
		        pagination : true,
		        pageSize: 50,
                onClickRow: function (row, $element) {
                	$('#detalleSerie').val($.trim(row.serie));
         		   	$('#detalleCliente').val($.trim(row.nombreFactura));
         		   	$('#detalleNit').val($.trim(row.nit));
         		   	$('#detalleNumero').val($.trim(row.numeroFactura));
         		   	$('#detalleFecha').val($.trim(row.fechaFormato));
         		   	$('#detalleObservaciones').val($.trim(row.observaciones));
         		   	$('#detalleMonto').val($.trim(row.monto));
         		   	$('#detallePago').val($.trim(row.tipoPago));
         		   	$.ajax({
         		   		type : 'POST',
         		   		url : 'CargarDetalleFactura',
         		   		data : {
         		   			serie : $.trim(row.serie),
         		   			numeroFactura : $.trim(row.numeroFactura)
         		   		},
         		   		dataType : 'json',
         		   		error : function(e){
         		   			alert(e.responseText);
         		   		},
         		   		success : function(data){
         		   			$('.facturasDetalladas').empty();
         		   			var tabla = $('<table id="tablaDetalleFacturas"></table>');
         		   			var thead = $('<thead></thead>');
         		   			var enc = $('<tr> <th></th> <th></th> <th></th> <th></th> <th></th> <th></th> <th></th> <th></th> <th></th> <th></th> <th></th> </tr>');
         		   			thead.appendTo(tabla);
         		   			enc.appendTo(thead);
         		   			tabla.appendTo('.facturasDetalladas');
         		   			var $tabla = $('#tablaDetalleFacturas');
         		   			$tabla.bootstrapTable({
         		   				height: 400,
         		   				data : data,
         		   				pagination: true,
         		   				pageSize: 50,
         		   				pageList: [10, 25, 50, 100, 200],
         		   			columns: [
         		   			{
         	                    field: 'correlativo',
         	                    title: 'Correlativo',
         	                    width: '100px'
         	                }, 
         	                {
         	                    field: 'descripcion',
         	                    title: 'Producto',
         	                    width: '500px'
         	                },
         	                {
         	                    field: 'unidadMedida',
         	                    title: 'UM',
         	                    width: '100px'
         	                },
         	                {
         	                    field: 'cantidad',
         	                    title: 'Cantidad',
         	                    width: '100px'
         	                },
         	                {
         	                    field: 'precio',
         	                    title: 'Precio',
         	                    width: '100px'
         	                },
         	                {
         	                    field: 'porDescuento',
         	                    title: '%',
         	                    width: '100px'
         	                },
         	                {
         	                    field: 'descuento',
         	                    title: 'Desc.',
         	                    width: '100px'
         	                },
         	                {
         	                    field: 'totalLinea',
         	                    title: 'Total',
         	                    width: '100px'
         	                },
         	                {
         	                    field: 'codigoBodega',
         	                    title: 'Bodega',
         	                    width: '300px'
         	                },
         	                {
         	                    field: 'envia',
         	                    title: 'Envia',
         	                    width: '100px'
         	                },
         	                {
         	                    field: 'observaciones',
         	                    title: 'Observaciones',
         	                    width: '150px'
         	                },
         	                ]
         		   			});
         		   		}
         		   	});
                }
		        
		    });
	   } 
	   });
   }
   
  }(window.jQuery, window, document));
  // The global jQuery object is passed as a parameter