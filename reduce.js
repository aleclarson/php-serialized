
function reduce(ast) {
  return Array.isArray(ast) ?
    ast.map(reduceNode) : reduceNode(ast);
}

function reduceNode(node) {
  if (node.type == 'array') {
    let map = new Map;
    let nodes = node.value;
    for (let i = 0; i < nodes.length; i += 2) {
      let key = nodes[i], val = nodes[i + 1];
      map.set(reduceNode(key), reduceNode(val));
    }
    return map;
  }
  if (node.type == 'error') {
    let e = new Error(node.value);
    e.start = node.start;
    throw e;
  }
  return node.value;
}

module.exports = reduce;
