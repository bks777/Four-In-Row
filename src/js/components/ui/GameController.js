/**
 * Main handler for UI component
 */

export default class GameController{
    constructor(configs, renderer, utils){
        this.view = configs.view;
        this.model = configs.model;

        this._utils = utils;
        this._renderer = renderer;

        this._init(configs);
        this.animationBuffer = [];
        this.currentTime = 0;
        this.timeFromStart = 0;
        this.paused = false;
        this.currentStepTime = 0;
        this.isRunning = false;
        this.sprites = configs.images.sprites || {};
        // Select which render function to use
        this._selectRenderFunction();
        this.start();
    }

    /**
     * Base Init
     * @param configs
     * @private
     */
    _init(configs){
        this._initRenderer(configs);
        this._setupImages(configs);
    }

    /**
     * Start to render
     */
    start(){
        var me = this;

        me.isRunning = true;

        me.currentTime = 0;           // Time since the animation started
        me.lastTimeStepOccured = Date.now();   // The time of last time step render
        me.paused = false;

        me._requestNextAnimationStep();
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
     *
     * @return {number}
     */
    _updateTime() {
        let now = Date.now(),
            diff = now - this.lastTimeStepOccured;

        // Check if more time than allowed has passed since the last frame
        if (diff > 250) {
            diff = 1000 / 60;
        }

        this.currentStepTime = diff | 0;

        this.currentTime += this.currentStepTime;

        return now;
    }

    /**
     * @private
     * Signals the manager that the next animation step should be rendered
     */
    _requestNextAnimationStep() {
        let me = this;

        me.animationFunction.call(window, function () {
            me._run();
        });
    }

    /**
     * @private
     * Main render method
     */
    _run() {
        // this.renderLoopEndEvents.length = 0;
        this.renderer.render(this.stage);
        // If we are allowed to draw another time step, do so
        if (this._shouldRenderNextFrame()) {
            this.lastTimeStepOccured = this._updateTime();
            // Request next animation step
            this._requestNextAnimationStep();
        } else {
            this.isRunning = false;
        }
    }

    /**
     * @private
     * @returns {boolean}
     */
    _shouldRenderNextFrame() {
        return (!this.paused);
    }

    /**
     * Add Pixi render and main PIXI container
     * @param config
     * @private
     */
    _initRenderer(config) {
        let stage = new this._renderer.Container(),
            renderer;

        renderer = this._renderer.autoDetectRenderer(config.width, config.height, {antialias: true, resolution: 1});
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

        me.loader = me._renderer.loader;
        for (let image of rawImages){
            me.loader.add(image.imageName, image.imageSrc);
        }
        me.loader.once('complete', function (loader, res) {
            for (let image in res){
                images[image] = new me._renderer.Texture(
                    new me._renderer.BaseTexture(res[image].data)
                );
            }
            me.model.setData('textures', images);
            //Set up my scene after promise end
            me.view.init(me.stage);
        });
        me.loader.load();
    }

    /**
     * Start the animation again
     */
    continueAnimation() {
        this.paused = false;
        this._run();
    }
}