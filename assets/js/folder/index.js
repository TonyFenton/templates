require('./../../css/folder/index.css');
require('./../../css/datatable.css');
require('./../user/layout.js');
require('datatables.net-bs4/js/dataTables.bootstrap4');
require('datatables.net-bs4/css/dataTables.bootstrap4.css');
import rememberDataTablesLength from './../datatables_length.js';

$(function () {

    $('#folders').DataTable({
        columnDefs: [
            {
                targets: 2,
                searchable: false,
                sorting: false
            }
        ],
        pageLength: parseInt($('#datatables-length').val())
    });
    rememberDataTablesLength();

});
