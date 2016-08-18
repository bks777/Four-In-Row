/**
 * View for UI component
 */
import {viewConfig} from './viewConfig';

export default class GameView{
    /**
     * Init of UI View
     * @param model
     * @param renderer
     */
    constructor(model, renderer){
        this.model = model;
        this.renderer = renderer;
    }

    init(stage){
        this._stage = stage;
        this._createBackground();
        this._initUserActions();
        console.info('view inited!');
    }
    _createBackground(){}
    _initUserActions(){}
}