[![npm](https://img.shields.io/npm/v/dat.gui.ease)](https://www.npmjs.com/package/dat.gui.ease) ![license](https://img.shields.io/npm/l/dat.gui.ease) [![npm peer dependency version](https://img.shields.io/npm/dependency-version/dat.gui.ease/peer/dat.gui)](https://www.npmjs.com/package/dat.gui)

# dat.GUI.Ease

An extension of [dat.GUI](https://github.com/dataarts/dat.gui) to edit animation easings in real time. See **[Live Demo](https://codepen.io/nowan-the-vuer/pen/xxXaqor)**.

![Extension preview](https://raw.githubusercontent.com/Nowan/dat.gui.ease/master/docs/images/panel-preview.png)

## Installation
```bash
npm install --save-dev dat.gui dat.gui.ease
```
## Include to the project
1. File include:
```html
<script type="'text/javascript" src="https://unpkg.com/dat.gui@^0.7.7/build/dat.gui.min.js"></script>
<script type="text/javascript" src="https://unpkg.com/dat.gui.ease@latest/dist/dat.gui.ease.min.js"></script><!-- adds 'datGuiEase' global variable -->
<link rel="stylesheet" type="text/css" href="https://unpkg.com/dat.gui.ease@latest/dist/dat.gui.ease.css">

<script>
     const { datGuiEase } = window;
</script>
```
2. ES6 module
```javascript
import * as dat from 'dat.gui';
import datGuiEase from 'dat.gui.ease';
import 'dat.gui.ease/dist/dat.gui.ease.css';
```


3. CommonJS
```javascript
const dat = require('dat.gui');
const datGuiEase = require('dat.gui.ease');
const styles = require('dat.gui.ease/dist/dat.gui.ease.css');
```

## Set up the extension
```javascript
datGuiEase.extend(dat);

const gui = new dat.GUI();
const config = { ease: {} };

gui.addEase(config, "ease"); // Shows warning "No compatible middleware found"
```

To enable processing of ease objects, a `Middleware` object should be provided within the `use()` method:
```javascript
import datGuiEase, { middleware, presets } from "dat.gui.ease";

datGuiEase.extend(dat).use(
     middleware()
          .preset("sine.in", presets.SineIn)
          .preset("sine.out", presets.SineOut)
          .preset("sine.inOut", presets.SineInOut)
          .preset("quad.in", presets.QuadIn)
          .preset("quad.out", presets.QuadOut)
          .preset("quad.inOut", presets.QuadInOut)
);

const gui = new dat.GUI();
const config = { ease: "sine.in" };

gui.addEase(config, "ease"); // Voila! Ease is editable in dat.GUI
```
You can either configure your own `Middleware` with [Middleware API](https://github.com/Nowan/dat.gui.ease/tree/master/packages/core#setUpMiddlewares), or use one of preconfigured ones for animation library you're using:
| Library        | Package   | Middleware   |
|:---------------:|:-------------:|:-------------:|
| [anime.js](https://animejs.com/)  | [dat.gui.ease.animejs](https://www.npmjs.com/package/dat.gui.ease.animejs)&nbsp;&nbsp;&nbsp;[![npm](https://img.shields.io/npm/v/dat.gui.ease.animejs)](https://www.npmjs.com/package/dat.gui.ease.animejs) | [AnimeJSMiddleware](https://github.com/Nowan/dat.gui.ease/tree/master/packages/animejs) |
| [GSAP](https://greensock.com/)  | [dat.gui.ease.gsap.v2](https://www.npmjs.com/package/dat.gui.ease.gsap.v2)&nbsp;&nbsp;&nbsp;[![npm](https://img.shields.io/npm/v/dat.gui.ease.gsap.v2)](https://www.npmjs.com/package/dat.gui.ease.gsap.v2)<br>[dat.gui.ease.gsap.v3](https://www.npmjs.com/package/dat.gui.ease.gsap.v3)&nbsp;&nbsp;&nbsp;[![npm](https://img.shields.io/npm/v/dat.gui.ease.gsap.v3)](https://www.npmjs.com/package/dat.gui.ease.gsap.v3) | [GSAPv2Middleware](https://github.com/Nowan/dat.gui.ease/tree/master/packages/gsap-v2)<br>[GSAPv3Middleware](https://github.com/Nowan/dat.gui.ease/tree/master/packages/gsap-v3) |
| [velocity.js](http://velocityjs.org/)  | [dat.gui.ease.velocityjs](https://www.npmjs.com/package/dat.gui.ease.velocityjs)&nbsp;&nbsp;&nbsp;[![npm](https://img.shields.io/npm/v/dat.gui.ease.velocityjs)](https://www.npmjs.com/package/dat.gui.ease.velocityjs) | [VelocityJSMiddleware](https://github.com/Nowan/dat.gui.ease/tree/master/packages/velocityjs) |
| [tween.js](http://tweenjs.github.io/tween.js/)  | [dat.gui.ease.tweenjs](https://www.npmjs.com/package/dat.gui.ease.tweenjs)&nbsp;&nbsp;&nbsp;[![npm](https://img.shields.io/npm/v/dat.gui.ease.tweenjs)](https://www.npmjs.com/package/dat.gui.ease.tweenjs) | [TweenJSMiddleware](https://github.com/Nowan/dat.gui.ease/tree/master/packages/tweenjs) |

<br>

### Credits

[SidneyDouw/curvesjs](https://github.com/SidneyDouw/curvesjs) - minimalistic yet nonetheless powerful bezier curve editor with no dependencies.

[Pomax/bezierjs](https://github.com/Pomax/bezierjs) - a powerful bezier curve computation library.

[Jeremboo/dat.gui.image](https://github.com/Jeremboo/dat.gui.image) - another custom control for dat.GUI, an inspiration for this package.
