package com.imsa.caja.datos;

public class DetalleFactura {
	public DetalleFactura(int correlativo, String codigoProducto, String unidadMedida, int cantidad
			,float precio, float porDescuento, float descuento, float totalLinea, String codigoBodega
			,int envia, String observaciones, String descripcion){
		this.setCorrelativo(correlativo);
		this.setCodigoProducto(codigoProducto);
		this.setUnidadMedida(unidadMedida);
		this.setCantidad(cantidad);
		this.setPrecio(precio);
		this.setPorDescuento(porDescuento);
		this.setDescuento(descuento);
		this.setTotalLinea(totalLinea);
		this.setCodigoBodega(codigoBodega);
		this.setEnvia(envia);
		this.setObservaciones(observaciones);
		this.setDescripcion(descripcion);
	}
	public DetalleFactura(){}
	private int correlativo;
	private String codigoProducto;
	private String descripcion;
	private String unidadMedida;
	private int cantidad;
	private float precio;
	private float porDescuento;
	private float descuento;
	private float totalLinea;
	private String codigoBodega;
	private int envia;
	private String observaciones;
	
	/**
	 * @return the descripcion
	 */
	public String getDescripcion() {
		return descripcion;
	}
	/**
	 * @param descripcion the descripcion to set
	 */
	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}
	/**
	 * @return the correlativo
	 */
	public int getCorrelativo() {
		return correlativo;
	}
	/**
	 * @param correlativo the correlativo to set
	 */
	public void setCorrelativo(int correlativo) {
		this.correlativo = correlativo;
	}
	/**
	 * @return the codigoProducto
	 */
	public String getCodigoProducto() {
		return codigoProducto;
	}
	/**
	 * @param codigoProducto the codigoProducto to set
	 */
	public void setCodigoProducto(String codigoProducto) {
		this.codigoProducto = codigoProducto;
	}
	/**
	 * @return the unidadMedida
	 */
	public String getUnidadMedida() {
		return unidadMedida;
	}
	/**
	 * @param unidadMedida the unidadMedida to set
	 */
	public void setUnidadMedida(String unidadMedida) {
		this.unidadMedida = unidadMedida;
	}
	/**
	 * @return the cantidad
	 */
	public int getCantidad() {
		return cantidad;
	}
	/**
	 * @param cantidad the cantidad to set
	 */
	public void setCantidad(int cantidad) {
		this.cantidad = cantidad;
	}
	/**
	 * @return the precio
	 */
	public float getPrecio() {
		return precio;
	}
	/**
	 * @param precio the precio to set
	 */
	public void setPrecio(float precio) {
		this.precio = precio;
	}
	/**
	 * @return the porDescuento
	 */
	public float getPorDescuento() {
		return porDescuento;
	}
	/**
	 * @param porDescuento the porDescuento to set
	 */
	public void setPorDescuento(float porDescuento) {
		this.porDescuento = porDescuento;
	}
	/**
	 * @return the descuento
	 */
	public float getDescuento() {
		return descuento;
	}
	/**
	 * @param descuento the descuento to set
	 */
	public void setDescuento(float descuento) {
		this.descuento = descuento;
	}
	/**
	 * @return the totalLinea
	 */
	public float getTotalLinea() {
		return totalLinea;
	}
	/**
	 * @param totalLinea the totalLinea to set
	 */
	public void setTotalLinea(float totalLinea) {
		this.totalLinea = totalLinea;
	}
	/**
	 * @return the codigoBodega
	 */
	public String getCodigoBodega() {
		return codigoBodega;
	}
	/**
	 * @param codigoBodega the codigoBodega to set
	 */
	public void setCodigoBodega(String codigoBodega) {
		this.codigoBodega = codigoBodega;
	}
	/**
	 * @return the envia
	 */
	public int getEnvia() {
		return envia;
	}
	/**
	 * @param envia the envia to set
	 */
	public void setEnvia(int envia) {
		this.envia = envia;
	}
	/**
	 * @return the observaciones
	 */
	public String getObservaciones() {
		return observaciones;
	}
	/**
	 * @param observaciones the observaciones to set
	 */
	public void setObservaciones(String observaciones) {
		this.observaciones = observaciones;
	}
	
}
