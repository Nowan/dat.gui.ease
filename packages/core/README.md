[![npm](https://img.shields.io/npm/v/dat.gui.ease)](https://www.npmjs.com/package/dat.gui.ease) ![license](https://img.shields.io/npm/l/dat.gui.ease) [![npm peer dependency version](https://img.shields.io/npm/dependency-version/dat.gui.ease/peer/dat.gui)](https://www.npmjs.com/package/dat.gui)

# dat.GUI.Ease

An extension of [dat.GUI](https://github.com/dataarts/dat.gui) to edit animation easings in real time. 

## Installation
```bash
npm install --save-dev dat.gui dat.gui.ease
```
## Include to the project
1. File include:
```html
<script  type="'text/javascript" src="https://unpkg.com/dat.gui@^0.7.7/build/dat.gui.min.js"></script>
<script type="text/javascript" src="https://unpkg.com/dat.gui.ease@latest/dist/dat.gui.ease.min.js"></script><!-- adds 'datGuiEase' global variable -->
<link rel="stylesheet" type="text/css" href="https://unpkg.com/dat.gui.ease@latest/dist/dat.gui.ease.css">
```
2. ES6 module
```javascript
import * as dat from 'dat.gui';
import datGuiEase from 'dat.gui.ease';
import styles from 'dat.gui.ease/dist/dat.gui.ease.css';
```
3. CommonJS
```javascript
const dat = require('dat.gui');
const datGuiEase = require('dat.gui.ease');
const styles = require('dat.gui.ease/dist/dat.gui.ease.css');
```

## Set up the middleware
`Middleware` object is used to identify ease objects passed within `dat.GUI` instance via [`gui.add()`](https://github.com/dataarts/dat.gui/blob/master/API.md#GUI+add) method. You'll need to create one for your own ease format.

<br>

### new Middleware([name]) ⇒ `Middleware`
| Param        | Type   |  Description   |
|:---------------:|:-------------:|:-------------:|
| [name]  | `String` | Identification name for middleware. Purely descriptive |
```javascript
import datGuiEase, { Middleware, middleware } from "dat.gui.ease";

const myMiddleware = new Middleware("MyAnimationLib");
// Or static method, for your preference
const myMiddleware = middleware("MyAnimationLib");
```

### Middleware.prototype.preset(easeInstance, middlewarePresetInstance) => `Middleware`
Registers ease object as one of selectable options in `dat.GUI`. Once [`gui.add()`](https://github.com/dataarts/dat.gui/blob/master/API.md#GUI+add) encounters this instance under provided property, it will be recognized as ease and generates appropriate GUI for it.
| Param        | Type   |  Description   |
|:---------------:|:-------------:|:-------------:|
| easeInstance  | `Object` \| `String` | Instance of an object representing your ease |
| middlewarePresetInstance  | `EasePreset` | Middleware ease preset instance. Used to map your instance to middleware's `Ease` format and to generate GUI selection option in provided category. You can either declare your own, or use one of `presets` for [most common easings](https://easings.net/). |

```javascript
import datGuiEase, { middleware, presets } from "dat.gui.ease";
const {
     Linear,
     SineIn, SineOut, SineInOut,
     QuadIn, QuadOut, QuadInOut,
     CubicIn, CubicOut, CubicInOut,
     QuartIn, QuartOut, QuartInOut,
     ExpoIn, ExpoOut, ExpoInOut,
     CircIn, CircOut, CircInOut,
     BackIn, BackOut, BackInOut
} = presets;

middleware("MyAnimationLib")
     .preset("sine.out", SineOut),
     .preset("customSine.out", EasePreset.of("M 0,0 C 0.61,1 0.88,1 1,1", "CustomSine", "out"));
```

### Middleware.prototype.pick(predicateFn).transform(outInTransformationFn, inOutTransformationFn) ⇒ `Middleware`
Enables GUI editing mode if object under `dat.GUI` inspection fits `predicateFn`.
| Param        | Type   |  Description   |
|:---------------:|:-------------:|:-------------:|
| predicateFn  | `Function`<`Object` \| `String`> : `Boolean` | Predicate function returning whether object under inspection is valid for transformation in edit mode |
| outInTransformationFn  | `Function`<`Object` \| `String`> : `Ease` | Tranformation function to convert ease instance to middleware-supported `Ease` format |
| inOutTransformationFn  | `Function`<`Ease`> : `Object` \| `String` | Tranformation function to convert middleware-supported `Ease` instance back to the original format |

```javascript
import datGuiEase, { middleware } from "dat.gui.ease";

class MyEase {
     constructor(svgPath) {
          this.svgPath = svgPath;
     };
}

middleware("MyAnimationLib")
     .pick(datObject => datObject instanceof MyEase).transform(
          datEase => Ease.ofSVGPath(datEase.svgPath),
          middlewareEase => new MyEase(middlewareEase.svgPath));
```

## Set up the extension
After middleware is set up, all that's left is to add it within `use()` method, and feed `dat.GUI` a sample of your ease via [`gui.add()`](https://github.com/dataarts/dat.gui/blob/master/API.md#GUI+add) method:
```javascript
import dat from "dat.gui";
import datGuiEase, { middleware, presets } from "dat.gui.ease";

datGuiEase.extend(dat).use(
     middleware("MyAnimationLib")
          .preset("linear", presets.Linear)
          .preset("sine.in", presets.SineIn)
          .preset("sine.out", presets.SineOut)
          .preset("sine.inOut", presets.SineInOut)
          .preset("quad.in", presets.QuadIn)
          .preset("quad.out", preset.QuadOut)
          .preset("quad.inOut", preset.QuadInOut)
);

const gui = new dat.GUI();
const config = { ease: "linear" };
gui.add(config, "ease"); // Voila! MyEase object is editable in dat.GUI
```

<br>

#### Credits

[SidneyDouw/curvesjs](https://github.com/SidneyDouw/curvesjs) - minimalistic yet nonetheless powerful bezier curve editor with no dependencies - exactly what I've looked for. Hope it gets more attention.

[Jeremboo/dat.gui.image](https://github.com/Jeremboo/dat.gui.image) - gave me an idea of custom control for dat.GUI.
