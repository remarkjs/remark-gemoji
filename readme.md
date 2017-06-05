# remark-gemoji [![Build Status][travis-badge]][travis] [![Coverage Status][codecov-badge]][codecov] [![Chat][chat-badge]][chat]

Gemoji short-code support in [**remark**][remark].

## Installation

[npm][]:

```bash
npm install remark-gemoji
```

## Usage

Say `example.js` looks as follows (note `remark-gemoji` isn’t used):

```javascript
var unified = require('unified');
var parse = require('remark-parse');

var tree = unified()
  .use(parse)
  .data('settings', {pedantic: true, position: false})
  .parse(':heavy_check_mark:');

console.dir(tree, {depth: null});
```

Running `node example` yields:

```js
{ type: 'root',
  children:
   [ { type: 'paragraph',
       children:
        [ { type: 'text', value: ':heavy' },
          { type: 'emphasis',
            children: [ { type: 'text', value: 'check' } ] },
          { type: 'text', value: 'mark:' } ] } ] }
```

If we now add `remark-gemoji` by applying the following diff to `example.js`:

```diff
 var parse = require('remark-parse');
+var gemoji = require('remark-gemoji');

 var tree = unified()
+  .use(gemoji)
   .use(parse)
```

If we now run `node example` again, you’ll see the following:

```js
{ type: 'root',
  children:
   [ { type: 'paragraph',
       children: [ { type: 'text', value: ':heavy_check_mark:' } ] } ] }
```

## API

### `remark.use(gemoji)`

Gemoji short-code support in [**remark**][remark].
This doesn’t do much other than creating whole [`Text`][text] nodes
for emoji, and ensuring gemoji short-codes with underscores are not
seen as emphasis in pedantic mode.

> **Note**: when compiling, `pedantic` must be false!  Otherwise,
> the underscores in gemoji short-codes are still escaped.
>
> Although, GitHub itself doesn’t care: :heavy_check_mark:.

## Related

*   [`remark-gemoji-to-emoji`][gemoji-to-emoji]
    — Transform gemoji shortcodes into emoji unicodes;
*   [`remark-html-emoji-image`][html-emoji-image]
    — Transform emoji unicodes into html images;
*   [`remark-emoji-to-gemoji`][emoji-to-gemoji]
    — Transform emoji unicodes into gemoji shortcodes.

## License

[MIT](LICENSE) © [Titus Wormer](http://wooorm.com)

<!-- Definitions -->

[travis-badge]: https://img.shields.io/travis/wooorm/remark-gemoji/master.svg

[travis]: https://travis-ci.org/wooorm/remark-gemoji

[codecov-badge]: https://img.shields.io/codecov/c/github/wooorm/remark-gemoji.svg

[codecov]: https://codecov.io/github/wooorm/remark-gemoji

[chat-badge]: https://img.shields.io/gitter/room/wooorm/remark.svg

[chat]: https://gitter.im/wooorm/remark

[npm]: https://docs.npmjs.com/cli/install

[remark]: https://github.com/wooorm/remark

[text]: https://github.com/syntax-tree/mdast#textnode

[gemoji-to-emoji]: https://github.com/jackycute/remark-gemoji-to-emoji

[html-emoji-image]: https://github.com/jackycute/remark-html-emoji-image

[emoji-to-gemoji]: https://github.com/jackycute/remark-emoji-to-gemoji
