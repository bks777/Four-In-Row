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

        this._stage.addChild(bgSprite);
    }

    /**
     * Creating and adding to stage all text fields
     * @private
     */
    _initLabels(){
        let labelsContainer = new PIXI.Container(),
            roundIdLabel = new PIXI.Text(
                config.labels.roundId.text,
                config.labels.roundId.style
            ),
            currentUserLabel = new PIXI.Text(
                config.labels.currentUser.text,
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

        this._labels = {}

        this._stage.addChild(labelsContainer);
    }

    _initUserActions(){

    }
}