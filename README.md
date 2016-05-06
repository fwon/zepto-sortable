Sortable(UI) Zepto.js Plugin
============================

**[Demos]()**

!!SUPPORT FOR MOBILE!!
----------------------

This plugin uses Touch events and MouseEvent, so it can work both in mobile & pc.


Features
--------

* 2KB (minified).
* Built using native Touch events [(can i use)](http://caniuse.com/#feat=touch) and MouseEvent [(can i use)](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent) .
* Supports list with vertical and horizontal **(not support grid style layouts yet)**.
* Class control for move.

Usage
-----

Use `sortable` method to create a sortable list:

```html
<ul id="sortable">
    <li class="cont color1">Item 0</li>
    <li class="cont color2">Item 1</li>
    <li class="cont color3">Item 2</li>
    <li class="cont color4">Item 3</li>
    <li class="cont color5">Item 4</li>
    <li class="cont color6">Item 5</li>
</ul>
```

``` javascript
$('#sortable').sortable({
    orient: 'vertical',
    itemClassName: 'cont' //default 'cont'
});

or

$('#sortable').sortable({
    orient: 'horizontal',
    itemClassName: 'cont' //default 'cont'
});
```


To Do
-----

* Add drop animations with CSS3.
* Support grid layout sortable.
* Test in IE older browser.
* Sort items automatically with animation.
* ...

License
-------

(The MIT License)

Copyright (c) 2016 Feng Wang(fwon) <fengw1325@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

