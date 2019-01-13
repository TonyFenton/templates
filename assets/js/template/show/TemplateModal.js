import Template from "./Template";
require('./../../../css/spinner.css');

export default class TemplateModal {

    constructor() {
        this.element = $('#template-modal');
        this.content = this.element.find('.modal-content');
        this.spinner = this.element.find('.modal-spinner');
        this.breadcrumb = this.element.find('.breadcrumb');
        this.breadcrumbBtn = this.element.find('.breadcrumb-btn');
        this.copyBtn = this.element.find('.copy-btn');
        this.resetBtn = this.element.find('.reset-btn');
        this.template = null;
    }

    /**
     * @param id
     */
    makeTemplate(id) {
        this.template = new Template(id, this);
        this.template.load();
    }

    showSpinner() {
        this.content.hide();
        this.spinner.hide().fadeIn();
    }

    hideSpinner() {
        this.content.fadeIn();
        this.spinner.hide();
    }

    setBreadcrumb(items) {
        let breadcrumbItems = [];
        $.each(items, (key, value) => {
            breadcrumbItems.push($('<div/>').addClass('breadcrumb-item').text(value));
        });
        this.breadcrumb.html(breadcrumbItems);
    }

    setBreadcrumbBtn(id) {
        let hrefPrototype = this.breadcrumbBtn.data('href-prototype');
        this.breadcrumbBtn.attr('href', hrefPrototype.replace('\/0', '/' + id))
    }
}
