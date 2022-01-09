[![npm](https://img.shields.io/npm/v/dat.gui.ease.gsap.v3)](https://www.npmjs.com/package/dat.gui.ease.gsap.v3) ![license](https://img.shields.io/npm/l/dat.gui.ease.gsap.v3) [![npm peer dependency version](https://img.shields.io/npm/dependency-version/dat.gui.ease.gsap.v3/peer/dat.gui.ease)](https://www.npmjs.com/package/dat.gui.ease) [![npm peer dependency version](https://img.shields.io/npm/dependency-version/dat.gui.ease.gsap.v3/peer/gsap)](https://www.npmjs.com/package/gsap)

# dat.GUI.Ease.GSAP.v3

Provides support for [GSAP easings](https://greensock.com/docs/v3/Eases).
[CustomEase](https://greensock.com/docs/v3/Eases/CustomEase) plugin can be provided to enable `CustomEase` processing and ease editing.

Example usage:
```javascript
import * as dat from 'dat.gui';
import { extend } from 'dat.gui.ease';
import GSAPv3Middleware from 'dat.gui.ease.gsap.v3';

extend(dat).use(
     new GSAPv3Middleware(CustomEase)
);

const gui = new dat.GUI();
const config = {
     ease: "power1.in"
     customEase: CustomEase.create("custom", "M 0,0 C 0.1,0.4 0.1,0.4 0.5,0.5 0.9,0.6 0.9,0.6 1,1")
};

gui.addEase(config, "ease");
gui.addEase(config, "customEase");
```

## Installation
```bash
npm install --save gsap@^3.0.0
npm install --save-dev dat.gui dat.gui.ease dat.gui.ease.gsap.v3
```
## Use in the project
1. File include:
```html
<script type="text/javascript" src="https://unpkg.com/dat.gui.ease.gsap.v3@latest/dist/dat.gui.ease.gsap.v3.min.js"></script>
<script>
     const middleware = new datGuiEaseGsapV3.Middleware();
</script> 
```

2. ES6 module
```javascript
import GSAPv3Middleware from 'dat.gui.ease';
// or
import { Middleware as GSAPv3Middleware } from 'dat.gui.ease';
const middleware = new GSAPv3Middleware();
```
3. CommonJS
```javascript
const datGuiEaseGsapV3 = require('dat.gui.ease.gsap.v3');
const middleware = new datGuiEaseGsapV3.Middleware();
```

## Adding ease gui
1. Standard ease
```javascript
let gui = new dat.GUI();
gui.addEase({ ease: "power1.out" }, "ease");
```


2. Custom ease
```javascript
let gui = new dat.GUI();
let myCustomEase = new CustomEase("myCustomEaseName", "M0,0,C0.036,0.208,0.216,0.488,0.486,0.488,0.742,0.488,1,0.362,1,0.01");
gui.addEase({ ease: myCustomEase }, "ease");
```