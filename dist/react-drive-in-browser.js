var ReactDriveIn = (function (React) { 'use strict';

	React = 'default' in React ? React['default'] : React;

	var babelHelpers = {};
	babelHelpers.typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
	  return typeof obj;
	} : function (obj) {
	  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
	};

	babelHelpers.classCallCheck = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

	babelHelpers.createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }

	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	}();

	babelHelpers.inherits = function (subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	  }

	  subClass.prototype = Object.create(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      enumerable: false,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	};

	babelHelpers.possibleConstructorReturn = function (self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return call && (typeof call === "object" || typeof call === "function") ? call : self;
	};

	babelHelpers;
	var eachNode = function eachNode(nodes, fn) {
	  [].slice.call(nodes).forEach(fn);
	};

	var getWidth = function getWidth() {

	  if (self.innerHeight) {
	    return self.innerWidth;
	  }

	  if (document.documentElement && document.documentElement.clientWidth) {
	    return document.documentElement.clientWidth;
	  }

	  if (document.body) {
	    return document.body.clientWidth;
	  }
	};

	var getHeight = function getHeight() {

	  if (self.innerHeight) {
	    return self.innerHeight;
	  }

	  if (document.documentElement && document.documentElement.clientHeight) {
	    return document.documentElement.clientHeight;
	  }

	  if (document.body) {
	    return document.body.clientHeight;
	  }
	};

	var setStyles = function setStyles(el, props) {

	  var cssString = "";
	  var p = void 0;

	  for (p in props) {
	    cssString += p + ":" + props[p] + ";";
	  }

	  el.style.cssText += ";" + cssString;
	};

	var findPoster = function findPoster(playlist) {

	  var poster = void 0;
	  var item = void 0;

	  var _iteratorNormalCompletion = true;
	  var _didIteratorError = false;
	  var _iteratorError = undefined;

	  try {
	    for (var _iterator = playlist[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	      item = _step.value;

	      if (item.constructor === Array) {
	        poster = findPoster(item);
	      } else if (item.type.search(/^image/) > -1) {
	        return item;
	      }

	      if (poster) {
	        return poster;
	      }
	    }
	  } catch (err) {
	    _didIteratorError = true;
	    _iteratorError = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion && _iterator.return) {
	        _iterator.return();
	      }
	    } finally {
	      if (_didIteratorError) {
	        throw _iteratorError;
	      }
	    }
	  }
	};

	var replaceChildren = function replaceChildren(el, newChildren) {

	  var children = el.children || el.childNodes;

	  if (children.length) {
	    eachNode(children, function (childEl) {
	      var newChild = newChildren.shift();
	      if (newChild) {
	        el.replaceChild(newChild, childEl);
	      } else {
	        el.removeChild(childEl);
	      }
	    });
	  }

	  if (newChildren.length) {
	    newChildren.forEach(function (newChild) {
	      el.appendChild(newChild);
	    });
	  }
	};

	var createEl = function createEl(name, props) {

	  var el = document.createElement(name);
	  var prop = void 0;

	  for (prop in props) {
	    el[prop] = props[prop];
	  }

	  return el;
	};

	var VIDEO_EXTS = {
	  mp4: true,
	  ogv: true,
	  webm: true
	};

	var IMAGE_EXTS = {
	  jpg: true,
	  png: true,
	  gif: true
	};

	var EXT_RE = /\.([mp4|ogv|webm|jpg|jpeg|png|gif]+)$/;

	var makePlaylistItem = function makePlaylistItem(src) {

	  var item = { src: src };

	  var ext = item.src.replace(/[\?|\#].+/, "").match(EXT_RE)[1];

	  if (VIDEO_EXTS[ext]) {
	    if (ext === "ogv") {
	      item.type = "video/ogg";
	    } else {
	      item.type = "video/" + ext;
	    }
	  }

	  if (IMAGE_EXTS[ext]) {
	    if (ext === "jpg") {
	      item.type = "image/jpeg";
	    } else {
	      item.type = "image/" + ext;
	    }
	  }

	  return item;
	};

	var makePlaylist = function makePlaylist(rawPlaylist) {
	  var depth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;


	  var playlist = [];

	  var item = void 0;

	  var _iteratorNormalCompletion = true;
	  var _didIteratorError = false;
	  var _iteratorError = undefined;

	  try {
	    for (var _iterator = rawPlaylist[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	      item = _step.value;


	      if (item.constructor === Object) {
	        playlist.push([item]);
	      }

	      if (item.constructor === Array) {
	        playlist.push(makePlaylist(item, depth + 1));
	      }

	      if (typeof item === "string") {
	        if (depth === 0) {
	          playlist.push([makePlaylistItem(item)]);
	        } else {
	          playlist.push(makePlaylistItem(item));
	        }
	      }
	    }
	  } catch (err) {
	    _didIteratorError = true;
	    _iteratorError = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion && _iterator.return) {
	        _iterator.return();
	      }
	    } finally {
	      if (_didIteratorError) {
	        throw _iteratorError;
	      }
	    }
	  }

	  return playlist;
	};

	var Playlist = {
	  makePlaylist: makePlaylist,
	  makePlaylistItem: makePlaylistItem
	};

	var index$1 = function (module) {
	  var exports = module.exports;
	  'use strict';

	  function Jvent() {}

	  /**
	   * Adds a listener to the collection for a specified event.
	   * @public
	   * @function
	   * @name Jvent#on
	   * @param {string} event Event name.
	   * @param {function} listener Listener function.
	   * @example
	   * // Will add a event listener to the "ready" event
	   * var startDoingStuff = function (event, param1, param2, ...) {
	   *   // Some code here!
	   * };
	   *
	   * me.on("ready", startDoingStuff);
	   */
	  Jvent.prototype.on = function (event, listener) {
	    this._collection = this._collection || {};
	    this._collection[event] = this._collection[event] || [];
	    this._collection[event].push(listener);
	    return this;
	  };

	  /**
	   * Adds a one time listener to the collection for a specified event. It will execute only once.
	   * @public
	   * @function
	   * @name Jvent#once
	   * @param {string} event Event name.
	   * @param {function} listener Listener function.
	   * @returns itself
	   * @example
	   * // Will add a event handler to the "contentLoad" event once
	   * me.once("contentLoad", startDoingStuff);
	   */
	  Jvent.prototype.once = function (event, listener) {
	    var that = this;

	    function fn() {
	      that.off(event, fn);
	      listener.apply(this, arguments);
	    }

	    fn.listener = listener;

	    this.on(event, fn);

	    return this;
	  };

	  /**
	   * Removes a listener from the collection for a specified event.
	   * @public
	   * @function
	   * @name Jvent#off
	   * @param {string} event Event name.
	   * @param {function} listener Listener function.
	   * @returns itself
	   * @example
	   * // Will remove event handler to the "ready" event
	   * var startDoingStuff = function () {
	   *   // Some code here!
	   * };
	   *
	   * me.off("ready", startDoingStuff);
	   */
	  Jvent.prototype.off = function (event, listener) {

	    var listeners = this._collection[event],
	        j = 0;

	    if (listeners !== undefined) {
	      for (j; j < listeners.length; j += 1) {
	        if (listeners[j] === listener || listeners[j].listener === listener) {
	          listeners.splice(j, 1);
	          break;
	        }
	      }
	    }

	    if (listeners.length === 0) {
	      this.removeAllListeners(event);
	    }

	    return this;
	  };

	  /**
	   * Removes all listeners from the collection for a specified event.
	   * @public
	   * @function
	   * @name Jvent#removeAllListeners
	   * @param {string} event Event name.
	   * @returns itself
	   * @example
	   * me.removeAllListeners("ready");
	   */
	  Jvent.prototype.removeAllListeners = function (event) {
	    this._collection = this._collection || {};
	    delete this._collection[event];
	    return this;
	  };

	  /**
	   * Returns all listeners from the collection for a specified event.
	   * @public
	   * @function
	   * @name Jvent#listeners
	   * @param {string} event Event name.
	   * @returns Array
	   * @example
	   * me.listeners("ready");
	   */
	  Jvent.prototype.listeners = function (event) {
	    this._collection = this._collection || {};
	    return this._collection[event];
	  };

	  /**
	   * Execute each item in the listener collection in order with the specified data.
	   * @name Jvent#emit
	   * @public
	   * @protected
	   * @param {string} event The name of the event you want to emit.
	   * @param {...object} var_args Data to pass to the listeners.
	   * @example
	   * // Will emit the "ready" event with "param1" and "param2" as arguments.
	   * me.emit("ready", "param1", "param2");
	   */
	  Jvent.prototype.emit = function () {
	    if (this._collection === undefined) {
	      return this;
	    }

	    var args = [].slice.call(arguments, 0),
	        // converted to array
	    event = args.shift(),
	        listeners = this._collection[event],
	        i = 0,
	        len;

	    if (listeners) {
	      listeners = listeners.slice(0);
	      len = listeners.length;
	      for (i; i < len; i += 1) {
	        listeners[i].apply(this, args);
	      }
	    }

	    return this;
	  };

	  /**
	   * Expose
	   */
	  module.exports = Jvent;
	  return module.exports;
	}({ exports: {} });

	var Timer = function (_Jvent) {
	  babelHelpers.inherits(Timer, _Jvent);

	  function Timer(callback, delay) {
	    babelHelpers.classCallCheck(this, Timer);

	    var _this = babelHelpers.possibleConstructorReturn(this, (Timer.__proto__ || Object.getPrototypeOf(Timer)).call(this));

	    _this.callback = callback;
	    _this.remaining = delay;
	    _this.timerId = null;
	    _this.start = null;

	    _this.resume();
	    return _this;
	  }

	  babelHelpers.createClass(Timer, [{
	    key: "pause",
	    value: function pause(silent) {
	      clearTimeout(this.timerId);
	      this.remaining -= new Date() - this.start;

	      if (!silent) {
	        this.emit("pause");
	      }
	    }
	  }, {
	    key: "resume",
	    value: function resume(silent) {
	      this.start = new Date();
	      clearTimeout(this.timerId);
	      this.timerId = setTimeout(this.callback, this.remaining);

	      if (!silent) {
	        this.emit("resume");
	      }
	    }
	  }, {
	    key: "currentTime",
	    value: function currentTime() {
	      var currTime = new Date() - this.start;
	      if (this.timerId) {
	        this.pause(true);
	        this.resume(true);
	      }
	      return currTime;
	    }
	  }, {
	    key: "destroy",
	    value: function destroy() {
	      this.pause(true);
	      this.removeAllListeners();
	    }
	  }]);
	  return Timer;
	}(index$1);

	var DriveIn = function (_Jvent) {
	  babelHelpers.inherits(DriveIn, _Jvent);

	  function DriveIn() {
	    babelHelpers.classCallCheck(this, DriveIn);

	    var _this = babelHelpers.possibleConstructorReturn(this, (DriveIn.__proto__ || Object.getPrototypeOf(DriveIn)).call(this));

	    _this._listeners = [];

	    _this.parentEl = null;
	    _this.mediaEl = null;
	    _this.placeholderEl = null;

	    _this.mute = true;
	    _this.currMediaType = null;
	    _this.mediaAspect = 16 / 9;
	    _this.playlist = null;
	    _this.loop = true;
	    _this.loopPlaylistItems = false;
	    _this.slideshow = false;
	    _this.startPaused = false;

	    _this.playlistLength = 0;
	    _this.currentItem = 0;
	    _this.slideshowItemDuration = 10;
	    _this._slideshowTimer = null;
	    _this._seeking = false;

	    _this.poster = null;

	    _this.loading = true;
	    return _this;
	  }

	  babelHelpers.createClass(DriveIn, [{
	    key: "_updateSize",
	    value: function _updateSize(mediaEl, mediaType, mediaAspect) {

	      var pad = 1;

	      var containerW = getWidth();
	      var containerH = getHeight();
	      var containerAspect = containerW / containerH;

	      if (containerAspect < mediaAspect) {

	        // taller
	        setStyles(this.parentEl, {
	          width: Math.ceil(containerH * mediaAspect) + "px",
	          height: containerH + pad + "px"
	        });

	        if (mediaType === "video") {

	          setStyles(mediaEl, {
	            width: Math.ceil(containerH * mediaAspect) + "px",
	            height: containerH + "px"
	          });
	        } else {

	          // is image
	          setStyles(mediaEl, {
	            width: "auto",
	            height: containerH + pad + "px"
	          });
	        }
	      } else {

	        // wider

	        setStyles(this.parentEl, {
	          width: containerW + "px",
	          height: Math.ceil(containerW / mediaAspect) + 1 + "px"
	        });

	        if (mediaType === "video") {

	          setStyles(mediaEl, {
	            width: this.parentEl.offsetWidth + "px",
	            height: "auto"
	          });
	        } else {

	          // is image
	          setStyles(mediaEl, {
	            width: containerW + "px",
	            height: "auto"
	          });
	        }
	      }
	    }
	  }, {
	    key: "_setVideoData",
	    value: function _setVideoData() {
	      var mediaEl = this.mediaEl;
	      this.mediaAspect = mediaEl.videoWidth / mediaEl.videoHeight;
	      this._updateSize(mediaEl, "video", this.mediaAspect);
	    }
	  }, {
	    key: "_setImageData",
	    value: function _setImageData(data) {
	      this.mediaAspect = data.naturalWidth / data.naturalHeight;

	      if (!this.isTouch) {
	        this._updateSize(this.mediaEl, "image", this.mediaAspect);
	      }
	    }
	  }, {
	    key: "_loadSource",
	    value: function _loadSource(sourceEls, posterSrc) {

	      var mediaEl = this.mediaEl;

	      this.emit("media.loading");

	      mediaEl.preload = "auto";
	      if (this.playlistLength < 2 || this.loopPlaylistItems) {
	        mediaEl.loop = true;
	      }

	      if (this.mute) {
	        this.setVolume(0);
	      }

	      if (posterSrc) {
	        mediaEl.poster = posterSrc;
	      }

	      replaceChildren(mediaEl, sourceEls);

	      mediaEl.load();
	    }
	  }, {
	    key: "_playVideoItem",
	    value: function _playVideoItem(item, itemNum) {

	      var mediaEl = this.mediaEl;
	      var sourceEls = [];
	      var source = void 0;
	      var sourceEl = void 0;
	      var posterSrc = void 0;
	      var canPlayType = void 0;

	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;

	      try {
	        for (var _iterator = item[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          source = _step.value;

	          if (source.type.search(/^image/) === 0 && !posterSrc) {
	            posterSrc = source.src;
	          } else {
	            sourceEl = createEl("source", {
	              src: source.src,
	              type: source.type
	            });
	          }

	          if (sourceEl) {
	            canPlayType = mediaEl.canPlayType(source.type);
	            if (canPlayType === "probably") {
	              sourceEls.unshift(sourceEl);
	            } else {
	              sourceEls.push(sourceEl);
	            }
	          }
	        }
	      } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion && _iterator.return) {
	            _iterator.return();
	          }
	        } finally {
	          if (_didIteratorError) {
	            throw _iteratorError;
	          }
	        }
	      }

	      if (sourceEls.length) {

	        this._loadSource(sourceEls, posterSrc);
	        this.currentItem = itemNum;
	      } else if (posterSrc || this.poster) {

	        // Fallback to a slideshow.
	        this.slideshow = true;
	        this._createMediaEl();
	        this._playImageItem(item, itemNum);
	      } else {

	        this.emit("media.error", new Error("No playable source"));
	      }
	    }
	  }, {
	    key: "_playImageItem",
	    value: function _playImageItem(item, itemNum) {
	      var source = void 0;
	      var src = void 0;

	      if (item && item.length) {
	        var _iteratorNormalCompletion2 = true;
	        var _didIteratorError2 = false;
	        var _iteratorError2 = undefined;

	        try {
	          for (var _iterator2 = item[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	            source = _step2.value;

	            if (source.type.search(/^image/) === 0 && !src) {
	              src = source.src;
	            }
	          }
	        } catch (err) {
	          _didIteratorError2 = true;
	          _iteratorError2 = err;
	        } finally {
	          try {
	            if (!_iteratorNormalCompletion2 && _iterator2.return) {
	              _iterator2.return();
	            }
	          } finally {
	            if (_didIteratorError2) {
	              throw _iteratorError2;
	            }
	          }
	        }
	      }

	      if (!src && this.poster) {
	        src = this.poster.src;
	      }

	      if (src) {

	        this.emit("media.loading");

	        this.mediaEl.src = src;
	        this.currentItem = itemNum;
	      } else {

	        this.emit("media.error", new Error("No playable source"));
	      }
	    }
	  }, {
	    key: "_setBackgroundItem",
	    value: function _setBackgroundItem() {
	      this.parentEl.style["background-image"] = "url(\"" + this.poster.src + "\")";
	    }
	  }, {
	    key: "_playItem",
	    value: function _playItem(item, itemNum) {
	      if (this.isTouch) {
	        this._setBackgroundItem();

	        // This should default to load the poster, which provides
	        // the necessary events
	        this._playImageItem();
	        return;
	      }

	      if (this.currMediaType === "video") {
	        this._playVideoItem(item, itemNum);
	      }

	      if (this.currMediaType === "image") {
	        this._playImageItem(item, itemNum);
	      }

	      this._seeking = false;
	    }
	  }, {
	    key: "_loadPlaylist",
	    value: function _loadPlaylist(playlist) {
	      this.playlist = playlist;
	      this.playlistLength = playlist.length;
	      this._playItem(playlist[0], 0);
	    }
	  }, {
	    key: "_addListener",
	    value: function _addListener(element, event, handler) {

	      element.addEventListener(event, handler);

	      this._listeners.push({ element: element, event: event, handler: handler });
	    }
	  }, {
	    key: "_removeAllListeners",
	    value: function _removeAllListeners() {
	      var listeners = this._listeners;
	      var listen = void 0;

	      var _iteratorNormalCompletion3 = true;
	      var _didIteratorError3 = false;
	      var _iteratorError3 = undefined;

	      try {
	        for (var _iterator3 = listeners[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	          listen = _step3.value;

	          listen.element.removeEventListener(listen.event, listen.handler);
	        }
	      } catch (err) {
	        _didIteratorError3 = true;
	        _iteratorError3 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion3 && _iterator3.return) {
	            _iterator3.return();
	          }
	        } finally {
	          if (_didIteratorError3) {
	            throw _iteratorError3;
	          }
	        }
	      }
	    }
	  }, {
	    key: "_attachVideoListeners",
	    value: function _attachVideoListeners() {
	      var _this2 = this;

	      var mediaEl = this.mediaEl;

	      var isVideo = function isVideo(video) {

	        // Some browsers (e.g., FF3.6 and Safari 5) cannot calculate target.bufferered.end()
	        // to be anything other than 0. If the byte count is available we use this instead.
	        // Browsers that support the else if do not seem to have the bufferedBytes value and
	        // should skip to there. Tested in Safari 5, Webkit head, FF3.6, Chrome 6, IE 7/8.

	        return typeof video.bytesTotal !== "undefined" && video.bytesTotal > 0 && typeof video.bufferedBytes !== "undefined";
	      };

	      var onLoadedMetadata = function onLoadedMetadata(data) {
	        _this2._setVideoData(data);
	        _this2.emit("media.metadata", data);
	      };

	      var onPlaying = function onPlaying() {
	        _this2.emit("media.playing", _this2.currentItem);
	      };

	      var onPause = function onPause() {
	        _this2.emit("media.pause");
	      };

	      var onProgress = function onProgress(event) {
	        // Sort of buggy, with readyState and buffer being inconsistent...
	        var video = event.target;
	        var percent = null;

	        // FF4+, Chrome
	        if (video.buffered && video.buffered.length > 0 && video.buffered.end && video.duration) {
	          percent = video.buffered.end(0) / video.duration;
	        } else if (isVideo(video)) {
	          percent = video.bufferedBytes / video.bytesTotal;
	        }

	        if (percent !== null) {
	          percent = 100 * Math.min(1, Math.max(0, percent));
	        }

	        if (video.networkState === 1 && video.readyState === 0) {
	          percent = 100;
	        }

	        _this2.emit("media.progress", percent);
	      };

	      var onEnded = function onEnded() {
	        if (!_this2._seeking) {
	          _this2.emit("media.ended", _this2.currentItem);
	        }
	      };

	      var onCanPlay = function onCanPlay() {
	        _this2.emit("media.canplay");

	        if (!_this2.startPaused) {
	          mediaEl.play();
	        }

	        if (_this2._seeking) {
	          _this2._seeking = false;
	        }
	      };

	      this._addListener(mediaEl, "loadedmetadata", onLoadedMetadata);
	      this._addListener(mediaEl, "playing", onPlaying);
	      this._addListener(mediaEl, "pause", onPause);
	      this._addListener(mediaEl, "ended", onEnded);
	      this._addListener(mediaEl, "canplay", onCanPlay);
	      this._addListener(mediaEl, "progress", onProgress, false);
	    }
	  }, {
	    key: "_attachImageListeners",
	    value: function _attachImageListeners() {
	      var _this3 = this;

	      var mediaEl = this.mediaEl;

	      var ended = function ended() {
	        _this3.mediaEl.dispatchEvent(new Event("ended"));
	      };

	      var onPause = function onPause() {
	        _this3.emit("media.pause");
	      };

	      var onLoad = function onLoad() {
	        _this3.emit("media.canplay");

	        _this3._setImageData(_this3);
	        _this3.emit("media.metadata", _this3);
	        _this3.emit("media.playing", _this3.currentItem);

	        if (_this3.isTouch) {
	          return;
	        }

	        if (_this3.playlistLength > 1) {

	          if (_this3._slideshowTimer) {
	            _this3._slideshowTimer.destroy();
	          }

	          _this3._slideshowTimer = new Timer(ended, _this3.slideshowItemDuration * 1000);

	          if (_this3.startPaused) {
	            _this3._slideshowTimer.pause();
	          }

	          _this3._slideshowTimer.on("pause", onPause);
	        }
	      };

	      var onEnded = function onEnded() {
	        _this3.emit("media.ended", _this3.currentItem);
	      };

	      this._addListener(mediaEl, "load", onLoad);
	      this._addListener(mediaEl, "ended", onEnded);
	    }
	  }, {
	    key: "_attachListeners",
	    value: function _attachListeners() {
	      var _this4 = this;

	      var mediaEl = this.mediaEl;

	      if (this.isTouch) {
	        this._attachImageListeners();
	        return;
	      }

	      var onResize = function onResize() {
	        window.requestAnimationFrame(function () {
	          if (_this4.metadataLoaded) {
	            _this4._updateSize(mediaEl, _this4.currMediaType, _this4.mediaAspect);
	          }
	        });
	      };

	      this._addListener(window, "resize", onResize);

	      if (this.currMediaType === "video") {
	        this._attachVideoListeners();
	      } else {
	        this._attachImageListeners();
	      }

	      var onMediaEnded = function onMediaEnded() {

	        if (_this4._seeking) {
	          return;
	        }

	        var itemNum = 0;

	        if (_this4.playlistLength > 1 && _this4.loopPlaylistItems) {
	          if (_this4.currMediaType === "image") {
	            // Images need a reboot, video is handled via `loop`
	            _this4.play(_this4.currentItem);
	          }
	          return;
	        }

	        if (_this4.playlistLength > 1 && _this4.loop) {
	          if (_this4.currentItem + 1 < _this4.playlistLength) {
	            itemNum = _this4.currentItem + 1;
	          }
	          _this4.play(itemNum);
	        }
	      };

	      var onMediaCanplay = function onMediaCanplay() {
	        mediaEl.style.opacity = 1;
	        _this4.canplay = true;
	      };

	      var onMediaMetadata = function onMediaMetadata() {
	        _this4.metadataLoaded = true;
	      };

	      var onMediaLoading = function onMediaLoading() {
	        _this4.canplay = false;
	        _this4.metadataLoaded = false;
	      };

	      this.on("media.ended", onMediaEnded);
	      this.on("media.canplay", onMediaCanplay);
	      this.on("media.metadata", onMediaMetadata);
	      this.on("media.loading", onMediaLoading);
	    }
	  }, {
	    key: "_setParent",
	    value: function _setParent(el) {

	      if (this.isTouch) {

	        setStyles(el, {
	          width: "100%",
	          height: "100%",
	          display: "block",
	          "background-position": "50% 50%",
	          "background-repeat": "no-repeat no-repeat",
	          "background-attachment": "local",
	          "background-size": "cover"
	        });
	      } else {

	        setStyles(el, {
	          position: "absolute",
	          display: "block",
	          transform: "translate3d(-50%,-50%,0)",
	          "-webkit-transform": "translate3d(-50%,-50%,0)",
	          left: "50%",
	          top: "50%"
	        });
	      }

	      return el;
	    }
	  }, {
	    key: "_cleanup",
	    value: function _cleanup() {
	      var el = this.parentEl;
	      while (el.firstChild) {
	        el.removeChild(el.firstChild);
	      }
	    }
	  }, {
	    key: "_createMediaEl",
	    value: function _createMediaEl() {
	      var mediaEl = void 0;

	      if (this.mediaEl) {
	        this._cleanup();
	      }

	      if (this.isTouch) {

	        this.currMediaType = "image";
	        mediaEl = createEl("img");
	        setStyles(mediaEl, {
	          display: "none"
	        });
	        return mediaEl;
	      } else if (this.slideshow) {

	        this.currMediaType = "image";
	        mediaEl = createEl("img");
	      } else {

	        this.currMediaType = "video";
	        mediaEl = createEl("video", {
	          height: 1,
	          width: 1,
	          preload: "metadata"
	        });
	      }

	      if (mediaEl) {

	        mediaEl.style.opacity = 0;
	        setStyles(mediaEl, {
	          display: "block"
	        });

	        return mediaEl;
	      }
	    }
	  }, {
	    key: "init",
	    value: function init() {
	      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};


	      this.isTouch = options.isTouch !== undefined ? options.isTouch : "ontouchstart" in window;

	      this.slideshow = options.slideshow;

	      this.startPaused = options.startPaused;

	      this.parentEl = this._setParent(options.el);

	      var mediaEl = this._createMediaEl();

	      this.parentEl.appendChild(mediaEl);
	      this.mediaEl = mediaEl;

	      this._attachListeners();
	    }
	  }, {
	    key: "show",
	    value: function show(rawItem, options) {
	      if (rawItem.constructor === Array) {
	        return this.showPlaylist([rawItem], options);
	      }

	      if (rawItem.constructor === Object) {
	        return this.showPlaylist([[rawItem]], options);
	      }

	      return this.showPlaylist([Playlist.makePlaylistItem(rawItem)], options);
	    }
	  }, {
	    key: "showPlaylist",
	    value: function showPlaylist(rawPlaylist, options) {
	      options = options || {};

	      if (options.hasOwnProperty("mute")) {
	        this.mute = options.mute;
	      }

	      if (options.hasOwnProperty("loop")) {
	        this.loop = options.loop;
	      }

	      if (options.hasOwnProperty("loopPlaylistItems")) {
	        this.loopPlaylistItems = options.loopPlaylistItems;
	        if (this.loopPlaylistItems) {
	          this.loop = false;
	        }
	      }

	      var playlist = Playlist.makePlaylist(rawPlaylist);

	      if (options.poster) {
	        if (typeof options.poster === "string") {
	          this.poster = {
	            src: options.poster
	          };
	        } else {
	          this.poster = options.poster;
	        }
	      } else {
	        this.poster = findPoster(playlist);
	      }

	      this._loadPlaylist(playlist);
	    }
	  }, {
	    key: "setVolume",
	    value: function setVolume(level) {
	      if (this.currMediaType === "image") {
	        return;
	      }

	      if (level === 0) {
	        this.mute = true;
	        this.mediaEl.muted = true;
	        this.mediaEl.volume = 0;
	      } else {
	        this.mute = false;
	        this.mediaEl.muted = false;
	        this.mediaEl.volume = level;
	      }
	    }
	  }, {
	    key: "setPlaybackRate",
	    value: function setPlaybackRate(rate) {
	      if (this.currMediaType === "image") {
	        return;
	      }

	      this.mediaEl.playbackRate = rate || 1.0;
	    }
	  }, {
	    key: "getMedia",
	    value: function getMedia() {
	      return this.mediaEl;
	    }
	  }, {
	    key: "getPlaylist",
	    value: function getPlaylist() {
	      return this.playlist;
	    }
	  }, {
	    key: "getItem",
	    value: function getItem(itemNum) {
	      return this.playlist[itemNum];
	    }
	  }, {
	    key: "play",
	    value: function play(itemNum) {
	      this._seeking = true;

	      if (typeof itemNum === "number") {
	        this._playItem(this.playlist[itemNum], itemNum);
	      } else if (this.currMediaType === "video") {
	        this.mediaEl.play();
	      } else if (this._slideshowTimer) {
	        this._slideshowTimer.resume();
	      }
	    }
	  }, {
	    key: "pause",
	    value: function pause() {
	      if (this.currMediaType === "video") {
	        this.mediaEl.pause();
	      } else if (this._slideshowTimer) {
	        this._slideshowTimer.pause();
	      }
	    }
	  }, {
	    key: "close",
	    value: function close() {
	      this._removeAllListeners();
	      this._cleanup();
	      if (this._slideshowTimer) {
	        this._slideshowTimer.destroy();
	        delete this._slideshowTimer;
	      }
	    }
	  }, {
	    key: "currentTime",
	    value: function currentTime() {
	      if (this.currMediaType === "video") {
	        return this.mediaEl.currentTime;
	      } else {
	        return this._slideshowTimer.currentTime();
	      }
	    }
	  }, {
	    key: "seekTo",
	    value: function seekTo(time) {
	      this._seeking = true;
	      if (this.currMediaType === "video") {
	        this.mediaEl.currentTime = time;
	      }
	    }
	  }, {
	    key: "duration",
	    value: function duration() {
	      if (this.currMediaType === "video") {
	        return this.mediaEl.duration;
	      } else {
	        return this.slideshowItemDuration;
	      }
	    }
	  }]);
	  return DriveIn;
	}(index$1);

	var ReactPropTypesSecret = function (module) {
	  var exports = module.exports;
	  /**
	   * Copyright (c) 2013-present, Facebook, Inc.
	   *
	   * This source code is licensed under the MIT license found in the
	   * LICENSE file in the root directory of this source tree.
	   */

	  'use strict';

	  var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

	  module.exports = ReactPropTypesSecret;
	  return module.exports;
	}({ exports: {} });

	var factoryWithThrowingShims = function (module) {
	  var exports = module.exports;
	  /**
	   * Copyright (c) 2013-present, Facebook, Inc.
	   *
	   * This source code is licensed under the MIT license found in the
	   * LICENSE file in the root directory of this source tree.
	   */

	  'use strict';

	  var ReactPropTypesSecret$$ = ReactPropTypesSecret;

	  function emptyFunction() {}

	  module.exports = function () {
	    function shim(props, propName, componentName, location, propFullName, secret) {
	      if (secret === ReactPropTypesSecret$$) {
	        // It is still safe when called from React.
	        return;
	      }
	      var err = new Error('Calling PropTypes validators directly is not supported by the `prop-types` package. ' + 'Use PropTypes.checkPropTypes() to call them. ' + 'Read more at http://fb.me/use-check-prop-types');
	      err.name = 'Invariant Violation';
	      throw err;
	    };
	    shim.isRequired = shim;
	    function getShim() {
	      return shim;
	    };
	    // Important!
	    // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
	    var ReactPropTypes = {
	      array: shim,
	      bool: shim,
	      func: shim,
	      number: shim,
	      object: shim,
	      string: shim,
	      symbol: shim,

	      any: shim,
	      arrayOf: getShim,
	      element: shim,
	      instanceOf: getShim,
	      node: shim,
	      objectOf: getShim,
	      oneOf: getShim,
	      oneOfType: getShim,
	      shape: getShim,
	      exact: getShim
	    };

	    ReactPropTypes.checkPropTypes = emptyFunction;
	    ReactPropTypes.PropTypes = ReactPropTypes;

	    return ReactPropTypes;
	  };
	  return module.exports;
	}({ exports: {} });

	var checkPropTypes = function (module) {
	  var exports = module.exports;
	  /**
	   * Copyright (c) 2013-present, Facebook, Inc.
	   *
	   * This source code is licensed under the MIT license found in the
	   * LICENSE file in the root directory of this source tree.
	   */

	  'use strict';

	  var printWarning = function printWarning() {};

	  if (process.env.NODE_ENV !== 'production') {
	    var ReactPropTypesSecret$$ = ReactPropTypesSecret;
	    var loggedTypeFailures = {};

	    printWarning = function printWarning(text) {
	      var message = 'Warning: ' + text;
	      if (typeof console !== 'undefined') {
	        console.error(message);
	      }
	      try {
	        // --- Welcome to debugging React ---
	        // This error was thrown as a convenience so that you can use this stack
	        // to find the callsite that caused this warning to fire.
	        throw new Error(message);
	      } catch (x) {}
	    };
	  }

	  /**
	   * Assert that the values match with the type specs.
	   * Error messages are memorized and will only be shown once.
	   *
	   * @param {object} typeSpecs Map of name to a ReactPropType
	   * @param {object} values Runtime values that need to be type-checked
	   * @param {string} location e.g. "prop", "context", "child context"
	   * @param {string} componentName Name of the component for error messages.
	   * @param {?Function} getStack Returns the component stack.
	   * @private
	   */
	  function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
	    if (process.env.NODE_ENV !== 'production') {
	      for (var typeSpecName in typeSpecs) {
	        if (typeSpecs.hasOwnProperty(typeSpecName)) {
	          var error;
	          // Prop type validation may throw. In case they do, we don't want to
	          // fail the render phase where it didn't fail before. So we log it.
	          // After these have been cleaned up, we'll let them throw.
	          try {
	            // This is intentionally an invariant that gets caught. It's the same
	            // behavior as without this statement except with a better message.
	            if (typeof typeSpecs[typeSpecName] !== 'function') {
	              var err = Error((componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' + 'it must be a function, usually from the `prop-types` package, but received `' + babelHelpers.typeof(typeSpecs[typeSpecName]) + '`.');
	              err.name = 'Invariant Violation';
	              throw err;
	            }
	            error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret$$);
	          } catch (ex) {
	            error = ex;
	          }
	          if (error && !(error instanceof Error)) {
	            printWarning((componentName || 'React class') + ': type specification of ' + location + ' `' + typeSpecName + '` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a ' + (typeof error === 'undefined' ? 'undefined' : babelHelpers.typeof(error)) + '. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).');
	          }
	          if (error instanceof Error && !(error.message in loggedTypeFailures)) {
	            // Only monitor this failure once because there tends to be a lot of the
	            // same error.
	            loggedTypeFailures[error.message] = true;

	            var stack = getStack ? getStack() : '';

	            printWarning('Failed ' + location + ' type: ' + error.message + (stack != null ? stack : ''));
	          }
	        }
	      }
	    }
	  }

	  module.exports = checkPropTypes;
	  return module.exports;
	}({ exports: {} });

	var index$2 = function (module) {
		var exports = module.exports;
		/*
	 object-assign
	 (c) Sindre Sorhus
	 @license MIT
	 */

		'use strict';
		/* eslint-disable no-unused-vars */
		var getOwnPropertySymbols = Object.getOwnPropertySymbols;
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		var propIsEnumerable = Object.prototype.propertyIsEnumerable;

		function toObject(val) {
			if (val === null || val === undefined) {
				throw new TypeError('Object.assign cannot be called with null or undefined');
			}

			return Object(val);
		}

		function shouldUseNative() {
			try {
				if (!Object.assign) {
					return false;
				}

				// Detect buggy property enumeration order in older V8 versions.

				// https://bugs.chromium.org/p/v8/issues/detail?id=4118
				var test1 = new String('abc'); // eslint-disable-line no-new-wrappers
				test1[5] = 'de';
				if (Object.getOwnPropertyNames(test1)[0] === '5') {
					return false;
				}

				// https://bugs.chromium.org/p/v8/issues/detail?id=3056
				var test2 = {};
				for (var i = 0; i < 10; i++) {
					test2['_' + String.fromCharCode(i)] = i;
				}
				var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
					return test2[n];
				});
				if (order2.join('') !== '0123456789') {
					return false;
				}

				// https://bugs.chromium.org/p/v8/issues/detail?id=3056
				var test3 = {};
				'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
					test3[letter] = letter;
				});
				if (Object.keys(Object.assign({}, test3)).join('') !== 'abcdefghijklmnopqrst') {
					return false;
				}

				return true;
			} catch (err) {
				// We don't expect any of the above to throw, but better to be safe.
				return false;
			}
		}

		module.exports = shouldUseNative() ? Object.assign : function (target, source) {
			var from;
			var to = toObject(target);
			var symbols;

			for (var s = 1; s < arguments.length; s++) {
				from = Object(arguments[s]);

				for (var key in from) {
					if (hasOwnProperty.call(from, key)) {
						to[key] = from[key];
					}
				}

				if (getOwnPropertySymbols) {
					symbols = getOwnPropertySymbols(from);
					for (var i = 0; i < symbols.length; i++) {
						if (propIsEnumerable.call(from, symbols[i])) {
							to[symbols[i]] = from[symbols[i]];
						}
					}
				}
			}

			return to;
		};
		return module.exports;
	}({ exports: {} });

	var factoryWithTypeCheckers = function (module) {
	  var exports = module.exports;
	  /**
	   * Copyright (c) 2013-present, Facebook, Inc.
	   *
	   * This source code is licensed under the MIT license found in the
	   * LICENSE file in the root directory of this source tree.
	   */

	  'use strict';

	  var assign = index$2;

	  var ReactPropTypesSecret$$ = ReactPropTypesSecret;
	  var checkPropTypes$$ = checkPropTypes;

	  var printWarning = function printWarning() {};

	  if (process.env.NODE_ENV !== 'production') {
	    printWarning = function printWarning(text) {
	      var message = 'Warning: ' + text;
	      if (typeof console !== 'undefined') {
	        console.error(message);
	      }
	      try {
	        // --- Welcome to debugging React ---
	        // This error was thrown as a convenience so that you can use this stack
	        // to find the callsite that caused this warning to fire.
	        throw new Error(message);
	      } catch (x) {}
	    };
	  }

	  function emptyFunctionThatReturnsNull() {
	    return null;
	  }

	  module.exports = function (isValidElement, throwOnDirectAccess) {
	    /* global Symbol */
	    var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
	    var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

	    /**
	     * Returns the iterator method function contained on the iterable object.
	     *
	     * Be sure to invoke the function with the iterable as context:
	     *
	     *     var iteratorFn = getIteratorFn(myIterable);
	     *     if (iteratorFn) {
	     *       var iterator = iteratorFn.call(myIterable);
	     *       ...
	     *     }
	     *
	     * @param {?object} maybeIterable
	     * @return {?function}
	     */
	    function getIteratorFn(maybeIterable) {
	      var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
	      if (typeof iteratorFn === 'function') {
	        return iteratorFn;
	      }
	    }

	    /**
	     * Collection of methods that allow declaration and validation of props that are
	     * supplied to React components. Example usage:
	     *
	     *   var Props = require('ReactPropTypes');
	     *   var MyArticle = React.createClass({
	     *     propTypes: {
	     *       // An optional string prop named "description".
	     *       description: Props.string,
	     *
	     *       // A required enum prop named "category".
	     *       category: Props.oneOf(['News','Photos']).isRequired,
	     *
	     *       // A prop named "dialog" that requires an instance of Dialog.
	     *       dialog: Props.instanceOf(Dialog).isRequired
	     *     },
	     *     render: function() { ... }
	     *   });
	     *
	     * A more formal specification of how these methods are used:
	     *
	     *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
	     *   decl := ReactPropTypes.{type}(.isRequired)?
	     *
	     * Each and every declaration produces a function with the same signature. This
	     * allows the creation of custom validation functions. For example:
	     *
	     *  var MyLink = React.createClass({
	     *    propTypes: {
	     *      // An optional string or URI prop named "href".
	     *      href: function(props, propName, componentName) {
	     *        var propValue = props[propName];
	     *        if (propValue != null && typeof propValue !== 'string' &&
	     *            !(propValue instanceof URI)) {
	     *          return new Error(
	     *            'Expected a string or an URI for ' + propName + ' in ' +
	     *            componentName
	     *          );
	     *        }
	     *      }
	     *    },
	     *    render: function() {...}
	     *  });
	     *
	     * @internal
	     */

	    var ANONYMOUS = '<<anonymous>>';

	    // Important!
	    // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
	    var ReactPropTypes = {
	      array: createPrimitiveTypeChecker('array'),
	      bool: createPrimitiveTypeChecker('boolean'),
	      func: createPrimitiveTypeChecker('function'),
	      number: createPrimitiveTypeChecker('number'),
	      object: createPrimitiveTypeChecker('object'),
	      string: createPrimitiveTypeChecker('string'),
	      symbol: createPrimitiveTypeChecker('symbol'),

	      any: createAnyTypeChecker(),
	      arrayOf: createArrayOfTypeChecker,
	      element: createElementTypeChecker(),
	      instanceOf: createInstanceTypeChecker,
	      node: createNodeChecker(),
	      objectOf: createObjectOfTypeChecker,
	      oneOf: createEnumTypeChecker,
	      oneOfType: createUnionTypeChecker,
	      shape: createShapeTypeChecker,
	      exact: createStrictShapeTypeChecker
	    };

	    /**
	     * inlined Object.is polyfill to avoid requiring consumers ship their own
	     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
	     */
	    /*eslint-disable no-self-compare*/
	    function is(x, y) {
	      // SameValue algorithm
	      if (x === y) {
	        // Steps 1-5, 7-10
	        // Steps 6.b-6.e: +0 != -0
	        return x !== 0 || 1 / x === 1 / y;
	      } else {
	        // Step 6.a: NaN == NaN
	        return x !== x && y !== y;
	      }
	    }
	    /*eslint-enable no-self-compare*/

	    /**
	     * We use an Error-like object for backward compatibility as people may call
	     * PropTypes directly and inspect their output. However, we don't use real
	     * Errors anymore. We don't inspect their stack anyway, and creating them
	     * is prohibitively expensive if they are created too often, such as what
	     * happens in oneOfType() for any type before the one that matched.
	     */
	    function PropTypeError(message) {
	      this.message = message;
	      this.stack = '';
	    }
	    // Make `instanceof Error` still work for returned errors.
	    PropTypeError.prototype = Error.prototype;

	    function createChainableTypeChecker(validate) {
	      if (process.env.NODE_ENV !== 'production') {
	        var manualPropTypeCallCache = {};
	        var manualPropTypeWarningCount = 0;
	      }
	      function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
	        componentName = componentName || ANONYMOUS;
	        propFullName = propFullName || propName;

	        if (secret !== ReactPropTypesSecret$$) {
	          if (throwOnDirectAccess) {
	            // New behavior only for users of `prop-types` package
	            var err = new Error('Calling PropTypes validators directly is not supported by the `prop-types` package. ' + 'Use `PropTypes.checkPropTypes()` to call them. ' + 'Read more at http://fb.me/use-check-prop-types');
	            err.name = 'Invariant Violation';
	            throw err;
	          } else if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined') {
	            // Old behavior for people using React.PropTypes
	            var cacheKey = componentName + ':' + propName;
	            if (!manualPropTypeCallCache[cacheKey] &&
	            // Avoid spamming the console because they are often not actionable except for lib authors
	            manualPropTypeWarningCount < 3) {
	              printWarning('You are manually calling a React.PropTypes validation ' + 'function for the `' + propFullName + '` prop on `' + componentName + '`. This is deprecated ' + 'and will throw in the standalone `prop-types` package. ' + 'You may be seeing this warning due to a third-party PropTypes ' + 'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.');
	              manualPropTypeCallCache[cacheKey] = true;
	              manualPropTypeWarningCount++;
	            }
	          }
	        }
	        if (props[propName] == null) {
	          if (isRequired) {
	            if (props[propName] === null) {
	              return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
	            }
	            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
	          }
	          return null;
	        } else {
	          return validate(props, propName, componentName, location, propFullName);
	        }
	      }

	      var chainedCheckType = checkType.bind(null, false);
	      chainedCheckType.isRequired = checkType.bind(null, true);

	      return chainedCheckType;
	    }

	    function createPrimitiveTypeChecker(expectedType) {
	      function validate(props, propName, componentName, location, propFullName, secret) {
	        var propValue = props[propName];
	        var propType = getPropType(propValue);
	        if (propType !== expectedType) {
	          // `propValue` being instance of, say, date/regexp, pass the 'object'
	          // check, but we can offer a more precise error message here rather than
	          // 'of type `object`'.
	          var preciseType = getPreciseType(propValue);

	          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
	        }
	        return null;
	      }
	      return createChainableTypeChecker(validate);
	    }

	    function createAnyTypeChecker() {
	      return createChainableTypeChecker(emptyFunctionThatReturnsNull);
	    }

	    function createArrayOfTypeChecker(typeChecker) {
	      function validate(props, propName, componentName, location, propFullName) {
	        if (typeof typeChecker !== 'function') {
	          return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
	        }
	        var propValue = props[propName];
	        if (!Array.isArray(propValue)) {
	          var propType = getPropType(propValue);
	          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
	        }
	        for (var i = 0; i < propValue.length; i++) {
	          var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret$$);
	          if (error instanceof Error) {
	            return error;
	          }
	        }
	        return null;
	      }
	      return createChainableTypeChecker(validate);
	    }

	    function createElementTypeChecker() {
	      function validate(props, propName, componentName, location, propFullName) {
	        var propValue = props[propName];
	        if (!isValidElement(propValue)) {
	          var propType = getPropType(propValue);
	          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
	        }
	        return null;
	      }
	      return createChainableTypeChecker(validate);
	    }

	    function createInstanceTypeChecker(expectedClass) {
	      function validate(props, propName, componentName, location, propFullName) {
	        if (!(props[propName] instanceof expectedClass)) {
	          var expectedClassName = expectedClass.name || ANONYMOUS;
	          var actualClassName = getClassName(props[propName]);
	          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
	        }
	        return null;
	      }
	      return createChainableTypeChecker(validate);
	    }

	    function createEnumTypeChecker(expectedValues) {
	      if (!Array.isArray(expectedValues)) {
	        process.env.NODE_ENV !== 'production' ? printWarning('Invalid argument supplied to oneOf, expected an instance of array.') : void 0;
	        return emptyFunctionThatReturnsNull;
	      }

	      function validate(props, propName, componentName, location, propFullName) {
	        var propValue = props[propName];
	        for (var i = 0; i < expectedValues.length; i++) {
	          if (is(propValue, expectedValues[i])) {
	            return null;
	          }
	        }

	        var valuesString = JSON.stringify(expectedValues);
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
	      }
	      return createChainableTypeChecker(validate);
	    }

	    function createObjectOfTypeChecker(typeChecker) {
	      function validate(props, propName, componentName, location, propFullName) {
	        if (typeof typeChecker !== 'function') {
	          return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
	        }
	        var propValue = props[propName];
	        var propType = getPropType(propValue);
	        if (propType !== 'object') {
	          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
	        }
	        for (var key in propValue) {
	          if (propValue.hasOwnProperty(key)) {
	            var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret$$);
	            if (error instanceof Error) {
	              return error;
	            }
	          }
	        }
	        return null;
	      }
	      return createChainableTypeChecker(validate);
	    }

	    function createUnionTypeChecker(arrayOfTypeCheckers) {
	      if (!Array.isArray(arrayOfTypeCheckers)) {
	        process.env.NODE_ENV !== 'production' ? printWarning('Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
	        return emptyFunctionThatReturnsNull;
	      }

	      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
	        var checker = arrayOfTypeCheckers[i];
	        if (typeof checker !== 'function') {
	          printWarning('Invalid argument supplied to oneOfType. Expected an array of check functions, but ' + 'received ' + getPostfixForTypeWarning(checker) + ' at index ' + i + '.');
	          return emptyFunctionThatReturnsNull;
	        }
	      }

	      function validate(props, propName, componentName, location, propFullName) {
	        for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
	          var checker = arrayOfTypeCheckers[i];
	          if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret$$) == null) {
	            return null;
	          }
	        }

	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
	      }
	      return createChainableTypeChecker(validate);
	    }

	    function createNodeChecker() {
	      function validate(props, propName, componentName, location, propFullName) {
	        if (!isNode(props[propName])) {
	          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
	        }
	        return null;
	      }
	      return createChainableTypeChecker(validate);
	    }

	    function createShapeTypeChecker(shapeTypes) {
	      function validate(props, propName, componentName, location, propFullName) {
	        var propValue = props[propName];
	        var propType = getPropType(propValue);
	        if (propType !== 'object') {
	          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
	        }
	        for (var key in shapeTypes) {
	          var checker = shapeTypes[key];
	          if (!checker) {
	            continue;
	          }
	          var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret$$);
	          if (error) {
	            return error;
	          }
	        }
	        return null;
	      }
	      return createChainableTypeChecker(validate);
	    }

	    function createStrictShapeTypeChecker(shapeTypes) {
	      function validate(props, propName, componentName, location, propFullName) {
	        var propValue = props[propName];
	        var propType = getPropType(propValue);
	        if (propType !== 'object') {
	          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
	        }
	        // We need to check all keys in case some are required but missing from
	        // props.
	        var allKeys = assign({}, props[propName], shapeTypes);
	        for (var key in allKeys) {
	          var checker = shapeTypes[key];
	          if (!checker) {
	            return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' + '\nBad object: ' + JSON.stringify(props[propName], null, '  ') + '\nValid keys: ' + JSON.stringify(Object.keys(shapeTypes), null, '  '));
	          }
	          var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret$$);
	          if (error) {
	            return error;
	          }
	        }
	        return null;
	      }

	      return createChainableTypeChecker(validate);
	    }

	    function isNode(propValue) {
	      switch (typeof propValue === 'undefined' ? 'undefined' : babelHelpers.typeof(propValue)) {
	        case 'number':
	        case 'string':
	        case 'undefined':
	          return true;
	        case 'boolean':
	          return !propValue;
	        case 'object':
	          if (Array.isArray(propValue)) {
	            return propValue.every(isNode);
	          }
	          if (propValue === null || isValidElement(propValue)) {
	            return true;
	          }

	          var iteratorFn = getIteratorFn(propValue);
	          if (iteratorFn) {
	            var iterator = iteratorFn.call(propValue);
	            var step;
	            if (iteratorFn !== propValue.entries) {
	              while (!(step = iterator.next()).done) {
	                if (!isNode(step.value)) {
	                  return false;
	                }
	              }
	            } else {
	              // Iterator will provide entry [k,v] tuples rather than values.
	              while (!(step = iterator.next()).done) {
	                var entry = step.value;
	                if (entry) {
	                  if (!isNode(entry[1])) {
	                    return false;
	                  }
	                }
	              }
	            }
	          } else {
	            return false;
	          }

	          return true;
	        default:
	          return false;
	      }
	    }

	    function isSymbol(propType, propValue) {
	      // Native Symbol.
	      if (propType === 'symbol') {
	        return true;
	      }

	      // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
	      if (propValue['@@toStringTag'] === 'Symbol') {
	        return true;
	      }

	      // Fallback for non-spec compliant Symbols which are polyfilled.
	      if (typeof Symbol === 'function' && propValue instanceof Symbol) {
	        return true;
	      }

	      return false;
	    }

	    // Equivalent of `typeof` but with special handling for array and regexp.
	    function getPropType(propValue) {
	      var propType = typeof propValue === 'undefined' ? 'undefined' : babelHelpers.typeof(propValue);
	      if (Array.isArray(propValue)) {
	        return 'array';
	      }
	      if (propValue instanceof RegExp) {
	        // Old webkits (at least until Android 4.0) return 'function' rather than
	        // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
	        // passes PropTypes.object.
	        return 'object';
	      }
	      if (isSymbol(propType, propValue)) {
	        return 'symbol';
	      }
	      return propType;
	    }

	    // This handles more types than `getPropType`. Only used for error messages.
	    // See `createPrimitiveTypeChecker`.
	    function getPreciseType(propValue) {
	      if (typeof propValue === 'undefined' || propValue === null) {
	        return '' + propValue;
	      }
	      var propType = getPropType(propValue);
	      if (propType === 'object') {
	        if (propValue instanceof Date) {
	          return 'date';
	        } else if (propValue instanceof RegExp) {
	          return 'regexp';
	        }
	      }
	      return propType;
	    }

	    // Returns a string that is postfixed to a warning about an invalid type.
	    // For example, "undefined" or "of type array"
	    function getPostfixForTypeWarning(value) {
	      var type = getPreciseType(value);
	      switch (type) {
	        case 'array':
	        case 'object':
	          return 'an ' + type;
	        case 'boolean':
	        case 'date':
	        case 'regexp':
	          return 'a ' + type;
	        default:
	          return type;
	      }
	    }

	    // Returns class name of the object, if any.
	    function getClassName(propValue) {
	      if (!propValue.constructor || !propValue.constructor.name) {
	        return ANONYMOUS;
	      }
	      return propValue.constructor.name;
	    }

	    ReactPropTypes.checkPropTypes = checkPropTypes$$;
	    ReactPropTypes.PropTypes = ReactPropTypes;

	    return ReactPropTypes;
	  };
	  return module.exports;
	}({ exports: {} });

	var index = function (module) {
	  var exports = module.exports;
	  /**
	   * Copyright (c) 2013-present, Facebook, Inc.
	   *
	   * This source code is licensed under the MIT license found in the
	   * LICENSE file in the root directory of this source tree.
	   */

	  if (process.env.NODE_ENV !== 'production') {
	    var REACT_ELEMENT_TYPE = typeof Symbol === 'function' && Symbol.for && Symbol.for('react.element') || 0xeac7;

	    var isValidElement = function isValidElement(object) {
	      return (typeof object === 'undefined' ? 'undefined' : babelHelpers.typeof(object)) === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
	    };

	    // By explicitly using `prop-types` you are opting into new development behavior.
	    // http://fb.me/prop-types-in-prod
	    var throwOnDirectAccess = true;
	    module.exports = factoryWithTypeCheckers(isValidElement, throwOnDirectAccess);
	  } else {
	    // By explicitly using `prop-types` you are opting into new production behavior.
	    // http://fb.me/prop-types-in-prod
	    module.exports = factoryWithThrowingShims();
	  }
	  return module.exports;
	}({ exports: {} });

	var ReactDriveIn = function (_React$Component) {
	  babelHelpers.inherits(ReactDriveIn, _React$Component);

	  function ReactDriveIn(props) {
	    babelHelpers.classCallCheck(this, ReactDriveIn);

	    var _this = babelHelpers.possibleConstructorReturn(this, (ReactDriveIn.__proto__ || Object.getPrototypeOf(ReactDriveIn)).call(this, props));

	    _this.state = {
	      className: props.className,
	      mute: props.mute,
	      loop: props.loop,
	      playing: !props.paused,
	      loopPaylistItems: props.loopPlaylistItems,
	      slideshow: props.slideshow,
	      volume: props.volume,
	      onTimeFrequency: props.onTimeFrequency
	    };

	    _this.setPlaying = _this.setPlaying.bind(_this);
	    _this.setPause = _this.setPause.bind(_this);
	    _this.setLoading = _this.setLoading.bind(_this);
	    _this.setCanPlay = _this.setCanPlay.bind(_this);
	    return _this;
	  }

	  babelHelpers.createClass(ReactDriveIn, [{
	    key: "getMedia",
	    value: function getMedia() {
	      return this.refs.media;
	    }
	  }, {
	    key: "getPlaylist",
	    value: function getPlaylist() {
	      return this.state.playlist;
	    }
	  }, {
	    key: "setPlaying",
	    value: function setPlaying(currentItem) {
	      this.setState({ playing: true, currentItem: currentItem });
	      if (this.props.onPlaying) {
	        this.props.onPlaying(currentItem);
	      }
	    }
	  }, {
	    key: "setPause",
	    value: function setPause() {
	      this.setState({ playing: false });
	      if (this.props.onPause) {
	        this.props.onPause();
	      }
	    }
	  }, {
	    key: "setLoading",
	    value: function setLoading() {
	      this.setState({ canPlay: false });
	    }
	  }, {
	    key: "setCanPlay",
	    value: function setCanPlay() {
	      this.setState({ canPlay: true });
	      if (this.props.onCanPlay) {
	        this.props.onCanPlay();
	      }
	    }
	  }, {
	    key: "componentWillMount",
	    value: function componentWillMount() {
	      this.DI = new DriveIn();
	      this.DI.on("media.playing", this.setPlaying);
	      this.DI.on("media.pause", this.setPause);
	      this.DI.on("media.loading", this.setLoading);
	      this.DI.on("media.canplay", this.setCanPlay);
	    }
	  }, {
	    key: "componentDidMount",
	    value: function componentDidMount() {
	      var _this2 = this;

	      var playlist = void 0;

	      this.DI.init({
	        el: this.getMedia(),
	        slideshow: this.props.slideshow,
	        startPaused: this.props.paused,
	        isTouch: this.props.isTouch
	      });

	      var options = {
	        mute: this.props.mute,
	        loop: this.props.loop,
	        loopPlaylistItems: this.props.loopPlaylistItems,
	        poster: this.props.poster
	      };

	      if (this.props.showPlaylist) {
	        playlist = this.DI.showPlaylist(this.props.showPlaylist, options);
	      } else {
	        playlist = this.DI.show(this.props.show, options);
	      }

	      if (this.props.onTime) {
	        this.intervalId = window.setInterval(function () {
	          _this2.props.onTime(_this2.DI.currentTime());
	        }, this.props.onTimeFrequency);
	      }

	      if (this.props.playbackRate) {
	        this.playbackRate(this.props.playbackRate);
	      }

	      this.setState({ initalized: true, playlist: playlist });
	    }
	  }, {
	    key: "componentWillUnmount",
	    value: function componentWillUnmount() {
	      if (this.intervalId) {
	        window.clearInterval(this.intervalId);
	      }

	      this.DI.removeAllListeners();
	      this.DI.close();
	      delete this.DI;
	    }
	  }, {
	    key: "play",
	    value: function play(itemNum) {
	      this.DI.play(itemNum);
	    }
	  }, {
	    key: "pause",
	    value: function pause() {
	      this.DI.pause();
	    }
	  }, {
	    key: "mute",
	    value: function mute() {
	      this.DI.setVolume(0);
	      this.setState({ mute: true });
	    }
	  }, {
	    key: "unmute",
	    value: function unmute() {
	      this.DI.setVolume(this.props.volume);
	      this.setState({ mute: false });
	    }
	  }, {
	    key: "playbackRate",
	    value: function playbackRate(rate) {
	      rate = rate || 1.0;
	      this.DI.setPlaybackRate(rate);
	      this.setState({ playbackRate: rate });
	    }
	  }, {
	    key: "seekTo",
	    value: function seekTo(time) {
	      this.DI.seekTo(time);
	    }
	  }, {
	    key: "duration",
	    value: function duration() {
	      return this.DI.duration();
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      var classes = this.props.className + " drive-in-wrap";
	      return React.createElement(
	        "div",
	        { ref: "wrap", className: classes },
	        React.createElement("div", { ref: "media", className: "drive-in-media" })
	      );
	    }
	  }]);
	  return ReactDriveIn;
	}(React.Component);

	ReactDriveIn.displayName = "DriveIn";

	ReactDriveIn.propTypes = {
	  show: index.oneOfType([index.string, index.array]),
	  showPlaylist: index.oneOfType([index.array]),
	  poster: index.string,
	  mute: index.bool,
	  paused: index.bool,
	  loop: index.bool,
	  loopPlaylistItems: index.bool,
	  playbackRate: index.number,
	  slideshow: index.bool,
	  onPlaying: index.func,
	  onPause: index.func,
	  onTime: index.func,
	  onTimeFrequency: index.number,
	  onCanPlay: index.func,
	  isTouch: index.func,
	  volume: index.number,
	  className: index.string
	};

	ReactDriveIn.defaultProps = {
	  className: "drive-in",
	  mute: true,
	  loop: true,
	  loopPaylistItems: false,
	  slideshow: false,
	  volume: 0.5,
	  onTimeFrequency: 500
	};

	return ReactDriveIn;

})(React);