'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Check for videojs before doing anything else:
function VideojsUndefinedException(message) {
  this.message = message;
}

var videojs = window.videojs;

if (!videojs) {
  throw new VideojsUndefinedException('video-bug: "videojs" is undefined!');
}
var VjsClickableComponent = videojs.getComponent('ClickableComponent');

/**
 * Bug UI Component class
 */

var BugComponent = function (_VjsClickableComponen) {
  _inherits(BugComponent, _VjsClickableComponen);

  function BugComponent(player, options) {
    _classCallCheck(this, BugComponent);

    return _possibleConstructorReturn(this, (BugComponent.__proto__ || Object.getPrototypeOf(BugComponent)).call(this, player, options));
  }

  // The `createEl` function of a component creates its DOM element.


  _createClass(BugComponent, [{
    key: 'createEl',
    value: function createEl() {
      var options = this.options();
      // We'll add our bug content to this element:
      var bugElement = videojs.createEl('span', {
        className: 'vjs-bug vjs-bug-' + options.position
      });
      // Create the image:
      var imgElement = videojs.createEl('img', {}, {
        src: options.imgSrc
      });

      // Possibly make it a link
      if (options.link) {
        var linkElement = videojs.createEl('a', {}, {
          href: options.link,
          target: '_blank'
        });

        linkElement.appendChild(imgElement);
        bugElement.appendChild(linkElement);
      } else {
        bugElement.className += ' no-link';
        bugElement.appendChild(imgElement);
      }

      // Styling
      bugElement.style.opacity = options.opacity;
      bugElement.style.padding = options.padding;
      if (options.width) {
        bugElement.width = options.width;
      }
      if (options.height) {
        bugElement.height = options.height;
      }
      return bugElement;
    }
  }]);

  return BugComponent;
}(VjsClickableComponent);

// Default options for the plugin.


var defaults = {
  height: false,
  imgSrc: '',
  link: null,
  opacity: 0.7,
  padding: '0px',
  position: 'br',
  width: false
};
// Cross-compatibility for Video.js 5 and 6.
var registerPlugin = videojs.registerPlugin || videojs.plugin;

var validateOptions = function validateOptions(options) {
  switch (options.position) {
    case 'tl':
    case 'tr':
    case 'bl':
    case 'br':
      break;
    default:
      options.position = 'br';
  }

  if (options.opacity > 1) {
    options.opacity = 1;
  }
  if (options.opacity < 0) {
    options.opacity = 0;
  }
};

/**
 * Function to invoke when the player is ready.
 *
 * This is a great place for your plugin to initialize itself. When this
 * function is called, the player will have its DOM and child components
 * in place.
 *
 * @function onPlayerReady
 * @param    {Player} player
 * @param    {Object} [options={}]
 */
var onPlayerReady = function onPlayerReady(player, options) {
  validateOptions(options);
  videojs.registerComponent('BugComponent', BugComponent);
  // Insert bug as first item after <video>:
  player.addChild('BugComponent', options, 1);
};

/**
 * A video.js plugin.
 *
 * In the plugin function, the value of `this` is a video.js `Player`
 * instance. You cannot rely on the player being in a "ready" state here,
 * depending on how the plugin is invoked. This may or may not be important
 * to you; if not, remove the wait for "ready"!
 *
 * @function bug
 * @param    {Object} [options={}]
 *           An object of options left to the plugin author to define.
 */
var bug = function bug(options) {
  var _this2 = this;

  this.ready(function () {
    onPlayerReady(_this2, videojs.mergeOptions(defaults, options));
  });
};

// Register the plugin with video.js.
registerPlugin('bug', bug);

// Include the version number.
bug.VERSION = '__VERSION__';

exports.default = bug;