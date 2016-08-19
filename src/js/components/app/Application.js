/**
 * Business Logic Module
 */
import Game from '../ui/GameController';
import Model from '../core/Model';
import config from './config'

export default class Application {
    /**
     * Constructor for a business logic
     * @param conf {Object} parsed JSON with all resources and base config
     * @param renderer {Object} PIXI as a renderer for now
     */
    constructor(conf, renderer) {
        this.model = new Model();
        this.model.setData('initConfig', conf);
        this.model.setData('renderer', renderer);
        this._table = null;
        this._init();
    }

    /**
     * Setting of a base game config,
     * creating of UI instance
     * @private
     */
    _init() {
        //Setting of default user
        this.model.setData('currentUser', 0);
        this.model.setData('roundId', 0);
        this._clearTable();
        //init of ui instance
        this.gameUI = new Game({
            initConfig: this.model.getData('initConfig'),
            userName: config.users[this.model.getData('currentUser')],
            renderer: this.model.getData('renderer'),
            clickCallback: this.userClickCallback.bind(this),
            roundId: this.model.getData('roundId'),
            mapConfig: config.table,
            userId: this.model.getData('currentUser')
        });
    }

    /**
     * Creates new empty table
     * @private
     */
    _clearTable() {
        let table = [];

        for (let row = 0; row < config.table.rows; row++) {
            table[row] = [];
            for (let line = 0; line < config.table.lines; line++) {
                table[row].push(undefined);
            }
        }
        this._table = table;
    }

    /**
     * New move action.
     * @param rowId
     * @private
     */
    userClickCallback(rowId) {
        let  userId = this.model.getData('currentUser'),
            currentTable = this._table,
            lineId = undefined,
            nextUserName,
            newUserId;

        for (let lineIdx = 0; lineIdx < currentTable[rowId].length; lineIdx++) {
            if (currentTable[rowId][lineIdx] !== undefined) {
                lineId = --lineIdx;
                if (lineId < 0) {
                    console.info('max line exceed');
                    return;
                }
                break;
            }
        }
        if (lineId === undefined) {
            lineId = currentTable[rowId].length - 1;
        }
        this._table[rowId][lineId] = userId;
        newUserId = this._changeUser(userId);
        nextUserName = config.users[newUserId];
        if (this._isWin(rowId, lineId)) {
            this._endRound();
            this.gameUI.animateMoveTo(rowId, lineId, nextUserName, userId, this.model.getData('roundId'));
            this.gameUI.animateWin(config.users[userId]);
        } else {
            this.model.setData('roundId', this.model.getData('roundId') + 1);
            this.gameUI.animateMoveTo(rowId, lineId, nextUserName, userId, this.model.getData('roundId'));
        }
    }

    /**
     * Check is move is a won move.
     * @param row {Number} Id of a column
     * @param line {Number} Id of a cell
     * @returns {boolean}
     * @private
     */
    _isWin(row, line) {
        if (this._getAdj(line, row, 0, 1) + this._getAdj(line, row, 0, -1) > 2) {
            return true;
        } else {
            if (this._getAdj(line, row, 1, 0) > 2) {
                return true;
            } else {
                if (this._getAdj(line, row, -1, 1) + this._getAdj(line, row, 1, -1) > 2) {
                    return true;
                } else {
                    if (this._getAdj(line, row, 1, 1) + this._getAdj(line, row, -1, -1) > 2) {
                        return true;
                    } else {
                        return false;
                    }
                }
            }
        }
    }

    /**
     * Getting adjustment
     * @param line {Number}
     * @param row {Number}
     * @param line_inc {Number}
     * @param row_inc {Number}
     * @returns {*}
     * @private
     */
    _getAdj(line, row, line_inc, row_inc) {
        if (this._cellVal(line, row) == this._cellVal(line + line_inc, row + row_inc)) {
            return 1 + this._getAdj(line + line_inc, row + row_inc, line_inc, row_inc);
        } else {
            return 0;
        }
    }

    /**
     *
     * @param line
     * @param row
     * @returns {*}
     * @private
     */
    _cellVal(line, row) {
        if (this._table[row] == undefined || this._table[row][line] == undefined) {
            return -1;
        } else {
            return this._table[row][line];
        }
    }

    /**
     * Changes user.
     * @param userId {Number} Id of current user
     * @returns {Number} Id of a new user
     * @private
     */
    _changeUser(userId) {
        if (userId === config.users.length - 1) {
            userId = 0;
        } else {
            userId++;
        }
        this.model.setData('currentUser', userId);

        return userId;
    }

    /**
     * Clear all data
     * @private
     */
    _endRound(){
        this.model.setData('currentUser', 0);
        this._clearTable();
        this.model.setData('roundId', 0);
    }
}