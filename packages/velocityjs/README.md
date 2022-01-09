[![npm](https://img.shields.io/npm/v/dat.gui.ease.velocityjs)](https://www.npmjs.com/package/dat.gui.ease.velocityjs) ![license](https://img.shields.io/npm/l/dat.gui.ease.velocityjs) [![npm peer dependency version](https://img.shields.io/npm/dependency-version/dat.gui.ease.velocityjs/peer/dat.gui.ease)](https://www.npmjs.com/package/dat.gui.ease) [![npm peer dependency version](https://img.shields.io/npm/dependency-version/dat.gui.ease.velocityjs/peer/velocity-animate)](https://www.npmjs.com/package/velocityjs)

# dat.GUI.Ease.VelocityJS

Provides support for [velocity.js](http://velocityjs.org/) [easings](http://velocityjs.org/#easing).

Example usage:
```javascript
import * as dat from 'dat.gui';
import { extend } from 'dat.gui.ease';
import VelocityJSMiddleware from 'dat.gui.ease.velocityjs';

extend(dat).use(
     new VelocityJSMiddleware()
);

const gui = new dat.GUI();
const config = {
     ease: "easeOutSine"
};

gui.addEase(config, "ease");
```

## Installation
```bash
npm install --save velocity-animate@^1.5.0
npm install --save-dev dat.gui dat.gui.ease dat.gui.ease.velocityjs
```
## Use in the project
1. File include:
```html
<script type="text/javascript" src="https://unpkg.com/dat.gui.ease.velocityjs@latest/dist/dat.gui.ease.velocityjs.min.js"></script>
<script>
     const middleware = new datGuiEaseVelocityJS.Middleware();
</script> 
```

2. ES6 module
```javascript
import VelocityJSMiddleware from 'dat.gui.ease.velocityjs';
// or
import { Middleware as VelocityJSMiddleware } from 'dat.gui.ease.velocityjs';

const middleware = new VelocityJSMiddleware();
```
3. CommonJS
```javascript
const datGuiEaseVelocityJS = require('dat.gui.ease.velocityjs');

const middleware = new datGuiEaseVelocityJS.Middleware();
```
