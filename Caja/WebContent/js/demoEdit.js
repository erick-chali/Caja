/**
 * 
 */

  (function($, window, document) {

    // The $ is now locally scoped 

   // Listen for the jQuery ready event on the document
   $(function() {
	   $('#fila').click(function (){
		   var fila = $(
				   		'<tr>' + 
				   		'<td class="edit" id="1">col 1</td>' +
				   		'<td class="edit" id="2">col 2</td>' +
				   		'<td class="editar" id="3">col 3</td>' +
				   		'<td class="edit" id="4">col 4</td>' +
				   		'<td class="edit" id="5">col 5</td>' +
				   		'<td class="edit" id="6">col 6</td>' +
				   		'<td class="edit">col 7</td>' +
				   		'<td class="edit">col 8</td>' +
				   		'<td class="edit">col 9</td>' +
				   		'<td class="edit">col 10</td>' +
				   		'<td class="edit">col 11</td>' +
				   		'<td class="edit">col 12</td>' +
				   		'<td class="edit">col 13</td>' +
				   		'</tr>'
		   			);
		   fila.prependTo(('table > tbody'));
	   });
	   $('#caja').keydown(function (e){
		   if(e.keyCode == 13){
			   $('.editProducto').trigger('click');
		   }
	   });
	   $(document).on('click', '.editProducto', function(){
		   
		   $('.editProducto').editable(function(value, settings) {
			   console.log(settings);
			   
			     traerValores(value, $('#fPago').text(), $(this).parent().index());
			     return(value);
			  }, {
			     onblur  : 'submit',
			     style   : 'inherit',
			     event   : 'click',
			     callback : function(value, settings) {
			         postValores(value, $(this).parent().index());
			     }
			  });
		   $('#celda').text($(this).index());
		   $('#row').text($(this).parent().index());
	   });
	   $(document).on('click', '.edit', function(){
		   $('#celda').text($(this).index());
		   $('#row').text($(this).parent().index());
	   });
	   $(document).on('click', '.edit', function(){
		   $('.edit').editable(function(value, settings) {
			   console.log(settings);
			     traerValores(value, $('#fPago').text(), $(this).parent().index());
			     return(value);
			  }, {
			     onblur  : 'submit',
			     event   : 'click',
			     style   : 'inherit',
			     callback : function(value, settings) {
			         postValores(value, $(this).parent().index());
			     }
			  });
	   });
       $(document).on('click', '.editar', function(){
		   $('.editar').editable(function(value, settings) {
			   console.log(settings);
			     traerValores(value, $('#fPago').text(), $(this).parent().index());
			     return(value);
			  }, {
			     onblur  : 'submit',
			     event   : 'click',
			     style   : 'inherit',
			     callback : function(value, settings) {
			         postValores(value, $(this).parent().index());
                     
			     }
			  });
	   });
   });
   
   function traerValores(value, FPago, index){
	   console.log(value  + ' ' + FPago + ' ' + index);
   }
   function postValores(value, index){
	   $('table > tbody > tr').eq(index).find('.editar').text('1');
//	   $('table > tbody > tr').eq(index).find('#2').text('2');
//	   $('table > tbody > tr').eq(index).find('#3').text('3');
//	   $('table > tbody > tr').eq(index).find('#4').text('4');
//	   $('table > tbody > tr').eq(index).find('#5').text('5');
//	   $('table > tbody > tr').eq(index).find('#6').text('6');
	   var col1 = $('table > tbody > tr').eq(index).children().eq(0).text();
	   var col2 = $('table > tbody > tr').eq(index).children().eq(1).text();
	   var col3 = $('table > tbody > tr').eq(index).children().eq(2).text();
	   var col4 = $('table > tbody > tr').eq(index).children().eq(3).text();
	   var col5 = $('table > tbody > tr').eq(index).children().eq(4).text();
	   var col6 = $('table > tbody > tr').eq(index).children().eq(5).text();
	   $('table > tbody > tr').eq(index).children().eq(10).text(value);
	   console.log(col1 + ' ' + col2 + ' ' + col3 + ' ' +col4 + ' '+ col5 + ' '+col6 + ' '); 
	   
   }
  }(window.jQuery, window, document));