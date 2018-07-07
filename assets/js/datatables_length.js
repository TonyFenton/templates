/**
 * Save length of dataTables ("Show x entries" select) in a cookie
 */
export default function() {

    $('.dataTables_length select').on('change', function () {
        setCookie($(this).val());
    });

    function setCookie(length) {
        const expires = new Date(new Date().setFullYear(new Date().getFullYear() + 10)).toUTCString();
        document.cookie = 'datatables_length=' + length + '; expires=' + expires + '; path=/;';
    }
}
