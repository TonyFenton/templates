var Encore = require('@symfony/webpack-encore');

Encore
// the project directory where compiled assets will be stored
    .setOutputPath('public/build/')
    // the public path used by the web server to access the previous directory
    .setPublicPath('/build')
    .cleanupOutputBeforeBuild()
    .enableSourceMaps(!Encore.isProduction())
    // uncomment to create hashed filenames (e.g. app.abc123.css)
    // .enableVersioning(Encore.isProduction())

    // uncomment to define the assets of the project
    .addEntry('base', './assets/js/base.js')
    .addStyleEntry('base_style', './assets/css/base.css')
    .addEntry('user_layout', ['./assets/css/user/layout.css', './assets/js/user/layout.js'])
    .addEntry('default_layout', ['./assets/css/default/layout.css'])
    .addEntry('template_new_edit', './assets/js/template/new_edit.js')
    .addEntry('template_show', './assets/js/template/show.js')
    .addEntry('folder_index', './assets/js/folder/index.js')
    .addEntry('folder_content', './assets/js/folder/content.js')
    .addEntry('template_index', './assets/js/template/index.js')

    // .addStyleEntry('css/app', './assets/css/app.scss')

    // uncomment if you use Sass/SCSS files
    // .enableSassLoader()

    // uncomment for legacy applications that require $/jQuery as a global variable
    .autoProvidejQuery()
;

module.exports = Encore.getWebpackConfig();
