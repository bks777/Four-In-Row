/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _Loader = __webpack_require__(2);

	var _Loader2 = _interopRequireDefault(_Loader);

	var _Application = __webpack_require__(3);

	var _Application2 = _interopRequireDefault(_Application);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var FIR = void 0,
	    promise = _Loader2.default.httpGet({ url: './config/config.json' }).then(function (config) {
	    FIR = new _Application2.default(JSON.parse(config), PIXI);
	});

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Class for loading of resources
	 * @singleton
	 */

	var loaderInstance;

	var Loader = function () {
	    /**
	     * Constructor
	     */
	    function Loader() {
	        _classCallCheck(this, Loader);

	        this.XHR = "onload" in new XMLHttpRequest() ? XMLHttpRequest : XDomainRequest;
	        this.serverAlias = "http://localhost:8080/slot/";
	    }

	    /**
	     * GET Action
	     * @param config
	     * @returns {Promise}
	     */


	    _createClass(Loader, [{
	        key: "httpGet",
	        value: function httpGet() {
	            var config = arguments.length <= 0 || arguments[0] === undefined ? { url: 'http://google.com' } : arguments[0];

	            var request = new this.XHR();

	            return new Promise(function (resolve, reject) {
	                request.onload = function () {
	                    resolve(request.responseText);
	                };
	                request.onerror = function () {
	                    reject(request);
	                };
	                request.open("GET", config.url, true);
	                request.send();
	            });
	        }
	    }]);

	    return Loader;
	}();

	/**
	 * Realization of singleton in ES6
	 */


	if (!loaderInstance) {
	    loaderInstance = new Loader();
	}

	exports.default = loaderInstance;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Business Logic Module
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


	var _GameController = __webpack_require__(4);

	var _GameController2 = _interopRequireDefault(_GameController);

	var _Model = __webpack_require__(7);

	var _Model2 = _interopRequireDefault(_Model);

	var _config = __webpack_require__(8);

	var _config2 = _interopRequireDefault(_config);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Application = function () {
	    /**
	     * Constructor for a business logic
	     * @param conf {Object} parsed JSON with all resources and base config
	     * @param renderer {Object} PIXI as a renderer for now
	     */
	    function Application(conf, renderer) {
	        _classCallCheck(this, Application);

	        this.model = new _Model2.default();
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


	    _createClass(Application, [{
	        key: '_init',
	        value: function _init() {
	            //Setting of default user
	            this.model.setData('currentUser', 0);
	            this.model.setData('roundId', 0);
	            this._clearTable();
	            //init of ui instance
	            this.gameUI = new _GameController2.default({
	                initConfig: this.model.getData('initConfig'),
	                userName: _config2.default.users[this.model.getData('currentUser')],
	                renderer: this.model.getData('renderer'),
	                clickCallback: this.userClickCallback.bind(this),
	                roundId: this.model.getData('roundId'),
	                mapConfig: _config2.default.table,
	                userId: this.model.getData('currentUser')
	            });
	        }

	        /**
	         * Creates new empty table
	         * @private
	         */

	    }, {
	        key: '_clearTable',
	        value: function _clearTable() {
	            var table = [];

	            for (var row = 0; row < _config2.default.table.rows; row++) {
	                table[row] = [];
	                for (var line = 0; line < _config2.default.table.lines; line++) {
	                    table[row].push(undefined);
	                }
	            }
	            console.info(table, " <<< Table created!");
	            this._table = table;
	        }

	        /**
	         * New move action.
	         * @param rowId
	         * @private
	         */

	    }, {
	        key: 'userClickCallback',
	        value: function userClickCallback(rowId) {
	            var userId = this.model.getData('currentUser'),
	                currentTable = this._table,
	                lineId = undefined,
	                nextUserName = void 0,
	                newUserId = void 0;

	            for (var lineIdx = 0; lineIdx < currentTable[rowId].length; lineIdx++) {
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
	            nextUserName = _config2.default.users[newUserId];
	            if (this._isWin(rowId, lineId)) {
	                this._endRound();
	                this.gameUI.animateMoveTo(rowId, lineId, nextUserName, userId, this.model.getData('roundId'));
	                this.gameUI.animateWin(_config2.default.users[userId]);
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

	    }, {
	        key: '_isWin',
	        value: function _isWin(row, line) {
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

	    }, {
	        key: '_getAdj',
	        value: function _getAdj(line, row, line_inc, row_inc) {
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

	    }, {
	        key: '_cellVal',
	        value: function _cellVal(line, row) {
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

	    }, {
	        key: '_changeUser',
	        value: function _changeUser(userId) {
	            if (userId === _config2.default.users.length - 1) {
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

	    }, {
	        key: '_endRound',
	        value: function _endRound() {
	            this.model.setData('currentUser', 0);
	            this._clearTable();
	            this.model.setData('roundId', 0);
	        }
	    }]);

	    return Application;
	}();

	exports.default = Application;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Main handler for UI component
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


	var _GameView = __webpack_require__(5);

	var _GameView2 = _interopRequireDefault(_GameView);

	var _Model = __webpack_require__(7);

	var _Model2 = _interopRequireDefault(_Model);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var GameController = function () {
	    /**
	     * Constructor
	     * @param configs {Object} contains:
	     * * initConfig {Object} config of images
	     * * userName {String} name of user to draw
	     * * userId {Integer}
	     * * roundId
	     * * mapConfig {Object} default config for a map
	     * * clickCallback {Function} callback to use for user action.
	     */
	    function GameController(configs) {
	        _classCallCheck(this, GameController);

	        this.model = new _Model2.default();
	        this.model.setData('roundId', configs.roundId);
	        this.model.setData('mapConfig', configs.mapConfig);
	        this.model.setData('clickCallback', configs.clickCallback);
	        this.model.setData('currentUserName', configs.userName);
	        this.model.setData('currentUserId', configs.userId);
	        this.view = new _GameView2.default(this.model);
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


	    _createClass(GameController, [{
	        key: '_init',
	        value: function _init(config) {
	            this._initRenderer(config);
	            this._setupImages(config);
	        }

	        /**
	         * @private
	         * Select which render function to use
	         */

	    }, {
	        key: '_selectRenderFunction',
	        value: function _selectRenderFunction() {
	            var me = this;

	            this.animationFunction = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
	                clearTimeout(me.renderTimeout);
	                me.renderTimeout = setTimeout(callback, Math.round(1000 / 60));
	            };
	        }

	        /**
	         * @private
	         * Main render method
	         */

	    }, {
	        key: '_run',
	        value: function _run() {
	            var me = this;

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

	    }, {
	        key: '_initRenderer',
	        value: function _initRenderer(config) {
	            var stage = new PIXI.Container(),
	                renderer = void 0;

	            renderer = PIXI.autoDetectRenderer(config.width, config.height, { antialias: true, resolution: 1 });
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

	    }, {
	        key: '_setupImages',
	        value: function _setupImages(configs) {
	            var me = this,
	                rawImages = configs.images.animationImages || [],
	                images = {};

	            me.loader = PIXI.loader;
	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;

	            try {
	                for (var _iterator = rawImages[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var image = _step.value;

	                    me.loader.add(image.imageName, image.imageSrc);
	                }
	            } catch (err) {
	                _didIteratorError = true;
	                _iteratorError = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion && _iterator.return) {
	                        _iterator.return();
	                    }
	                } finally {
	                    if (_didIteratorError) {
	                        throw _iteratorError;
	                    }
	                }
	            }

	            me.loader.once('complete', function (loader, res) {
	                for (var image in res) {
	                    images[image] = new PIXI.Texture(new PIXI.BaseTexture(res[image].data));
	                }
	                me.model.setData('textures', images);
	                //Set up my scene after promise end
	                me.view.init(me.stage);
	            });
	            me.loader.load();
	        }

	        /**
	         * Show win message and triggers new round draw.
	         * @param userName
	         */

	    }, {
	        key: 'animateWin',
	        value: function animateWin(userName) {
	            this.view.showWin(userName);
	            setTimeout(this.view.startNewRound.bind(this.view), 2000);
	        }

	        /**
	         * Promise for animation of ball.
	         * @param columnTo
	         * @param cellTo
	         * @param userName
	         * @param userId
	         * @param round
	         */

	    }, {
	        key: 'animateMoveTo',
	        value: function animateMoveTo(columnTo, cellTo, userName, userId, round) {
	            var _this = this;

	            new Promise(function (resolve, reject) {
	                _this.view.animateMoveTo(columnTo, cellTo, userId, resolve);
	            }).then(function () {
	                _this.view.changeUser(userName, userId);
	                _this.view.changeRound(round);
	            });
	        }
	    }]);

	    return GameController;
	}();

	exports.default = GameController;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * View for UI component
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


	var _config = __webpack_require__(6);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var GameView = function () {
	    /**
	     * Init of UI View
	     * @param model
	     */
	    function GameView(model) {
	        _classCallCheck(this, GameView);

	        this.model = model;
	    }

	    /**
	     * Creating of all containers
	     * @param stage
	     */


	    _createClass(GameView, [{
	        key: 'init',
	        value: function init(stage) {
	            this._stage = stage;
	            this._createBackground();
	            this._initLabels();
	            this._initUserActions();
	        }

	        /**
	         * Creating of main cell bg
	         * @private
	         */

	    }, {
	        key: '_createBackground',
	        value: function _createBackground() {
	            var bgTexture = this.model.getData('textures')['background'],
	                bgSprite = new PIXI.Sprite(bgTexture);
	            bgSprite.y = _config.config.background.topOffset;
	            this._createGrid();
	            this._stage.addChild(bgSprite);
	        }

	        /**
	         * Creating and adding to stage all text fields
	         * @private
	         */

	    }, {
	        key: '_initLabels',
	        value: function _initLabels() {
	            var labelsContainer = new PIXI.Container(),
	                roundIdLabel = new PIXI.Text(_config.config.labels.roundId.text + this.model.getData('roundId'), _config.config.labels.roundId.style),
	                currentUserLabel = new PIXI.Text(_config.config.labels.currentUser.text + this.model.getData('currentUserName'), _config.config.labels.currentUser.style),
	                winLabel = new PIXI.Text(_config.config.labels.win.text, _config.config.labels.win.style),
	                newRoundLabel = new PIXI.Text(_config.config.labels.newRound.text, _config.config.labels.newRound.style);

	            roundIdLabel.position = _config.config.labels.roundId.position;
	            currentUserLabel.position = _config.config.labels.currentUser.position;
	            winLabel.position = _config.config.labels.win.position;
	            newRoundLabel.position = _config.config.labels.newRound.position;

	            winLabel.visible = false;
	            newRoundLabel.visible = false;

	            labelsContainer.addChild(roundIdLabel);
	            labelsContainer.addChild(currentUserLabel);
	            labelsContainer.addChild(winLabel);
	            labelsContainer.addChild(newRoundLabel);

	            this._labels = {
	                roundIdLabel: roundIdLabel,
	                currentUserLabel: currentUserLabel,
	                winLabel: winLabel,
	                newRoundLabel: newRoundLabel
	            };
	            this._stage.addChild(labelsContainer);
	        }

	        /**
	         * Set event listeners for columns
	         * @private
	         */

	    }, {
	        key: '_initUserActions',
	        value: function _initUserActions() {
	            var me = this;
	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;

	            try {
	                for (var _iterator = this._mapObject.gridContainers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var column = _step.value;

	                    column.interactive = true;
	                    column.buttonMode = true;
	                    column.defaultCursor = 'pointer';
	                    column.click = function () {
	                        var _iteratorNormalCompletion2 = true;
	                        var _didIteratorError2 = false;
	                        var _iteratorError2 = undefined;

	                        try {
	                            for (var _iterator2 = me._mapObject.gridContainers[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	                                var _column = _step2.value;

	                                _column.interactive = false;
	                            }
	                        } catch (err) {
	                            _didIteratorError2 = true;
	                            _iteratorError2 = err;
	                        } finally {
	                            try {
	                                if (!_iteratorNormalCompletion2 && _iterator2.return) {
	                                    _iterator2.return();
	                                }
	                            } finally {
	                                if (_didIteratorError2) {
	                                    throw _iteratorError2;
	                                }
	                            }
	                        }

	                        me.model.getData('clickCallback')(this.id);
	                    };
	                    column.mouseover = function () {
	                        //make bg effects
	                    };
	                }
	            } catch (err) {
	                _didIteratorError = true;
	                _iteratorError = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion && _iterator.return) {
	                        _iterator.return();
	                    }
	                } finally {
	                    if (_didIteratorError) {
	                        throw _iteratorError;
	                    }
	                }
	            }
	        }

	        /**
	         * Creates PIXI Containers and empty PIXI Sprites for a game
	         * @private
	         */

	    }, {
	        key: '_createGrid',
	        value: function _createGrid() {
	            var grid = [],
	                gridContainers = [],
	                tableData = this.model.getData('mapConfig'),
	                gridContainer = new PIXI.Container(),
	                tempColumnContainer = void 0,
	                tempCell = void 0;

	            for (var columnId = 0; columnId < tableData.rows; columnId++) {
	                gridContainer.addChild(tempColumnContainer = new PIXI.Container());
	                tempColumnContainer.position = new PIXI.Point(columnId * _config.config.map.columnWidth, 0);
	                tempColumnContainer.id = columnId;
	                gridContainers.push(tempColumnContainer);
	                grid.push([]);
	                for (var cellId = 0; cellId < tableData.lines; cellId++) {
	                    tempCell = new PIXI.Sprite();
	                    tempCell.width = _config.config.map.columnWidth;
	                    tempCell.height = _config.config.map.cellHeight;
	                    tempColumnContainer.addChild(tempCell);
	                    tempCell.position = new PIXI.Point(0, cellId * _config.config.map.cellHeight);
	                    grid[columnId].push(tempCell);
	                }
	            }
	            gridContainer.position = new PIXI.Point(0, _config.config.background.topOffset);
	            this._stage.addChild(gridContainer);
	            this._mapObject = {
	                grid: grid,
	                gridContainers: gridContainers
	            };
	        }

	        /**
	         * Implementation of TweenLite animation
	         * @param columnTo
	         * @param cellTo
	         * @param userId
	         * @param resolve
	         */

	    }, {
	        key: 'animateMoveTo',
	        value: function animateMoveTo(columnTo, cellTo, userId, resolve) {
	            var me = this,
	                currentColor = _config.config.map.colors[userId],
	                currentColumn = this._mapObject.gridContainers[columnTo],
	                currentCell = this._mapObject.grid[columnTo][cellTo],
	                newCircleObject = new PIXI.Graphics(),
	                animateSymbol = void 0,
	                currentX = currentColumn.x + _config.config.circle.radius / 2,
	                currentY = currentColumn.y + _config.config.circle.radius / 2,
	                toY = currentCell.y;

	            newCircleObject.beginFill(currentColor);
	            newCircleObject.drawCircle(currentX, currentY, _config.config.circle.radius);
	            newCircleObject.endFill();
	            newCircleObject = new PIXI.Sprite(newCircleObject.generateTexture());
	            currentColumn.addChild(newCircleObject);
	            animateSymbol = TweenLite.to(newCircleObject, _config.config.animation.time, {
	                y: toY,
	                onComplete: function onComplete() {
	                    var _iteratorNormalCompletion3 = true;
	                    var _didIteratorError3 = false;
	                    var _iteratorError3 = undefined;

	                    try {
	                        for (var _iterator3 = me._mapObject.gridContainers[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	                            var column = _step3.value;

	                            column.interactive = true;
	                        }
	                    } catch (err) {
	                        _didIteratorError3 = true;
	                        _iteratorError3 = err;
	                    } finally {
	                        try {
	                            if (!_iteratorNormalCompletion3 && _iterator3.return) {
	                                _iterator3.return();
	                            }
	                        } finally {
	                            if (_didIteratorError3) {
	                                throw _iteratorError3;
	                            }
	                        }
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

	    }, {
	        key: 'changeUser',
	        value: function changeUser(userName) {
	            var userId = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];

	            this._labels.currentUserLabel.text = _config.config.labels.currentUser.text + userName;
	            this._labels.currentUserLabel.style.fill = _config.config.labels.currentUser.fillColors[userId];
	        }

	        /**
	         * Draws a new round Id
	         * @param id
	         */

	    }, {
	        key: 'changeRound',
	        value: function changeRound(id) {
	            this._labels.roundIdLabel.text = _config.config.labels.roundId.text + id;
	        }

	        /**
	         * Show Win message
	         * @param name
	         */

	    }, {
	        key: 'showWin',
	        value: function showWin(name) {
	            this._labels.currentUserLabel.visible = false;
	            this._labels.winLabel.text = _config.config.labels.win.text + name + '!!!';
	            this._labels.winLabel.visible = true;
	        }

	        /**
	         * Clear map and changing user to dafault
	         */

	    }, {
	        key: 'startNewRound',
	        value: function startNewRound() {
	            this.changeUser(this.model.getData('currentUserName'));
	            this._labels.winLabel.visible = false;
	            this._labels.currentUserLabel.visible = true;
	            var _iteratorNormalCompletion4 = true;
	            var _didIteratorError4 = false;
	            var _iteratorError4 = undefined;

	            try {
	                for (var _iterator4 = this._mapObject.grid[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
	                    var grid = _step4.value;
	                    var _iteratorNormalCompletion5 = true;
	                    var _didIteratorError5 = false;
	                    var _iteratorError5 = undefined;

	                    try {
	                        for (var _iterator5 = grid[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
	                            var cell = _step5.value;

	                            cell.texture = PIXI.Texture.EMPTY;
	                        }
	                    } catch (err) {
	                        _didIteratorError5 = true;
	                        _iteratorError5 = err;
	                    } finally {
	                        try {
	                            if (!_iteratorNormalCompletion5 && _iterator5.return) {
	                                _iterator5.return();
	                            }
	                        } finally {
	                            if (_didIteratorError5) {
	                                throw _iteratorError5;
	                            }
	                        }
	                    }
	                }
	            } catch (err) {
	                _didIteratorError4 = true;
	                _iteratorError4 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion4 && _iterator4.return) {
	                        _iterator4.return();
	                    }
	                } finally {
	                    if (_didIteratorError4) {
	                        throw _iteratorError4;
	                    }
	                }
	            }
	        }
	    }]);

	    return GameView;
	}();

	exports.default = GameView;

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var config = exports.config = {
	    background: {
	        topOffset: 120
	    },
	    labels: {
	        roundId: {
	            text: 'This is move#',
	            style: {
	                font: 'bold 20px Arial',
	                fill: '#00ff00',
	                stroke: '#cccccc'
	            },
	            position: new PIXI.Point(0, 0)
	        },
	        currentUser: {
	            text: 'Now is a move of: ',
	            style: {
	                font: 'bold 40px Arial',
	                fill: '#ff0000',
	                stroke: '#cccccc'
	            },
	            fillColors: ['#0000ff', '#ff0000'],
	            position: new PIXI.Point(0, 50)
	        },
	        win: {
	            text: 'WIN of ',
	            style: {
	                font: 'bold 35px Arial',
	                fill: '#ffffff',
	                stroke: '#cccccc'
	            },
	            position: new PIXI.Point(100, 50)
	        },
	        newRound: {
	            text: 'New Round Begins!',
	            style: {
	                font: 'bold 20px Arial',
	                fill: '#00ff00',
	                stroke: '#cccccc'
	            },
	            position: new PIXI.Point(0, 0)
	        }
	    },
	    map: {
	        columnWidth: Math.ceil(640 / 7),
	        cellHeight: Math.ceil(480 / 6),
	        colors: [0xff0000, 0x0000ff]
	    },
	    circle: {
	        radius: 40
	    },
	    animation: {
	        time: .4,
	        autoStartTime: 2000
	    }
	};

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Base class for a model
	 */
	var Model = function () {
	  /**
	   * Setting of main property _data to class for further manipulating
	   */
	  function Model() {
	    _classCallCheck(this, Model);

	    this._data = {};
	  }

	  /**
	   * Getter for model
	   * @param alias
	   * @returns {*}
	   */


	  _createClass(Model, [{
	    key: "getData",
	    value: function getData(alias) {
	      return this._data[alias];
	    }

	    /**
	     * Setter for model
	     * @param alias
	     * @param data
	     * @returns {*}
	     */

	  }, {
	    key: "setData",
	    value: function setData(alias, data) {
	      this._data[alias] = data;

	      return this._data[alias];
	    }

	    /**
	     * Setter for data deleting
	     * @param alias
	     */

	  }, {
	    key: "deleteData",
	    value: function deleteData(alias) {
	      delete this._data[alias];
	    }
	  }]);

	  return Model;
	}();

	exports.default = Model;

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var config = {
	    users: ['User 1', 'User 2'],
	    table: {
	        rows: 7,
	        lines: 6
	    }
	};

	exports.default = config;

/***/ }
/******/ ]);