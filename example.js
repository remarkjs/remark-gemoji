// Dependencies:
var remark = require('remark');
var inspect = require('unist-util-inspect');
var gemoji = require('./index.js');

// Without this plug-in:
var tree = remark().parse(':heavy_check_mark:', {
    'pedantic': true
});

// Yields:
console.log('txt', inspect.noColor(tree.children[0]));

// With this plug-in:
tree = remark().use(gemoji).parse(':heavy_check_mark:', {
    'pedantic': true
});

// Yields:
console.log('txt', inspect.noColor(tree.children[0]));
