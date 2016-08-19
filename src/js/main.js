"use strict";

import Loader from './components/core/Loader';
import App from './components/app/Application';

let FIR,
    promise = Loader.httpGet({url:'../config/config.json'})
        .then((config)=>{
            window.FIR = new App(JSON.parse(config), PIXI);
        });
// window.FIR = FIR;