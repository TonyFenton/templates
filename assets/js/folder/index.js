require('./../../css/user/layout.css');
require('./../../css/datatable.css');
require('./../base.js');
require('datatables.net-bs4/js/dataTables.bootstrap4');
require('datatables.net-bs4/css/dataTables.bootstrap4.css');

$(function () {

    $('#folders').DataTable({
        columnDefs: [
            {
                targets: 1,
                searchable: false,
                sorting: false
            }
        ]
    });

});
