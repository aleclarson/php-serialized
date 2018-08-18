# php-serialized-ast v1.1.1

Mimics the `unserialize` function in PHP, but returns AST nodes instead.

Any syntax errors are returned in an array. The parser will continue until the end is reached or a fatal error is encountered. This means multiple errors can be returned.

When 1+ errors are encountered, the returned array will only contain error nodes. Use `results[0].type !== 'error'` to know if there are no errors.

```js
const {parse} = require('php-serialized-ast');

parse('a:0:{}'); => [{ type: 'array', value: [], start: 0, end: 6 }]

parse('a:0:{'); => [{ type: 'error', error: 'Array never closed', start: 0 }]
```

Passing `true` to `parse` will cause it to return raw values instead of AST nodes. Array nodes are *not* converted in any way.

```js
parse('a:1:{i:0;N;}', true); => [ [0, null] ]
```

Passing a function to `parse` will transform every parsed array.

```js
parse('a:1:{i:0;N;}', onArray); => [ [null] ]

function onArray(arr) {
  let res = [];
  for (let i = 0; i < arr.length; i += 2) {
    res[arr[i]] = arr[i + 1];
  }
  return res;
}
```

*Note:* Serialized class instances are not currently supported. Pull requests are encouraged!

&nbsp;

### `reduce(ast: Array<Node> | Node)`

Convert AST nodes to their raw values using the `reduce` function.

Array nodes are *not* converted in any way.

```js
const {reduce, parse} = require('php-serialized-ast');

reduce(parse('a:1:{i:0;N;}')); => [ [0, null] ]
```

*Note:* Doing `reduce(parse(str))` will always be slower doing `parse(str, true)` because of the intermediate AST nodes.
