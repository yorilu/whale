/*
*  @project whale
*  @purpose javascript cache framework.
*  @author Yori.Lu 
*  @Email yori_lu@163.com
*/

(function() {
    var whale = window.whale = {},
    udf, defaultSize = 10,
    element = function(key, value, hint) {
        //key
        this.k = key;
        //value
        this.v = value;
        //hint times
        this.h = hint || 0;
        //last modify time
        this.t = new Date();
    }
    isEmpty = function(obj) {
        return typeof obj == 'undefined' || obj == udf || obj == null;
    },
    getRandom = function(max) {
        return Math.round(max * Math.random());
    },
    findElement = function(key, arr) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].k == key) {
                return arr[i];
            }
        }
    },
    removeElement = function(key, arr) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].k == key) {
                return arr.splice(i, 1);
            }
        }
    },
    oneCacheModel = function(param, set, get) {
        var cache = [];
        param.size = param.size || defaultSize;

        var _set = function(key, value) {
            set(key, value, cache);
        };
        var _get = get ||
        function(key) {
            var item = findElement(key, cache);
            if (item) {
                item.h++;
                item.t = new Date();
                return item.v;
            }
        }
        return {
            set: _set,
            get: _get,
            _remove: function(key) {
                return removeElement(key, cache);
            },
            _getCache: function() {
                return cache;
            },
            _getLength: function() {
                return cache.length;
            }
        };
    };

    //Random cache
    whale.Random = function(param) {
        var set = function(key, value, cache) {
            removeElement(key, cache);
            var index;
            if (cache.length >= param.size) {
                index = getRandom(param.size - 1);
            } else {
                index = cache.length;
            }
            cache[index] = new element(key, value);
        };

        return oneCacheModel(param, set)
    };

    //First in first out cache
    whale.FIFO = function(param) {
        var set = function(key, value, cache) {
            removeElement(key, cache);
            if (cache.length >= param.size) {
                cache.shift();
            }
            cache.push(new element(key, value))
        };
        return oneCacheModel(param, set)
    };

    //Least recently used cache
    whale.LRU = function(param) {
        var set = function(key, value, cache) {
            removeElement(key, cache);
            if (cache.length >= param.size) {
                cache.sort(function(a, b) {
                    return a.t > b.t ? 1 : -1;
                });
                cache.shift();
            }
            cache.push(new element(key, value))
        };
        return oneCacheModel(param, set)
    };

    //Least frequently used cache
    whale.LFU = function(param) {
        var set = function(key, value, cache) {
            removeElement(key, cache);
            if (cache.length >= param.size) {
                cache.sort(function(a, b) {
                    return a.h > b.h ? 1 : -1;
                });
                cache.shift();
            }
            cache.push(new element(key, value))
        };
        return oneCacheModel(param, set)
    };

    /*
    * Two Queues cache
    * @param size L1 cache size
    * @param L2size L2 cahce size
    */
    whale.TwoQueue = function(param) {
        var cache1 = whale.LRU({
            size: param.size
        });
        var cache2 = whale.LRU({
            size: param.L2size
        });

        var set = function(key, value) {
            cache1.set(key, value);
        };
        var get = function(key) {
            var item1 = findElement(key, cache1._getCache());
            if (!isEmpty(item1)) {
                if (item1.h >= 1) {
                    var ele = cache1._remove(key);
                    cache2.set(ele[0].k, ele[0].v);
                    return ele[0].k;
                } else {
                    return cache1.get(key);
                }
            }
            return cache2.get(key);
        }
        return {
            set: set,
            get: get
        };
    };
})()