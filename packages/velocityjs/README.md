[![npm](https://img.shields.io/npm/v/dat.gui.ease.animejs)](https://www.npmjs.com/package/dat.gui.ease.animejs) ![license](https://img.shields.io/npm/l/dat.gui.ease.animejs) [![npm peer dependency version](https://img.shields.io/npm/dependency-version/dat.gui.ease.animejs/peer/dat.gui.ease)](https://www.npmjs.com/package/dat.gui.ease) [![npm peer dependency version](https://img.shields.io/npm/dependency-version/dat.gui.ease.animejs/peer/animejs)](https://www.npmjs.com/package/animejs)

# dat.GUI.Ease.AnimeJS

Provides support for [anime.js](https://animejs.com/) [easings](https://animejs.com/documentation/#pennerFunctions).

Example usage:
```javascript
import * as dat from 'dat.gui';
import { extend } from 'dat.gui.ease';
import VelocityJSMiddleware from 'dat.gui.ease';

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
npm install --save animejs@^3.0.0
npm install --save-dev dat.gui dat.gui.ease dat.gui.ease.animejs
```
## Use in the project
1. File include:
```html
<script type="text/javascript" src="https://unpkg.com/dat.gui.ease.velocityjs@latest/dist/dat.gui.ease.animejs.min.js"></script>
<script>
     const middleware = new datGuiEaseVelocityJS.Middleware();
</script> 
```

2. ES6 module
```javascript
import VelocityJSMiddleware from 'dat.gui.ease.animejs';
// or
import { Middleware as VelocityJSMiddleware } from 'dat.gui.ease.animejs';

const middleware = new VelocityJSMiddleware();
```
3. CommonJS
```javascript
const datGuiEaseVelocityJS = require('dat.gui.ease.gsap.v2');

const middleware = new datGuiEaseVelocityJS.Middleware();
```