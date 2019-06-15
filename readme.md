# remark-gemoji

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

[**remark**][remark] plugin to parse Gemoji shortcodes.

## Install

[npm][]:

```sh
npm install remark-gemoji
```

## Use

Say `example.js` looks as follows (note: `remark-gemoji` isn’t used):

```js
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

### `remark().use(gemoji)`

Plugin to parse Gemoji shortcodes.
This doesn’t do much other than creating whole [**Text**][text] nodes for
Gemoji, and ensuring Gemoji shortcodes with underscores are not seen as emphasis
in pedantic mode.

> **Note**: when compiling, `pedantic` must be false!
> Otherwise, the underscores in gemoji shortcodes are still escaped.
>
> Although, GitHub itself doesn’t care: `:heavy\_check\_mark:`.

## Related

*   [`remark-gemoji-to-emoji`][gemoji-to-emoji]
    — Transform gemoji shortcodes into emoji unicodes
*   [`remark-html-emoji-image`][html-emoji-image]
    — Transform emoji unicodes into html images
*   [`remark-emoji-to-gemoji`][emoji-to-gemoji]
    — Transform emoji unicodes into gemoji shortcodes

## Contribute

See [`contributing.md`][contributing] in [`remarkjs/.github`][health] for ways
to get started.
See [`support.md`][support] for ways to get help.

This project has a [Code of Conduct][coc].
By interacting with this repository, organisation, or community you agree to
abide by its terms.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://img.shields.io/travis/remarkjs/remark-gemoji/master.svg

[build]: https://travis-ci.org/remarkjs/remark-gemoji

[coverage-badge]: https://img.shields.io/codecov/c/github/remarkjs/remark-gemoji.svg

[coverage]: https://codecov.io/github/remarkjs/remark-gemoji

[downloads-badge]: https://img.shields.io/npm/dm/remark-gemoji.svg

[downloads]: https://www.npmjs.com/package/remark-gemoji

[size-badge]: https://img.shields.io/bundlephobia/minzip/remark-gemoji.svg

[size]: https://bundlephobia.com/result?p=remark-gemoji

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[chat-badge]: https://img.shields.io/badge/join%20the%20community-on%20spectrum-7b16ff.svg

[chat]: https://spectrum.chat/unified/remark

[npm]: https://docs.npmjs.com/cli/install

[health]: https://github.com/remarkjs/.github

[contributing]: https://github.com/remarkjs/.github/blob/master/contributing.md

[support]: https://github.com/remarkjs/.github/blob/master/support.md

[coc]: https://github.com/remarkjs/.github/blob/master/code-of-conduct.md

[license]: license

[author]: https://wooorm.com

[remark]: https://github.com/remarkjs/remark

[text]: https://github.com/syntax-tree/mdast#textnode

[gemoji-to-emoji]: https://github.com/jackycute/remark-gemoji-to-emoji

[html-emoji-image]: https://github.com/jackycute/remark-html-emoji-image

[emoji-to-gemoji]: https://github.com/jackycute/remark-emoji-to-gemoji
