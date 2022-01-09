[![npm](https://img.shields.io/npm/v/dat.gui.ease.tweenjs)](https://www.npmjs.com/package/dat.gui.ease.tweenjs) ![license](https://img.shields.io/npm/l/dat.gui.ease.tweenjs) [![npm peer dependency version](https://img.shields.io/npm/dependency-version/dat.gui.ease.tweenjs/peer/dat.gui.ease)](https://www.npmjs.com/package/dat.gui.ease) [![npm peer dependency version](https://img.shields.io/npm/dependency-version/dat.gui.ease.tweenjs/peer/@tweenjs/tween.js)](https://www.npmjs.com/package/@tweenjs/tween.js)

# dat.GUI.Ease.TweenJS

Provides support for [tween.js](http://tweenjs.github.io/tween.js/) [easings](https://github.com/tweenjs/tween.js/blob/master/docs/user_guide.md#available-easing-functions-tweeneasing).

Example usage:
```javascript
import * as dat from 'dat.gui';
import { extend } from 'dat.gui.ease';
import TweenJSMiddleware, { CustomEase } from 'dat.gui.ease.tweenjs';
import { Easing } from '@tweenjs/tween.js';

extend(dat).use(
     new TweenJSMiddleware()
);

const gui = new dat.GUI();
const config = {
     ease: Easing.Sinusoidal.Out,
     customEase: new CustomEase("M 0,0 C 0.1,0.4 0.1,0.4 0.5,0.5 0.9,0.6 0.9,0.6 1,1")
};

gui.addEase(config, "ease");
gui.addEase(config, "customEase");
```

## Installation
```bash
npm install --save @tweenjs/tween.js@^18.0.0
npm install --save-dev dat.gui dat.gui.ease dat.gui.ease.tweenjs
```
## Use in the project
1. File include:
```html
<script type="text/javascript" src="https://unpkg.com/dat.gui.ease.tweenjs@latest/dist/dat.gui.ease.tweenjs.min.js"></script>
<script>
     const middleware = new datGuiEaseTweenJS.Middleware();
</script> 
```

2. ES6 module
```javascript
import TweenJSMiddleware from 'dat.gui.ease.tweenjs';
// or
import { Middleware as TweenJSMiddleware } from 'dat.gui.ease.tweenjs';

const middleware = new TweenJSMiddleware();
```
3. CommonJS
```javascript
const datGuiEaseTweenJS = require('dat.gui.ease.tweenjs');

const middleware = new datGuiEaseTweenJS.Middleware();
```
