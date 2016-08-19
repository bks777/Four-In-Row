/**
 * View for UI component
 */
import {config} from './config';

export default class GameView{
    /**
     * Init of UI View
     * @param model
     */
    constructor(model){
        this.model = model;
    }

    /**
     * Creating of all containers
     * @param stage
     */
    init(stage){
        this._stage = stage;
        this._createBackground();
        this._initLabels();
        this._initUserActions();
    }

    /**
     * Creating of main cell bg
     * @private
     */
    _createBackground(){
        let bgTexture = this.model.getData('textures')['background'],
            bgSprite = new PIXI.Sprite(bgTexture);
        bgSprite.y = config.background.topOffset;
        this._createGrid();
        this._stage.addChild(bgSprite);
    }

    /**
     * Creating and adding to stage all text fields
     * @private
     */
    _initLabels(){
        let labelsContainer = new PIXI.Container(),
            roundIdLabel = new PIXI.Text(
                config.labels.roundId.text + this.model.getData('roundId'),
                config.labels.roundId.style
            ),
            currentUserLabel = new PIXI.Text(
                config.labels.currentUser.text + this.model.getData('currentUserName'),
                config.labels.currentUser.style
            ),
            winLabel = new PIXI.Text(
                config.labels.win.text,
                config.labels.win.style
            ),
            newRoundLabel = new PIXI.Text(
                config.labels.newRound.text,
                config.labels.newRound.style
            );

        roundIdLabel.position = config.labels.roundId.position;
        currentUserLabel.position = config.labels.currentUser.position;
        winLabel.position = config.labels.win.position;
        newRoundLabel.position = config.labels.newRound.position;

        winLabel.visible = false;
        newRoundLabel.visible = false;

        labelsContainer.addChild(roundIdLabel);
        labelsContainer.addChild(currentUserLabel);
        labelsContainer.addChild(winLabel);
        labelsContainer.addChild(newRoundLabel);

        this._labels = {
            roundIdLabel,
            currentUserLabel,
            winLabel,
            newRoundLabel
        };
        this._stage.addChild(labelsContainer);
    }

    _initUserActions(){
        let me = this;
        for(let column of this._mapObject.gridContainers){
            column.interactive = true;
            column.click = function(mouseData){
                me.model.getData('clickCallback')(this.id);
            };
            column.mouseover = function(mouseData){
                //make bg effects
            };
        }
    }

    /**
     * Creates PIXI Containers and empty PIXI Sprites for a game
     * @private
     */
    _createGrid(){
        let grid = [],
            gridContainers = [],
            tableData = this.model.getData('mapConfig'),
            gridContainer = new PIXI.Container(),
            tempColumnContainer,
            tempCell;

        for(let columnId = 0; columnId < tableData.rows; columnId++){
            gridContainer.addChild(tempColumnContainer = new PIXI.Container);
            tempColumnContainer.position = new PIXI.Point(
                columnId * config.map.columnWidth,
                0
            );
            tempColumnContainer.id = columnId;
            gridContainers.push(tempColumnContainer);
            grid.push([]);
            for(let cellId = 0; cellId < tableData.lines; cellId++){
                tempCell = new PIXI.Sprite();
                tempCell.width = config.map.columnWidth;
                tempCell.height = config.map.cellHeight;
                tempColumnContainer.addChild(tempCell);
                tempCell.position = new PIXI.Point(0, cellId * config.map.cellHeight);
                grid[columnId].push(tempCell);
            }
        }
        gridContainer.position = new PIXI.Point(0, config.background.topOffset);
        this._stage.addChild(gridContainer);
        this._mapObject = {
            grid,
            gridContainers
        };
    }
}