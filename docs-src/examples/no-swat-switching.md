---
layout: example.11ty.cjs
title: <nonogram-editor> ⌲ Examples ⌲ Immutable palette
tags: example
name: Immutable color palette
description: Color palette changing disabled
---

<nonogram-editor editable
    data='{
        "game_data": {
            "width": 7, 
            "height": 8
        }, 
        "data": [
            [1,0,1,0,0,0,0],
            [1,1,1,0,0,0,0],
            [1,1,1,0,0,0,0],
            [0,1,1,1,1,0,0],
            [0,1,1,1,1,1,1],
            [0,0,1,1,1,1,1],
            [1,0,1,0,1,1,1],
            [0,1,1,1,1,1,1]
        ]
    }'></nonogram-editor>

<h3>HTML</h3>

```html
<nonogram-editor 
    editable 
    data='{
        "game_data": {
            "width": 7, 
            "height": 8
        }, 
        "data": [
            [1,0,1,0,0,0,0],
            [1,1,1,0,0,0,0],
            [1,1,1,0,0,0,0],
            [0,1,1,1,1,0,0],
            [0,1,1,1,1,1,1],
            [0,0,1,1,1,1,1],
            [1,0,1,0,1,1,1],
            [0,1,1,1,1,1,1]
        ]
    }'
></nonogram-editor>
```
