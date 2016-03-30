import {Aurelia} from "aurelia-framework"
import {bootstrap} from 'aurelia-bootstrapper-webpack';

import '../node_modules/font-awesome/css/font-awesome.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import './pages/app.css';

bootstrap((aurelia: Aurelia): void => {
    aurelia.use
        .standardConfiguration()
        //.feature("resources")
        .developmentLogging();

    //Uncomment the line below to enable animation.
    //aurelia.use.plugin('aurelia-animator-css');

    //Anyone wanting to use HTMLImports to load views, will need to install the following plugin.
    //aurelia.use.plugin('aurelia-html-import-template-loader')

    aurelia.start().then(() => aurelia.setRoot('pages/app', document.body));
});
