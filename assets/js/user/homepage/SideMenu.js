import Cookies from "js-cookie/src/js.cookie";

/**
 * The side menu functions
 */
export default class SideMenu {

    constructor() {
        this.sideMenuList = $('#side-menu-list');
        this.folders = $('.side-menu-folder');
        this.searchInput = $('#side-menu-search-input');
        this.templateLists = $('.side-menu-template-list');
        this.noMatchingTemplates = $('#side-menu-no-matching-templates');
        this.rowBtns = this.sideMenuList.find('.tree-row-btn');
    };

    /**
     * Show or hide the template list of folder
     */
    toggleTemplateList(folder) {
        const list = folder.next();
        if (list.is(':hidden')) {
            let folders = this.sideMenuList.find('.side-menu-template-list:visible')
                .slideUp()
                .siblings('.side-menu-folder');
            this.removeFolderOpenIcon(folders);
            this.setFolderOpenIcon(folder);
            list.slideDown();
            this.setOpenFolderCookie(folder.data('id'));
        } else {
            list.slideUp();
            this.removeFolderOpenIcon(folder);
            this.removeOpenFolderCookie();
        }
    }

    /**
     * Search of templates
     *
     * @param value
     */
    search(value) {
        const preparedValue = value.toLowerCase();
        let found = false;
        this.templateLists.each(function () {
            let foundInFolder = false;
            $(this).find('.side-menu-template').each(function () {
                if (-1 !== $(this).text().toLowerCase().indexOf(preparedValue)) {
                    $(this).show();
                    foundInFolder = true;
                    found = true;
                } else {
                    $(this).hide();
                }
            });
            let folder = $(this).prev('.side-menu-folder');
            true === foundInFolder ? folder.show() : folder.hide();
        });
        true === found ? this.noMatchingTemplates.hide() : this.noMatchingTemplates.show();
    }

    setOpenFolderCookie(id) {
        Cookies.set('open_folder', id);
    }

    removeOpenFolderCookie() {
        Cookies.remove('open_folder');
    }

    setFolderOpenIcon(folder) {
        folder.find('i').addClass('icon-folder-open').removeClass('icon-folder');
    }

    removeFolderOpenIcon(folder) {
        folder.find('i').addClass('icon-folder').removeClass('icon-folder-open');
    }
}
