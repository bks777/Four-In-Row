/**
 * Main handler for UI component
 */
import GameView from './GameView';
import Model from '../core/Model';

export default class GameController{
    /**
     * Constructor
     * @param configs {object} contains:
     * * initConfig
     * * userName
     * * utils
     * * roundId
     * * mapConfig
     * * clickCallback
     */
    constructor(configs){
        this.model = new Model();
        this.model.setData('roundId', configs.roundId);
        this.model.setData('mapConfig', configs.mapConfig);
        this.model.setData('clickCallback', configs.clickCallback);
        this.model.setData('currentUserName', configs.userName);
        this.view = new GameView(this.model);
        this._utils = configs.utils;
        this._init(configs.initConfig);
        this.sprites = configs.initConfig.images.sprites || {};
        this._selectRenderFunction();
        this._run();
    }

    /**
     * Base Init
     * @param config
     * @private
     */
    _init(config){
        this._initRenderer(config);
        this._setupImages(config);
    }

    /**
     * @private
     * Select which render function to use
     */
    _selectRenderFunction() {
        let me = this;

        this.animationFunction = window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callback) {
                clearTimeout(me.renderTimeout);
                me.renderTimeout = setTimeout(callback, Math.round(1000 / 60));
            };
    }

    /**
     * @private
     * Main render method
     */
    _run() {
        let me = this;

        me.renderer.render(me.stage);
        me.animationFunction.call(window, function () {
            me._run();
        });
    }

    /**
     * Add Pixi render and main PIXI stage
     * @param config
     * @private
     */
    _initRenderer(config) {
        let stage = new PIXI.Container(),
            renderer;

        renderer = PIXI.autoDetectRenderer(config.width, config.height, {antialias: true, resolution: 1});
        renderer.view.id = "canvasAnimationManager";
        document.getElementById('container').appendChild(renderer.view);

        this.stage = stage;
        this.renderer = renderer;
    }

    /**
     * Load all images and make PIXI textures from them
     * @param configs
     * @private
     */
    _setupImages(configs) {
        let me = this,
            rawImages = configs.images.animationImages || [],
            images = {};

        me.loader = PIXI.loader;
        for (let image of rawImages){
            me.loader.add(image.imageName, image.imageSrc);
        }
        me.loader.once('complete', function (loader, res) {
            for (let image in res){
                images[image] = new PIXI.Texture(
                    new PIXI.BaseTexture(res[image].data)
                );
            }
            me.model.setData('textures', images);
            //Set up my scene after promise end
            me.view.init(me.stage);
        });
        me.loader.load();
    }

    animateWin(userName){

    }

    animateMoveTo(columnTo, cellTo, userName){

    }
}