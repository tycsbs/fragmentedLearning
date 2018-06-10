/*
mock eventEmitter.js
*/
(function () {
  var root = (typeof self === 'object' && self.self === self && self) ||
    (typeof global === 'object' && global.global === global && global) ||
    this || {}

  /**
   * 检测是否是监听函数
   * @param listener
   */
  function isListener (listener) {
    var type = typeof listener
    if (type === 'function') {
      return true
    } else if (type === 'object') {
      return isListener(listener.listener)
    } else {
      return false
    }
  }

  /**
   * 查找指定监听item的索引
   * @param list 监听函数集合
   * @param item 目标item
   * @returns {number}
   */
  function findListenerIndex (list, item) {
    var reselt = -1
    item = typeof item === 'object'
      ? item.isListener
      : item
    for (var i = 0; i < list.length; i++) {
      if (list[i].listener === item) {
        reselt = i
        break
      }
    }
    return reselt
  }

  // emmiter event
  class Emitter {
    constructor () {
      this._events = {}
    }
  }

  var proto = Emitter.prototype

  proto.on = function (eventName, listener) {
    if (!eventName || !listener) return

    if (!isListener(listener)) {
      throw new Error('listener must be a function')
    }

    var events = this._events
    var listenerList = events[eventName] = events[eventName] || []
    var listenerIsObj = typeof listener === 'object'

    // 添加事件到集合
    if (findListenerIndex(listenerList, listener) === -1) {
      listenerList.push(listenerIsObj ? listener : {
        listener: listener,
        once: false
      })
    }

    return this
  }

  proto.off = function (eventName, listener) {
    var listenerList = this._events[eventName]
    if (!listenerList) return
    // 找出listener 在list索引
    var index = -1
    for (var i = 0; i < listenerList.length; i++) {
      if (listenerList[i] && listenerList[i].listener === listener) {
        index = i
        break
      }
    }
    // 删除
    if (index !== -1) {
      listenerList.splice(index, 1, null)
    }
    return this
  }

  proto.allOff = function (eventName) {
    if (eventName && this._events[eventName]) {
      this._events[eventName] = []
    } else {
      this._events = {}
    }
  }

  proto.once = function (eventName, listener) {
    return this.on(eventName, {
      listener: listener,
      once: true
    })
  }

  proto.emit = function (eventName, args) {
    var listenerList = this._events[eventName]
    if (!listenerList) {
      return
    }
    for (var i = 0; i < listenerList.length; i++) {
      var listener = listenerList[i]
      if (listener) {
        listener.listener.apply(this, args || [])
        // 如果只能一次，则执行后删除
        if (listener.once) {
          this.off(eventName, listener.listener)
        }
      }
    }
    return this
  }

  if (typeof exports !== 'undefined' && !exports.nodeType) {
    if (typeof module !== 'undefined' && !module.nodeType && module.exports) {
      exports = module.exports = Emitter
    }
    exports.Emitter = Emitter
  } else {
    root.Emitter = Emitter
  }
}())
