require('./../base.js');
import SideMenu from './../SideMenu.js';

$(function () {

    const sideMenu = new SideMenu();

    // Adaptation of the side menu block for small screens
    sideMenu.btn.on('click', function () {
        sideMenu.toggle();
    });

    // Handling displaying list of templates in folder (side menu)
    sideMenu.folders.on('click', function () {
        sideMenu.toggleTemplateList($(this));
    });

    // Handling the search of templates in the side menu
    sideMenu.searchInput.on('focus', function () {
        sideMenu.folders.off('click');
        sideMenu.folders.css('cursor', 'default');
        sideMenu.setFolderOpenIcon(sideMenu.folders);
        sideMenu.templateLists.show();
        sideMenu.search($(this).val());
        sideMenu.removeOpenFolderCookie();
    });
    sideMenu.searchInput.on('input', function () {
        sideMenu.search($(this).val());
    });

});
