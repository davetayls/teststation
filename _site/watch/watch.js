(function(watch, unwatch){
createWatcher = watch && unwatch ?
    // Andrea Giammarchi - Mit Style License

	// Browsers with watch built in
    function(el){
        var handlers = [];
        return {
            destroy:function(){
                handlers.forEach(function(prop){
                    unwatch.call(this, prop);
                }, this);
                delete handlers;
            },
            watch:function(prop, handler){
                if(-1 === handlers.indexOf(prop)){
                    handlers.push(prop);
		            el.watch(prop, handler);
				}
            },
            unwatch:function(prop){
                var i = handlers.indexOf(prop);
                if(-1 !== i){
                    el.unwatch(prop);
                    handlers.splice(i, 1);
                };
            }
        }
    }
	// Others
	:(Object.prototype.__defineSetter__?

	// Browsers which include __defineSetter	
    function(el){
        var handlers = [];
        return {
            destroy:function(){
                handlers.forEach(function(prop){
                    delete this[prop];
                }, this);
                delete handlers;
            },
            watch:function(prop, handler){
                if(-1 === handlers.indexOf(prop))
                    handlers.push(prop);
                if(!this.__lookupGetter__(prop))
                    this.__defineGetter__(prop, function(){return el[prop]});
                this.__defineSetter__(prop, function(newValue){
                    el[prop] = handler.call(el, prop, el[prop], newValue);
                });
            },
            unwatch:function(prop){
                var i = handlers.indexOf(prop);
                if(-1 !== i){
                    delete this[prop];
                    handlers.splice(i, 1);
                };
            }
        };
    }:
	// Browsers with onpropertychange event
    function(el){
        function changeFn(){
            var prop = event.propertyName;
            var newValue = empty[prop];
            var prevValue = el[prop];
            var handler = handlers[prop];
            if(handler)
                attachEvent(detachEvent()[prop] = el[prop] = handler.call(el, prop, prevValue, newValue));
        };
		function disabledChangeHandler(){
			var prevValue = el.disabled;
			var timerFn = function(){
				if(!el.disabled == prevValue){
		            var handler = handlers['disabled'];
		            if (handler) {
						var result = handler.call(el, 'disabled', prevValue, el.disabled);
					}
				} 
			}
			var t = window.setTimeout(timerFn,50);
		}
		var handlers = {};
        el.destroy = function(){
            detachEvent();
            empty.parentNode.removeChild(empty);
            empty = handlers = null;
        };
        el.watch = function(prop, handler){
			handlers[prop] = handler;
		};
        el.unwatch = function(prop){delete handlers[prop]};
		el.onpropertychange = changeFn;
        return el;
    }
);
})(Object.prototype.watch, Object.prototype.unwatch);
