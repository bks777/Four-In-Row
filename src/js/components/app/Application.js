import Game from '../ui/Game';
import Model from '../core/Model';
import config from './config'

export default class Application{
    /**
     * Constructor for a business logic
     * @param conf {Object} parsed JSON with all resources and base config
     * @param renderer {Object} PIXI as a renderer for now
     * @param utils {Object} core utilities
     */
    constructor(conf, renderer, utils){
        this.model = new Model();
        this.model.set('initConfig', conf);
        this.model.set('renderer', renderer);
        this._utils = utils;

        this._init();
    }

    /**
     * Setting of a base game config,
     * creating of UI instance
     * @private
     */
    _init(){
        //Setting of default user
        this.model.set('currentUser', 0);
        this.model.set('roundId', 0);
        this._clearTable();
        //init of ui instance
        this.gameUI = new Game({
            initConfig : this.model.getData('initConfig'),
            userName: config.users[this.model.getData('currentUser')],
            renderer: this.model.getData('renderer'),
            utils: this._utils
        });

    }

    /**
     * Creates new empty table
     * @private
     */
    _clearTable(){
        let table = [];

        for(let row = 0; row < config.table.rows; row++){
            for(let line = 0; line < config.table.lines; line++){
                table[row][line] = 0;
            }
        }
        console.info(table, " <<< Table created!");
        this.model.setData('table', table);
    }

    /**
     * Callbcak for a user clicked.
     * @param rowId {Number}
     */
    userClickCallback(rowId){

    }

    _makeMove(rowId, userId = this.model.getData('currentUser')){

    }
}