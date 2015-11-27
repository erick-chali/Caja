<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html >
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1" charset="utf-8">
<title>Caja</title>
<link rel="stylesheet" href="css/bootstrap.css">
<!--<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap-theme.min.css"> -->
<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/bootstrap-table/1.9.1/bootstrap-table.min.css">
<link href="//cdnjs.cloudflare.com/ajax/libs/x-editable/1.5.0/bootstrap3-editable/css/bootstrap-editable.css" rel="stylesheet"/>
<link rel="stylesheet" href="css/animate.css">
<link rel="stylesheet" href="css/estilosCaja.css">
</head>
<body>
<h5 class="text-center" id="sucursal"><strong>Sucursal: ${codigoSucursal} ${sucursal} - Caja: </strong></h5>
<div class="container-fluid">
	<div class="row">
		<div class="col-md-12">
			<div class="btn-group btn-group-lg" role="group" aria-label="...">
				<button type="button" class="btn btn-primary " id="btnMenu" title="Menu de opciones">MENU</button>
				<button type="button" class="btn btn-primary " id="btnSolicitarPago" title="Pagar Documento Seleccionado">PAGAR</button>
				<button type="button" class="btn btn-primary visible-xs" id="btnToggleXS" title="Ocultar Encabezados Facturas">
					<span class="glyphicon glyphicon-arrow-up" aria-hidden="true" id="iconoEncabezadosXS"></span>
				</button>
				<button type="button" class="btn btn-primary hidden-xs" id="btnToggle" title="Ocultar Encabezados Facturas">
					<span class="glyphicon glyphicon-resize-full" aria-hidden="true" id="iconoEncabezados"></span>
				</button>
				<button type="button" class="btn btn-primary " id="btnCerrarSesion" title="Cerrar Sesi&oacute;n">
					<span class="glyphicon glyphicon-off" aria-hidden="true"></span>
				</button>
			</div>
		</div>
	</div>
</div>
<div class="container-fluid" id="datosAPagar">
	<div class="row" >
		<div class="col-sm-1 col-md-1 col-lg-1 hidden-xs">
			<h5 class="text-danger"><strong>NIT: </strong></h5>
		</div>
		<div class="col-xs-6 col-sm-3 col-md-3 col-lg-3">
			<h5 class="visible-xs text-danger">NIT: </h5><h5 id="nit"></h5>
		</div>
		
		<div class="col-sm-1 col-md-1 col-lg-1 hidden-xs">
			<h5 class="text-danger"><strong>Nombre: </strong></h5>
		</div>
		<div class="col-xs-6 col-sm-3 col-md-3 col-lg-3">
			<h5 class="visible-xs text-danger">Nombre: </h5><h5 id="nombre"></h5>
		</div>
		
		<div class="col-sm-1 col-md-1 col-lg-1 hidden-xs">
			<h5 class="text-danger"><strong>Fecha: </strong></h5>
		</div>
		<div class="col-xs-6 col-sm-3 col-md-3 col-lg-3">
			<h5 class="visible-xs text-danger">Fecha: </h5><h5 id="fecha"></h5>
		</div>
		
		<div class="col-sm-1 col-md-1 col-lg-1 hidden-xs">
			<h5 class="text-danger"><strong>Tipo Pago: </strong></h5>
		</div>
		<div class="col-xs-6 col-sm-3 col-md-3 col-lg-3">
			<h5 class="visible-xs text-danger">T/Pago: </h5><h5 id="tipoPago"></h5> <h5 id="codigoPago" hidden="true"></h5>
		</div>
		
		<div class="col-sm-1 col-md-1 col-lg-1 hidden-xs">
			<h5 class="text-danger"><strong>Serie: </strong></h5>
		</div>
		<div class="col-xs-6 col-sm-3 col-md-3 col-lg-3">
			<h5 class="visible-xs text-danger">Serie: </h5><h5 id="serie"></h5>
		</div>
		
		<div class="col-sm-1 col-md-1 col-lg-1 hidden-xs">
			<h5 class="text-danger"><strong>N&uacute;mero: </strong></h5>
		</div>
		<div class="col-xs-6 col-sm-3 col-md-3 col-lg-3">
			<h5 class="visible-xs text-danger">N&uacute;mero: </h5><h5 id="numeroFactura"></h5>
		</div>
		
		
	</div>
	<div class="row">
		<div class="col-sm-1 col-md-1 col-lg-1 hidden-xs">
			<h5 class="text-danger"><strong>Observaciones: </strong></h5>
		</div>
		<div class="col-xs-12 col-sm-11 col-md-11 col-lg-11">
			<h5 class="visible-xs text-danger">Observaciones: </h5><h5 id="observaciones"></h5>
		</div>
	</div>
	<h5 id="montoPagar" hidden="true"></h5>
	<div class="row" id="pagoEfectivo">
		<div class="col-sm-1 col-md-1 col-lg-1 hidden-xs">
			<h5><strong>Pago: </strong></h5>
		</div>
		<div class="col-xs-6 col-sm-2 col-md-2 col-lg-2">
			
			<div class="input-group">
		      <div class="input-group-addon">Q</div>
		      <input type="number" class="form-control input-sm" placeholder="Pago" id="pago">
	    	</div>
		</div>
		<div class="col-sm-1 col-md-1 col-lg-1 hidden-xs">
			<h5><strong>Monto: </strong></h5>
		</div>
		<div class="col-xs-6 col-sm-2 col-md-2 col-lg-2">
			<div class="input-group">
		      <div class="input-group-addon">Q</div>
		      <input type="number" class="form-control input-sm" placeholder="Monto a Pagar" id="montoAPagar" disabled>
	    	</div>
		</div>
		<div class="col-sm-1 col-md-1 col-lg-1 hidden-xs">
			<h5><strong>Vuelto: </strong></h5>
		</div>
		<div class="col-xs-6 col-sm-2 col-md-2 col-lg-2">
			
			<div class="input-group">
		      <div class="input-group-addon">Q</div>
		      <input type="number" class="form-control input-sm" placeholder="Vuelto" id="vuelto" disabled>
	    	</div>
		</div>
		<div class="col-xs-6 col-sm-3 col-md-3 col-lg-3">
			<button type="button" class="btn btn-sm btn-success form-control" id="btnPagarEfectivo">Pagar 
				<span class="glyphicon glyphicon-usd" aria-hidden="true"></span>
			</button>
		</div>
	</div>
</div>
<div class="container-fluid">
	<div class="row" id="ambasTablas">
		<div class="col-xs-12 col-sm-6 col-md-4 col-lg-4" id="encabezados">
			<h6 class="visible-xs">ENCABEZADOS FACTURAS</h6>
			<div class="table-responsive">
				<table id="tablaEncabezadosFacturas">
				</table>
			</div>
		</div>
		<div class="col-xs-12 col-sm-6 col-md-8 col-lg-8" id="detalles">
			<h6 class="visible-xs">DETALLE FACTURA</h6>
			<div class="table-responsive">
				<table id="tablaDetallesFacturas">
				</table>
				<h4 class="text-right" id="montoTotalFactura"></h4>
			</div>
		</div>
	</div>
</div>
<h4 class="text-center">${vendedor}</h4>
<script src="js/jquery-2.1.4.min.js"></script>
<script src="js/bootstrap.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/bootstrap-table/1.9.1/bootstrap-table.min.js"></script>
<script src="js/bootstrap-table-es-MX.js"></script>
<script src="js/bootstrap-table-editable.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/x-editable/1.5.0/bootstrap3-editable/js/bootstrap-editable.min.js"></script>
<script src="js/pushy.js"></script>
<script src="js/jquery.creditCardValidator.js"></script>
<script src="js/bootstrap-notify.min.js"></script>
<script src="js/scriptCaja.js"></script>
</body>
</html>