/* Auto resizing a textarea */
$('textarea').on('input', function () {
    $(this).css('height', (this.scrollHeight) + 2 + 'px');
}).trigger('input');
