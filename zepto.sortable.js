/**
 * Zepto sortable 0.2
 * Copyright 2016, https://github.com/fwon
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Desctiption:
 *   Avaliable for both pc and mobile
 * Depends:
 *   zepto.js
 */

(function($) {
    var bindedElement = []; //if element has binded or not
    $.fn.sortable = function(options) {

        //had add listener, then return
        if (bindedElement.indexOf(this.selector) < 0) {
            bindedElement.push(this.selector)
        } else {
            return false;
        }

        var defaults = {
            orient: null,           //orient of items vertical/horizontal
            itemClassName: 'cont',  //item className
            positionDisplay: 'static',
            afterSort: null
        };
        options = $.extend(defaults, options);

        //orient is required
        if (!options.orient) return;

        var itemPositions = [], //the position of all items
            itemElements,   //element of all items
            itemClassName = options.itemClassName,
            selector = this.selector,
            itemSelectorSelf = '.' + itemClassName,
            itemSelector = selector + ' .' + itemClassName,
            offsetLeft, //left of first item
            offsetTop, //top of first item
            itemDistanceX = null,
            itemDistanceY = null, //distance of each item
            isVertical = (options.orient === 'vertical');

        function _initDistance() {
            if ($(itemSelector).length < 2) return false;

            var firstElement = $(itemSelector).first();
            var secondElement = $($(itemSelector).get(1));
            if (firstElement && secondElement) {
                offsetTop = firstElement.position().top;
                itemDistanceY = secondElement.position().top - offsetTop;

                offsetLeft = firstElement.position().left;
                itemDistanceX = secondElement.position().left - offsetLeft;

                return true;
            } else {
                return false;
            }
        }

        //collect absolute position of all items
        function _collectPositions() {
            itemElements = $(itemSelector);
            itemPositions = [];
            for (var i = 0, len = itemElements.length; i < len; i++) {
                var item = $(itemElements[i]);
                var _left = item.position().left,
                    _top = item.position().top;
                itemPositions.push({
                    left: _left,
                    top: _top
                });
                //add class cont-n & data-pos
                item.addClass(itemClassName + '-' + i);
                item.attr('data-pos', i);
            }
        }

        //change items to absolute position
        function _setEleAbsolute() {
            itemElements = $(itemSelector);
            for (var i = 0, len = itemElements.length; i < len; i++) {
                var item = $(itemElements[i]);
                var pos = itemPositions[i];
                item.css({
                    position: 'absolute',
                    left: pos.left,
                    top: pos.top
                });
            }
        }

        //change items to static position
        function _setEleStatic() {
            $(itemSelector).css({
                position: options.positionDisplay,
                left: '',
                top: ''
            });
        }

        /**
         * exchange position of two item, to their father container
         * @param  {[DOM]} target  [dragging element]
         * @param  {[DOM]} origin [element to replace]
         */
        function _exchangeItems(target, origin) {
            var targetPos = target.data('pos'),
                originPos = origin.data('pos');

            target.data('pos', originPos);
            origin.data('pos', targetPos);

            target.removeClass(itemClassName + '-' + targetPos)
                .addClass(itemClassName + '-' + originPos);
            origin.removeClass(itemClassName + '-' + originPos)
                .addClass(itemClassName + '-' + targetPos);

            if (+targetPos > +originPos) {
                origin.insertAfter(target);
            } else {
                origin.insertBefore(target);
            }
        }

        //collect items position first
        //_collectPositions();

        var targetItem, oldPos, curPos;

        $(selector).on('touchstart mousedown', itemSelectorSelf, function(e) {
            e.preventDefault();
            e.stopPropagation();

            if (!_initDistance()) return false;

            _collectPositions();

            targetItem = $(e.currentTarget);
            oldPos = +targetItem.data('pos');

            _setEleAbsolute();
        });

        $(selector).on('touchmove mousemove', itemSelectorSelf, function(e) {
            e.preventDefault();
            e.stopPropagation();

            //move event must after start/down
            if (!targetItem) return false;

            var touch = null;
            if (e.type === 'touchmove') {
                if (e.touches && e.touches.length === 1) {
                    touch = e.touches[0];
                }
            } else if (e.type === 'mousemove') {
                touch = {
                    pageX: e.pageX,
                    pageY: e.pageY
                };
            }

            if (!touch) return false;

            if (isVertical) {
                targetItem.css({
                    top: touch.pageY - itemDistanceY/2
                });
            } else {
                targetItem.css({
                    left: touch.pageX - itemDistanceX/2
                });
            }

            if (isVertical) {
                curPos = Math.floor((touch.pageY - offsetTop)/itemDistanceY);
            } else {
                curPos = Math.floor((touch.pageX - offsetLeft)/itemDistanceX);
            }

            if (curPos < 0) curPos = 0;
            if (curPos >= itemElements.length) curPos = itemElements.length - 1;

            if (oldPos !== curPos) {
                var originItem = $(itemSelector + '-' + curPos);
                originItem.css({
                    left: itemPositions[oldPos]['left'],
                    top: itemPositions[oldPos]['top']
                });
                _exchangeItems(targetItem, originItem);
                oldPos = curPos;
            }
        });

        $(selector).on('touchend mouseup', itemSelectorSelf, function(e) {
            //not move! just click
            //curPos == 0 is ok
            if (!(curPos+1)) {
                targetItem = null;
                return false;
            }

            targetItem.css({
                left: itemPositions[curPos]['left'],
                top: itemPositions[curPos]['top']
            });
            targetItem = null;
            _setEleStatic();

            //after sorted callback
            if (options.afterSort) {
                options.afterSort();
            }
        });

    }

})(Zepto);