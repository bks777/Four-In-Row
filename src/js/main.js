"use strict";
import Utilities from './utilites';
import Game from './components/ui/Game';
import Loader from './components/core/Loader';

var appInstance,
    promise = Loader.httpGet({url:'../config/config.json'})
        .then((config)=>{
            appInstance = new Game(JSON.parse(config), PIXI, Utilities);
        });
