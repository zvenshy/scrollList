(function () {
    var $, w;
    $ = this.jQuery || window.jQuery;
    w = $(window);
	/* 
	 * interval: Number. interval time. Default: 500ms
	 * direction: String. down or top. Default: top;
	 * parent: jquery dom; Default: listBox.parent();
	 */
    $.fn.scrollList = function scrollList(interval, direction, parentBox) {
    	listBox = this;
		if ($.type(listBox) === "array" && listBox.length === 0) return false;
	    var parentBox = parentBox || listBox.parent(),
	        direction = direction || 'top',
	        parentHeight = parentBox.height(),
	        items, itemHeight, firstItem, lastItem,
	    	listHeight = listBox.height(),
	        interval = interval || 500;

	    if (parentHeight >= listHeight) return false;

	    function move() {
	    	items = listBox.children();
	    	firstItem = items.first();
	    	lastItem = items.last();
	    	itemHeight = firstItem.height();

	    	//add last item to top
	    	if ( firstItem.css('marginTop') === '0px' && direction === 'down' ) {
	    		firstItem = lastItem.insertBefore(firstItem).css('marginTop', '-' + itemHeight + 'px');               
	    	}

            return direction === "down" ? 
            	firstItem.animate({'marginTop': '0px'}, interval, function () {
                	$(this).removeAttr('style');
                	move();
                }) :
                firstItem.animate({'marginTop': '-' + itemHeight + 'px'}, interval, function () {
                	$(this).insertAfter(lastItem).removeAttr('style');
                	move();
                });
	    };

	    listBox.on('mouseenter', function () {
	    	firstItem.stop();
	    }).on('mouseleave', function () {
	    	move();
	    });

	    move();
	}
}).call(this);