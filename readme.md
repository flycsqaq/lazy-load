# lazy-load
Simple & light weight (<5kb) vanilla javascript plugin to lazy load.

## DEMO

## Getting Started
### NPM Setup
```npm install throttle-lazy-load```
```import Lazy from 'throttle-lazy-load/lib/Lazy.js'```
### Basic Browser Setup
1. Add lazy to your html
```<script src='./lib/Lazy.js'>```
2. Initialize the plugin
```
Lazy.create().start({})
```
3. add attribute to the HTML tags you want to lazy-load
```
<img lazy-img='xxx.jpg'>
```
4. lazy load 
## custom
### interval
You can pass options into your custom lazy load.
```
Lazy.create().lift({fn: () => new time, num: 300}).start({})
```
This can make your lazy load throttle 300s.

### extend
```
Lazy.create({extend: 200})
```
This can make your lazy load extend 200px.
### attribute
```
Lazy.create({attr: 'data-img'})
```
This can make your lazy load attribute for 'data-img
### el && event
```
Lazy.create().start({el: button, event: 'click'})
```
This can make your lazy load for bottom addEventListener click

## release memory
### removeEventListener
when start listen, you can execute this to removeEventListener
```
const lazy = Lazy.create().start({el: button, event: 'click'})
lazy() // removeEventListener
```

### destory
```
const lazy = Lazy.create()
lazy.destory() // destory remove elements/listeners/interval
```

ToDo
1. demo
2. Intersection Observer API design
3. code cleanup
4. typescript support
