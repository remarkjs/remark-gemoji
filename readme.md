# remark-gemoji [![Build Status][travis-badge]][travis] [![Coverage Status][codecov-badge]][codecov]

Gemoji short-code support in [**remark**][remark].

## Installation

[npm][]:

```bash
npm install remark-gemoji
```

## Usage

```javascript
var remark = require('remark');
var inspect = require('unist-util-inspect');
var gemoji = require('remark-gemoji');

// Without this plug-in:
var tree = remark().parse(':heavy_check_mark:', {pedantic: true});
console.log(inspect(tree));
```

Yields:

```txt
paragraph[3] (1:1-1:19, 0-18)
├─ text: ":heavy" (1:1-1:7, 0-6)
├─ emphasis[1] (1:7-1:14, 6-13)
│  └─ text: "check" (1:8-1:13, 7-12)
└─ text: "mark:" (1:14-1:19, 13-18)
```

```javascript
// With this plug-in:
tree = remark().use(gemoji).parse(':heavy_check_mark:', {
  pedantic: true
});
console.log(inspect(tree));
```

Yields:

```txt
paragraph[1] (1:1-1:19, 0-18)
└─ text: ":heavy_check_mark:" (1:1-1:19, 0-18)
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

[npm]: https://docs.npmjs.com/cli/install

[remark]: https://github.com/wooorm/remark

[text]: https://github.com/wooorm/mdast#textnode

[gemoji-to-emoji]: https://github.com/jackycute/remark-gemoji-to-emoji

[html-emoji-image]: https://github.com/jackycute/remark-html-emoji-image

[emoji-to-gemoji]: https://github.com/jackycute/remark-emoji-to-gemoji
