import Cookies from "js-cookie/src/js.cookie";

/**
 * The side menu functions
 */
export default class SideMenu {

    constructor() {
        this.sideMenuBlock = $('#side-menu-block');
        this.btn = $('#side-menu-btn');
        this.folders = $('.side-menu-folder');
    };

    /**
     * Show or hide the side menu
     */
    toggle() {
        if (this.sideMenuBlock.hasClass('d-none')) {
            this.show();
        } else {
            this.hide();
        }
    }

    /**
     * Show the side menu
     */
    show() {
        this.sideMenuBlock.removeClass('d-none').hide().slideDown();
    }

    /**
     * Hide the side menu
     */
    hide() {
        let thisObj = this;
        this.sideMenuBlock.slideUp('', function () {
            thisObj.sideMenuBlock.addClass('d-none');
        });
    }

    /**
     * Show or hide the template list of folder
     */
    toggleTemplateList(folder) {
        const list = folder.next();
        if (list.is(':hidden')) {
            this.sideMenuBlock.find('.side-menu-template-list:visible')
                .slideUp()
                .siblings('.side-menu-folder').addClass('icon-folder').removeClass('icon-folder-open');
            list.slideDown();
            folder.addClass('icon-folder-open').removeClass('icon-folder');
            Cookies.set('open_folder', folder.data('id'));
        } else {
            list.slideUp();
            folder.addClass('icon-folder').removeClass('icon-folder-open');
            Cookies.remove('open_folder');
        }
    }
}
