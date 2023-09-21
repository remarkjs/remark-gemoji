# remark-gemoji

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

**[remark][]** plugin to turn gemoji shortcodes (`:+1:`) into emoji (`👍`).

## Contents

*   [What is this?](#what-is-this)
*   [When should I use this?](#when-should-i-use-this)
*   [Install](#install)
*   [Use](#use)
*   [API](#api)
    *   [`unified().use(remarkGemoji)`](#unifieduseremarkgemoji)
*   [Syntax](#syntax)
*   [Types](#types)
*   [Compatibility](#compatibility)
*   [Security](#security)
*   [Related](#related)
*   [Contribute](#contribute)
*   [License](#license)

## What is this?

This package is a [unified][] ([remark][]) plugin to turn gemoji shortcodes into
emoji.

## When should I use this?

You can use this plugin to match how GitHub turns gemoji (**G**itHub **E**moji)
shortcodes into emoji.
This plugin does not support other platforms such as Slack and what labels they
support.

A different plugin, [`remark-gfm`][remark-gfm], adds support for GFM (GitHub
Flavored Markdown).
GFM is a set of extensions (autolink literals, footnotes, strikethrough, tables,
and tasklists) to markdown that are supported everywhere on GitHub.

Another plugin, [`remark-frontmatter`][remark-frontmatter], adds support for
YAML frontmatter.
GitHub supports frontmatter for files in Gists and repos.

## Install

This package is [ESM only][esm].
In Node.js (version 16+), install with [npm][]:

```sh
npm install remark-gemoji
```

In Deno with [`esm.sh`][esmsh]:

```js
import remarkGemoji from 'https://esm.sh/remark-gemoji@8'
```

In browsers with [`esm.sh`][esmsh]:

```html
<script type="module">
  import remarkGemoji from 'https://esm.sh/remark-gemoji@8?bundle'
</script>
```

## Use

Say we have the following file `example.md`:

```markdown
Look, the moon :new_moon_with_face:

Here’s a family :family_man_man_boy_boy:

Слава Україні!  :ukraine:
```

…and a module `example.js`:

```js
import remarkGemoji from 'remark-gemoji'
import remarkParse from 'remark-parse'
import remarkStringify from 'remark-stringify'
import {read} from 'to-vfile'
import {unified} from 'unified'

const file = await unified()
  .use(remarkParse)
  .use(remarkGemoji)
  .use(remarkStringify)
  .process(await read('example.md'))

console.log(String(file))
```

…then running `node example.js` yields:

```markdown
Look, the moon 🌚

Here’s a family 👨‍👨‍👦‍👦

Слава Україні!  🇺🇦
```

## API

This package exports no identifiers.
The default export is [`remarkGemoji`][api-remark-gemoji].

### `unified().use(remarkGemoji)`

Turn gemoji shortcodes (`:+1:`) into emoji (`👍`).

###### Parameters

There are no parameters.

###### Returns

Transform ([`Transformer`][unified-transformer]).

## Syntax

This plugin looks for the regular expression `/:(\+1|[-\w]+):/g` in text in
markdown (excluding code and such).
If the value between the two colons matches a know gemoji shortcode, then its
replaced by the corresponding emoji.

In EBNF, the grammar looks as follows:

<pre><code class=language-ebnf><a id=s-gemoji href=#s-gemoji>gemoji</a> ::=  ':' ('+' '1' | <a href=#s-character>character</a>+) ':'
<a id=s-character href=#s-character>character</a> ::= '-' | '_' | <a href=#s-letter>letter</a> | <a href=#s-digit>digit</a>
<a id=s-letter href=#s-letter>letter</a> ::= <a href=#s-letter-lowercase>letterLowercase</a> | <a href=#s-letter-uppercase>letterUppercase</a>
<a id=s-letter-lowercase href=#s-letter-lowercase>letterLowercase</a> ::= 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h' | 'i' | 'j' | 'k' | 'l' | 'm' | 'n' | 'o' | 'p' | 'q' | 'r' | 's' | 't' | 'u' | 'v' | 'w' | 'x' | 'y' | 'z'
<a id=s-letter-uppercase href=#s-letter-uppercase>letterUppercase</a> ::= 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' | 'L' | 'M' | 'N' | 'O' | 'P' | 'Q' | 'R' | 'S' | 'T' | 'U' | 'V' | 'W' | 'X' | 'Y' | 'Z'
<a id=s-digit href=#s-digit>digit</a> ::= '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'
</code></pre>

## Types

This package is fully typed with [TypeScript][].
It exports no additional types.

## Compatibility

Projects maintained by the unified collective are compatible with maintained
versions of Node.js.

When we cut a new major release, we drop support for unmaintained versions of
Node.
This means we try to keep the current release line, `remark-gemoji@^8`,
compatible with Node.js 16.

This plugin works with `unified` version 3+ and `remark` version 4+.

## Security

Use of `remark-gemoji` does not involve **[rehype][]** (**[hast][]**) or user
content so there are no openings for [cross-site scripting (XSS)][wiki-xss]
attacks.

## Related

*   [`remark-gfm`](https://github.com/remarkjs/remark-gfm)
    — support GFM (autolink literals, footnotes, strikethrough, tables,
    tasklists)
*   [`remark-github`](https://github.com/remarkjs/remark-github)
    — link references to commits, issues, pull-requests, and users, like on
    GitHub
*   [`remark-breaks`](https://github.com/remarkjs/remark-frontmatter)
    — support hard breaks without needing spaces or escapes
*   [`remark-frontmatter`](https://github.com/remarkjs/remark-frontmatter)
    — support frontmatter (YAML, TOML, and more)

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

[build-badge]: https://github.com/remarkjs/remark-gemoji/workflows/main/badge.svg

[build]: https://github.com/remarkjs/remark-gemoji/actions

[coverage-badge]: https://img.shields.io/codecov/c/github/remarkjs/remark-gemoji.svg

[coverage]: https://codecov.io/github/remarkjs/remark-gemoji

[downloads-badge]: https://img.shields.io/npm/dm/remark-gemoji.svg

[downloads]: https://www.npmjs.com/package/remark-gemoji

[size-badge]: https://img.shields.io/bundlejs/size/remark-gemoji

[size]: https://bundlejs.com/?q=remark-gemoji

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[chat-badge]: https://img.shields.io/badge/chat-discussions-success.svg

[chat]: https://github.com/remarkjs/remark/discussions

[npm]: https://docs.npmjs.com/cli/install

[esm]: https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c

[esmsh]: https://esm.sh

[health]: https://github.com/remarkjs/.github

[contributing]: https://github.com/remarkjs/.github/blob/main/contributing.md

[support]: https://github.com/remarkjs/.github/blob/main/support.md

[coc]: https://github.com/remarkjs/.github/blob/main/code-of-conduct.md

[license]: license

[author]: https://wooorm.com

[hast]: https://github.com/syntax-tree/hast

[rehype]: https://github.com/rehypejs/rehype

[remark]: https://github.com/remarkjs/remark

[remark-frontmatter]: https://github.com/remarkjs/remark-frontmatter

[remark-gfm]: https://github.com/remarkjs/remark-gfm

[typescript]: https://www.typescriptlang.org

[unified]: https://github.com/unifiedjs/unified

[unified-transformer]: https://github.com/unifiedjs/unified#transformer

[wiki-xss]: https://en.wikipedia.org/wiki/Cross-site_scripting

[api-remark-gemoji]: #unifieduseremarkgemoji
