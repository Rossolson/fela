# fela-preset-dev

A Fela plugin preset for development.

> Do **not** use this preset in production!

#### Contains (exact order)
* [fela-plugin-logger](../fela-plugin-logger/)
* [fela-plugin-validator](../fela-plugin-validator/)


## Installation
```sh
npm i --save fela-preset-dev
```
Assuming you are using [npm](https://www.npmjs.com) as your package mananger you can just `npm install`.<br>
Otherwise we also provide a [UMD](https://github.com/umdjs/umd). You can easily use it via [unpkg](https://unpkg.com/). It registers a `FelaPresetDev` global.
```HTML
<!-- Fela (Development): Unminified version including all warnings -->
<script src="https://unpkg.com/fela-preset-dev@3.0.1/dist/fela-preset-dev.js"></script>
<!-- Fela (Production): Minified version -->
<script src="https://unpkg.com/fela-preset-dev@3.0.1/dist/fela-preset-dev.min.js"></script>
```

## Usage
Simply use the spread operator to add the preset.

```javascript
import { createRenderer } from 'fela'
import devPreset from 'fela-preset-dev'

const config = {
  plugins: [
    // other plugins,
    ...devPreset
  ]
}

const renderer = createRenderer(config)
```

## License
Fela is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Documentation is licensed under [Creative Common License](http://creativecommons.org/licenses/by/4.0/).<br>
Created with ♥ by [@rofrischmann](http://rofrischmann.de) and all the great contributors.
