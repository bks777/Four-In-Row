"use strict";
import Utilities from './utilites';

import Loader from './components/core/Loader';
import App from './components/app/Application';

var appInstance,
    promise = Loader.httpGet({url:'../config/config.json'})
        .then((config)=>{
            appInstance = new App(JSON.parse(config), PIXI, Utilities);
        });
