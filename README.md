# videojs-bug

Adds a [logo bug](https://en.wikipedia.org/wiki/Digital_on-screen_graphic) to your videojs player with adjustable position, size, link, and opacity.

Example screenshot:

![Example Bug Screenshot](http://cdn.teamcococdn.com/file/screen-shot-2017-02-16-at-6-08-20-pm-58a65b5b2f8c7.png "example bug screenshot")

Originally brought to you by Team Coco. Yep, Conan has really been getting into JavaScript lately.

![Conan Typing](http://cdn.teamcococdn.com/file/ezgif-com-792b779215-58a6465534ac5.gif "Conan Typing")

## Installation

```sh
npm install --save videojs-bug
```

## Example

```html
<script src="//path/to/video.min.js"></script>
<script src="//path/to/videojs-bug.min.js"></script>
<script>
  var player = videojs('my-video');

  player.bug({
    height: 50,
    imgSrc: 'http://cdn.teamcococdn.com/image/frame:1/teamcoco_twitter_128x128.png',
    link: "http://www.teamcoco.com",
    opacity: 0.5,
    padding: '8px',
    position: 'br',
    width: 50
  });
</script>
```

## Options

#### height (integer)
Desired height of your bug. If not provided, original img height is used.

#### imgSrc (String, *mandatory*)
URL to the image you wish to use as a bug.

#### link (String)
URL that you would like to use as the `<a>`'s href value. If left blank, no `<a>` is used.

#### opacity (double)
Number between 0 and 1 used for the bug's opacity. Defaults to 0.7.

#### padding (String)
Padding string set on the bug. Accepts any valid CSS padding value. Defaults to '0px'.

#### position (String)
Where you want the bug to be placed within the videojs player. Valid values are:
 - 'tl' (top left)
 - 'tr' (top right)
 - 'bl' (bottom left)
 - 'br' (bottom right)

Any other value is changed to the default value 'br'.

#### width (integer)
Desired height of your bug. If not provided, original img width is used.

## Usage

To include videojs-bug on your website or web application, use any of the following methods.

### `<script>` Tag

This is the simplest case. Get the script in whatever way you prefer and include the plugin _after_ you include [video.js][videojs], so that the `videojs` global is available.

```html
<script src="//path/to/video.min.js"></script>
<script src="//path/to/videojs-bug.min.js"></script>
<script>
  var player = videojs('my-video');


  player.bug({
    height: 50,
    imgSrc: 'http://cdn.teamcococdn.com/image/frame:1/teamcoco_twitter_128x128.png',
    link: "http://www.teamcoco.com",
    opacity: 0.5,
    padding: '8px',
    position: 'br',
    width: 50
  });
</script>
```

### Browserify

When using with Browserify, install videojs-bug via npm and `require` the plugin as you would any other module.

```js
var videojs = require('video.js');

// The actual plugin function is exported by this module, but it is also
// attached to the `Player.prototype`; so, there is no need to assign it
// to a variable.
require('videojs-bug');

var player = videojs('my-video');

player.bug({
  height: 50,
  imgSrc: 'http://cdn.teamcococdn.com/image/frame:1/teamcoco_twitter_128x128.png',
  link: "http://www.teamcoco.com",
  opacity: 0.5,
  padding: '8px',
  position: 'br',
  width: 50
});
```

### RequireJS/AMD

When using with RequireJS (or another AMD library), get the script in whatever way you prefer and `require` the plugin as you normally would:

```js
require(['video.js', 'videojs-bug'], function(videojs) {
  var player = videojs('my-video');

  player.bug({
    height: 50,
    imgSrc: 'http://cdn.teamcococdn.com/image/frame:1/teamcoco_twitter_128x128.png',
    link: "http://www.teamcoco.com",
    opacity: 0.5,
    padding: '8px',
    position: 'br',
    width: 50
  });
});
```

## License

MIT. Copyright (c) johndanek &lt;john.danek@teamcoco.com&gt;


[videojs]: http://videojs.com/
