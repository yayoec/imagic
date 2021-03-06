(function(){
	var imgs = document.getElementsByTagName('html')[0].innerHTML.match(/<img[^>]*rel="__imagic"[^>]*?>/g);
	var imglen = imgs.length;
	var whs = [];
	var userAgent = navigator.userAgent,
		isIE = /msie/i.test(userAgent) && !window.opera,
		isWebKit = /webkit/i.test(userAgent),
		isFirefox = /firefox/i.test(userAgent);
	for (var i=0; i<imglen; i++) {
		var tmpImg = new Image();
		tmpImg.src = parseDom(imgs[i]).src;
		getWH(tmpImg, i);
	}
	setTimeout(function () {
		createBar(whs);
	}, 300);
	function createBar (arr) {
		var albums = document.createElement("div");
		var aclose = document.createElement("a");
		aclose.className = 'close';
		var showcase = document.createElement("div");
		showcase.className = "showcase";
		var thumbnails = document.createElement("div");
			thumbnails.className = "thumbnails";
			thumbnails.id = "__thumbnails";
		var htm = '<div class="thumb_table">';//'<ul>';
		for (var i=0; i<arr.length; i++) {
			htm += '<div class="thumb_cell"><img src="'+arr[i].uri+'" ';
			if (arr[i].width >= arr[i].height) {
				htm += 'width="65"';
			}else {
				htm += 'height="65"';
			}
			htm += i == 0 ? 'class="focus"' : ''; 
			htm += ' /></div>'
		}
		htm += '</div>';
		//htm += '</ul>';
		thumbnails.innerHTML = htm;
		if (arr[0].width/arr[0].height >= 700/550) {
			showcase.innerHTML = '<div class="gallary"><img src="'+arr[0].uri+'" width="700" id="__shower" /></div>'; 
		}else {
			showcase.innerHTML = '<div class="gallary"><img src="'+arr[0].uri+'" height="550" id="__shower" /></div>'; 
		}
		albums.className = 'albums';
		albums.appendChild(aclose);
		albums.appendChild(showcase);
		albums.appendChild(thumbnails);
		document.getElementsByTagName('body')[0].insertBefore(albums, document.getElementsByTagName('img')[0]);
		var thumbdiv = document.getElementById('__thumbnails')
		Util.addHandler(thumbdiv, 'click', function(e){
			if(e.target.nodeName == 'IMG'){
				var thumbimgs = thumbdiv.getElementsByTagName('img');
				for (var i=0; i<thumbimgs.length; i++) {
					thumbimgs[i].className = '';
				}
				e.target.className = 'focus';
				document.getElementById('__shower').src = e.target.src;
			};
		})
	}
	function parseDom(arg) {
		var objE = document.createElement("div");
		objE.innerHTML = arg;
		return objE.childNodes[0];
	};
	function getWH(img, i){
		if(img.complete){
			// 打印
			whs.push({
				'width': img.width,
				'height': img.height,
				'uri': img.src
			}); 
		}else{
			// 加载完成执行
			img.onload = function(){
				whs.push({
					'width': img.width,
					'height': img.height,
					'uri': img.src
				});
			};
		}
	}

	function prevImg () {

	}

	function nextImg () {
	}

	function zoomIn () {

	}
	function cover_bg () {
		var cover_dom = document.getElementById('__cover__bg');
		if(!cover_dom){
			if (/msie/.test(window.navigator.userAgent.toLowerCase())) {
				var div = document.createElement('div');
				var cstyle = 'width:100%;height: 100%;_position:absolute;position: fixed;left: 0;top: 0;z-index: 10;';
					cstyle += 'background-color: #000;opacity: 0.4;filter:alpha(opacity=40);over-flow:hidden';
				div.id = '__cover__bg';
				div.style.setAttribute('cssText', cstyle);
				document.body.appendChild(div);			
			}else{
				var div = document.createElement('div');
				var cstyle = 'width:100%;height: 100%;_position:absolute;position: fixed;left: 0;top: 0;z-index: 10;';
					cstyle += 'background-color: #000;opacity: 0.4;filter:alpha(opacity=40);over-flow:hidden';
				div.id = '__cover__bg';
				div.setAttribute('style', cstyle);
				document.body.appendChild(div);
			}
		}else {
			document.getElementById('__cover__bg').style.display = 'block';
		}
	}
	
	function setStyle(div, style) {
		if (/msie/.test(window.navigator.userAgent.toLowerCase())) {
			div.style.setAttribute('cssText', style);
		}else {
			div.setAttribute('style', style);
		}
	}

	function hide_bg () {
		var cover_dom = document.getElementById('__cover__bg');
		try{
			cover_dom.style.display = 'none';
		}catch(e){
			alert(e);
		}
	}

	function rotate(target, degree) {
		if (isWebKit) {
			target.style.webkitTransform = "rotate(" + degree + "deg)";
		} else if (isFirefox) {
			target.style.MozTransform = "rotate(" + degree + "deg)";
		} else if (isIE) {
			//chessDiv.style.filter = "progid:DXImageTransform.Microsoft.BasicImage(rotation=" + degree + ")";
			degree = degree / 180 * Math.PI;
			var sinDeg = Math.sin(degree);
			var cosDeg = Math.cos(degree);
			 
			target.style.filter = "progid:DXImageTransform.Microsoft.Matrix(" +
					"M11=" + cosDeg + ",M12=" + (-sinDeg) + ",M21=" + sinDeg + ",M22=" + cosDeg + ",SizingMethod='auto expand')";
		} else {
			target.style.transform = "rotate(" + degree + "deg)";
		}
	}
})()

//事件
var Util = {
	addHandler : function (ele, type, handler) {
		if (ele.addEventListener) {
			ele.addEventListener(type, handler, false);
		}else if(ele.attachEvent){
			ele.attachEvent('on'+type, handler);
		}else {
			ele['on'+type] = handler;
		}
	},
	removeHandler : function (ele, type, handler) {
		if (ele.removeEventListener) {
			ele.removeEventListener(type, handler, false);
		}else if (ele.detachEvent) {
			ele.detachEvent('on'+type, handler);
		}else{
			ele['on'+type] = null;
		}
	},
	getEvent : function (e) {
		return e || window.event;
	},
	getTarget : function (event) {
		return event.target || event.srcElement;
	}
}