package com.imsa.caja.servlet;

import java.io.IOException;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.imsa.caja.conexion.ConectarDB;

/**
 * Servlet implementation class InicioSesion
 */
@WebServlet("/InicioSesion")
public class InicioSesion extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public InicioSesion() {
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
		request.getSession().setAttribute("usuario", request.getParameter("usuario"));
		request.getSession().setAttribute("clave", request.getParameter("clave"));
		request.getSession().setAttribute("objeto", request.getParameter("objeto"));
		Connection con = null;
		CallableStatement stmt = null;
		ResultSet rs = null;
		
		try{
			con = new ConectarDB().getConnection();
			stmt = con.prepareCall("{call stp_UDPV_Get_LoginParams(?,?,?)}");
			stmt.setString(1, (String)request.getSession().getAttribute("usuario"));
			stmt.setString(2, (String)request.getSession().getAttribute("clave"));
			stmt.setString(3, (String)request.getSession().getAttribute("objeto"));
			rs = stmt.executeQuery();
			
			while(rs.next()){
				if(rs.getInt("ReadOK")==0){
					request.setAttribute("errorSesion", "Clave o Usuario incorrectos, intente nuevamente.");
					request.getRequestDispatcher("/login.jsp").forward(request, response);
				}else if(rs.getInt("ReadOK")==1 && rs.getString("caja")==null){
					request.setAttribute("errorSesion", "No tiene una caja asignada, solicite asistencia con el administrador del sistema.");
					request.getRequestDispatcher("/login.jsp").forward(request, response);
				}else if(rs.getInt("ReadOK")==1 && rs.getString("caja") != null){
					request.getSession().setAttribute("usuarioID", rs.getString("UserID"));
					request.getSession().setAttribute("codigoSucursal", rs.getString("21"));
					request.getSession().setAttribute("codigoVendedor", rs.getString("Codigo_Vendedor"));
					request.getSession().setAttribute("vendedor", rs.getString("Vendedor"));
					request.getSession().setAttribute("codigoClienteVendedor", rs.getString("Codigo_Cliente"));
					request.getSession().setAttribute("lista", rs.getString("Codigo_Lista"));
					request.getSession().setAttribute("codigoBodega", rs.getString("Codigo_Bodega"));
					request.getSession().setAttribute("caja", rs.getString("caja"));
					String[] textoSucursal = rs.getString("Sucursal").split("\\s+");
					request.getSession().setAttribute("sucursal", textoSucursal[1]);
					
					request.getSession().setMaxInactiveInterval(30*30);
					response.sendRedirect("caja.jsp");
				}
			}
			con.close();
			stmt.close();
			rs.close();
		}catch(SQLException e){
			response.setContentType("text/html");
			response.getWriter().println("Error: " + e.getMessage());
		}
	}

}
