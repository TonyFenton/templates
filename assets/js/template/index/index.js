require('datatables.net-bs4/js/dataTables.bootstrap4');
require('datatables.net-bs4/css/dataTables.bootstrap4.css');
require('../../base.js');
require('../../../css/datatable.css');

import rememberDataTablesLength from '../../datatables_length.js';

$(function () {

    $('#templates').DataTable({
        columnDefs: [
            {
                targets: 2,
                searchable: false,
                sorting: false,
                width: "20%"
            }
        ],
        pageLength: parseInt($('#datatables-length').val())
    });
    rememberDataTablesLength();

});
