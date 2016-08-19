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

    /**
     * Set event listeners for columns
     * @private
     */
    _initUserActions(){
        let me = this;
        for(let column of this._mapObject.gridContainers){
            column.interactive = true;
            column.buttonMode = true;
            column.defaultCursor = 'pointer';
            column.click = function(){
                for(let column of me._mapObject.gridContainers){
                    column.interactive = false;
                }
                me.model.getData('clickCallback')(this.id);
            };
            column.mouseover = function(){
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

    /**
     * Implementation of TweenLite animation
     * @param columnTo
     * @param cellTo
     * @param userId
     * @param resolve
     */
    animateMoveTo(columnTo, cellTo, userId, resolve){
        let me = this,
            currentColor = config.map.colors[userId],
            currentColumn = this._mapObject.gridContainers[columnTo],
            currentCell = this._mapObject.grid[columnTo][cellTo],
            newCircleObject = new PIXI.Graphics(),
            animateSymbol,
            currentX = currentColumn.x + (config.circle.radius / 2),
            currentY = currentColumn.y + (config.circle.radius / 2),
            toY = currentCell.y;

        newCircleObject.beginFill(currentColor);
        newCircleObject.drawCircle(currentX, currentY, config.circle.radius);
        newCircleObject.endFill();
        newCircleObject = new PIXI.Sprite(newCircleObject.generateTexture());
        currentColumn.addChild(newCircleObject);
        animateSymbol= TweenLite.to(newCircleObject, config.animation.time, {
                y: toY,
                onComplete: function () {
                    for(let column of me._mapObject.gridContainers){
                        column.interactive = true;
                    }
                    animateSymbol.kill();
                    currentColumn.removeChild(newCircleObject);
                    currentCell.texture = newCircleObject.texture;

                    resolve();
                },
                ease: 'Sine.easeIn'
            });
    }

    /**
     * Draws a new user name.
     * @param userName
     * @param userId
     */
    changeUser(userName, userId = 1){
        this._labels.currentUserLabel.text = config.labels.currentUser.text + userName;
        this._labels.currentUserLabel.style.fill = config.labels.currentUser.fillColors[userId];
    }

    /**
     * Draws a new round Id
     * @param id
     */
    changeRound(id){
        this._labels.roundIdLabel.text =  config.labels.roundId.text + id;
    }

    /**
     * Show Win message
     * @param name
     */
    showWin(name){
        this._labels.currentUserLabel.visible = false;
        this._labels.winLabel.text = config.labels.win.text + name + '!!!';
        this._labels.winLabel.visible = true;
    }

    /**
     * Clear map and changing user to dafault
     */
    startNewRound(){
        this.changeUser(this.model.getData('currentUserName'));
        this._labels.winLabel.visible = false;
        this._labels.currentUserLabel.visible = true;
        for(let grid of this._mapObject.grid){
            for (let cell of grid){
                cell.texture = PIXI.Texture.EMPTY;
            }
        }
    }
}