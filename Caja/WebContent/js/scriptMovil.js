(function ($, window, document) {
	  
    
    $(function () {
    	$("#datosVarios").freezeHeader({ 'height': '450px' });
    	$.get("http://ipinfo.io", function(response) {
    		console.log(response.ip);
    	    
    	}, "jsonp");
    	var device = navigator.userAgent

    	if (device.match(/Iphone/i)|| device.match(/Ipod/i)|| device.match(/Android/i)|| device.match(/J2ME/i)|| device.match(/BlackBerry/i)|| device.match(/iPhone|iPad|iPod/i)|| device.match(/Opera Mini/i)|| device.match(/IEMobile/i)|| device.match(/Mobile/i)|| device.match(/Windows Phone/i)|| device.match(/windows mobile/i)|| device.match(/windows ce/i)|| device.match(/webOS/i)|| device.match(/palm/i)|| device.match(/bada/i)|| device.match(/series60/i)|| device.match(/nokia/i)|| device.match(/symbian/i)|| device.match(/HTC/i))
    	{
    	window.location = "movil.pv.jsp";

    	}
    	else
    	{
    		console.log('Dispositivo Normal');
    	}
    	
	   var codigoP, descripcion, medida, cantidad, disponible, precioU, porDesc, descuento, importe, envio, dm, observ;
	   var subTotal = 0;
	   var Total;
	   var temporal;
	   var autorizado = 1;
	   $('#ocultarSuperior').click(function (){
		   $('#parteSuperior').toggle('fast');
	   });
	   $('#ocultarInferior').click(function (){
		   $('#parteInferior').toggle('fast');
	   });
	   $('#barra').click(function (){
		   $('#barraNavegacion').toggle('fast');
	   });
	   hacerCamposEditables();
	   $('#fechaEntrega').mask('99/99/9999',{placeholder:"dd/mm/yyyy"});
	   
//	   $('#indice').hide();
	   $('.datosOcultos').hide();
	   $('.kit').hide();
	   $(document).keydown(function (e){
		   if(e.keyCode==114){
               e.preventDefault();
			   $('#buscarDocumentos').modal('toggle');
               $('#filtroTextoDocumentos').val('');
               $('#contenedorCotizaciones').empty();
               cargarCotizacionesSucursal();
		   }else if(e.keyCode==112){
               e.preventDefault();
			   $('#buscarPagos').modal('toggle');
			   cargarTiposPago();
		   }else if(e.keyCode==115){
                e.preventDefault();
               $('#buscarClientes').modal('toggle');
               $('#filtroTextoClientes').val('');
               $('#contenedorClientes').empty();
           }else if(e.keyCode==118){
        	   e.preventDefault();
	   			$('#filtroTextoProductos').val('');
	   			$('#contenedorProductos').empty();
	   			$('#buscarProductos').modal('toggle');
           }else if(e.keyCode==119){
        	   encontrarImagen($('#indice').text());
        	   
           }
	   });
	   /**EVENTOS*/
	   fechaActual();
	   $('#fPago').focus();
//	   $('#toolbar').hide();
	   $(document).on('focus', '#tDoc', function (){
		   $(this).val('');
	   }); 
	   $('#tDoc').keydown(function(e){
		   if(e.keyCode == 13){
//			   var opcionMandada = 0;
//			   if($.trim(separarTexto(0, $(this).val())) == '1' || $.trim(separarTexto(0, $(this).val())) == '3' || $.trim(separarTexto(0, $(this).val())) == '4'){
//				   if($.trim(separarTexto(0, $(this).val())) == 1){
//					   opcionMandada = 7;
//				   }else{
//					   opcionMandada = $.trim(separarTexto(0, $(this).val()));
//				   }
//				   $('#autorizar').modal('toggle');
//				   $('#permisosUsuario').val('');
//				   $('#permisosClave').val('');
//				   $('#opcionPermisos').text(opcionMandada);
//				   $('#permisosUsuario').focus();
//			   }else{
				   cargarDatosDoc(1,$(this).val());
//			   }
		   }
		   
	   });
	   $('#fPago').keydown(function(e){
		   if(e.keyCode==13){
			   
			   cargarDatosPago(3,$(this).val(),$('#lCredito').val());
		   }
		   
	   });
	   
	   $('#nit').keydown(function(e){
		   if(e.keyCode==13){
			   cargarDatosNit($(this).val());
		   }
	   });
	   $('#siBodegas').click(function(){
		   $('#botones').hide();
		   $('#escondido').show();
		   $('#contenedorProductosBodegas').empty();
		   var cp;
		   cp = $('#datosVarios > tbody > tr').eq($('#indice').text()).children().eq(0).text();
		   cargarProductosFiltroBodegas($('#codigoLista').text(), "", separarTexto(0, $('#fPago').val()), cp);
	   });
	   $(document).on('click', '.codigoProducto', function (){
		   if($('#fPago').val() == ''){
			   	alert('Debe ingresar una forma de pago antes de buscar cualquier producto');/***INCLUIR EN MODAL DE ERRORES ***/
	   			$('#divFormaPago').addClass('has-error');
	   			$('#fPago').focus();
	   			$('#indice').text($(this).parent().index());
		   }else{
			   $('#indice').text($(this).parent().index());
			   $('#divFormaPago').removeClass('has-error');
//			   $('.codigoProducto').editable(function(value, settings) {
//				     return(value);
//				  }, {
//				     onblur  : 'cancel',
//				     event   : 'dblclick',
//				     style   : 'inherit',
//				     callback : function(value, settings) {
//				    	 traerProducto(value, separarTexto(0, $('#fPago').val()), $('#codigoLista').text() ,$('#indice').text());
//				    	 
//				     }
//				  });
		   }
	   });
	   $('#datosVarios').on('click', '.verInfoProd', function(){
		   $('#indice').text($(this).parent().parent().index());
		   encontrarImagen($('#indice').text())
	   });
	   $(document).on('click', '.cantidad', function (){
		   if($('#datosVarios > tbody > tr').eq($('#indice').text()).find('.codigoProducto').text()=='' || $('#datosVarios > tbody > tr').eq($('#indice').text()).find('.codigoProducto').text()=='--'){
			   alert('Debe ingresar un codigo de producto para poder ingresar cantidad');
		   }else{
			   $('#indice').text($(this).parent().index());
			   var indice;
			   indice = $('#indice').text();
		   }
		   
//		   $('.cantidad').editable(function(value, settings) {
//			     return(value);
//			  }, {
//			     onblur  : 'cancel',
//			     event   : 'dblclick',
//			     style   : 'inherit',
//			     callback : function(value, settings) {
//			    	 
//			    	 ejecutarCantidad(value, $('#indice').text());
//			     }
//			  });
	   });
	   
	   $(document).on('click', '.porcentaje', function (){
		   $('#indice').text($(this).parent().index());
		   
	   });
	   $(document).on('click', '.borrar', function (){
		   $(this).parent().parent().remove();
		   if($('#datosVarios  tbody').children().length == 0){
			   agregarFila();
			   hacerCamposEditables();
			   $('#datosVarios > tbody > tr').eq(0).find('.codigoProducto').trigger('click');
		   }
		   
	   });
//	   $(document).on('keydown', '.codigoProducto', function(e){
//		   if(e.keyCode==9){
//			   $('#datosVarios > tbody > tr').eq($('#indice').text()).find('.codigoProducto').blur();
//			   $('.cantidad').editable(function(value, settings) {
//				     return(value);
//				  }, {
//				     onblur  : 'cancel',
//				     event   : 'dblclick',
//				     style   : 'inherit',
//				     callback : function(value, settings) {
//				    	 
//				    	 ejecutarCantidad(value, $('#indice').text());
//				     }
//				  });
//			   console.log('teclas presionadas');
//	 			$('#datosVarios > tbody > tr').eq($('#indice').text()).find('.cantidad').trigger('dblclick');
//		   }
//	   });
//	   $(document).on('click', '.descripcion', function (){
//		   $('.descripcion').popover({
//			   	trigger: 'hover',
//		        placement: 'top',
//		        content: function() {
//		           var message = $(this).text();
//		             return message;
//		        }
//		    });
//	   });
	   $('#autorizacion').click(function (e){
		   if($('#permisosUsuario').val() == '' || $('#permisosClave').val() == ''){
			   alert('Debe ingresar usuario y clave.');
		   }else{
			   $.post('Privilegios',{operacion : $('#opcionPermisos').text(), usuario : $('#permisosUsuario').val(), pass : $('#permisosClave').val()} ,function(responseText) {
				   if(responseText!=null){
					   if(parseInt(responseText)==1){
						   $('#permiso').text(responseText);
						   console.log(responseText);
						   if($('#opcionPermisos').text() == '7'){
							   console.log('Tipo documento');
						   }else if($('#opcionPermisos').text() == '6'){
							   var resultado = $('#datosVarios > tbody > tr').eq($('#indice').text()).find('.importe').text() * 
							   					($('#datosVarios > tbody > tr').eq($('#indice').text()).find('.porcentaje').text()/100);
							   $('#datosVarios > tbody > tr').eq($('#indice').text()).find('.descuento').text(parseFloat(resultado).toFixed(2));
							   resultado = $('#datosVarios > tbody > tr').eq($('#indice').text()).find('.importe').text() - 
							   				$('#datosVarios > tbody > tr').eq($('#indice').text()).find('.descuento').text();
							   $('#datosVarios > tbody > tr').eq($('#indice').text()).find('.importe').text(parseFloat(resultado).toFixed(2));
							   sumarColumnaImporte();
					   }
					   }else if(parseInt(responseText)==0){
						   $('#permiso').text(responseText);
						   console.log(responseText);
						   if($('#opcionPermisos').text() == 6){
							   $('#autorizar').modal('toggle');
							   alert('credenciales incorrectas');
							   $('#datosVarios > tbody > tr').eq($('#indice').text()).find('.porcentaje').text('');
							   $('#datosVarios > tbody > tr').eq($('#indice').text()).find('.porcentaje').trigger('click');
						   }
					   }
				   }
			   });
//			   autorizarDocumento($.trim($('#opcionPermisos').text()), $('#permisosUsuario').val(), $('#permisosClave').val());
//			   console.log('Permiso ' +$('#permiso').text());
			   
		   }
		   
	   });
	   
	   $('#agregarFila').click(function (e){
		   var incompletos = 0 ;
		   $('#datosVarios tbody tr').each(function (index){
			   if($('#datosVarios > tbody > tr').eq(index).find('.codigoProducto').text()=='' || $('#datosVarios > tbody > tr').eq(index).find('.codigoProducto').text()=='--'){
				   incompletos += Number(1);
			   }
		   });
		   if(incompletos > 0){
			   alert('No puede dejar una fila sin completar.');
		   }else{
			   agregarFila();
			   hacerCamposEditables();
			   $('#datosVarios > tbody > tr').eq(0).find('.codigoProducto').trigger('click');
		   }
	   });
	   
	   $('#f3').click(function (e){
		   $('#buscarDocumentos').modal('toggle');
           $('#filtroTextoDocumentos').val('');
           $('#contenedorCotizaciones').empty();
           cargarCotizacionesSucursal();
	   });
	   $('#f1').click(function (e){
		   $('#buscarPagos').modal('toggle');
		   cargarTiposPago();
	   });
        $('#f4').click(function (e){
		   $('#buscarClientes').modal('toggle');
		   $('#contenedorClientes').empty();
            $('#filtroTextoClientes').val('');
	   });
	 //seleccionar el tipo de pago desde tabla en modal
	   $jq("table[id$='tablaPagos'] td:nth-child(1)").live('click',function(event) {  
				//Para evitar que el link actue.  
		   event.preventDefault();  
		   var $td= $(this).closest('tr').children('td');
		   $('#fPago').val($td.eq(0).text());
		   cargarDatosPago(3,$('#fPago').val(),'0.1');
		   $('#buscarPagos').modal('toggle');
	   });
	   //seleccionar producto
	   $jq("table[id$='tablaProductos'] td").live('click',function(event) {  
			//Para evitar que el link actue.  
		   event.preventDefault();  
		   var $td= $(this).closest('tr').children('td');
		   traerProducto($td.eq(0).text(), separarTexto(0, $('#fPago').val()), $('#codigoLista').text() ,$('#indice').text());
		   
		   $('#buscarProductos').modal('toggle');
		   
		   
	   });
	   
	   
	   //cargar productos por filtros
	   $('#filtroTextoProductos').keydown(function (e){
		   if(e.keyCode==13){
			   
			   $('#contenedorProductos').empty();
			   if($(this).val()==''){
				   alert('Debe ingresar algo para buscar');
			   }else{
				   cargarProductosFiltro($('#filtroComboProductos').val(),$('#filtroTextoProductos').val(),  separarTexto(0, $('#fPago').val()));
			   }
		   }
		   
		   
	   });	
	   $('#filtroTextoBodegas').keydown(function (e){
		   
		   if(e.keyCode==13){
			   $('#contenedorProductosBodegas').empty();
			   if($(this).val()=='' || $('#filtroComboBodegas').val() == ''){
				   alert('Las busquedas requieren un filtro y una palabra a buscar.');
			   }else{
				   
				   cargarProductosFiltroBodegas($('#filtroComboBodegas').val(), $(this).val(), separarTexto(0, $('#fPago').val()), codigoP);
			   }
		   }
		   
	   });
        $('#filtroTextoClientes').keydown(function (e){
            if(e.keyCode==13){
                if($(this).val()=='' || $('#filtroComboClientes').val() == ''){
                    alert('Para buscar un cliente debe seleccionar un filtro y un texto');
                }else{
                    cargarFiltroClientes($('#filtroComboClientes').val(), $(this).val());
                }
                
            }
        });
        $('#filtroTextoDocumentos').keydown(function (e){
            if(e.keyCode==13){
            	$('#contenedorCotizaciones').empty();
                if($(this).val()=='' || $('#filtroComboDocumentos').val() == ''){
                    alert('Para buscar un cliente debe seleccionar un filtro y un texto');
                }else{
                    cargarCotizacionesSucursal($(this).val(), $('#filtroComboDocumentos').val());
                }
                
            }
        });
	   //Seleccionar producto de Bodega alterna
	   
	   $jq("table[id$='tablaProductosBodega'] td").live('click',function(event) {  
			//Para evitar que el link actue.  
		   event.preventDefault();  
		   var $td= $(this).closest('tr');
		   $('#datosVarios > tbody > tr').eq($('#indice').text()).find('.disponible').text($td.find('.xBodegasDisponible').text());
		   console.log($('#indice').text());
		   console.log('Disponible: ' + $td.find('.xBodegasDisponible').text());
		   $('#datosVarios > tbody > tr').eq($('#indice').text()).find('.bodega').text($td.find('.xBodegasBodega').text());
		   console.log('Bodega ' + $td.find('.xBodegasBodega').text());
		   
		   $('#buscarProductosBodegas').modal('toggle');
		   //enfocar cantidad
		   
		   $('#datosVarios > tbody > tr').eq($('#indice').text()).children().eq(3).children().val();
		   
		   //hacer la suma
		   var resultado;
		   resultado = parseFloat($('#datosVarios > tbody > tr').eq($('#indice').text()).find('.cantidad').text()*
				   				$('#datosVarios > tbody > tr').eq($('#indice').text()).find('.precio').text()
		   ).toFixed(2);
		   
		   
		   $('#datosVarios > tbody > tr').eq($('#indice').text()).find('.importe').text(resultado);
		   sumarColumnaImporte();
	   });
        
        
        /**SELECCIONAR EL CLIENTE**/
        $jq("table[id$='tablaClientes'] td:nth-child(1)").live('click',function(event) {
            event.preventDefault(); 
            var $td= $(this).closest('tr').children('td');
            $('#buscarClientes').modal('toggle');
            cargarDatosNit($td.eq(0).text());
	   });
        
        $jq("table[id$='tablaCotizaciones'] td").live('click',function(event) {
            event.preventDefault(); 
            var $td= $(this).closest('tr').children('td');
            $('#buscarDocumentos').modal('toggle');
            cargarEncabezado(1, '', $.trim($td.eq(0).text()));
	   });
	   //grabar el Documento
	   $('#grabarDocumento').click(function(){
		   var incompletos = 0 ;
		   $('#datosVarios tbody tr').each(function (index){
			   if($('#datosVarios > tbody > tr').eq(index).find('.codigoProducto').text()=='' || $('#datosVarios > tbody > tr').eq(index).find('.codigoProducto').text()=='--'){
				   incompletos += Number(1);
			   }
		   });
		   if(incompletos > 0){
			   alert('Debe llenar todas las filas antes de grabar el documento, o de lo contrario, elimine las que no desee.');
		   }else{
			   var numFilas = $('#datosVarios >tbody >tr').length;
			   $('#numFilas').text(numFilas);
			   $.post('IngresarEnc',{
				   codigoCliente : $('#codigoCliente').text(), nit : $('#nit').val(), nombreCliente : $('#nombre').val(),
				   direcFactura : $('#direcF').val(), tel : $('#telefono').val(), tarjeta : $('#tarjeta').val(),
				   direcEnvio : $('#direcE').val(), tipoDoc : separarTexto(0, $('#tDoc').val()), fechaVence : $('#fecha').text(),
				   tipoPago : separarTexto(0, $('#fPago').val()), tipoCredito : $('#tCredito').val(), autoriza : "S",
				   fechaDoc : $('#fecha').text(), cargosEnvio : 0, otrosCargos: 0,
				   montoVenta: separarTexto(1, $('#subTotal').text()), montoTotal : separarTexto(1, $('#total').text()), tipoNota : 0,
				   caja : 0 , fechaEntrega : $('#fecha').text(), noConsigna : 0 , codMovDev : 0,
				   generaSolicitud : 'N', tipoPagoNC : 0 , tipoCliente : $('#tipoCliente').text(),
				   codigoNegocio : "", cantidadDevolver : 0, autorizoDespacho : "", 
				   saldo : $('#saldoCliente').text()
			   } ,function(responseText) {
				   if(responseText!=null){
					   var numDocumento;
					   numDocumento = $.trim(responseText);
					   $('#numDocumento').text(numDocumento);
					   guardarDetalle(numDocumento);
				   }   
			   });
		   }
		   
//		   
	   });
	   $(document).on('keydown', '.cantidad', function (e){
		   //en el arreglo las teclas permitidas
		   if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110]) !== -1 ||
		            (e.keyCode == 65 && ( e.ctrlKey === true || e.metaKey === true ) ) || 
		            (e.keyCode >= 35 && e.keyCode <= 40)) {
		                 return;
		        }
		        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
		            e.preventDefault();
		        }
	   });
	   $(document).on('keydown', '.codigoProducto', function (e){
		   //en el arreglo las teclas permitidas
		   if ($.inArray(e.keyCode, [8, 9, 27, 13, 68,70]) !== -1 ||
		            (e.keyCode == 65 && ( e.ctrlKey === true || e.metaKey === true ) ) || 
		            (e.keyCode >= 35 && e.keyCode <= 40)) {
		                 return;
		        }
		        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
		            e.preventDefault();
		        }
	   });
	   $(document).on('keypress', '.porcentaje', function (e){
		   if ($.inArray(e.keyCode, [8, 9, 27, 13, 110]) !== -1 ||
		            (e.keyCode == 65 && ( e.ctrlKey === true || e.metaKey === true ) ) || 
		            (e.keyCode >= 35 && e.keyCode <= 40)) {
		                 return;
		        }
		        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
		            e.preventDefault();
		        }
	   });
   });/**fin de document.ready*/
    function cargarDetalle(tipoDoc, serie, numDocumento){
    	$.post('CargarDetalle',{tipoDoc : tipoDoc, serie : serie, numDocumento : numDocumento} ,function(responseJson) {
    		var fila;
	 		   if(responseJson!=null){
	 			  $('#datosVarios tbody').empty();
	 			  fila = 0;
	 			   $.each(responseJson, function(key, value) {
	 				  
	 				  var rowNew = $('<tr>' +
	 		            		'<td class="codigoProducto"></td>'+
	 		            		'<td class="medida"></td>'+
	 		            		'<td class="descripcion"><div class="contenDescrip"></div></td>'+
	 		            		'<td class="cantidad"></td>'+
	 		            		'<td class="disponible"></td>'+
	 		            		'<td class="precio"></td>'+
	 		            		'<td class="porcentaje"></td>'+
	 			   				'<td class="descuento" ></td>'+
	 		            		'<td class="importe"></td>'+
	 		            		'<td class="bodega"></td>'+
	 		            		'<td class="envio"><input type="checkbox"></td>'+
	 		            		'<td class="dm" ></td>'+
	 		            		'<td class="obser"></td>'+
	 		            		'<td class="kit"></td>'+
	 		            	'</tr>');
	 				  	rowNew.appendTo($('table#datosVarios tbody'));
	 				  	$('#datosVarios > tbody > tr').eq(fila).find('.codigoProducto').text(value['codigoProducto']);
	 				  	console.log($.trim(value['codigoProducto']));
	 				  	$('#datosVarios > tbody > tr').eq(fila).find('.medida').text(value['uMedida']);
	 				  	$('#datosVarios > tbody > tr').eq(fila).find('.descripcion').children().text(value['descripcion']);
	 				  	$('#datosVarios > tbody > tr').eq(fila).find('.cantidad').text(parseInt(value['cantidad']));
	 				  	$('#datosVarios > tbody > tr').eq(fila).find('.precio').text($.trim(parseFloat(value['precio']).toFixed(2)));
	 				  	$('#datosVarios > tbody > tr').eq(fila).find('.disponible').text(parseInt(value['disponible']));
	 				  	$('#datosVarios > tbody > tr').eq(fila).find('.porcentaje').text(parseFloat(value['porDescuento']).toFixed(2));
	 				  	$('#datosVarios > tbody > tr').eq(fila).find('.descuento').text($.trim(parseFloat(value['descuento']).toFixed(2)));
	 				  	$('#datosVarios > tbody > tr').eq(fila).find('.bodega').text(value['bodega']);
	 				  	$('#datosVarios > tbody > tr').eq(fila).find('.importe').text($.trim(parseFloat(value['total']).toFixed(2)));
	 				  	
	 				  	if(value['envia']=='1'){
	 				  		$('#datosVarios > tbody > tr').eq(fila).find('.envio').children().eq(0).prop('checked', true);
	 				  	}else if(value['envia']=='0'){
	 				  		$('#datosVarios > tbody > tr').eq(fila).find('.envio').children().eq(0).prop('checked', false);
	 				  	}
	 				  	
	 				  	$('#datosVarios > tbody > tr').eq(fila).find('.obser').text(value['observaciones']);
	 				  	$('#datosVarios > tbody > tr').eq(fila).find('.kit').text(value['kit']);
	 				  	fila += 1;
		               
	 			    });
	 			  $('.kit').hide();
	 		   }
	 				   
	 	   });
    	
    }
    function cargarEncabezado(tipoDoc, serie, numDocumento){
    	$.post('CargarEncabezado',{tipoDoc : tipoDoc, serie : serie, numDocumento : numDocumento} ,function(responseJson) {
 		 		   if(responseJson!=null){
 		 			   $.each(responseJson, function(key, value) {
 						   $('#fPago').val($.trim(value['tipoPago']));
 						   $('#tCredito').val($.trim(value['tipoCredito']));
 						   $('#tDoc').val(value['tipoDocumento']);
 						   $('#nDoc').val(numDocumento);
 						   $('#fechaVencimiento').val(componerFecha(value['fechaVence']));
 						   $('#nit').val(value['nit']);
 						   $('#direcF').val(value['direcFactura']);
 						   $('#nombre').val(value['nombreCliente']);
 						   $('#codigoCliente').text(value['codigoCliente']);
 						   $('#autoriza').text(value['autoriza']);
 						   $('#subTotal').text('SubTotal: ' + $.trim(parseFloat(value['montoVenta']).toFixed(2)));
 						   $('#total').text('Total: ' + $.trim(parseFloat(value['montoTotal']).toFixed(2)));
 		 			    });
 		 			   
 		 			   cargarDatosNit($('#nit').val());
 		 			 cargarDetalle(1,'',$('#nDoc').val());
 		 		   }
 		 				   
 		 	   });
    }
    function guardarDetalle(numeroDocumento){
    	 $('#datosVarios tbody tr').each(function (index){
	    		var codigoP,descripcion,medida,cantidad,disponible,precioU, porDesc, descuento, importe, dm, observ,envio
				   var bod, kit;
				   codigoP = $('#datosVarios > tbody > tr').eq(index).find('.codigoProducto').text();
				   descripcion = $('#datosVarios > tbody > tr').eq(index).find('.descripcion').text();
				   medida = $('#datosVarios > tbody > tr').eq(index).find('.medida').text();
				   cantidad = $('#datosVarios > tbody > tr').eq(index).find('.cantidad').text();
				   disponible = $('#datosVarios > tbody > tr').eq(index).find('.disponible').text();
				   precioU = $('#datosVarios > tbody > tr').eq(index).find('.precio').text();
				   if($('#datosVarios > tbody > tr').eq(index).find('.porcentaje').text()==''){
					   porDesc = 0.00;
				   }else{

					   porDesc = $('#datosVarios > tbody > tr').eq(index).find('.porcentaje').text();
				   }
				   descuento = $('#datosVarios > tbody > tr').eq(index).find('.descuento').text();
				   importe = $('#datosVarios > tbody > tr').eq(index).find('.importe').text();
				   bod = $('#datosVarios > tbody > tr').eq(index).find('.bodega').text();
				   if($('#datosVarios > tbody > tr').eq(index).find('.envio').children().prop('checked')){
					   envio = 1;
				   }else{
					   envio = 0;
				   }
				   dm = $('#datosVarios > tbody > tr').eq(index).find('.dm').text();
				   observ = $('#datosVarios > tbody > tr').eq(index).find('.obser').text();
				   kit = $('#datosVarios > tbody > tr').eq(index).find('.kit').text();
				   
				   $.post('IngresarDet',{
					   tipoDocumento : separarTexto(0, $('#tDoc').val()), serieDocumento : '', numeroDocumento : numeroDocumento, numCorrelativo : 1, codigoProducto : codigoP,
					   UMedida : medida, cantidad: $('#datosVarios > tbody > tr').eq(index).find('.cantidad').text(), precio : precioU, porDescuento : porDesc, descuento : descuento, total: importe, codigoCliente : $('#codigoCliente').text(),
					   promo : 0, bodega : bod, envio : envio, observaciones : observ, lista : $('#codigoLista').text(), pago : separarTexto(0, $('#fPago').val()), kit : kit, corrKit : 0, codPromo : 0,
					   serieDevProy : '', numDevProy : '0', ordenCompra : 0
					   
					   
				   } ,function(responseText) {
					   return false;
					   if(responseText!=null){
//						   alert(responseText);
						   return true;
//						   alert('Producto grabado en documento numero: ' + $('#numDocumento').text());
					   }
							   
				   });
			   });
    	
    }
   function traerProducto(codigoProducto, tipoPago, lista, indiceFila){
	   $('#indice').text(indiceFila);
	    
        $.post('TraerProducto',{codigo : codigoProducto, lista : lista, formaPago : tipoPago} ,function(responseJson){
		 		   if(responseJson!=null){
		 			   console.log('Existe Producto');
		 			   $.each(responseJson, function(key, value) {
		 				  $('#datosVarios > tbody > tr').eq(indiceFila).find('.codigoProducto').text($.trim(value['codigoProducto']));
		 				   $('#datosVarios > tbody > tr').eq(indiceFila).find('.medida').text(value['medida']);
		 				   $('#datosVarios > tbody > tr').eq(indiceFila).find('.descripcion').children().text(value['descripcionProducto']);
		 				   $('#datosVarios > tbody > tr').eq(indiceFila).find('.cantidad').text(parseInt(0));
		 				   $('#datosVarios > tbody > tr').eq(indiceFila).find('.disponible').text(parseInt(value['disponible']));
		 				   $('#datosVarios > tbody > tr').eq(indiceFila).find('.precio').text(parseFloat(value['precioUnitario']).toFixed(2));
		 				   $('#datosVarios > tbody > tr').eq(indiceFila).find('.porcentaje').text(parseFloat(0).toFixed(2));
		 				   $('#datosVarios > tbody > tr').eq(indiceFila).find('.descuento').text(parseFloat(0).toFixed(2));
		 				   $('#datosVarios > tbody > tr').eq(indiceFila).find('.importe').text(parseFloat(0).toFixed(2));
		 				   $('#datosVarios > tbody > tr').eq(indiceFila).find('.bodega').text(value['codigoBodega']);
		 				   $('#datosVarios > tbody > tr').eq(indiceFila).find('.dm').text(value['descuentoMaximo']);
		 				   var esKit = value['esKit'];
		 				   $('#datosVarios > tbody > tr').eq(indiceFila).find('.kit').text(value['esKit']);
		 				   if(esKit=='S'){
		 					  $('#datosVarios > tbody > tr').eq(indiceFila).css({"color": "#e75505", "font-weight": "bold"});
		 				   }else if(esKit=='N'){
		 					  $('#datosVarios > tbody > tr').eq(indiceFila).css({"color": "#000000", "font-weight": "normal"});
		 					  
		 				   }
		 				   
		 			    });
		 		   }
		 		   if($('#datosVarios > tbody > tr').eq(indiceFila).find('.descripcion').text()==''){
		 			   alert('codigo de producto no existe en la DB');
		 			   $('#datosVarios > tbody > tr').eq(indiceFila).find('.codigoProducto').text('');
		 			   $('#datosVarios > tbody > tr').eq(indiceFila).find('.codigoProducto').trigger('click');
		 			   $('#datosVarios > tbody > tr').eq(indiceFila).find('.codigoProducto').focus();
		 		   }else{
		 				  sumarColumnaImporte();
				 			$('#datosVarios > tbody > tr').eq(indiceFila).find('.cantidad').trigger('click');
				 			$('#datosVarios > tbody > tr').eq(indiceFila).find('.cantidad').focus();
				 			$('#datosVarios > tbody > tr').eq(indiceFila).find('.cantidad').val('');			 			
		 		   }
		 	   });
   }
   function ejecutarCantidad(cantidad, indiceFila){
	   console.log('indice Fila en cantidad: ' + indiceFila);
	   revisarCantidadMismoProducto($('#datosVarios > tbody > tr').eq(indiceFila).find('.codigoProducto').text(), cantidad, $('#indice').text());
	   
	   var importe;
	   var cantDisp;
	   var cp;
	   cantDisp = parseInt($('#datosVarios > tbody > tr').eq(indiceFila).find('.disponible').text());
	   cp = $('#datosVarios > tbody > tr').eq(indiceFila).find('.codigoProducto').text();
	   if(cantDisp < cantidad){
		   	$('#botones').show();
  			$('#escondido').hide();
  			$('#buscarProductosBodegas').modal('toggle');
  			$('#contenedorProductosBodegas').empty();
	   }else{
		   var resultado;
		   console.log('Indice Actual: ' + $('#indice').text());
		   resultado = parseFloat($('#datosVarios > tbody > tr').eq($('#indice').text()).find('.cantidad').text()*
				   				$('#datosVarios > tbody > tr').eq($('#indice').text()).find('.precio').text()
		   ).toFixed(2);
		   
		   
		   $('#datosVarios > tbody > tr').eq($('#indice').text()).find('.importe').text(resultado);
		   sumarColumnaImporte();
	   }
	   
	   
   }
   function sumarColumnaImporte(){
	   var sum = 0;
	    $('.importe').each(function() {
	        sum += Number($(this).text());
	    });
	    $('#subTotal').text('SubTotal: ' + parseFloat(sum).toFixed(2));
	    $('#total').text('Total: ' + parseFloat(sum).toFixed(2));

   }
   function obtenerImporteSinDescuento(){
	   
   }
   /**FUNCIONES*/
   //fecha actual
   function fechaActual(){
	   	var d = new Date();
	    var month = d.getMonth()+1;
	    var day = d.getDate();
	    var fecha = 
	        ((''+day).length<2 ? '0' : '') + day + '/' +
	        ((''+month).length<2 ? '0' : '') + month + '/' +
	        d.getFullYear();
		$('#fecha').text(fecha);
		
   }
 //fecha entrega
   function fechaEntrega(){
	   	var d = new Date();
	    var month = d.getMonth()+1;
	    var day = d.getDate()+1;
	    var fecha = 
	    	d.getFullYear() + '-' + 
	        ((''+month).length<2 ? '0' : '') + month + '-' +
	        ((''+day).length<2 ? '0' : '') + day;  
	        
		$('#fechaEntrega').val(fecha);
		
   }
   //FUNCION CARGAR COMBO TIPOS DE PAGO
   function cargarTiposPago(){
	   $.post('CargarCombos',{combo : 1} ,function(responseText) {
		   if(responseText!=null){
			   $('#tCredito').html(responseText);
		   }
				   
	   });
   }
   
   //funcion cargar datos usando Nit
   function cargarDatosNit(nit){
	   $.post('InformacionNit',{nit : nit} ,function(responseJson) {
		   if(responseJson!=null){
			   $('#codigoCliente').text('');
			   $.each(responseJson, function(key, value) {
					$('#nit').val(value['nit']);
					$('#nombre').val(value['nombreCliente']);
					$('#direcF').val(value['direccionF']);
					$('#direcE').val(value['direccionE']);
					$('#telefono').val(value['telefono']);
					$('#lCredito').val(value['limiteCredito']);
					$('#codigoCliente').text(value['codigoCliente']);
					$('#tipoCliente').text(value['tipoCliente']);
					$('#saldoCliente').text(value['saldo']);
			    });
		   }
		   if($('#codigoCliente').text()==''){
			   alert('EL NIT ES INCORRECTO O NO EXISTE EN LA DB.');
			   $('#nit').val('');
			   $('#nit').focus();
		   }
	   });
   }
   //funcion cargar datos del tipo documento
   function cargarDatosDoc(opcion, codigoDocumento){
	   $.post('TraeDatos',{opcion : opcion,codigo : codigoDocumento} ,function(responseJson) {
		   
		   if(responseJson!=null){
			   $.each(responseJson, function(key, value) { 
					$('#tDoc').val(value['codigoMovimiento'] + ' ' + value['descripcionMovimiento']);
			    });
			   cargarFechaVencimiento(2, separarTexto(0, $('#tDoc').val()));
		   }
				   
	   });
   }
 //funcion cargar datos del tipo documento
   function cargarDatosPago(opcion, tipoPago, limiteCredito){
	   $.post('TraeDatos',{opcion : opcion,tipoPago : tipoPago,limite : limiteCredito} ,function(responseJson) {
		   if(responseJson!=null){
			   $.each(responseJson, function(key, value) { 
					$('#fPago').val(value['codigoPago'] + ' ' + value['descripcionPago']);
					$('#tCredito').val(value['esCredito']);
					
					$('.codigoProducto').editable(function(value, settings) {
					     return(value);
					  }, {
					     onblur  : 'cancel',
					     event   : 'dblclick',
					     style   : 'inherit',
					     callback : function(value, settings) {
					    	 traerProducto(value, separarTexto(0, $('#fPago').val()), $('#codigoLista').text() ,$('#indice').text());
					    	 
					    	 
					     }
					  });
					$('#datosVarios > tbody > tr').eq($('#indice').text()).find('.codigoProducto').trigger('click');
			    });
		   }
				   
	   });
   }
  
   //cargar fecha
   function cargarFechaVencimiento(opcion, noDoc){
	   $.post('TraeDatos',{opcion : opcion , codigo : noDoc} ,function(responseJson) {
		   if(responseJson!=null){
			   $.each(responseJson, function(key, value) {
					$('#fechaVencimiento').val(componerFecha(value['fechaVencimiento']));
			    });
		   }
				   
	   });
   }
   //Autorizaciones varias
//   function autorizarDocumento(noDoc){
//	   var autorizado = false;
//	   $.post('Autorizaciones',{opcion : noDoc} ,function(responseText) {
//		   if(responseText!=null){
//			   if(parseInt(responseText)==1){
//				   autorizado = true;
//			   }else{
//				   false
//			   }
//		   }
//				   
//	   });
//	   return autorizado;
//   }
   
 //Autorizar tipo documento
   function autorizarDocumento(operacion, usuario, clave){
	   var respuesta;
	   console.log('v1' + operacion + ' v2 ' + usuario + ' v3 ' + clave);
	   $.post('Privilegios',{operacion : operacion, usuario : usuario, pass : clave} ,function(responseText) {
		   if(responseText!=null){
			   console.log('Hay respuesta ' + responseText);
			   if(parseInt(responseText)==1){
				   $('#permiso').text(responseText);
				   console.log(responseText);
				   if(operacion == 7){
					   console.log('ejecutar cantidad');
				   }
//				   cargarDatosDoc(1, noDoc);
//				   $('#autorizar').modal('toggle');
			   }else if(parseInt(responseText)==0){
				   $('#permiso').text(responseText);
				   console.log(responseText);
				   if(operacion == 7){
					   console.log('regreso a celda de porcentaje');
				   }
//				   ('#notificacion').text(responseText);
			   }
		   }
	   });
   }
   function separarTexto(posicion, texto){
	   var cadena = texto;
	   var particiones = cadena.split(' ');
	    
	   return particiones[posicion];
   }
   function componerFecha(fecha){
	   var cadena = fecha;
	   var particiones = cadena.split('-');
	   var nuevaFecha;
	   cadena = particiones[2];
	   var particiones2 = cadena.split(' ');
	   nuevaFecha = particiones2[0] + '/' + particiones[1] + '/' + particiones[0];
	   return nuevaFecha;
   }
   function obtenerCodigo(codigo){
	   var codigoProducto = codigo;
	   return codigoProducto;
   }
   function cargarTiposPago(){

	   $('#contenedorPagos').empty();
	   $.post('CargaTiposPago', function(responseJson) {
			   if(responseJson!=null){
				   var contenedor = $("#contenedorPagos");
				   var tabla = $("<table id='tablaPagos' class='table table-striped table-bordered table-condensed'></table>");
			       var thead = $("<thead></thead>");
			       var tbody = $("<tbody></tbody>");
			       var encabezado = $("<tr> <th></th> <th></th> </tr>");
			       encabezado.children().eq(0).text("Codigo Pago");
			       encabezado.children().eq(1).text("Descripcion");
			       
			       encabezado.appendTo(thead);
			       tabla.appendTo(contenedor);
			       
			       thead.appendTo(tabla);
			       tbody.appendTo(tabla);
			       $.each(responseJson, function(key,value) {
			            var rowNew = $("<tr> <td><a href='#'></a></td> <td></td> </tr>");
			               rowNew.children().children().eq(0).text(value['codigo']);
			               rowNew.children().eq(1).text(value['descripcion']);
			               rowNew.appendTo($('table#tablaPagos tbody'));
			       });
			       $('#tablaPagos').dataTable( {
			    	   "scrollY" : 200,
			    	   "scrollX" : true,
				        "language": {
				            "url": "//cdn.datatables.net/plug-ins/1.10.7/i18n/Spanish.json"   	
				        }
			       	
				    });
			       }
			   });
   }
   function cargarProductosFiltro(seleccion, texto, codigoPago){
	   $('#contenedorProductos').empty();
	   $.post('FiltrosProducto',{seleccion : seleccion, criterio : texto, codigoPago : codigoPago}, function(responseJson){
		   if(responseJson!=null){
			   var contenedor = $("#contenedorProductos");
			   var tabla = $("<table id='tablaProductos' class='table table-striped table-bordered table-condensed table-hover'></table>");
		       var thead = $("<thead></thead>");
		       var tbody = $("<tbody></tbody>");
		       var encabezado = $("<tr> <th></th> <th></th> <th></th> <th></th> <th></th> <th></th> <th></th>  <th></th> <th></th> <th></th> <th></th> </tr>");
		       encabezado.children().eq(0).text("Codigo");
		       encabezado.children().eq(1).text("Disp.");
		       encabezado.children().eq(2).text("Bod.");
		       encabezado.children().eq(3).text("Precio");
		       encabezado.children().eq(4).text("Marca");
		       encabezado.children().eq(5).text("Descripcion");
		       encabezado.children().eq(6).text("B. O.");
		       encabezado.children().eq(7).text('Fecha Esp.');
		       encabezado.children().eq(8).text('Tr&aacute;nsito');
		       encabezado.children().eq(9).text("Familia");
		       encabezado.children().eq(10).text("Referencia");
		       encabezado.appendTo(thead);
		       tabla.appendTo(contenedor);
		       thead.appendTo(tabla);
		       tbody.appendTo(tabla);
		       $.each(responseJson, function(key,value) {
		            var rowNew = $("<tr> <td class='buscaProdCod'></td> <td class='buscaProdDisponible text-center'></td> <td class='buscaProdBodega text-center'></td> <td class='buscaProdPrecio text-center'></td> <td class='buscaProdMarca'></td> <td class='buscaProdDescripcion'></td> <td class='buscaProdBack'></td> <td class='buscaProdFecha'></td> <td class='buscaProdTransito'></td> <td class='buscaProdFamilia'></td> <td class='buscaProdReferencia'></td> </tr>");
		               rowNew.find('.buscaProdCod').text($.trim(value['codigoProducto']));
		               rowNew.find('.buscaProdDescripcion').text(value['descripcionProducto']);
		               rowNew.find('.buscaProdMarca').text(value['marcaProducto']);
		               rowNew.find('.buscaProdPrecio').text(value['precioProducto']);
		               rowNew.find('.buscaProdDisponible').text(parseInt(value['disponible']));
		               rowNew.find('.buscaProdBodega').text(value['bodegaProducto']);
		               rowNew.find('.buscaProdBack').text(parseInt(value['backOrder']));
//		               if(typeof value['fechaespera'] == 'undefined'){
//		            	   rowNew.children().eq(7).text('N/A');
//		               }else{
		            	   rowNew.find('.buscaProdFecha').text(value['fechaespera']);
//		               }
		               rowNew.find('.buscaProdTransito').text(value['transito']);
		               rowNew.find('.buscaProdFamilia').text(value['familiaProducto']);
		               rowNew.find('.buscaProdReferencia').text(value['referenciaProducto']);
		               rowNew.appendTo($('table#tablaProductos tbody'));
		       });
		       $("#tablaProductos").dataTable( {
		    	   "columnDefs": [
									{ "width": "100px", "targets": 0 },
									{ "width": "25px", "targets": 1 },
									{ "width": "25px", "targets": 2 },
									{ "width": "25px", "targets": 3 },
									{ "width": "100px", "targets": 4 },
									{ "width": "400px", "targets": 5 },
									{ "width": "100px", "targets": 6 },
									{ "width": "100px", "targets": 7 },
									{ "width": "100px", "targets": 8 },
									{ "width": "100px", "targets": 9 },
									{ "width": "100px", "targets": 10 }
			                     ],
		    	   "scrollY" : 200,
		    	   "scrollX" : true,
			        "language": {
			            "url": "//cdn.datatables.net/plug-ins/1.10.7/i18n/Spanish.json"   	
			        }
			        
			    });
		       }
	   });
   }
   
   function cargarProductosFiltroBodegas(codigoLista, texto, codigoPago, codigoProducto){
	   $('#contenedorProductosBodegas').empty();
	   $.post('ProdOtrasBod',{codigoLista : codigoLista, criterio : texto, codigoPago : codigoPago, codigoProducto : codigoProducto}, function(responseJson){
		   
		   if(responseJson!=null){
			   var contenedor = $("#contenedorProductosBodegas");
			   var tabla = $("<table id='tablaProductosBodega' class='table table-striped table-bordered table-condensed table-hover'></table>");
		       var thead = $("<thead></thead>");
		       var tbody = $("<tbody></tbody>");
		       var encabezado = $("<tr style='background-color: #0088CC; color: #ffffff;'> <th></th> <th></th> <th></th> <th></th> <th></th> <th></th> <th></th> <th></th> </tr>");
		       encabezado.children().eq(0).text("Codigo");
		       encabezado.children().eq(1).text("Disp.");
		       encabezado.children().eq(2).text("Bod.");
		       encabezado.children().eq(3).text("Precio");
		       encabezado.children().eq(4).text("Marca");
		       encabezado.children().eq(5).text("Descripcion");
		       encabezado.children().eq(6).text("Familia");
		       encabezado.children().eq(7).text("Referencia");
		       encabezado.appendTo(thead);
		       tabla.appendTo(contenedor);
		       thead.appendTo(tabla);
		       tbody.appendTo(tabla);
		       $.each(responseJson, function(key,value) {
		            var rowNew = $("<tr> <td class='xBodegasProducto'></td> <td class='xBodegasDisponible text-center'></td> <td class='xBodegasBodega text-center'></td> <td class='xBodegasPrecio text-center'></td> <td class='xBodegasMarca'></td> <td class='xBodegasDescripcion'></td> <td class='xBodegasFamilia'></td> <td class='xBodegasReferencia'></td> </tr>");
		               rowNew.find('.xBodegasProducto').text($.trim(value['codigoProducto']));
		               rowNew.find('.xBodegasDescripcion').text(value['descripcionProducto']);
		               rowNew.find('.xBodegasMarca').text(value['marcaProducto']);
		               rowNew.find('.xBodegasPrecio').text(value['precioProducto']);
		               rowNew.find('.xBodegasDisponible').text(parseInt(value['disponible']));
		               rowNew.find('.xBodegasBodega').text(value['bodegaProducto']);
		               rowNew.find('.xBodegasFamilia').text(value['familiaProducto']);
		               rowNew.find('.xBodegasReferencia').text(value['referenciaProducto']);
		               rowNew.appendTo($('table#tablaProductosBodega tbody'));
		       });
		       $("#tablaProductosBodega").dataTable( {
		    	   "columnDefs": [

			                       { "width": "100px", "targets": 0 },
			                       { "width": "25px", "targets": 1 },
			                       { "width": "25px", "targets": 2 },
			                       { "width": "25px", "targets": 3 },
			                       { "width": "100px", "targets": 4 },
			                       { "width": "350px", "targets": 5 },
			                       { "width": "100px", "targets": 6 },
			                       { "width": "100px", "targets": 7 }
			                     ],
		    	   "scrollY" : 200,
		    	   "scrollX" : true,
			        "language": {
			            "url": "//cdn.datatables.net/plug-ins/1.10.7/i18n/Spanish.json"   	
			        }
			        
			    });
		       }
	   });
   }
    function cargarFiltroClientes(opcion, texto){
        $.post('FiltroClientes',{opcion : opcion, criterio : texto}, function(responseJson){
		   if(responseJson!=null){
			   var contenedor = $("#contenedorClientes");
			   var tabla = $("<table id='tablaClientes' class='table table-striped table-bordered table-condensed table-hover'></table>");
		       var thead = $("<thead></thead>");
		       var tbody = $("<tbody></tbody>");
		       var encabezado = $("<tr> <th></th> <th></th> <th></th> </tr>");
		       encabezado.children().eq(0).text("Nit");
		       encabezado.children().eq(1).text("Nombre");
		       encabezado.children().eq(2).text("Tarjeta");
		       encabezado.appendTo(thead);
		       tabla.appendTo(contenedor);
		       thead.appendTo(tabla);
		       tbody.appendTo(tabla);
		       $.each(responseJson, function(key,value) {
		            var rowNew = $("<tr> <td><a href='#'></a></td> <td></td> <td></td> </tr>");
		               rowNew.children().children().eq(0).text(value['nit']);
		               rowNew.children().eq(1).text(value['nombre']);
		               rowNew.children().eq(2).text(value['tarjeta']);
		               rowNew.appendTo($('table#tablaClientes tbody'));
		       });
		       $("#tablaClientes").dataTable( {
		    	   "scrollY" : 200,
		    	   "scrollX" : true,
			        "language": {
			            "url": "//cdn.datatables.net/plug-ins/1.10.7/i18n/Spanish.json"   	
			        }
			        
			    });
		       }
	   });
    }
    function cargarCotizacionesSucursal(criterio, opcion){
        $.post('CargarCotizaciones',{criterio : criterio, opcion : opcion}, function(responseJson){
            
		   if(responseJson!=null){
			   var contenedor = $("#contenedorCotizaciones");
			   var tabla = $("<table id='tablaCotizaciones' class='table table-striped table-bordered table-condensed table-hover'></table>");
		       var thead = $("<thead></thead>");
		       var tbody = $("<tbody></tbody>");
		       var encabezado = $("<tr> <th></th> <th></th> <th></th> <th></th> <th></th> <th></th> <th></th> </tr>");
		       encabezado.children().eq(0).text("No. Cotizacion");
		       encabezado.children().eq(1).text("Nombre");
		       encabezado.children().eq(2).text("Nit");
		       encabezado.children().eq(3).text("Fecha");
               encabezado.children().eq(4).text("Monto");
               encabezado.children().eq(5).text("Autorizacion");
               encabezado.children().eq(6).text("FAutorizo");
               
		       encabezado.appendTo(thead);
		       tabla.appendTo(contenedor);
		       thead.appendTo(tabla);
		       tbody.appendTo(tabla);
		       $.each(responseJson, function(key,value) {
		            var rowNew = $("<tr> <td><a href='#'></a></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> </tr>");
		               rowNew.children().children().eq(0).text(value['noCotizacion']);
		               rowNew.children().eq(1).text(value['nombre']);
		               rowNew.children().eq(2).text(value['nit']);
		               if(typeof value['fecha'] == 'undefined'){
		            	   rowNew.children().eq(3).text('N/A');
		               }else{
		            	   rowNew.children().eq(3).text(separarTexto(0, value['fecha']));
		               }
		               
		               rowNew.children().eq(4).text(value['monto']);
		               rowNew.children().eq(5).text(value['autorizacion']);
		               rowNew.children().eq(6).text(value['fAutorizacion']);
		               if(typeof value['fAutorizacion'] == 'undefined'){
		            	   rowNew.children().eq(6).text('N/A');
		               }else{
		            	   rowNew.children().eq(3).text(separarTexto(0, value['fAutorizacion']));
		               }
		               rowNew.appendTo($('table#tablaCotizaciones tbody'));
		       });
		       $("#tablaCotizaciones").dataTable( {
		    	   "scrollY" : 200,
		    	   "scrollX" : true,
			        "language": {
			            "url": "//cdn.datatables.net/plug-ins/1.10.7/i18n/Spanish.json"   	
			        }
			        
			    });
		       }
	   });
    }
    function cargarKitsProducto(lista, medida, codigoPago, codigoProducto, bodega, serie, numero){
        $.post('CargarKits',{lista : lista, medida : medida, pago : codigoPago, codigoProducto: codigoProducto, bodega: bodega, serie : serie, numero : numero}, function(responseJson){
            
		   if(responseJson!=null){
			   var contenedor = $("#contenedorKits");
			   var tabla = $("<table id='tablaKits' class='table table-striped table-bordered table-hover'></table>");
		       var thead = $("<thead></thead>");
		       var tbody = $("<tbody></tbody>");
		       var encabezado = $("<tr> <th></th> <th></th> <th></th> <th></th> <th></th> <th></th> <th></th> <th></th> <th></th> <th></th> <th></th> </tr>");
		       encabezado.children().eq(0).text("Producto");
		       encabezado.children().eq(1).text("Cod. Kit");
		       encabezado.children().eq(2).text("Descripcion");
		       encabezado.children().eq(3).text("Cod. U");
               encabezado.children().eq(4).text("Medida");
               encabezado.children().eq(5).text("Cantidad");
               encabezado.children().eq(6).text("Precio");
               encabezado.children().eq(7).text("Por Desc.");
               encabezado.children().eq(8).text("Desc.");
               encabezado.children().eq(9).text("Frac.");
               encabezado.children().eq(10).text("Disponible");
		       encabezado.appendTo(thead);
		       tabla.appendTo(contenedor);
		       thead.appendTo(tabla);
		       tbody.appendTo(tabla);
		       $.each(responseJson, function(key,value) {
		            var rowNew = $("<tr> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> </tr>");
		               rowNew.children().eq(0).text(value['codigoProducto']);
		               rowNew.children().eq(1).text(value['codigoDetKit']);
		               rowNew.children().eq(2).text(value['descripcion']);
		               rowNew.children().eq(3).text(value['unidad']);
		               rowNew.children().eq(4).text(value['medida']);
		               rowNew.children().eq(5).text(value['cantidad']);
		               rowNew.children().eq(6).text(value['precio']);
		               rowNew.children().eq(7).text(value['porDesc']);
		               rowNew.children().eq(8).text(value['descuento']);
		               rowNew.children().eq(9).text(value['frac']);
		               rowNew.children().eq(10).text(value['disponible']);
		               rowNew.appendTo($('table#tablaKits tbody'));
		               $('#tituloModalKit').text('Detalle de componentes producto: ' + value['codigoProducto']);
		       });
		       $("#tablaKits").dataTable( {
		    	   "scrollY" : 200,
		    	   "scrollX" : true,
			        "language": {
			            "url": "//cdn.datatables.net/plug-ins/1.10.7/i18n/Spanish.json"   	
			        }
			        
			    });
		       }
	   });
    }
    function cargarValorCelda(indiceFila, idCelda){
    	var valor;
    	var simbolo = '#';
    	var concatenada = simbolo.concat(idCelda);
    	alert(concatenada);
    	valor = $('#datosVarios > tbody > tr').eq(indiceFila).find(concatenada).children().val();
    	alert(valor);
    	return valor;
    }
    function revisarCantidadMismoProducto(codigoProducto, cantidad, indiceActual){
    	$('#datosVarios tbody tr').each(function (index){
    		if($('#datosVarios > tbody > tr').eq(index).find('.codigoProducto').text() == codigoProducto && index!=0 && index != indiceActual){
    			console.log('Encontro el producto en linea: ' + index);
    		}
    		
    		
		});
    }
    function agregarFila(){
    	var filaNueva = $(
	   			'<tr>' +
	   				'<td class="verInfoProd"><span class="glyphicon glyphicon-minus text-danger borrar" aria-hidden="true">    </span><span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span></td>'+
            		'<td class="codigoProducto"></td>'+
            		'<td class="medida"></td>'+
            		'<td class="descripcion"><div class="contenDescrip"></div></td>'+
            		'<td class="cantidad"></td>'+
            		'<td class="disponible"></td>'+
            		'<td class="precio"></td>'+
            		'<td class="porcentaje"></td>'+
	   				'<td class="descuento" ></td>'+
            		'<td class="importe"></td>'+
            		'<td class="bodega"></td>'+
            		'<td class="envio"><input type="checkbox"></td>'+
            		'<td class="dm" ></td>'+
            		'<td class="obser"></td>'+
            		'<td class="kit"></td>'+
        		'</tr>'
	   	 );
    	
    	//agregando la fila y ocultando la celda de kit.
	   	 filaNueva.prependTo(('#datosVarios > tbody'));
	   	 $('.kit').hide();
    }
    function encontrarImagen(indice){
    	console.log('Indice de Fila' + indice)
    	if($('#datosVarios > tbody > tr').eq(indice).find('.codigoProducto').text() == ''){
    		alert('Debe ingresar un producto antes de poder ver su imagen o pdf');
    	}else{
    		console.log('CodigoProducto: ' + $('#datosVarios > tbody > tr').eq(indice).find('.codigoProducto').text());
    		$.post('BuscarImagen',{
    			
    			codigoProducto : $('#datosVarios > tbody > tr').eq(indice).find('.codigoProducto').text()
			   } ,function(responseText) {
				   if(responseText!=null){
					   if(responseText==''){
						   var imagen = document.getElementById('imgProducto');
				     	   imagen.src = 'imagenes/noImage.png';
				     	   $('#infoProducto').modal('toggle');
						   console.log('No existe imagen.');
					   }else{
						   var imagen = document.getElementById('imgProducto');
						   console.log($.trim(responseText));
						   var ruta = 'imagenes/';
				     	   imagen.src = ruta.concat($.trim(responseText));
				     	   $('#infoProducto').modal('toggle');
					   }
					   
				   }   
			   });
    		
    	}
    }
    function ejecutarPorcentaje(porcentaje, indice){
    	if(porcentaje > 100 ){
            alert('El porcentaje de descuento no puede ser mayor a 100 ');
        }else if(porcentaje > $('#datosVarios > tbody > tr').eq(indice).find('.dm').text()){
            $('#autorizar').modal('toggle');
            $('#permisosUsuario').val('');
            $('#permisosClave').val('');
            $('#opcionPermisos').text('6');
            $('#permisosUsuario').focus();
            
        }
    }
    function hacerCamposEditables(){
    	$('.codigoProducto').editable(function(value, settings) {
		     return(value);
		  }, {
		     onblur  : 'cancel',
		     event   : 'click',
		     style   : 'inherit',
		     callback : function(value, settings) {
		    	 traerProducto(value, separarTexto(0, $('#fPago').val()), $('#codigoLista').text() ,$('#indice').text());
		    	 
		     }
		  });
    	$('.cantidad').editable(function(value, settings) {
		     return(value);
		  }, {
		     onblur  : 'cancel',
		     event   : 'click',
		     style   : 'inherit',
		     callback : function(value, settings) {
		    	 
		    	 ejecutarCantidad(value, $('#indice').text());
		     }
		  });
  	$('.porcentaje').editable(function(value, settings) {
		     return(value);
		  }, {
		     onblur  : 'cancel',
		     event   : 'click',
		     style   : 'inherit',
		     callback : function(value, settings) {
		    	 ejecutarPorcentaje(value, $('#indice').text());
		     }
		  });
    }
    
  }(window.jQuery, window, document));