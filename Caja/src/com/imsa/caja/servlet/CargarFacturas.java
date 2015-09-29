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
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.reflect.TypeToken;
import com.imsa.caja.conexion.ConectarDB;
import com.imsa.caja.datos.DatosFacturas;

/**
 * Servlet implementation class CargarFacturas
 */
@WebServlet("/CargarFacturas")
public class CargarFacturas extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public CargarFacturas() {
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
		ArrayList<DatosFacturas> facturas = new ArrayList<>();
		try{
			con = new ConectarDB().getConnection();
			stmt = con.prepareCall("{call stp_SL_clscj_pago_facturas}");
			rs = stmt.executeQuery();
			
			while(rs.next()){
				DatosFacturas datos = new DatosFacturas();
				datos.setSerie(rs.getString("serie"));
				datos.setNumeroFactura(rs.getInt("numero"));
				datos.setNit(rs.getString("NIT"));
				datos.setNombreFactura(rs.getString("CLIENTE"));
				datos.setFecha(rs.getDate("FECHA"));
				datos.setTipoPago(rs.getString("TIPO_PAGO"));
				datos.setMonto(rs.getFloat("MONTO"));
				datos.setObservaciones(rs.getString("Observaciones"));
				SimpleDateFormat formato = new SimpleDateFormat("dd/MM/yyyy");
				datos.setFechaFormato(formato.format(datos.getFecha()));
				facturas.add(datos);
			}
		}catch(SQLException e){
			response.setContentType("text/html");
			response.getWriter().write(e.getMessage());
			System.out.println("Error: " + e.getMessage());
		}
		Gson gson = new Gson();
		JsonElement elemento = gson.toJsonTree(facturas, new TypeToken<List<DatosFacturas>>(){}.getType());
		JsonArray arreglo = elemento.getAsJsonArray();
		
		response.setContentType("application/json");
		
		try {
			String fecha = "27/09/2015";
			DateFormat formatoOriginal = new SimpleDateFormat("dd/MM/yyyy");
			Date date = formatoOriginal.parse(fecha);
//			System.out.println(new java.sql.Timestamp(date.getTime()));
			java.sql.Date fecha2 = new java.sql.Date(date.getTime());
			System.out.println(new java.sql.Timestamp(fecha2.getTime()));
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		facturas = null;
		response.getWriter().print(arreglo);
	}
	
	public static ArrayList<DatosFacturas> obtenerFacturas(){
		return null;
	}
}
