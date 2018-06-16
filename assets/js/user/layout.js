require('./../base.js');
import SideMenu from './../SideMenu.js'

$(function () {

    let sideMenu = new SideMenu();
    sideMenu.btn.on('click', function () {
        sideMenu.toggle();
    }); 

});
