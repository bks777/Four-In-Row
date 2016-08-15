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
        console.info('view inited!');
    }
    //Make all drawings here
}