$tabla.bootstrapTable({
	   				height: 200,
	   				url: 'BuscarCodigo',
	   				method: 'post',
	   				queryParams: function(p){
	   					return{
	   						codigoProducto : $('#codigoToma2').val(),
		   					bodegaID: $('#bodega').val()
	   					};
	   					
	   				},
	   				pagination: true,
	   				pageSize: 50,
	   				pageList: [10, 25, 50, 100, 200],
	   				showRefresh: true,
	   			columns: [
	   			{
                    field: 'codigoProducto',
                    title: 'C\u00F3digo'
                }, 
                {
                    field: 'cantidad',
                    title: 'Cant. Actual',
                    width: '200px'
                },
                {
                    field: 'nuevaCantidad',
                    title: 'Cantidad'
                },
                {
                    field: 'bodega',
                    title: 'Bodega'
                },
                {
                    field: 'estanteria',
                    title: 'Estanter\u00EDa'
                },
                {
                    field: 'seccion',
                    title: 'Secci\u00F3n'
                },
                {
                    field: 'estanteriaID',
                    title: 'Estanter\u00EDa'
                },
                {
                    field: 'seccionID',
                    title: 'Secci\u00F3n'
                }
                ]
	   			});