import GameController from './GameController';
import GameView from './GameView';
import Model from '../core/Model';
export default class Game {
    /**
     * Interface for a UI instance
     * @param configs {object} contains:
     * * initConfig
     * * userName
     * * renderer
     * * utils
     */
    constructor(configs){
        this.model = new Model();
        this.view = new GameView(this.model, configs.renderer || PIXI);
        configs.view = this.view;
        configs.model = this.model;
        // this.controller = new GameController(configs);
    }
}