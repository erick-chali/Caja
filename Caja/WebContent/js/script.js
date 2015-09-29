
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
			   $('#ingresarPago').modal('toggle');
		   }
	   });
	   $(document).on('click', '#tablaFacturas tbody tr', function(){
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
		   $('.previasFacturas').empty();
		   
		   var tabla = $('<table id="tablaFacturas" class="table table-striped table-bordered table-condensed table-hover"></table>');
		   var thead = $('<thead></thead>');
		   var detalle = $('<tbody></tbody>');
		   var encabezado = $('<tr> <th></th> <th></th> <th></th> <th></th> <th class=""></th> <th class="previasOculto"></th> <th class="previasOculto"></th> <th class="previasOculto"</th> </tr>');
		   encabezado.children().eq(0).text('Serie');
		   encabezado.children().eq(1).text('No. Fac');
		   encabezado.children().eq(2).text('NIT');
		   encabezado.children().eq(3).text('Nombre');
		   encabezado.children().eq(4).text('Fecha');
		   encabezado.children().eq(5).text('Monto');
		   encabezado.children().eq(6).text('Observaciones');
		   encabezado.children().eq(7).text('Tipo Pago');
		   encabezado.appendTo(thead);
		   thead.appendTo(tabla);
		   detalle.appendTo(tabla);
		   tabla.appendTo('.previasFacturas');
		   $.each(data, function(index, element) {
			   var filas = $('<tr> <td class="serie"></td> <td class="numeroFac"></td> <td class="nit"></td> <td class="nombre"></td> <td class="fecha"></td> <td class="monto previasOculto"></td> <td class="observaciones previasOculto"></td> <td class="tipoPago previasOculto"></td></tr>')
			   filas.find('.serie').text(element.serie);
			   filas.find('.numeroFac').text(element.numeroFactura);
			   filas.find('.nit').text(element.nit);
			   filas.find('.nombre').text(element.nombreFactura);
			   filas.find('.fecha').text(element.fechaFormato);
			   filas.find('.monto').text(element.monto);
			   filas.find('.observaciones').text(element.observaciones);
			   filas.find('.tipoPago').text($.trim(element.tipoPago));
			   filas.appendTo($('table#tablaFacturas tbody'));
	        });
		   $('.previasOculto').hide();
		   $("#tablaFacturas").dataTable( {
	    	   "columnDefs": [
								{ "width": "25px", "targets": 0 },
								{ "width": "30px", "targets": 1 },
								{ "width": "25px", "targets": 2 },
								{ "width": "350px", "targets": 3 },
								{ "width": "30px", "targets": 4 }
		                     ],
	    	   "scrollY" : 400,
	    	   "scrollX" : true,
		        "language": {
		            "url": "//cdn.datatables.net/plug-ins/1.10.7/i18n/Spanish.json"   	
		        }
		        
		    });
	   } 
	   });
   }
   
  }(window.jQuery, window, document));
  // The global jQuery object is passed as a parameter