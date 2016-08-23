Four In Row game.
It's a very basic solution was made from scratch in approximately 4 hrs.
The main thing is to show module solution with minimum visual effects.

I used such technologies as: 
* [npm](www.npmjs.com) as a package runner
* [Bower](www.bower.io) as a libs packager
* [ES6](www.ecma-international.org/ecma-262/6.0/) as a language
* [WebPack](www.webpack.github.io) as ES6 builder and compiler
* [PIXI](www.pixijs.com) as a 2D renderer
* [TweenLite](https://greensock.com/tweenlite) as a tween library

Before the installation you need:
 * npm to be installed.
 * any local web server must be installed

All you need to build this app:
Go to root folder of this project and 
* Run: "npm install" to install base packages
* Run: "sudo npm run package" from unix system, or
"node_modules\.bin\bower install" from windows to install libraries
* Run: "sudo npm build" or "npm build" for compile the code

After this 3 short manipulations you will be able to run index.html from root folder.

DEMO PAGE IS HERE: https://bks777.github.io/Four-In-Row/