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

});
