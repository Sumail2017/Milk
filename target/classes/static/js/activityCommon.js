/**
 * Created by zc on 2017/6/28.
 */
var LOGIN_INFO = "LOGIN_INFO";//登录信息
var timestamp = new Date().getTime();
var Activity = {};
//判断渠道（APP，微信，M网）
Activity.judgeChannel = function(){
    var userAgent = window.navigator.userAgent.toLowerCase();
    if(userAgent != null && userAgent != "" && userAgent != undefined){
        if(userAgent.match(/Appcan/i) =="appcan"){
            return MOBILE_CHANNEL_CODE;
        }else if(userAgent.match(/MicroMessenger/i)=="micromessenger"){
            return WX_CHANNEL_CODE;
        }else{
            return M_CHANNEL_CODE;
        }
    }
};
//判断是否登陆了，登陆了将登录信息存在缓存中
Activity.toLogin = function(){
    var login_info;
    var channelCode = Activity.judgeChannel();
    if ((channelCode == WX_CHANNEL_CODE ) || (channelCode == M_CHANNEL_CODE)) {
        var MemberInfo = App.getStorage('MemberInfo');
        if(!MemberInfo){
         //   winOpen("../../../member/login.html");
            return false;
        }else{
            if(typeof MemberInfo != 'object'){
                MemberInfo =JSON.parse(MemberInfo);
            }
            login_info = {ffpid: MemberInfo.id, fcard: MemberInfo.memberID, keyinfo: MemberInfo.loginKeyInfo,channelCode:channelCode};
            App.setStorage(LOGIN_INFO,login_info);
            return true;
        }
    } else if (channelCode == MOBILE_CHANNEL_CODE) {
        var ffpid = getRequestValue("ffpid");
        var fcard = getRequestValue("memberid");
        var keyinfo = getRequestValue("loginKeyInfo");
        var appid = getRequestValue("appid");
            if (ffpid && fcard && keyinfo) {
                login_info = {ffpid: ffpid, fcard: fcard, keyinfo: keyinfo,channelCode:MOBILE_CHANNEL_CODE,appid:appid};
                App.setStorage(LOGIN_INFO, login_info);
                return true;
            } else {
                return false;
            }
    }
};

/*
 * @type:
 *          ==10 航班查询
 *          ==20 登录
 * */
Activity.toAppOpt = function(type){
    var dealOpt = "dealOpt('', '',  '' , "+type+")";
    uexWindow.evaluateScript("activity", 0, "winClose(-1);");
    Activity.toApp(dealOpt);
};
Activity.toApp = function(doInApp){
    if(doInApp){
        uexWindow.evaluateScript("activity", 0, doInApp);
    }
};
Activity.getAirLineInfoFromJson = function(url,fn){
    $.ajax({
        async:false,
        type:"GET",
        contentType: "application/json",
        dataType: 'json',
        url:url+"?"+timestamp,
        beforeSend:function(){
            loading.start();
        },
        success: function (data) {
            if(data){
              fn(data);
            }
        },
        complete:function(){
            loading.stop();
        },error: function(jqXHR, textStatus, errorMsg){
            toast("获取航线信息异常");
        }
    });
}
