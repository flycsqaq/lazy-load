(function() {
  class Lazy {
    constructor(direction='all') {
      this.direction = direction
      this.district = {
        lastY: 0,
        lastX: 0,
        height: 0,
        width: 0
      }
      this.extend = 0
      this.attr = 'lazy-img'
      this.elements = []
      this.interval = []
      this.listeners = []
    }
    setup({y=window.scrollY,x=window.scrollX,h=window.innerHeight,w=window.innerWidth,extend=100,attr='lazy-img'}) {
      const district = this.district
      district.lastY = y
      district.lastX = x
      district.width = w
      district.height = h
      this.attr = attr
      this.extend = extend
      this.popularElements()
    }
    popularElements() {
      this.elements = []
      document.querySelectorAll(`[${this.attr}]`).forEach(this.addElements, this)
    }
    addElements(el) {
      if (!(el.attributes[this.attr] && el.attributes[this.attr].value)) {
        console.error(`Lazy err: ${el} dont have attribute ${this.attr}`)
        return 
      }
      const { top, bottom, left, right } = el.getBoundingClientRect()
      const district = this.district
      const location = { 
        top: top + district.lastY,
        bottom: bottom + district.lastY,
        left: left + district.lastX,
        right: right + district.lastX
      }
      const o = { el, location }
      this.elements.push(o)
      this.loadImage(o)
    }
    loadImage(o) {
      const location = o.location
      if (!o.isLoad && this.direction === 'all' && this.judgeRow(location) && this.judgeColumn(location)) {
        this.load(o) 
        return
      }
      if (!o.isLoad && this.direction === 'row' && this.judgeRow(location)) {
        this.load(o)
        return
      }
      if (!o.isLoad && this.direction === 'column' && this.judgeColumn(location)) {
        this.load(o) 
        return
      }
    }
    load(o) {
      const el = o.el
      el.src = el.attributes[this.attr].value
      el.attributes.removeNamedItem(this.attr)
      o.isLoad = true 
    }
    update({y, x}) {
      if (y !== undefined) {
        this.district.lastY = y
      }
      if (x !== undefined) {
        this.district.lastX = x
      }
      this.elements.forEach(this.loadImage, this)
    }
    removeListener(listener) {
      if (listener && listener.event && listener.fn) {
        listener.el.removeEventListener(listener.event, listener.fn)
        listener.isWork = false
      }
    }
    removeInterval(interval) {
      const i = this.interval.find(inter => inter.fn === interval.fn)
      if (i > -1) {
        this.interval.splice(i, 1)
      }
    }
    removeElement(el) {
      const i = this.elements.find(o => o.el === el)
      if (i > -1) {
        this.elements.splice(i, 1)
      }
    }
    destory() {
      for (var _i=0;_i<this.listeners.length ; _i++) {
        this.removeListener(this.listeners[_i])
      }
      this.elements = null
      this.listeners = null
      this.interval = null
    }
    // add interval
    lift(interval) {
      if (interval && interval.fn && interval.num) {
        this.interval.push({
          fn: interval.fn,
          lastValue: interval.fn(),
          intervalNum: interval.num
        })
      }
      return this
    }
    // start for or
    startO({el=document, event='scroll'}) {
      const lazy = this
      const func = function() {
        let current = []
        const int = lazy.interval
        let activate = false
        if (int.length === 0) {
          activate = true
        }
        for (var _i=0; _i< int.length; _i++) {
          const cur = int[_i].fn()
          current[_i] = cur
          activate = activate || Math.abs(cur - int[_i].lastValue) >= int[_i].intervalNum
        }
        if (activate) {
          for (var i_=0; i_< int.length;i_++) {
            int[i_].lastValue = current[i_]
          }
          lazy.update({
            y: window.scrollY,
            x: window.scrollX
          })
        }
      }
      el.addEventListener(event, func)
      const listener = {
        fn: func,
        event: event,
        el: el,
        isWork: true
      }
      lazy.listeners.push(listener)
      return function() {
        return lazy.removeListener(listener)
      }
    }
    // start for and
    start({el=document, event='scroll'}) {
      const lazy = this
      const func = function() {
        let current = []
        const int = lazy.interval
        let activate = true
        for (var _i=0; _i< int.length; _i++) {
          const cur = int[_i].fn()
          current[_i] = cur
          activate = activate && Math.abs(cur - int[_i].lastValue) >= int[_i].intervalNum
        }
        if (activate) {
          for (var i_=0; i_< int.length;i_++) {
            int[i_].lastValue = current[i_]
          }
          lazy.update({
            y: window.scrollY,
            x: window.scrollX
          })
        }
      }
      el.addEventListener(event, func)
      const listener = {
        fn: func,
        event: event,
        el: el,
        isWork: true
      }
      lazy.listeners.push(listener)
      return function() {
        return lazy.removeListener(listener)
      }
    }
    judgeRow(location) {
      const district = this.district
      return district.lastX >= location.left - district.width - this.extend && district.lastX <= location.right + this.extend
    }
    judgeColumn(location) {
      const district = this.district
      return district.lastY >= location.top - district.height - this.extend && district.lastY <= location.bottom + this.extend
    }
  }
  Lazy.create = function (payload = {extend:100,attr:'lazy-img'}) {
    const lazy = new Lazy()
    lazy.setup(payload)
    return lazy
  }
  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = Lazy;
  } else {
    window.Lazy = Lazy
  }
})()