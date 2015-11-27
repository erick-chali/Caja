package com.imsa.caja.datos;

import java.util.Date;

public class DatosFacturas {
	public DatosFacturas(String serie, int numeroFactura, String nit, String nombreFactura
			,Date fecha, float monto, String tipoPago, String observaciones, String fechaFormato
			,int codigoPago){
		this.setSerie(serie);
		this.setNumeroFactura(numeroFactura);
		this.setNit(nit);
		this.setNombreFactura(nombreFactura);
		this.setFecha(fecha);
		this.setMonto(monto);
		this.setObservaciones(observaciones);
		this.setTipoPago(tipoPago);
		this.setFechaFormato(fechaFormato);
		this.setCodigoPago(codigoPago);
	}
	public DatosFacturas(){}
	private String serie;
	private int numeroFactura;
	private String nit;
	private String nombreFactura;
	private Date fecha;
	private float monto;
	private String tipoPago;
	private String observaciones;
	private String fechaFormato;
	private int codigoPago;
	
	public int getCodigoPago() {
		return codigoPago;
	}
	public void setCodigoPago(int codigoPago) {
		this.codigoPago = codigoPago;
	}
	/**
	 * @return the fechaFormato
	 */
	public String getFechaFormato() {
		return fechaFormato;
	}
	/**
	 * @param fechaFormato the fechaFormato to set
	 */
	public void setFechaFormato(String fechaFormato) {
		this.fechaFormato = fechaFormato;
	}
	/**
	 * @return the fecha
	 */
	public Date getFecha() {
		return fecha;
	}
	/**
	 * @param fecha the fecha to set
	 */
	public void setFecha(Date fecha) {
		this.fecha = fecha;
	}
	/**
	 * @return the monto
	 */
	public float getMonto() {
		return monto;
	}
	/**
	 * @param monto the monto to set
	 */
	public void setMonto(float monto) {
		this.monto = monto;
	}
	/**
	 * @return the tipoPago
	 */
	public String getTipoPago() {
		return tipoPago;
	}
	/**
	 * @param tipoPago the tipoPago to set
	 */
	public void setTipoPago(String tipoPago) {
		this.tipoPago = tipoPago;
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
	/**
	 * @return the serie
	 */
	public String getSerie() {
		return serie;
	}
	/**
	 * @param serie the serie to set
	 */
	public void setSerie(String serie) {
		this.serie = serie;
	}
	/**
	 * @return the numeroFactura
	 */
	public int getNumeroFactura() {
		return numeroFactura;
	}
	/**
	 * @param numeroFactura the numeroFactura to set
	 */
	public void setNumeroFactura(int numeroFactura) {
		this.numeroFactura = numeroFactura;
	}
	/**
	 * @return the nit
	 */
	public String getNit() {
		return nit;
	}
	/**
	 * @param nit the nit to set
	 */
	public void setNit(String nit) {
		this.nit = nit;
	}
	/**
	 * @return the nombreFactura
	 */
	public String getNombreFactura() {
		return nombreFactura;
	}
	/**
	 * @param nombreFactura the nombreFactura to set
	 */
	public void setNombreFactura(String nombreFactura) {
		this.nombreFactura = nombreFactura;
	}
	
	
}
