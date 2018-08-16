# php-serialized-ast v1.0.0

Mimics the `unserialize` function in PHP, but returns AST nodes instead.

Any syntax errors are returned in an array. The parser will continue until the end is reached or a fatal error is encountered. This means multiple errors can be returned.

When 1+ errors are encountered, the returned array will only contain error nodes. Use `results[0].type !== 'error'` to know if there are no errors.

```js
const {parse} = require('php-unserialize-ast');

parse('a:0:{}'); => [{ type: 'array', value: [], start: 0, end: 6 }]

parse('a:0:{'); => [{ type: 'error', error: 'Array never closed', start: 0 }]
```

*Note:* Serialized class instances are not currently supported. Pull requests are encouraged!
