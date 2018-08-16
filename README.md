# php-unserialize v1.0.0

Mimics the `unserialize` function in PHP, but returns AST nodes instead.

Any syntax errors are returned in an array. The parser will continue until the end is reached or a fatal error is encountered. This means multiple errors can be returned.

```js
const {parse} = require('php-unserialize');

parse('a:0:{}'); => [{ type: 'array', value: [], start: 0, end: 6 }]

parse('a:0:{'); => [{ type: 'error', error: 'Array never closed', start: 0 }]
```
