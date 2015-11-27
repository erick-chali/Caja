package com.imsa.caja.servlet;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class LeerUDL
 */
@WebServlet("/LeerUDL")
public class LeerUDL extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public LeerUDL() {
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
		BufferedReader reader=null;
		String[] datos = new String[14];
		String[] clave = new String[2];
		String[] usuario = new String[2];
		String[] db = new String[2];
		String[] servidor = new String[2];
		String pass = "", user = "", bd = "", server = "";
		File direccion = new File("c:\\Caja\\millenium.udl");
		try {
			try {
				reader = new BufferedReader(
							new InputStreamReader(new FileInputStream(direccion), "UTF-16"));
			} catch (UnsupportedEncodingException e) {
				// TODO Auto-generated catch block
				System.out.println("Encoding de archivo no soportada: " + e.getMessage());
			}
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			System.out.println("Archivo no encontrado: " + e.getMessage());
		}
		while (true) {
		    String line = null;
			try {
				line = reader.readLine();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				System.out.println("No se pudo Leer el archivo: " + e.getMessage());
			}
		    if (line == null) {
			break;
		    }
		    String[] parts = line.split(";");
		    int x = 0;
		    for (String part : parts) {
		    	datos[x] = part;
		    	x++;
		    }
		}
		
		try {
			reader.close();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			System.out.println("Error de Lectura de archivo: " + e.getMessage());
		}
		
		
		pass = datos[1];
		user = datos[3];
		bd = datos[4];
		server = datos[5];
		clave = pass.split("=");
		usuario = user.split("=");
		db = bd.split("=");
		servidor = server.split("=");
		request.getSession().setAttribute("servidorDB", (String)servidor[1]);
		request.getSession().setAttribute("usuarioDB", (String)usuario[1]);
		request.getSession().setAttribute("passDB", (String)clave[1]);
		request.getSession().setAttribute("db", (String)db[1]);
		System.out.println((String)request.getSession().getAttribute("servidorDB"));
		System.out.println((String)request.getSession().getAttribute("usuarioDB"));
		System.out.println((String)request.getSession().getAttribute("passDB"));
		System.out.println((String)request.getSession().getAttribute("db"));
		
	}

}
