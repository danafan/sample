// (function () {
// 	sessionStorage.setItem("windowHref",window.location.href);
// 	document.addEventListener('DOMContentLoaded', function () {
// 		autoWidth();
// 	});
// 	//监听屏幕大小改变
// 	window.onresize = function(){
// 		autoWidth();
// 	};
// 	//修改适配
// 	function autoWidth(){
// 		var html = document.documentElement;
// 		var windowWidth = parseInt(html.clientWidth);				//html宽度
// 		var availwidth = parseInt(screen.availWidth);				//屏幕实际宽度
// 		if(windowWidth > 750) {
// 			console.log("请访问pc端");
// 		}else if(windowWidth != availwidth){
// 			alert('找到你了')
// 			html.style.fontSize = '1px';
// 		}else{
// 			html.style.fontSize = 2 * (windowWidth / 750) + 'px';
// 		}
// 	}	
// })();

(function (doc, win) {
	var docEl = doc.documentElement,
		resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
		recalc = function () {
			var clientWidth = docEl.clientWidth;
			if (!clientWidth) return;
			if (clientWidth >= 750) {
				docEl.style.fontSize = '1px';
			} else {
				docEl.style.fontSize = 2 * (clientWidth / 750) + 'px';
			}
		};

	if (!doc.addEventListener) return;
	win.addEventListener(resizeEvt, recalc, false);
	doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);