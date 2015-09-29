package com.imsa.caja.servlet;

import java.io.IOException;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
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
import com.imsa.caja.datos.DetalleFactura;

/**
 * Servlet implementation class CargarDetalleFactura
 */
@WebServlet("/CargarDetalleFactura")
public class CargarDetalleFactura extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public CargarDetalleFactura() {
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
		ArrayList<DetalleFactura> lista = new ArrayList<DetalleFactura>();
		request.getSession().setAttribute("serie", request.getParameter("serie"));
		request.getSession().setAttribute("numeroFactura", request.getParameter("numeroFactura"));
		try{
			con = new ConectarDB().getConnection();
			stmt = con.prepareCall("{call stp_S_clspv_facturas_detPago_clscj_pago_facturasRelated(?,?)}");
			stmt.setString(1, (String)request.getSession().getAttribute("serie"));
			stmt.setInt(2, Integer.parseInt((String)request.getSession().getAttribute("numeroFactura")));
			rs = stmt.executeQuery();
			/***
			 * pv_UnidadProducto
			 * pv_NombreBodega
			 * cj_DescripcionProducto
			 * */

//			Date fecha = new Date();
//			Calendar calendario = Calendar.getInstance();
//			calendario.setTime(fecha);
//			calendario.set(Calendar.MILLISECOND, 0);
//			Timestamp estampa = new Timestamp(fecha.getTime());
//			SimpleDateFormat formato = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//			formato.format(estampa);
//			System.out.println(new java.sql.Timestamp(fecha.getTime()));
//			System.out.println(formato.format(estampa));
			while(rs.next()){ 
				Connection con2 = null;
				CallableStatement stmt2 = null;
				ResultSet rs2 = null;
				
				
				
				DetalleFactura detalle = new DetalleFactura();
				detalle.setCorrelativo(rs.getInt("correlativo"));
				detalle.setCodigoProducto("");
				con2 = new ConectarDB().getConnection();
				stmt2 = con2.prepareCall("{call pv_UnidadProducto(?)}");
				stmt2.setString(1, rs.getString("unidad_medida"));
				rs2 = stmt2.executeQuery();
				while(rs2.next()){
					detalle.setUnidadMedida(rs2.getString("descripcion"));
				}
				con2.close();
				stmt2.close();
				rs2.close();
				detalle.setCantidad(rs.getInt("cantidad"));
				detalle.setPrecio(rs.getFloat("precio"));
				detalle.setPorDescuento(rs.getFloat("por_descuento"));
				detalle.setDescuento(rs.getFloat("descuento"));
				con2 = new ConectarDB().getConnection();
				stmt2 = con.prepareCall("{call pv_NombreBodega(?)}");
				stmt2.setString(1, rs.getString("codigo_bodega"));
				rs2 = stmt2.executeQuery();
				while(rs2.next()){
					detalle.setCodigoBodega(rs2.getString("descripcion"));
				}
				con2.close();
				stmt2.close();
				rs2.close();
				detalle.setEnvia(rs.getInt("envia"));
				detalle.setObservaciones(rs.getString("observaciones"));
				con2 = new ConectarDB().getConnection();
				stmt2 = con.prepareCall("{call cj_DescripcionProducto(?)}");
				stmt2.setString(1, rs.getString("codigo_producto"));
				rs2 = stmt2.executeQuery();
				while(rs2.next()){
					detalle.setDescripcion(rs.getString("codigo_producto").trim() + " " + rs2.getString("descripcion"));
				}
				con2.close();
				stmt2.close();
				rs2.close();
				lista.add(detalle);
				
			}
			con.close();
			stmt.close();
			rs.close();
		}catch(SQLException e){
			
		}
		Gson gson = new Gson();
		JsonElement elemento = gson.toJsonTree(lista, new TypeToken<List<DetalleFactura>>(){}.getType());
		JsonArray arreglo = elemento.getAsJsonArray();
		
		response.setContentType("application/json");
		
		lista = null;
		response.getWriter().print(arreglo);
	}

}
