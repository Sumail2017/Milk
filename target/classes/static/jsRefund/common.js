var _debug = true;
/**Version**/
var timestamp="1.0.0709";
COMMON_PAGESIZE=10;

function debug(str){
	if (_debug)
		console.log(str);
}
function toast(msg) {
	alert(msg);
}
function dialog(msg) {
	return window.confirm(msg);
}

/*
@@获取url中的参数
*/
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return r[2];
    return "";
}

function is_weixn(){
    var ua = navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i)=="micromessenger") {
        return true;
    } else {
        return false;
    }
}

//本地存储
var lcstor = window.localStorage;
function setStorage(key, value) {
	if (lcstor) {
		var type = typeof (value);
		value = (type == 'object') ? JSON.stringify(value) : value;
		lcstor.setItem(key, value);
	} else
		alert('localStorage error');
}
function getStorage(key, isObject) {
	if (lcstor) {
		var ret = '';
		if (isObject) {
			ret = {};
			try {
				ret = JSON.parse(lcstor.getItem(key));
			} catch(e) {
			}
		} else {
			ret = lcstor.getItem(key);
			if (ret==undefined||ret=="undefined"||ret=="null")
				return undefined;
		}
		return ret;
	} else
		alert('localStorage error');
}
function removeStorage(key) {
	if (lcstor) {
		if (key)
			lcstor.removeItem(key);
	} else
		alert('localStorage error');
}
function clearStorage() {
	if (lcstor) {
		lcstor.clear();
	} else
		alert('localStorage error');
}
//session级别存储
var sessionstor = window.sessionStorage;

function setSessionStorage(key, value) {
	if (sessionstor) {
		var type = typeof (value);
		value = (type == 'object') ? JSON.stringify(value) : value;
		sessionstor.setItem(key, value);
	} else
		alert('sessionStorage error');
}
function getSessionStorage(key, isObject) {
	if (sessionstor) {
		var ret = '';
		if (isObject) {
			ret = {};
			try {
				ret = JSON.parse(sessionstor.getItem(key));
			} catch(e) {
			}
		} else {
			ret = sessionstor.getItem(key);
			if (ret==undefined||ret=="undefined"||ret=="null")
				return undefined;
		}
		return ret;
	} else
		alert('sessionStorage error');
}
function removeSessionStorage(key) {
	if (sessionstor) {
		if (key)
			sessionstor.removeItem(key);
	} else
		alert('sessionstor error');
}
//打开新窗口
function winOpen(name, url, anim) {
	window.open(name, '0', url, anim, '', '', '0');
}
function openwin(url) {
	window.open(url);
}
//关闭窗口
function winClose(n) {
	window.close(n);
}
function pageback(){
//	var url = juneyaowx.getItem("HISTORY_HREF");
//	if (url && url.length>0){
//		juneyaowx.removeItem("HISTORY_HREF");
//		window.location.href = url;
//	}else{
		window.history.back(-1);
//	}
}
function openpage(url){
	var bExists = url.indexOf("?")>-1;
	var _URL = url;
	if (bExists){
		_URL += "&_s="+(Math.floor(Math.random()*133000+10));
	}else{
		_URL += "?"+(Math.floor(Math.random()*133000+10));//+timestamp;
	}
	window.location.href= _URL;
}
function getIP(){
	return window.location.hostname;
}
/** 字符串处理 **/
String.prototype.replaceAll = function(str,replaceStr){
	var reg=new RegExp("("+str+")","g");
	return this.replace(reg,replaceStr);
}
String.prototype.isEmpty = function(){
	if (this==null || this==undefined || this.length==0 || this=="null"){
		return true;
	}
	return false;
}
String.prototype.isHanzi = function(){
	var reg = new RegExp("[\\u4E00-\\u9FFF]+","g");
	return reg.test(this);
}
String.prototype.isEnglish = function(){
//	var reg = new RegExp("[\a-\z]+","g");
	var reg = new RegExp("^[a-z]*|[A-Z]*|[\/]$");
	return reg.test(this);
}
String.prototype.validName = function(){
	var _match = this.match(/^[a-zA-Z\/\u4E00-\u9FFF]+$/g);
	return _match;
}
String.prototype.hasSpace = function() {
	var reg = /\s/;
	return reg.exec(this)!=null;
}
String.prototype.isEmail = function(){
	var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    return myreg.test(this);
}
String.prototype.isMobile = function(){
//	移动号段：134、135、136、137、138、139、150、151、152、157、158、159、182、187、188、147号段；
//	联通号段：130、131、132、155、156、186、145号段；
//	电信号段：133、153、189号段。
//	移动 147、 联通 145  均为数据卡号段。希望这些相关信息能对您有所帮助。
//	return !/^(13[0-9]|14[0-9]|15[0-9]|18[0-9])\d{8}$/i.test(value);
//	/^0?(13[0-9]|15[012356789]|18[0236789]|14[57])[0-9]{8}
	return (/^(?:1[34578]\d)-?\d{5}(\d{3}|\*{3})$/.test(this));
}
String.prototype.isInt = function(){
	return (/^\d+$/.test(this) && parseInt(this)>=0);
}
/** 日期格式处理  **/
Date.prototype.Format = function(fmt){
  var o = {
    "M+" : this.getMonth()+1,                 //月份
    "d+" : this.getDate(),                    //日
    "h+" : this.getHours(),                   //小时
    "m+" : this.getMinutes(),                 //分
    "s+" : this.getSeconds(),                 //秒
    "q+" : Math.floor((this.getMonth()+3)/3), //季度
    "S"  : this.getMilliseconds()             //毫秒
  };
  if(/(y+)/.test(fmt))
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
  for(var k in o)
    if(new RegExp("("+ k +")").test(fmt))
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
  return fmt;
}
WEEKDAY_NAME = ['\u65e5', '\u4e00', '\u4e8c', '\u4e09', '\u56db', '\u4e94', '\u516d'];
//获取当天日期 yyyy-mm-dd
function getToday() {
	var dtObj = new Date();
	return dtObj.Format("yyyy-MM-dd");
}
function getToday(format) {
	var dtObj = new Date();
	return dtObj.Format(format);
}
function today(){
	return new Date();
}
function checkDate(value){
	var reg = /\d{4}-\d{2}-\d{2}/;
	if (!reg.test(value)) {
		return false;
	}
	var d = new Date(value);
	if (isNaN(d.getTime())) {
		return false;
	}
	return true;
}
function parseDate(value) {
	var reg = /\d{4}-\d{2}-\d{2}/;
	if (!reg.test(value)) {
		alert('日期格式不正确！');
		return false;
	}
	var d = new Date(value);
	if (isNaN(d.getTime())) {
		return false;
	}
	return d;
}
function formatDate(dt, fmt) {
	dt.Format(fmt);
}
function addZero(v) {
	return (v < 10) ? "0" + v : v;
}
function addByDate(dt, days) {
	var dtObj = parseDate(dt);
	dtObj.setDate(dtObj.getDate()+days);
	return dtObj.Format("yyyy-MM-dd");
}
function addDate(days) {
	var dtObj = new Date();
	dtObj.setDate(dtObj.getDate()+days);
	return dtObj.Format("yyyy-MM-dd");
}
function addDays(days){
	var dtObj = today();
	dtObj.setDate(dtObj.getDate()+days);
	return dtObj;
}
function addMonth(month){
	var dtObj = today();
	dtObj.setMonth(dtObj.getMonth()+month);
	return dtObj.Format("yyyy-MM-dd");
}
function addYear(years){
	var dtObj = today();
	dtObj.setFullYear(dtObj.getFullYear()+years);
	return dtObj.Format("yyyy-MM-dd");
}
function getWeekday(days) {
	var dtObj = new Date();
	dtObj.setDate(dtObj.getDate() + days);
	return '\u5468' + WEEKDAY_NAME[dtObj.getDay()];
}
function getWeekdayOf(v) {
	var dtObj = parseDate(v);
	return '\u5468' + WEEKDAY_NAME[dtObj.getDay()];
}
function getFullWeekdayOf(v) {
	var dtObj = parseDate(v);
	return '\u661f\u671f'+WEEKDAY_NAME[dtObj.getDay()];
}
function getDayBetween(startdate, enddate) {
	var eTime = parseDate(enddate);
	var sTime = parseDate(startdate);
	var days = (eTime.getTime()-sTime.getTime()) / (1000 * 60 * 60 * 24);
	return days;
}
function getDateDiff(startdate, enddate) {
	var eTime = parseDate(enddate);
	var sTime = parseDate(startdate);
	var sYear = sTime.getFullYear();
	var sMonth= sTime.getMonth()+1;
	var sDay  = sTime.getDate();
	var eYear = eTime.getFullYear();
	var eMonth= eTime.getMonth()+1;
	var eDay  = eTime.getDate();
	if (eYear<sYear) return -1;
	var num = Math.abs(eYear-sYear);
	if (num==0) {
		if (eMonth>sMonth)
			num++;
		else if (eMonth==sMonth){
			if (eDay>sDay){
				num++;
			}
		}else{
			num--;
		}
	}
	return num;
}
function getTimestamp(){
	return "?_t="+today().Format("MMddS");
}

// 身份证号码验证
function isIdCardNo(value) {
  return IdCardNoUtil.checkIdCardNo(value);
}
function parseIdNo(value){
	var num = value;
	if (num == "") {
	  return "";
	}
	var len = num.length;
	var re;
	var ymd = "";
	if (len==15){
		re = new RegExp(/^(\d{6})()?(\d{2})(\d{2})(\d{2})(\d{3})$/);
		var a = num.match(re);

		var D = new Date("19"+a[3]+"/"+a[4]+"/"+a[5]);
		var B = D.getYear()==a[3]&&(D.getMonth()+1)==a[4]&&D.getDate()==a[5];
		ymd = "19"+a[3]+"-"+a[4]+"-"+a[5];
	}else{
		re = new RegExp(/^(\d{6})()?(\d{4})(\d{2})(\d{2})(\d{4})$/);
		var a = num.match(re);

		var D = new Date(a[3]+"/"+a[4]+"/"+a[5]);
		var B = D.getFullYear()==a[3]&&(D.getMonth()+1)==a[4]&&D.getDate()==a[5];
		ymd = a[3]+"-"+a[4]+"-"+a[5];
	}
	return ymd;
}
//验证护照是否正确
function checkPassport(number) {
	var str = number;
	//在JavaScript中，正则表达式只能使用"/"开头和结束，不能使用双引号
	var Expression = /(P\d{7})|(G\d{8})/;
	var objExp = new RegExp(Expression);
	if (objExp.test(str) == true) {
		return true;
	} else {
		return false;
	}
};
function isMobile(value){
	return value.isMobile();
}
function defaultString(str){
	if (str==undefined || str==null || str.length==0 || str=="null"){
		return "";
	}
	return str;
}

function getRequestValue(name){
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)
     	return unescape(r[2]);
     return null;
}
function onOffClick(e, cb) {
	var ch;
	if (e.currentTarget)
		ch = e.currentTarget.previousElementSibling;
	else
		ch = e.previousElementSibling;
	if (ch.nodeName == "INPUT") {
		if (ch.type == "checkbox")
			ch.checked = !ch.checked;
		if (ch.type == "radio" && !ch.checked)
			ch.checked = "checked";
	}
}
function onlyLetter() {
    var keyCode = event.keyCode;
    if((keyCode>64 && keyCode<91) || (keyCode>96 && keyCode<123))
    	event.returnValue=true;
    else
    	event.returnValue=false;
}

// checkbox选框
function initCustomCheckbox(callback){
	var checkboxF = '&#xe601;';
	var checkboxT = '&#xe626;';
	var $checkbox = $('input[class=custom-checbox-input]');
	$checkbox.each(function(index, item){
		if($(item).attr('checked')){
			$(item).siblings('.custom-checbox-icon').html(checkboxT);
		}
	});
	$(".custom-checbox-icon").on("tap click", function(){
		var $this_checkbox = $(this).siblings('input[type=checkbox]');
		if($this_checkbox.attr('checked')){
			$this_checkbox.removeAttr('checked');
			$(this).html(checkboxF);
		} else {
			$this_checkbox.attr('checked', 'checked');
			$(this).html(checkboxT);
		}
		if(callback) callback($this_checkbox);
	});
};
SUCCESS_CODE="10001";
CHANNEL_WEIXIN="WEIXIN";
CHANNEL_MOBILE="MOBILE";
var juneyaowx = juneyaowx || {};
//=========================================================================
// 以下为接口调用URL
//=========================================================================
juneyaowx.getItem = function(k) {
	return getStorage(k);
};
juneyaowx.setItem = function(k, v) {
	setStorage(k, v);
	juneyaowx.setLastAccess();
};
juneyaowx.removeItem = function(k) {
	removeStorage(k);
	juneyaowx.setLastAccess();
};
juneyaowx.clearItem = function(k) {
	removeStorage(k);
	juneyaowx.setLastAccess();
};
juneyaowx.clearItems = function() {
	clearStorage();
	juneyaowx.setLastAccess();
};
juneyaowx.setLastAccess = function() {
	var now = new Date();
	setStorage("_EXPIRED_TIME", now.Format("yyyy-MM-dd hh:mm:ss"));
};
juneyaowx.isExpire = function() {
	var now = today();
	var sTime = juneyaowx.getItem("_EXPIRED_TIME");
	//var s="2010-5-18 12:30:20";
	var oTime=new Date(sTime.replace(/-/g,"/"));
	var days = (now.getTime()-oTime.getTime()) / (1000 * 60 * 60 * 24);
	return (days>=7);
};

//通用Loading弹层
var loading = {
	start: function(val){
		var html = '<div id="loading" class="loading"><div class="loading_box"><div class="loading_img"><img src="../../images/loadingRotate.png" alt=""></div><div class="loading_text">加载中...</div></div></div>';
		$('body').append(html);
	},
	stop: function() {
		var $load = $('#loading');
		if ($load) {
			$load.remove();
		}
	}
};
juneyaowx._button_invalid=function(btnId, btnName){
	if ($("#"+btnId)) {
		$("#"+btnId).off("click");
		$("#"+btnId).html(btnName);
		$("#"+btnId).removeClass("c-red");
		$("#"+btnId).addClass("c-gra1");
	}
}
juneyaowx._button_valid=function(btnId, btnName, callback){
	if ($("#"+btnId)) {
		$("#"+btnId).html(btnName);
		$("#"+btnId).addClass("c-red");
		$("#"+btnId).removeClass("c-gra1");
		$("#"+btnId).on("click",function(){
			if (typeof callback === "string"){
				callback = jQuery.trim( callback );
				if (callback) {
					if (/^[\],:{}\s]*$/
						.test(callback.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
	                        .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
	                        .replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
	                	eval( callback );
	                }else{
	                	return ( new Function( "return " + callback ) )();
	                }
                }
			}
		});
	}
}


