import TemplateModal from "./../../template/show/TemplateModal";
import Effect from "./../../Effect";
import SideMenu from "./SideMenu";
require('./../../base.js');
require('./../../../css/user/homepage.css');

$(function () {

    const sideMenu = new SideMenu();

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

    let templateModal = new TemplateModal();

    // Showing the modal
    templateModal.element.on('show.bs.modal', (event) => {
        let templateId = $(event.relatedTarget).data('template-id');
        templateModal.makeTemplate(templateId);
    });

    /* a modal actions */
    templateModal.copyBtn.on('click', () => {
        Effect.blink(templateModal.template.text);
        templateModal.template.copy();
    });
    templateModal.resetBtn.on('click', () => {
        Effect.blink(templateModal.template.element);
        templateModal.template.reset();
    });

});
