/**
 * 
 */

var $table = $('#table');

		var data = [
			{
				"id": 0,
				"name": "Item 0",
				"price": "$0"
			},
			{
				"id": 1,
				"name": "Item 1",
				"price": "$1"
			},
			{
				"id": 2,
				"name": "Item 2",
				"price": "$2"
			},
			{
				"id": 3,
				"name": "Item 3",
				"price": "$3"
			},
			{
				"id": 4,
				"name": "Item 4",
				"price": "$4"
			},
			{
				"id": 5,
				"name": "Item 5",
				"price": "$5"
			}
		];
		$table.bootstrapTable({
			data: data,
			detailView: true,
			uniqueId: 'id',
			clickToSelect: true,
			selectItemName: 'chkID',
			columns:[
				{
					radio: true,
					field: 'chkID',
					width: '100px'
				},{
					field: 'id',
					title: 'ID',
					width: '100px'
				},{
					field: 'name',
					title: 'Item Name',
					width: '500px'
				},{
					field: 'price',
					title: 'Item Price',
					width: '500px'	
				}
			],
			onExpandRow: function (index, row, $detail) {
				compExtInfo($detail, row);
			}
		});

		function compExtInfo($detail, row) {
			pID = row.id;
			
			$detail.html('<div id="exttoolbar_'+pID+'"><button id="delext_'+pID+'" class="btn btn-success"> Del Row </button></div>');
			buildTable($detail.append('<table id="exttable_'+pID+'"></table>').find('table'), pID);
		}

		function buildTable($ext, ID) {
			$ext.bootstrapTable({
				data: data,
				uniqueId: 'id',
				clickToSelect: true,
				selectItemName: 'chkID',
				toolbar: '#exttoolbar_'+ID,
				columns:[
					{
						radio: true,
						field: 'chkID'
					},{
						field: 'id',
						title: 'ID'
					},{
						field: 'name',
						title: 'Item Name'		
					},{
						field: 'price',
						title: 'Item Price'	
					}
				],
				onPostBody: function(row, index){
					$('#delext_'+ID).click(function(){
						var pID ;
						var gID = $.map($ext.bootstrapTable('getSelections'), function (row) {
							if (confirm('Delete row item ID '+row.id)){
								
							}
							
						});
						return row.id;
					});
				},
			});
		}