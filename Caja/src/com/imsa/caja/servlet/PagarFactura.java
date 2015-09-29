package com.imsa.caja.servlet;

import java.io.IOException;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import com.imsa.caja.conexion.ConectarDB;

/**
 * Servlet implementation class PagarFactura
 */
@WebServlet("/PagarFactura")
public class PagarFactura extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public PagarFactura() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doPost(request, response);
		
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		/**
		 * PAGOS:
		 * 1 = EFECTIVO
		 * 2 = CHEQUE
		 * 3 = TARJETA
		 * **/
		request.getSession().setAttribute("datosPago", request.getParameter("datosPago"));
		request.getSession().setAttribute("tipoPago", request.getParameter("tipoPago"));
		if(Integer.parseInt((String)request.getSession().getAttribute("tipoPago"))==1){
			/**REALIZA PAGO EN EFECTIVO**/
			Connection con = null;
			CallableStatement stmt = null;
			ResultSet rs = null;
			JsonParser parser = new JsonParser();
			JsonElement arreglo = parser.parse((String) request.getSession().getAttribute("datosPago"));
			try{
				con = new ConectarDB().getConnection();
				stmt = con.prepareCall("{call stp_I_clscj_pago_efectivoFImp(?,?,?,?,?,?,?,?,?,?,?,?)}");
				stmt.registerOutParameter(1, java.sql.Types.VARCHAR);
				stmt.setInt(2, arreglo.getAsJsonArray().get(0).getAsJsonObject().get("codigoSucursal").getAsInt());
				stmt.setString(3, arreglo.getAsJsonArray().get(0).getAsJsonObject().get("codigoCaja").getAsString());
				stmt.setString(4, arreglo.getAsJsonArray().get(0).getAsJsonObject().get("serie").getAsString());
				stmt.setInt(5, arreglo.getAsJsonArray().get(0).getAsJsonObject().get("numero").getAsInt());
				stmt.setBigDecimal(6, arreglo.getAsJsonArray().get(0).getAsJsonObject().get("pago").getAsBigDecimal());
				stmt.setBigDecimal(7, arreglo.getAsJsonArray().get(0).getAsJsonObject().get("montoRecibido").getAsBigDecimal());
				stmt.setBigDecimal(8, arreglo.getAsJsonArray().get(0).getAsJsonObject().get("cambio").getAsBigDecimal());
				Date fecha = new Date();
				Timestamp estampa = new Timestamp(fecha.getTime());
				stmt.setTimestamp(9, estampa);
				stmt.setInt(10, arreglo.getAsJsonArray().get(0).getAsJsonObject().get("correlativoCierre").getAsInt());
				stmt.setInt(11, arreglo.getAsJsonArray().get(0).getAsJsonObject().get("idCaja").getAsInt());
				stmt.setInt(12, arreglo.getAsJsonArray().get(0).getAsJsonObject().get("userID").getAsInt());
				rs = stmt.executeQuery();
				while(rs.next()){
					System.out.println("Hecho!!");
				}
				con.close();
				stmt.close();
				rs.close();
				
				con = new ConectarDB().getConnection();
				stmt = con.prepareCall("{call Stp_udcj_PagoFactura(?,?,?)}");
				stmt.setString(1, arreglo.getAsJsonArray().get(0).getAsJsonObject().get("serie").getAsString());
				stmt.setInt(2, arreglo.getAsJsonArray().get(0).getAsJsonObject().get("numero").getAsInt());
				stmt.setInt(3, arreglo.getAsJsonArray().get(0).getAsJsonObject().get("codigoSucursal").getAsInt());
				rs = stmt.executeQuery();
				
				while(rs.next()){
					response.setContentType("text/html");
					response.getWriter().write("Factura Pagada");
				}
				con.close();
				stmt.close();
				rs.close();
			}catch(SQLException e){
				System.out.println("Error al intentar pagar con efectivo: " + e.getMessage());
			}
		}else if(Integer.parseInt((String)request.getSession().getAttribute("tipoPago"))==2){
			/**REALIZA PAGO CON CHEQUE**/
			Connection con = null;
			CallableStatement stmt = null;
			ResultSet rs = null;
			JsonParser parser = new JsonParser();
			JsonElement arreglo = parser.parse((String) request.getSession().getAttribute("datosPago"));
			try{
				con = new ConectarDB().getConnection();
				stmt = con.prepareCall("{call stp_I_clscj_pago_chequeFimp(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}");
				stmt.registerOutParameter(1, java.sql.Types.VARCHAR);
				stmt.setInt(2, arreglo.getAsJsonArray().get(0).getAsJsonObject().get("codigoSucursal").getAsInt());
				stmt.setString(3, arreglo.getAsJsonArray().get(0).getAsJsonObject().get("codigoCaja").getAsString());
				stmt.setString(4, arreglo.getAsJsonArray().get(0).getAsJsonObject().get("serie").getAsString());
				stmt.setInt(5, arreglo.getAsJsonArray().get(0).getAsJsonObject().get("numero").getAsInt());
				stmt.setInt(6, arreglo.getAsJsonArray().get(0).getAsJsonObject().get("codigoBanco").getAsInt());
				stmt.setString(7, arreglo.getAsJsonArray().get(0).getAsJsonObject().get("numeroCheque").getAsString());
				stmt.setBigDecimal(8, arreglo.getAsJsonArray().get(0).getAsJsonObject().get("monto").getAsBigDecimal());
				stmt.setString(9, arreglo.getAsJsonArray().get(0).getAsJsonObject().get("cedula").getAsString());
				stmt.setString(10, arreglo.getAsJsonArray().get(0).getAsJsonObject().get("nombre").getAsString());
				stmt.setString(11, arreglo.getAsJsonArray().get(0).getAsJsonObject().get("telefono").getAsString());
				stmt.setString(12, arreglo.getAsJsonArray().get(0).getAsJsonObject().get("direccion").getAsString());
				Date fecha = new Date();
				Timestamp estampa = new Timestamp(fecha.getTime());
				stmt.setTimestamp(13, estampa);
				stmt.setInt(14, arreglo.getAsJsonArray().get(0).getAsJsonObject().get("correlativoCierre").getAsInt());
				stmt.setInt(15, arreglo.getAsJsonArray().get(0).getAsJsonObject().get("idCaja").getAsInt());
				stmt.setInt(16, arreglo.getAsJsonArray().get(0).getAsJsonObject().get("userID").getAsInt());
				stmt.setInt(17, arreglo.getAsJsonArray().get(0).getAsJsonObject().get("codigoOperador").getAsInt());
				stmt.setString(18, arreglo.getAsJsonArray().get(0).getAsJsonObject().get("noAutorizacion").getAsString());
				stmt.setString(19, arreglo.getAsJsonArray().get(0).getAsJsonObject().get("noOperador").getAsString());
				String fechaCheque = arreglo.getAsJsonArray().get(0).getAsJsonObject().get("fechaCheque").getAsString();
				DateFormat formatoOriginal = new SimpleDateFormat("dd/MM/yyyy");
				Date fechaChequeNueva;
				try {
					fechaChequeNueva = formatoOriginal.parse(fechaCheque);
					Timestamp estampaFechaCheque = new Timestamp(fechaChequeNueva.getTime());
					stmt.setTimestamp(20, estampaFechaCheque);
				} catch (ParseException e) {
					response.setContentType("text/html");
					response.getWriter().write("Formato de fecha debe ser i.e. dd/mm/aaaa");
				}
				stmt.setString(21, arreglo.getAsJsonArray().get(0).getAsJsonObject().get("codigoCuenta").getAsString());
				rs = stmt.executeQuery();
				
				while(rs.next()){
					response.setContentType("text/html");
					response.getWriter().write("factura Pagada con Cheque");
				}
				con.close();
				stmt.close();
				rs.close();
			}catch(SQLException e ){
				response.setContentType("text/html");
				response.getWriter().write("Error al intentar pagar con Cheque: " + e.getMessage());
			}
		}else if(Integer.parseInt((String)request.getSession().getAttribute("tipoPago"))==3){
			/**REALIZA PAGO CON CHEQUE**/
			Connection con = null;
			CallableStatement stmt = null;
			ResultSet rs = null;
			JsonParser parser = new JsonParser();
			JsonElement arreglo = parser.parse((String) request.getSession().getAttribute("datosPago"));
			try{
				con = new ConectarDB().getConnection();
				stmt = con.prepareCall("{call stp_I_clscj_pago_tarjetaFimp(?,?,?,?,?,?,?,?,?,?,?,?,?)}");
				stmt.registerOutParameter(1, java.sql.Types.VARCHAR);
				stmt.setInt(2, arreglo.getAsJsonArray().get(0).getAsJsonObject().get("codigoSucursal").getAsInt());
				stmt.setString(3, arreglo.getAsJsonArray().get(0).getAsJsonObject().get("codigoCaja").getAsString());
				stmt.setString(4, arreglo.getAsJsonArray().get(0).getAsJsonObject().get("serie").getAsString());
				stmt.setInt(5, arreglo.getAsJsonArray().get(0).getAsJsonObject().get("numero").getAsInt());
				stmt.setString(6, arreglo.getAsJsonArray().get(0).getAsJsonObject().get("numeroTarjeta").getAsString());
				stmt.setInt(7, arreglo.getAsJsonArray().get(0).getAsJsonObject().get("codigoEmisor").getAsInt());
				stmt.setBigDecimal(8, arreglo.getAsJsonArray().get(0).getAsJsonObject().get("monto").getAsBigDecimal());
				stmt.setString(9, arreglo.getAsJsonArray().get(0).getAsJsonObject().get("noAutorizacion").getAsString());
				Date fecha = new Date();
				Timestamp estampa = new Timestamp(fecha.getTime());
				stmt.setTimestamp(10, estampa);
				stmt.setInt(11, arreglo.getAsJsonArray().get(0).getAsJsonObject().get("correlativoCierre").getAsInt());
				stmt.setInt(12, arreglo.getAsJsonArray().get(0).getAsJsonObject().get("idCaja").getAsInt());
				stmt.setInt(13, arreglo.getAsJsonArray().get(0).getAsJsonObject().get("userID").getAsInt());
				rs = stmt.executeQuery();
				
				while(rs.next()){
					response.setContentType("text/html");
					response.getWriter().write("factura Pagada con Tarjeta");
				}
				con.close();
				stmt.close();
				rs.close();
			}catch(SQLException e ){
				response.setContentType("text/html");
				response.getWriter().write("Error al intentar pagar con Tarjeta: " + e.getMessage());
			}
		}
		
	}

}
