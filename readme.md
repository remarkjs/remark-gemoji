# remark-gemoji

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

[**remark**][remark] plugin to parse turn gemoji shortcodes (`:+1:`) into emoji
(`👍`).

## Note!

This plugin is ready for the new parser in remark
([`micromark`](https://github.com/micromark/micromark),
see [`remarkjs/remark#536`](https://github.com/remarkjs/remark/pull/536)).
As remark no longer supports “pedantic” mode, this plugin is no longer needed.
Hence, this plugin is rewritten to be useful again: it now maps gemoji
shortcodes to emoji.
This new plugin works with old and new remark.

## Install

[npm][]:

```sh
npm install remark-gemoji
```

## Use

Say we have the following file, `example.md`:

```markdown
Thumbs up: :+1:, thumbs down: :-1:.

Families: :family_man_man_boy_boy:

Long flags: :wales:, :scotland:, :england:.
```

And our script, `example.js`, looks as follows:

```js
var vfile = require('to-vfile')
var report = require('vfile-reporter')
var unified = require('unified')
var parse = require('remark-parse')
var gemoji = require('remark-gemoji')
var stringify = require('remark-stringify')

unified()
  .use(parse)
  .use(gemoji)
  .use(stringify)
  .process(vfile.readSync('example.md'), function (err, file) {
    console.error(report(err || file))
    console.log(String(file))
  })
```

Now, running `node example` yields:

```text
example.md: no issues found
```

```markdown
Thumbs up: 👍, thumbs down: 👎.

Families: 👨‍👨‍👦‍👦

Long flags: 🏴󠁧󠁢󠁷󠁬󠁳󠁿, 🏴󠁧󠁢󠁳󠁣󠁴󠁿, 🏴󠁧󠁢󠁥󠁮󠁧󠁿.
```

## API

### `remark().use(gemoji)`

Plugin to turn Gemoji shortcodes into emoji.

## Security

Use of `remark-gemoji` does not involve [**rehype**][rehype]
([**hast**][hast]) or user content so there are no openings for
[cross-site scripting (XSS)][xss] attacks.

## Related

*   [`remark-gfm`](https://github.com/remarkjs/remark-gfm)
    — GitHub Flavored Markdown
*   [`remark-github`](https://github.com/remarkjs/remark-github)
    — Auto-link references like in GitHub issues, PRs, and comments
*   [`remark-footnotes`](https://github.com/remarkjs/remark-footnotes)
    — Footnotes
*   [`remark-frontmatter`](https://github.com/remarkjs/remark-frontmatter)
    — Frontmatter (YAML, TOML, and more) support
*   [`remark-math`](https://github.com/rokt33r/remark-math)
    — Math

## Contribute

See [`contributing.md`][contributing] in [`remarkjs/.github`][health] for ways
to get started.
See [`support.md`][support] for ways to get help.

This project has a [code of conduct][coc].
By interacting with this repository, organization, or community you agree to
abide by its terms.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://img.shields.io/travis/remarkjs/remark-gemoji.svg

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

[chat-badge]: https://img.shields.io/badge/chat-discussions-success.svg

[chat]: https://github.com/remarkjs/remark/discussions

[npm]: https://docs.npmjs.com/cli/install

[health]: https://github.com/remarkjs/.github

[contributing]: https://github.com/remarkjs/.github/blob/HEAD/contributing.md

[support]: https://github.com/remarkjs/.github/blob/HEAD/support.md

[coc]: https://github.com/remarkjs/.github/blob/HEAD/code-of-conduct.md

[license]: license

[author]: https://wooorm.com

[remark]: https://github.com/remarkjs/remark

[xss]: https://en.wikipedia.org/wiki/Cross-site_scripting

[rehype]: https://github.com/rehypejs/rehype

[hast]: https://github.com/syntax-tree/hast
