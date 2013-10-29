(function(){
	var imgs = document.getElementsByTagName('html')[0].innerHTML.match(/<img[^>]*rel="__imagic"[^>]*?>/g);
	var imglen = imgs.length;
	var whs = [];
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
		var thumbnails = document.createElement("div")
			thumbnails.className = "thumbnails";
		var htm = '<ul>';
		for (var i=0; i<arr.length; i++) {
			htm += '<li><img src="'+arr[i].uri+'" ';
			if (arr[i].width >= arr[i].height) {
				htm += 'width="150"';
			}else {
				htm += 'height="150"';
			}
			htm += ' /></li>'
		}
		htm += '</ul>';
		thumbnails.innerHTML = htm;
		console.log(htm);
		if (arr[0].width/arr[0].height >= 700/550) {
			showcase.innerHTML = '<img src="'+arr[0].uri+'" width="700" />'; 
		}else {
			showcase.innerHTML = '<img src="'+arr[0].uri+'" height="550" />'; 
		}
		albums.className = 'albums';
		albums.appendChild(aclose);
		albums.appendChild(showcase);
		albums.appendChild(thumbnails);
		document.getElementsByTagName('body')[0].insertBefore(albums, document.getElementsByTagName('img')[0]);
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