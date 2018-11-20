# remark-gemoji

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Chat][chat-badge]][chat]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]

Gemoji short-code support in [**remark**][remark].

## Installation

[npm][]:

```bash
npm install remark-gemoji
```

## Usage

Say `example.js` looks as follows (note: `remark-gemoji` isn’t used):

```javascript
var unified = require('unified')
var parse = require('remark-parse')

var tree = unified()
  .use(parse, {pedantic: true, position: false})
  .parse(':heavy_check_mark:')

console.dir(tree, {depth: null})
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
 var parse = require('remark-parse')
+var gemoji = require('remark-gemoji')

 var tree = unified()
   .use(parse, {pedantic: true, position: false})
+  .use(gemoji)
   .parse(':heavy_check_mark:')
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
for gemoji, and ensuring gemoji short-codes with underscores are not
seen as emphasis in pedantic mode.

> **Note**: when compiling, `pedantic` must be false!  Otherwise,
> the underscores in gemoji short-codes are still escaped.
>
> Although, GitHub itself doesn’t care: :heavy_check_mark:.

## Related

*   [`remark-gemoji-to-emoji`][gemoji-to-emoji]
    — Transform gemoji shortcodes into emoji unicodes
*   [`remark-html-emoji-image`][html-emoji-image]
    — Transform emoji unicodes into html images
*   [`remark-emoji-to-gemoji`][emoji-to-gemoji]
    — Transform emoji unicodes into gemoji shortcodes

## Contribute

See [`contributing.md` in `remarkjs/remark`][contributing] for ways to get
started.

This organisation has a [Code of Conduct][coc].  By interacting with this
repository, organisation, or community you agree to abide by its terms.

## License

[MIT](license) © [Titus Wormer](https://wooorm.com)

<!-- Definitions -->

[build-badge]: https://img.shields.io/travis/remarkjs/remark-gemoji.svg

[build]: https://travis-ci.org/remarkjs/remark-gemoji

[coverage-badge]: https://img.shields.io/codecov/c/github/remarkjs/remark-gemoji.svg

[coverage]: https://codecov.io/github/remarkjs/remark-gemoji

[downloads-badge]: https://img.shields.io/npm/dm/remark-gemoji.svg

[downloads]: https://www.npmjs.com/package/remark-gemoji

[chat-badge]: https://img.shields.io/badge/join%20the%20community-on%20spectrum-7b16ff.svg

[chat]: https://spectrum.chat/unified/remark

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[npm]: https://docs.npmjs.com/cli/install

[remark]: https://github.com/remarkjs/remark

[text]: https://github.com/syntax-tree/mdast#textnode

[gemoji-to-emoji]: https://github.com/jackycute/remark-gemoji-to-emoji

[html-emoji-image]: https://github.com/jackycute/remark-html-emoji-image

[emoji-to-gemoji]: https://github.com/jackycute/remark-emoji-to-gemoji

[contributing]: https://github.com/remarkjs/remark/blob/master/contributing.md

[coc]: https://github.com/remarkjs/remark/blob/master/code-of-conduct.md
