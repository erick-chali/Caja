<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html lang="es">
<head>
<meta name="viewport" content="width=device-width, initial-scale=1" charset="utf-8" lang="es">
<title>Login</title>
<link rel="stylesheet" href="css/bootstrap.css">
<link rel="stylesheet" href="css/animate.css">
<link rel="stylesheet" href="css/estilosCaja.css">
</head>
<body style="background-color: #eee;">

	<img alt="Instalaciones Modernas" src="img/logo.jpg" id="logo" class="center-block">
	<div class="container">

      <form class="form-signin">
        <h2 class="form-signin-heading text-center">Inicio de sesi&oacute;n</h2>
        <label for="inputEmail" class="sr-only">Usuario</label>
        <input type="text" id="usuario" class="form-control" placeholder="Email address" required autofocus>
        <label for="inputPassword" class="sr-only">Contrase&ntilde;</label>
        <input type="password" id="clave" class="form-control" placeholder="Password" required>
        
        <button class="btn btn-lg btn-primary btn-block" type="button" id="btnLogin">Iniciar Sesi&oacute;n</button>
      </form>

    </div> <!-- /container -->
    <script type="text/javascript" src="js/jquery-2.1.4.min.js"></script>
    <script type="text/javascript" src="js/bootstrap-notify.min.js"></script>
    <script type="text/javascript" src="js/scriptLogin.js"></script>
</body>
</html>