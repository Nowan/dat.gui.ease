[![npm](https://img.shields.io/npm/v/dat.gui.ease.gsap.v2)](https://www.npmjs.com/package/dat.gui.ease.gsap.v2) ![license](https://img.shields.io/npm/l/dat.gui.ease.gsap.v2) [![npm peer dependency version](https://img.shields.io/npm/dependency-version/dat.gui.ease.gsap.v2/peer/dat.gui.ease)](https://www.npmjs.com/package/dat.gui.ease) [![npm peer dependency version](https://img.shields.io/npm/dependency-version/dat.gui.ease.gsap.v2/peer/gsap)](https://www.npmjs.com/package/gsap)

# dat.GUI.Ease.GSAP.v2

Provides support for GreenSock [Ease](https://greensock.com/docs/v2/Easing/Ease) classes.
[CustomEase](https://greensock.com/docs/v2/Easing/CustomEase) plugin can be provided to enable curve editing.

Example usage:
```javascript
import * as dat from 'dat.gui';
import { extend } from 'dat.gui.ease';
import GSAPv2Middleware from 'dat.gui.ease.gsap.v2';

extend(dat).use(
     new GSAPv2Middleware(CustomEase)
);
```

## Installation
```bash
npm install --save gsap@^2.0.0
npm install --save-dev dat.gui dat.gui.ease dat.gui.ease.gsap.v2
```
## Use in the project
1. File include:
```html
<script type="text/javascript" src="https://unpkg.com/dat.gui.ease.gsap.v2@latest/dist/dat.gui.ease.gsap.v2.min.js"></script>
 <script>
     const middleware = new datGuiEaseGsapV2.Middleware();
</script> 
```

2. ES6 module
```javascript
import GSAPv2Middleware from 'dat.gui.ease';
// or
import { Middleware as GSAPv2Middleware } from 'dat.gui.ease';
const middleware = new GSAPv2Middleware();
```
3. CommonJS
```javascript
const datGuiEaseGsapV2 = require('dat.gui.ease.gsap.v2');
const middleware = new datGuiEaseGsapV2.Middleware();
```