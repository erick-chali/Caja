<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html >
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1, no-cache">
<title>Caja</title>
		<link type="text/css" rel="stylesheet" href="css/bootstrap.min.css">
		<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/bootstrap-table/1.8.1/bootstrap-table.min.css">
        <link type="text/css" rel="stylesheet" href="//cdn.datatables.net/plug-ins/1.10.7/integration/bootstrap/3/dataTables.bootstrap.css">
        <link href="//cdnjs.cloudflare.com/ajax/libs/x-editable/1.5.0/bootstrap3-editable/css/bootstrap-editable.css" rel="stylesheet"/>
        <link type="text/css" rel="stylesheet" href="css/pushy.css">
        <link type="text/css" rel="stylesheet" href="css/BeatPicker.min.css">
        <link type="text/css" rel="stylesheet" href="css/style.css">
</head>
<body>
	<nav class="pushy pushy-left">
		<ul>
        	<li><a>Caja</a></li>
			<li><a href="Logout">Cerrar Sesi&oacute;n</a></li>
		</ul>
	</nav>
        <div class="site-overlay"></div>
    <div id="container">
    	<div class="row">
    		<div class="col-sm-12 col-md-12 col-lg-12">
    			<button type="button" id="barra" class="btn btn-primary btn-sm menu-btn" style="margin-top: 2px;">
					<span id="superiorDown" class="glyphicon glyphicon-menu-hamburger" aria-hidden="true"></span>
				</button>
				<button type="button" id="ocultar" class="btn btn-primary btn-sm" style="margin-top: 2px;">
					<span class="glyphicon glyphicon-menu-hamburger" aria-hidden="true"></span>
				</button>
				<button type="button" id="pagoFactura" class="btn btn-success btn-sm" style="margin-top: 2px;">
					<span class="glyphicon glyphicon-piggy-bank" aria-hidden="true"></span>
				</button>
    		</div>
    	</div>
    	<div class="row" style="margin-top: 5px;">
    		<div class="col-sm-4 col-md-4 col-lg-4 vistaPrevia">
		    	<div class="panel panel-default"> 
		    		<div class="panel-body">
		    			<div class="table-responsive previasFacturas">
							
						</div>
		    		</div>
		    	</div>
		    </div>
		    <div class="col-sm-8 col-md-8 col-lg-8 vistaDetalle">
		    	<div class="panel panel-default">
		    		<div class="panel-body" style="height: 600px;">
		    			<div class="row">
		    				<div class="col-sm-1 col-md-1 col-lg-1">
		    					<h5>Serie</h5>
		    				</div>
		    				<div class="col-sm-3 col-md-3 col-lg-3">
		    					<input type="text" id="detalleSerie" class="form-control input-sm" disabled>
		    				</div>
		    				<div class="col-sm-1 col-md-1 col-lg-1">
		    					<h5>N&uacute;mero</h5>
		    				</div>
		    				<div class="col-sm-3 col-md-3 col-lg-3">
		    					<input type="text" id="detalleNumero" class="form-control input-sm" disabled>
		    				</div>
		    				<div class="col-sm-1 col-md-1 col-lg-1">
		    					<h5>Fecha</h5>
		    				</div>
		    				<div class="col-sm-3 col-md-3 col-lg-3">
		    					<input type="text" id="detalleFecha" class="form-control input-sm" disabled>
		    				</div>
		    			</div>
		    			<div class="row">
		    				<div class="col-sm-1 col-md-1 col-lg-1">
		    					<h5>Nit</h5>
		    				</div>
		    				<div class="col-sm-3 col-md-3 col-lg-3">
		    					<input type="text" id="detalleNit" class="form-control input-sm" disabled>
		    				</div>
		    				<div class="col-sm-1 col-md-1 col-lg-1">
		    					<h5>Cliente</h5>
		    				</div>
		    				<div class="col-sm-3 col-md-3 col-lg-3">
		    					<input type="text" id="detalleCliente" class="form-control input-sm" disabled>
		    				</div>
		    				<div class="col-sm-1 col-md-1 col-lg-1">
		    					<h5>T/Pago</h5>
		    				</div>
		    				<div class="col-sm-3 col-md-3 col-lg-3">
		    					<input type="text" id="detallePago" class="form-control input-sm" disabled>
		    				</div>
		    			</div>
		    			<div class="row">
		    				<div class="col-sm-1 col-md-1 col-lg-1">
		    					<h5>Monto</h5>
		    				</div>
		    				<div class="col-sm-3 col-md-3 col-lg-3">
		    					<input type="text" id="detalleMonto" class="form-control input-sm" disabled>
		    				</div>
		    				<div class="col-sm-1 col-md-1 col-lg-1">
		    					<h5>Observ.</h5>
		    				</div>
		    				<div class="col-sm-3 col-md-3 col-lg-3">
		    					<input type="text" id="detalleObservaciones" class="form-control input-sm" disabled>
		    				</div>
		    			</div>
		    			<div class="facturasDetalladas">
							
						</div>
		    		</div>
		    	</div>
		    </div>
	    </div>
    	
    </div>
   	<div class="modal fade" id="ingresarPago" role="dialog">
	    <div class="modal-dialog modal-lg">
	      <div class="modal-content">
	        <div class="modal-header">
	          <button type="button" class="close btn-lg" data-dismiss="modal" style="color: red;">&times;</button>
	          <h4 class="modal-title">Pago de Factura</h4>
	        </div>
	        <div class="modal-body">
	        	<div class="row">
	        		<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
	        			<h5 id="sucursal">08 Metro Norte</h5>
	        		</div>
	        		<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
	        			<h5 id="caja">Caja: Metro Norte</h5>
	        		</div>
	        		<div class=" col-xs-4 col-sm-4 col-md-4 col-lg-4">
	        			<h5 id="usuario">Usuario: admin</h5>
	        		</div>
	        	</div>
	        	<div class="row">
	        		<div class="col-xs-1 col-sm-1 col-md-1 col-lg-1">
	        			<h5 style="font-weight: bold;">Nit:</h5>
	        		</div>
	        		<div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
	        			<h5 id="pagoNit"></h5>
	        		</div>
	        		<div class="col-xs-1 col-sm-1 col-md-1 col-lg-1">
	        			<h5 style="font-weight: bold;">Nombre:</h5>
	        		</div>
	        		<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
	        			<h5 id="pagoNombre"></h5>
	        		</div>
	        	</div>
	        	<div class="row">
	        	<div class="col-xs-1 col-sm-1 col-md-1 col-lg-1">
	        			<h5 style="font-weight: bold;">Serie:</h5>
	        		</div>
	        		<div class="col-xs-1 col-sm-1 col-md-1 col-lg-1">
	        			<h5 id="pagoSerie"></h5>
	        		</div>
	        		<div class="col-xs-1 col-sm-1 col-md-1 col-lg-1">
	        			<h5 style="font-weight: bold;">No.:</h5>
	        		</div>
	        		<div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
	        			<h5 id="pagoNumero"></h5>
	        		</div>
	        		<div class="col-xs-1 col-sm-1 col-md-1 col-lg-1">
	        			<h5 style="font-weight: bold;">Fecha:</h5>
	        		</div>
	        		<div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
	        			<h5 id="pagoFecha"></h5>
	        		</div>
	        		<div class="col-xs-1 col-sm-1 col-md-1 col-lg-1">
	        			<h5 style="font-weight: bold;">T/Pago:</h5>
	        		</div>
	        		<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
	        			<h5 id="pagoTipo"></h5>
	        		</div>
	        	</div>
	        	<div class="row">
	        		<div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
	        			<h5 style="font-weight: bold;">Observaciones:</h5>
	        		</div>
	        		<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
	        			<h5 id="pagoObservaciones"></h5>
	        		</div>
	        		<div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
	        			<button type="button" id="pagarFactura" class="btn btn-success btn-sm" style="width: 100%;">
							<span class="glyphicon glyphicon-usd" aria-hidden="true"></span> Pagar
						</button>
	        		</div>
	        	</div>
	        	<div class="row">
	        		<div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
	        			<button type="button" id="pagarEfectivo" class="btn btn-primary btn-sm" style="width: 100%;">
							Efectivo
						</button>
	        		</div>
	        		<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
	        			<input type="text" id="montoEfectivo" class="form-control input-sm">
	        		</div>
	        		<div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
	        			<h5>Monto: </h5>
	        		</div>
	        		<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
	        			<h5 id="montoTotal"></h5>
	        		</div>
	        	</div>
	        	<div class="row">
	        		<div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
	        			<button type="button" id="pagarCheque" class="btn btn-primary btn-sm" style="width: 100%;">
							Cheque
						</button>
	        		</div>
	        		<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
	        			<input type="text" id="montoCheque" class="form-control input-sm">
	        		</div>
	        		<div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
	        			<h5>Pagado: </h5>
	        		</div>
	        		<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
	        			<h5 id="montoPagado"></h5>
	        		</div>
	        	</div>
	        	<div class="row">
	        		<div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
	        			<button type="button" id="pagarTarjeta" class="btn btn-primary btn-sm" style="width: 100%;">
							Tarjeta
						</button>
	        		</div>
	        		<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
	        			<input type="text" id="montoCheque" class="form-control input-sm">
	        		</div>
	        		
	        		<div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
	        		<hr>
	        				<h5>Cambio: </h5>
	        		</div>
	        		<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
	        		<hr>
	        			<h5 id="cambio"></h5>
	        		</div>
	        	</div>
	        	<div class="row">
	        		<div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
	        			<button type="button" id="pagarOtras" class="btn btn-primary btn-sm" style="width: 100%;">
							Otras Formas
						</button>
	        		</div>
	        		<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
	        			<input type="text" id="montoOtras" class="form-control input-sm">
	        		</div>
	        		
	        	</div>
	        </div>
	        <div class="modal-footer">
	          
	        </div>
	      </div>
	    </div>
  	</div>
<script type="text/javascript" src="js/jquery-2.1.4.min.js"></script>
<script src="js/bootstrap.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/bootstrap-table/1.8.1/bootstrap-table.min.js"></script>
<script type="text/javascript" src="js/jquery-ui.min.js"></script>
<script src="js/jeditable.min.js"></script>
<script src="js/maskedinput.min.js"></script>
<script src="js/BeatPicker.min.js"></script>
<script src="js/jquery.freezeheader.js"></script>
<script src="js/pushy.min.js"></script>
<script src="js/script.js"></script>
<script src="//cdn.datatables.net/1.10.7/js/jquery.dataTables.min.js"></script>
<script src="//cdn.datatables.net/plug-ins/1.10.7/integration/bootstrap/3/dataTables.bootstrap.js"></script>
</body>
</html>