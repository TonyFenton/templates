require('./../../css/user/layout.css');
require('./../user/layout.js');
require('./../../css/datatable.css');
require('datatables.net-bs4/js/dataTables.bootstrap4');
require('datatables.net-bs4/css/dataTables.bootstrap4.css');
import rememberDataTablesLength from './../datatables_length.js';

$(function () {

    $('#templates').DataTable({
        columnDefs: [
            {
                targets: 1,
                searchable: false,
                sorting: false
            }
        ],
        pageLength: parseInt($('#datatables-length').val())
    });
    rememberDataTablesLength();

});
