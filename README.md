# postcss-global-nested [![Build Status](https://travis-ci.org/a-x-/postcss-global-nested.svg?branch=master)](https://travis-ci.org/a-x-/postcss-global-nested)

Wrap styles into a `:global` like [postcss-nested](https://github.com/postcss/postcss-nested) does it for usual selectors.

You should use `:global` as rare as you can.

## usage

test.css:
```css
:global {
  .foo {}
  .bar {}
}
```

### Use it with `postcss`, `postcss-nested` and `webpack`
```json5
{
  loader: 'postcss-loader',
  options: {
    plugins: [
      require('autoprefixer')({
        browsers: ['last 2 version'],
      }),
      require('postcss-nested')({}),
      require('postcss-global-nested')({}),
    ],
  },
}
```

### Use it w/ vanilla `postcss` and `postcss-nested`
```js
import pcss from 'postcss';
import nested from 'postcss-nested';
import globalNested from 'postcss-global-nested';

(async () => {
  const css = await fs.readFile('test.css', 'utf8');
  const result = await pcss([nested, globalNested]).process(css);
  result.css // -> ':global(.foo) {} :global(.bar) {}'
 })();
```
