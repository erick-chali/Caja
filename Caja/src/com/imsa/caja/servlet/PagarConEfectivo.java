package com.imsa.caja.servlet;

import java.io.IOException;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
//import java.text.SimpleDateFormat;
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
 * Servlet implementation class PagarConEfectivo
 */
@WebServlet("/PagarConEfectivo")
public class PagarConEfectivo extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public PagarConEfectivo() {
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
		
		Connection con = null;
		CallableStatement stmt = null;
		ResultSet rs = null;
		request.getSession().setAttribute("datosPagoEfectivo", request.getParameter("datosEfectivo"));
		JsonParser parser = new JsonParser();
		JsonElement arreglo = parser.parse((String) request.getSession().getAttribute("datosPagoEfectivo"));
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
		}catch(SQLException e){
			System.out.println("Error: " + e.getMessage());
		}
	}

}
