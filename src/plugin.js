// Check for videojs before doing anything else:
function VideojsUndefinedException(message) {
  this.message = message;
}

const videojs = window.videojs;

if (!videojs) {
  throw new VideojsUndefinedException('video-bug: "videojs" is undefined!');
}
const VjsClickableComponent = videojs.getComponent('ClickableComponent');

/**
 * Bug UI Component class
 */
class BugComponent extends VjsClickableComponent {

  constructor(player, options) {
    super(player, options);
  }

  // The `createEl` function of a component creates its DOM element.
  createEl() {
    let options = this.options();
    // We'll add our bug content to this element:
    let bugElement = videojs.createEl('span', {
      className: 'vjs-bug vjs-bug-' + options.position
    });
    // Create the image:
    let imgElement = videojs.createEl('img', {}, {
      src: options.imgSrc
    });

    // Possibly make it a link
    if (options.link) {
      let linkElement = videojs.createEl('a', {}, {
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
}

// Default options for the plugin.
const defaults = {
  height: false,
  imgSrc: '',
  link: null,
  opacity: 0.7,
  padding: '0px',
  position: 'br',
  width: false
};
// Cross-compatibility for Video.js 5 and 6.
const registerPlugin = videojs.registerPlugin || videojs.plugin;

const validateOptions = (options) => {
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
const onPlayerReady = (player, options) => {
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
const bug = function(options) {

  this.ready(() => {
    onPlayerReady(this, videojs.mergeOptions(defaults, options));
  });
};

// Register the plugin with video.js.
registerPlugin('bug', bug);

// Include the version number.
bug.VERSION = '__VERSION__';

export default bug;
