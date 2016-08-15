import GameController from './GameController';
import GameView from './GameView';
import GameModel from '../core/Model';
export default class Game {
    /**
     * Instance of UI initialize
     * @param configs
     * @param renderer
     * @param utils
     */
    constructor(configs, renderer, utils){
        configs.model = new GameModel();
        configs.view = new GameView(configs.model, renderer);
        this.controller = new GameController(configs, renderer, utils
        );
    }
}