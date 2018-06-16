/**
 * The side menu functions
 */
export default class SideMenu {

    constructor() {
        this.sideMenuBlock = $('#side-menu-block');
        this.btn = $('#side-menu-btn');
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
}
