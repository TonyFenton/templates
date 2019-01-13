require('datatables.net-bs4/js/dataTables.bootstrap4');
require('datatables.net-bs4/css/dataTables.bootstrap4.css');
require('../../../css/folder/index.css');
require('../../../css/datatable.css');
require('../../base.js');

import rememberDataTablesLength from '../../datatables_length.js';

$(function () {

    $('#folders').DataTable({
        columnDefs: [
            {
                targets: 2,
                searchable: false,
                sorting: false,
                width: "30%"
            }
        ],
        pageLength: parseInt($('#datatables-length').val())
    });
    rememberDataTablesLength();

});
