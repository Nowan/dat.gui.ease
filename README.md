[![npm](https://img.shields.io/npm/v/dat.gui.ease)](https://www.npmjs.com/package/dat.gui.ease) ![license](https://img.shields.io/npm/l/dat.gui.ease) [![npm peer dependency version](https://img.shields.io/npm/dependency-version/dat.gui.ease/peer/dat.gui)](https://www.npmjs.com/package/dat.gui)

# dat.GUI.Ease

An extension of [dat.GUI](https://github.com/dataarts/dat.gui) to edit animation easings in real time. 

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
You can configure your own `Middleware` as described [here](https://github.com/Nowan/dat.gui.ease/tree/master/packages/core), or use from the list below:

<table align="center">
    <thead>
        <tr>
            <th align="center">Library</th>
            <th colspan=2 align="center">Package</th>
            <th align="center">Middleware</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td rowspan=2 align="center"><a link="https://greensock.com/">GSAP</a></td>
            <td align="left"><a link="https://www.npmjs.com/package/dat.gui.ease.gsap.v2">dat.gui.ease.gsap.v2</a></td>
            <td align="center"><img alt="npm" src="https://img.shields.io/npm/v/dat.gui.ease.gsap.v2"></td>
            <td align="center"><a link="https://github.com/Nowan/dat.gui.ease/tree/master/packages/gsap-v2">GSAPv2Middleware</a></td>
        </tr>
        <tr>
            <td align="left"><a link="https://www.npmjs.com/package/dat.gui.ease.gsap.v3">dat.gui.ease.gsap.v3</a></td>
            <td align="center"><img alt="npm" src="https://img.shields.io/npm/v/dat.gui.ease.gsap.v3"></td>
            <td align="center"><a link="https://github.com/Nowan/dat.gui.ease/tree/master/packages/gsap-v3">GSAPv3Middleware</a></td>
        </tr>
        <tr>
            <td align="left"><a link="https://animejs.com/">anime.js</a></td>
            <td align="left"><a link="https://www.npmjs.com/package/dat.gui.ease.animejs">dat.gui.ease.animejs</a></td>
            <td align="center"><img alt="npm" src="https://img.shields.io/npm/v/dat.gui.ease.animejs"></td>
            <td align="center"><a link="https://github.com/Nowan/dat.gui.ease/tree/master/packages/animejs">AnimeJSMiddleware</a></td>
        </tr>
        <tr>
            <td align="center"><a link="http://tweenjs.github.io/tween.js/">tween.js</a></td>
            <td align="left">in progress</td>
            <td align="center">—</td>
            <td align="center">—</td>
        </tr>
    </tbody>
</table>

<br>

### Credits

[SidneyDouw/curvesjs](https://github.com/SidneyDouw/curvesjs) - minimalistic yet nonetheless powerful bezier curve editor with no dependencies.

[Pomax/bezierjs](https://github.com/Pomax/bezierjs) - a powerful bezier curve computation library.

[Jeremboo/dat.gui.image](https://github.com/Jeremboo/dat.gui.image) - another custom control for dat.GUI, an inspiration for this package.
