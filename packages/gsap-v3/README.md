[![npm](https://img.shields.io/npm/v/dat.gui.ease.gsap.v3)](https://www.npmjs.com/package/dat.gui.ease.gsap.v3) ![license](https://img.shields.io/npm/l/dat.gui.ease.gsap.v3) [![npm peer dependency version](https://img.shields.io/npm/dependency-version/dat.gui.ease.gsap.v3/peer/dat.gui.ease)](https://www.npmjs.com/package/dat.gui.ease) [![npm peer dependency version](https://img.shields.io/npm/dependency-version/dat.gui.ease.gsap.v3/peer/gsap)](https://www.npmjs.com/package/gsap)

# dat.GUI.Ease.GSAP.v3

Provides support for GreenSock [Ease](https://greensock.com/docs/v3/Eases) classes.
[CustomEase](https://greensock.com/docs/v3/Eases/CustomEase) plugin should be provided to enable curve editing.

Example usage:
```javascript
import * as dat from 'dat.gui';
import { extend } from 'dat.gui.ease';
import GSAPv3Middleware from 'dat.gui.ease.gsap.v3';

extend(dat).use(
     new GSAPv3Middleware(CustomEase)
);
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