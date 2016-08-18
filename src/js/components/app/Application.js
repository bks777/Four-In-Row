import Game from '../ui/GameController';
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
        this.model.setData('initConfig', conf);
        this.model.setData('renderer', renderer);
        this._utils = utils;
        this._table = null;
        this._init();
    }

    /**
     * Setting of a base game config,
     * creating of UI instance
     * @private
     */
    _init(){
        //Setting of default user
        this.model.setData('currentUser', 0);
        this.model.setData('roundId', 0);
        this._clearTable();
        //init of ui instance
        this.gameUI = new Game({
            initConfig : this.model.getData('initConfig'),
            userName: config.users[this.model.getData('currentUser')],
            renderer: this.model.getData('renderer'),
            utils: this._utils,
            clickCallback: this.userClickCallback
        });

    }

    /**
     * Creates new empty table
     * @private
     */
    _clearTable(){
        let table = [];

        for(let row = 0; row < config.table.rows; row++){
            table[row] = [];
            for(let line = 0; line < config.table.lines; line++){
                table[row].push(undefined);
            }
        }
        console.info(table, " <<< Table created!");
        this._table = table;
    }

    /**
     * Callbcak for a user clicked.
     * @param rowId {Number}
     */
    userClickCallback(rowId){

    }

    _makeMove(rowId, userId = this.model.getData('currentUser')){
        let currentTable = this._table,
            lineId = undefined,
            nextUserName = config.users[userId],
            newUserId;

        for (let lineIdx = 0; lineIdx < currentTable[rowId].length; lineIdx++){
            if(currentTable[rowId][lineIdx] !== undefined){
                lineId = --lineIdx;
                if (lineId < 0){
                    console.error('max line exceed');
                    return;
                }
                break;
            }
        }
        if (lineId === undefined){
            lineId = currentTable[rowId].length - 1;
        }

        if (this._isWin(rowId, lineId)){
            console.info('win of >>', userId);
            // this.gameUI.animateWin(nextUserName);
            //this._endRound()
        } else {
            //Setting of new value to table
            this._setTableValue(rowId, lineId, userId);
            console.info('make move ' + userId + ' to row ' + rowId + ' and to its line ' + lineId);
            //User Changing
            newUserId = this._changeUser(userId);
            nextUserName = config.users[newUserId];
            console.info('user changed to ' + nextUserName);

            //Draw animation
            // this.gameUI.animateMoveTo(rowId, lineId, nextUserName);
        }
    }

    _isWin(row, line){
        if(this._getAdj(line,row,0,1)+this._getAdj(line,row,0,-1) > 2){
            return true;
        } else {
            if(this._getAdj(line,row,1,0) > 2){
                return true;
            } else {
                if(this._getAdj(line,row,-1,1)+this._getAdj(line,row,1,-1) > 2){
                    return true;
                } else {
                    if(this._getAdj(line,row,1,1)+this._getAdj(line,row,-1,-1) > 2){
                        return true;
                    } else {
                        return false;
                    }
                }
            }
        }

    }

    _getAdj(line,row,line_inc,row_inc){
        if(this._cellVal(line,row) == this._cellVal(line+line_inc,row+row_inc)){
            return 1 + this._getAdj(line+line_inc,row+row_inc,line_inc,row_inc);
        } else {
            return 0;
        }
    }

    _cellVal(line,row){
        if(this._table[row] == undefined || this._table[row][line] == undefined){
            return -1;
        } else {
            return this._table[row][line];
        }
    }

    _changeUser(userId){
        if (userId === config.users.length - 1){
            userId = 0;
        } else {
            userId++;
        }
        this.model.setData('currentUser', userId);

        return userId;
    }

    _setTableValue(row, line, id){
        // let table = this.model.getData('table');

        this._table[row][line] = id;
        // this._table = table;
    }


}