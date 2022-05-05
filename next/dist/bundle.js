/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__js_index__ = __webpack_require__(1);

//import './js/views/scss/view.scss';

//import { sepCarousel } from './js/plugin/carousel';
//import { loadDemoEvents, carouselView } from './js/plugin/demo';

// jQuery.fn.extend({
//   sepCarousel: sepCarousel
// });

(function () {
  $('#next-app').html(__WEBPACK_IMPORTED_MODULE_0__js_index__["a" /* mainView */]);

  $('.card').on('click', function (e) {
    e.preventDefault();
    $('.card').removeClass('selected').hide();
    $(this).addClass('selected').show();
  });

  $('.close-btn').on('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    $('.card').removeClass('selected').show();
  });

  //loadDemoEvents();
})();

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return mainView; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__views_scss_view_scss__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__views_scss_view_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__views_scss_view_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__card__ = __webpack_require__(17);





var mainView = `
<header>
  <div class="nav-container">
    <nav>
      <a>About</a>
      <a>CSS</a>
      <a>PLUGIN</a>
      <a>ART</a>
    </nav>
    <nav></nav>
  </div>
  </header>
  <div class="page">
  <div class="page-container">
    <div class="ss-cards-container">
    ${Object(__WEBPACK_IMPORTED_MODULE_2__card__["a" /* cards */])(__WEBPACK_IMPORTED_MODULE_1__components__["a" /* components */])}
    </div>
  </div>
</div>
<footer></footer>
`;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return components; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__views_hut__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__views_cube__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__views_gradient__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__views_roulette__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__views_text_animation__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__views_text_animation2__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__views_tiles_animation__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__views_ball__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__views_spiral__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__views_ball_3d__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__views_image_tiles__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__views_pattern__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__views_digits__ = __webpack_require__(16);














var components = [__WEBPACK_IMPORTED_MODULE_0__views_hut__["a" /* hutComponent */], __WEBPACK_IMPORTED_MODULE_1__views_cube__["a" /* cubeComponent */], __WEBPACK_IMPORTED_MODULE_2__views_gradient__["a" /* gradientComponent */], __WEBPACK_IMPORTED_MODULE_3__views_roulette__["a" /* rouletteComponent */], __WEBPACK_IMPORTED_MODULE_4__views_text_animation__["a" /* textAnimationComponent */], __WEBPACK_IMPORTED_MODULE_5__views_text_animation2__["a" /* textAnimation2Component */], __WEBPACK_IMPORTED_MODULE_6__views_tiles_animation__["a" /* tilesAnimationComponent */], __WEBPACK_IMPORTED_MODULE_7__views_ball__["a" /* ballComponent */], __WEBPACK_IMPORTED_MODULE_8__views_spiral__["a" /* spiralComponent */], __WEBPACK_IMPORTED_MODULE_9__views_ball_3d__["a" /* ball3DComponent */], __WEBPACK_IMPORTED_MODULE_10__views_image_tiles__["a" /* imageTileComponent */], __WEBPACK_IMPORTED_MODULE_11__views_pattern__["a" /* patternComponent */], __WEBPACK_IMPORTED_MODULE_12__views_digits__["a" /* squareComponent */]];



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return hutComponent; });
var hutComponent = {
  title: 'Hut using pure CSS',
  description: '',
  footerText: 'Last updated 29 Dec 2017',
  view: `
  <div class="view">
    <div class="hut-container">
      <div class="baseFrame">
        <ul class="mainFrame">
          <li class="frontTop"></li>
          <li class="backTop"></li>
          <li class="leftWall">
            <div class="photoFrame"><img src="https://raw.githubusercontent.com/saurabhsharma722/saurabhsharma722.github.com/master/demo/images/43D.jpg"/></div>
          </li>
          <li class="leftSideWall"></li>

          <li class="frontWall">
            <div class="doorBorder">
              <div class="leftDoor">
                <div class="glassBox"></div>
                <div class="glassBox"></div>
                <div class="glassBox" style="border-bottom:3px solid #806517;"></div>
              </div>
              <div class="rightDoor">
                <div class="glassBox"></div>
                <div class="glassBox"></div>
                <div class="glassBox" style="border-bottom:3px solid #806517;"></div>
              </div>
            </div>
          </li>
          <li class="frontWallfiller"></li>
          <li class="frontSideWallL"></li>
          <li class="frontSideWallR"></li>

          <li class="rightWall">
            <div class="window">
              <div class="leftWindowDoor"></div>
              <div class="rightWindowDoor"></div>
            </div>
          </li>
          <li class="rightSideWall"></li>

          <li class="backWall">
            <div class="photoFrame"><img src="https://raw.githubusercontent.com/saurabhsharma722/saurabhsharma722.github.com/master/demo/images/43D.jpg"/></div>
          </li>
          <li class="backSideWall"></li>

          <li class="topLeftRoof"></li>
          <li class="topRightRoof"></li>

          <li class="ground">
            <div class="groundGrass"></div>
          </li>
          <li class="roof"></li>
          <li class="bedbase"><img width="80" height="130" src="https://raw.githubusercontent.com/saurabhsharma722/saurabhsharma722.github.com/master/demo/images/bed.jpg"/></li>
          <li class="bedBackWall"></li>
          <li class="bedfrontWall"></li>
          <li class="bedLeftWall"></li>
          <li class="bedRightWall"></li>
        </ul>
      </div>
      <div class="moonContainer">
        <!--<div class="whiteMoon"></div>-->
        <div class="blackMoon"></div>
      </div>
    </div>
  </div>
  `
};



/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return cubeComponent; });
var cubeComponent = {
  title: 'Cube using pure CSS',
  description: '',
  footerText: 'Last updated 29 Dec 2017',
  view: `
    <div class='view cube-view'>
      <div class='holder'>
        <div class='cube-frame'>
          <div class='side s1'>One</div>
          <div class='side s2'>Two</div>
          <div class='side s3'>Three</div>
          <div class='side s4'>Four</div>
          <div class='side s5'>Five</div>
          <div class='side s6'>Six</div>
        </div>
      </div>
    </div>
  `
};


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return gradientComponent; });
var gradientComponent = {
  title: 'Gradient Shape using pure CSS',
  description: '',
  footerText: 'Last updated 29 Dec 2017',
  view: `
    <div class="view gradient-view">
      <div class="holder">
        <ul class="network">
          <li class="p1">Pure</li>
          <li class="p2">CSS</li>
          <li class="p3">Animation</li>
          <li class="p4">Created</li>
          <li class="p5">by</li>
          <li class="p6">Saurabh</li>
          <li class="p7">Sharma</li>
          <li class="p8">Front End</li>
          <li class="p9">Developer</li>
        </ul>
      </div>
    </div>
  `
};


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return rouletteComponent; });
var rouletteComponent = {
  title: 'Roulette using pure CSS',
  description: '',
  footerText: 'Last updated 30 Dec 2017',
  view: `
    <div class="view roulette-view">
      <div class="roulette-stand"></div>
      <ul class="piechart">
        <li><b><span>win $50</span></b></li>
        <li><b><span>try again</span></b></li>
        <li><b><span>Sorry</span></b></li>
        <li><b><span>win $1000</span></b></li>
        <li><b><span>Try Again</span></b></li>
        <li><b><span>Sorry</span></b></li>
        <li><b><span>win $100</span></b></li>
        <li><b><span>Sorry</span></b></li>
        <li id="spin_buttom">Spin it</li>
      </ul>
      <div class="roulette-pointer">
        <div class="pointer"></div>
      </div>
    </div>
  `
};



/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return textAnimationComponent; });
var textAnimationComponent = {
  title: 'Text Animation using pure CSS',
  description: '',
  footerText: 'Last updated 27 Dec 2017',
  view: `
    <div class="view text-animation-view">
      <div class="wall">
        <div class="ball1">S</div>
        <div class="ball2">A</div>
        <div class="ball3">U</div>
        <div class="ball4">R</div>
        <div class="ball5">A</div>
        <div class="ball6">B</div>
        <div class="ball7">H</div>
      </div>
    </div>
  `
};



/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return textAnimation2Component; });
var textAnimation2Component = {
	title: 'Text Animation using pure CSS',
	description: '',
	footerText: 'Last updated 27 Jan 2018',
	view: `
	<div class="view text-container">
		<div class="char-style bg-animation ch-s hidden tabindex"></div>
		<div class="text-style bg-animation text-1 tabindex">S</div>
		<div class="text-style bg-animation text-2 tabindex">A</div>
		<div class="text-style bg-animation text-3 tabindex">U</div>
		<div class="text-style bg-animation text-4 tabindex">R</div>
		<div class="text-style bg-animation text-5 tabindex">A</div>
		<div class="text-style bg-animation text-6 tabindex">B</div>
		<div class="text-style bg-animation text-7 tabindex">H</div>
		<div class="text-style bg-animation text-7 tabindex">H</div>
		<div class="circle"></div>
	</div>
	<script>
		function init() {
		  var $texts = $('.text-style, .circle');

		  $texts.on('click', function() {
			$texts.addClass('text-merge');
			setTimeout(function(){
				$('.text-merge').addClass('hidden');
				$('.char-style').toggleClass('hidden').addClass('rotate-and-sink');
			}, 600);

			setTimeout(function(){
				$('.char-style').toggleClass('rotate-and-sink').addClass('after-animation');
			}, 4000);
		  });
		}

		$(function(){
		  init();
		});

	</script>
	`
};



/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return tilesAnimationComponent; });
var tilesAnimationComponent = {
  title: 'Post login tiles using pure CSS',
  description: '',
  footerText: 'Last updated 29 Dec 2017',
  view: `
  <div class="view tiles-animation-view">
    <div class="wall">
      <div class="tap ball1"><div><br/><br/><br/>Tab 1</div></div>
      <div class="tap ball2"><div style="padding-top: 40px;"><br/><br/>Tab 2</div></div>
      <div class="tap ball3"><div><br/><br/><br/>Tab 3</div></div>
      <div class="tap ball4"><div><br/><br/><br/>Tab 4</div></div><!---->
    </div>
  </div>
  `
};



/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ballComponent; });
var ballComponent = {
    title: 'Ball tiles using pure CSS',
    description: '',
    footerText: 'Last updated 29 Dec 2017',
    view: `
    <div class="view ball-view">
        <div class="ball">
            <div class="ball_item"></div>
            <div class="ball_item"></div>
            <div class="ball_item"></div>
            <div class="ball_item"></div>
            <div class="ball_item"></div>
            <div class="ball_item"></div>
            <div class="ball_item"></div>
            <div class="ball_item"></div>
            <div class="ball_item"></div>
            <div class="ball_item"></div>
            <div class="ball_item"></div>
            <div class="ball_item"></div>
            <div class="ball_item"></div>
            <div class="ball_item"></div>
            <div class="ball_item"></div>
        </div>
    </div>
    `
};



/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return spiralComponent; });
var spiralComponent = {
    title: 'Ball tiles using pure CSS',
    description: '',
    footerText: 'Last updated 29 Dec 2017',
    view: `
    <div class="view spiral-view">
        <div class="ball">
            <div class="ball_item"></div>
        </div>
    </div>
    `
};



/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ball3DComponent; });
function get3dView(num) {
    var view = '';

    for (let i = 0; i < num; i++) {
        view += '<div class="ball_item"></div>';
    }

    return view;
}

var ball3DComponent = {
    title: 'Ball tiles using pure CSS',
    description: '',
    footerText: 'Last updated 29 Dec 2017',
    view: `
    <div class="view ball-3d-view">
        <div class="ball">
            ${get3dView(60)}
        </div>
    </div>
    `
};



/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return imageTileComponent; });
function getPxlView(num) {
	var view = '';

	for (let i = 0; i < num; i++) {
		view += `<div class="unit"></div>`;
	}

	return view;
}
// 
var imageTileComponent = {
	title: 'Text Animation using pure CSS',
	description: '',
	footerText: 'Last updated 27 Jan 2018',
	view: `
	<div class="view image-tile-container">
		<div class="tile-container">
			<span class="pixel">
				${getPxlView(897)}
			</span>
		</div>
	</div>
	`
};



/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return patternComponent; });
var patternComponent = {
    title: 'Ball tiles using pure CSS',
    description: '',
    footerText: 'Last updated 29 Dec 2017',
    view: `
    <div class="view dot-view">
        <div class="dot"></div>
    </div>
    `
};



/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return squareComponent; });
var squareComponent = {
    title: 'Square tiles using pure CSS',
    description: '',
    footerText: 'Last updated 29 Dec 2017',
    view: `
    <div class="view square-view">
        <div class="square"></div>
    </div>
    `
};



/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return cards; });
function card(component) {
  var selected = component.title == 'Shadow Animation using pure CSS1' ? ' selected' : '';
  return `
  <a class="ss-card${selected}">
    <span class="close-btn">✕</span>
    <div class="view-display">
      <div class="frame">
        ${component.view}
      </div>
    </div>

    <div class="card-block">
      <h4 class="card-title">${component.title}</h4>
      <p class="card-text">
        ${component.description}
      </p>
    </div>
    <div class="card-footer">
      <small class="text-muted">${component.footerText}</small>
    </div>
  </a>
  `;
}

function cards(components) {
  var cardsView = '';

  for (let i = 0; i < components.length; i++) {
    cardsView += card(components[i]);
  }

  return cardsView;
}



/***/ })
/******/ ]);