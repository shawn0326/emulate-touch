redirectMouseToTouch = function(A, B) {
	if (B.target.tagName.toUpperCase().indexOf("SELECT") == -1 && B.target.tagName.toUpperCase().indexOf("TEXTAREA") == -1 && B.target.tagName.toUpperCase().indexOf("INPUT") == -1) {
		B.stopPropagation()
	}
	var C = document.createEvent("Event");
	C.initEvent(A, true, true);
	C.touches = new Array();
	C.touches[0] = new Object();
	C.touches[0].pageX = B.pageX;
	C.touches[0].pageY = B.pageY;
	C.touches[0].target = B.target;
	C.changedTouches = C.touches;
	C.targetTouches = C.touches;
	C.target = B.target;
	B.target.dispatchEvent(C);
	return C
};
emulateTouchEvents = function() {
	var A = document;
	document.mouseMoving = false;
	document.addEventListener("mousedown", function(B) {
		try {
			this.mouseMoving = true;
			var C = redirectMouseToTouch("touchstart", B);
			if (document.ontouchstart) {
				document.ontouchstart(C)
			}
			if (B.target.ontouchstart) {
				B.target.ontouchstart(B)
			}
		} catch (B) {}
	});
	document.addEventListener("mouseup", function(B) {
		try {
			this.mouseMoving = false;
			var C = redirectMouseToTouch("touchend", B);
			if (document.ontouchend) {
				document.ontouchend(C)
			}
			if (B.target.ontouchend) {
				B.target.ontouchend(B)
			}
		} catch (B) {}
	});
	document.addEventListener("mousemove", function(B) {
		try {
			if (!this.mouseMoving) {
				return
			}
			var C = redirectMouseToTouch("touchmove", B);
			if (document.ontouchmove) {
				document.ontouchmove(C)
			}
			if (B.target.ontouchmove) {
				B.target.ontouchmove(B)
			}
		} catch (B) {}
	})
};
emulateTouchEvents();
window.addEventListener("resize", function() {
	var A = document.createEvent("Event");
	A.initEvent("orientationchange", true, true);
	document.dispatchEvent(A)
}, false);