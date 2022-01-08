[![npm](https://img.shields.io/npm/v/dat.gui.ease.animejs)](https://www.npmjs.com/package/dat.gui.ease.animejs) ![license](https://img.shields.io/npm/l/dat.gui.ease.animejs) [![npm peer dependency version](https://img.shields.io/npm/dependency-version/dat.gui.ease.animejs/peer/dat.gui.ease)](https://www.npmjs.com/package/dat.gui.ease) [![npm peer dependency version](https://img.shields.io/npm/dependency-version/dat.gui.ease.animejs/peer/animejs)](https://www.npmjs.com/package/animejs)

# dat.GUI.Ease.AnimeJS

Provides support for [anime.js](https://animejs.com/) [easings](https://animejs.com/documentation/#pennerFunctions).

Example usage:
```javascript
import * as dat from 'dat.gui';
import { extend } from 'dat.gui.ease';
import AnimeJSMiddleware, { CustomEase } from 'dat.gui.ease';

extend(dat).use(
     new AnimeJSMiddleware()
);

const gui = new dat.GUI();
const config = {
     ease: "easeOutSine"
     customEase: new CustomEase("M 0,0 C 0.1,0.4 0.1,0.4 0.5,0.5 0.9,0.6 0.9,0.6 1,1")
};

gui.addEase(config, "ease");
gui.addEase(config, "customEase");
```

## Installation
```bash
npm install --save animejs@^3.0.0
npm install --save-dev dat.gui dat.gui.ease dat.gui.ease.animejs
```
## Use in the project
1. File include:
```html
<script type="text/javascript" src="https://unpkg.com/dat.gui.ease.animejs@latest/dist/dat.gui.ease.animejs.min.js"></script>
 <script>
     const middleware = new datGuiEaseAnimeJS.Middleware();
</script> 
```

2. ES6 module
```javascript
import AnimeJSMiddleware from 'dat.gui.ease.animejs';
// or
import { Middleware as AnimeJSMiddleware } from 'dat.gui.ease.animejs';

const middleware = new AnimeJSMiddleware();
```
3. CommonJS
```javascript
const datGuiEaseAnimeJS = require('dat.gui.ease.gsap.v2');

const middleware = new datGuiEaseAnimeJS.Middleware();
```