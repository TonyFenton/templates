require('./../../css/template/index.css');
import './../base.js'
import Template from './Template.js'
import Effect from './../Effect.js'

$(function () {
    
    const template = new Template();

    /* seting variables value */
    template.variableControl.on('change input', function () {
        template.setVariable(
            $(this).data('variable-id'),
            $(this).data('variable-name'),
            $(this).val()
        );
    });
    template.variableControl.trigger('change');

    /* pointing variables */
    template.variableControl.on('focus', function () {
        template.pointVariable($(this).data('variable-id'));
    });
    template.variableControl.on('blur', function () {
        template.unpointVariable($(this).data('variable-id'));
    });

    /* a template actions */
    template.copyBtn.on('click', function () {
        Effect.blink(template.text);
        template.copy();
    });
    template.resetBtn.on('click', function () {
        Effect.blink(template.text);
        Effect.blink(template.textControl);
        template.reset();
    });

});
