require('./../../css/user/layout.css');
require('./../base.js');
require('./../../css/datatable.css');
require('datatables.net-bs4/js/dataTables.bootstrap4');
require('datatables.net-bs4/css/dataTables.bootstrap4.css');

$(function () {

    $('#templates').DataTable({
        columnDefs: [
            {
                targets: 1,
                searchable: false,
                sorting: false
            }
        ]
    });

});
