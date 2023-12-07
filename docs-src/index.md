---
layout: page.11ty.cjs
title: <nonogram-editor> ⌲ Home
---

# &lt;nonogram-editor>

`<nonogram-editor>` Is a web component that provies a simple [nonogram](https://en.wikipedia.org/wiki/Nonogram) editor/visualizer

## As easy as HTML

<section class="columns">
  <div>

`<nonogram-editor>` is just an HTML element. You can it anywhere you can use HTML!

```html
<nonogram-editor></nonogram-editor>
```

  </div>
  <div>

<nonogram-editor colors='["#fff", "#fb0366"]' data='{"game_data": {"width": 5, "height": 5}, "data": [[0,1,0,1,0],[1,1,1,1,1],[1,1,1,1,1],[0,1,1,1,0],[0,0,1,0,0]]}'></nonogram-editor>

  </div>
</section>

## Declarative rendering

<section class="columns">
  <div>

`<nonogram-editor>` can be used with declarative rendering libraries like Angular, React, Vue, and lit-html

```js
import {html, render} from 'lit-html';

const name = 'lit-html';

render(
  html`
    <h2>This is a &lt;nonogram-editor&gt;</h2>
    <nonogram-editor editable resizable colors='["#fff", "#000"]' data='{"game_data": {"width": 7, "height": 8}, "data": [
      [1,0,1,0,0,0,0],
      [1,1,1,0,0,0,0],
      [1,1,1,0,0,0,0],
      [0,1,1,1,1,0,0],
      [0,1,1,1,1,1,1],
      [0,0,1,1,1,1,1],
      [1,0,1,0,1,1,1],
      [0,1,1,1,1,1,1],
    ]}'></nonogram-editor>
  `,
  document.body
);
```

  </div>
  <div>

<h2>This is a &lt;nonogram-editor&gt;</h2>
    <nonogram-editor editable resizable colors='["#fff", "#000"]' data='{"game_data": {"width": 7, "height": 8}, "data": [
      [1,0,1,0,0,0,0],
      [1,1,1,0,0,0,0],
      [1,1,1,0,0,0,0],
      [0,1,1,1,1,0,0],
      [0,1,1,1,1,1,1],
      [0,0,1,1,1,1,1],
      [1,0,1,0,1,1,1],
      [0,1,1,1,1,1,1]
    ]}'></nonogram-editor>

  </div>
</section>
