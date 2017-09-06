/**
 * Created by zc on 2017/4/1.
 */

var toApp = {};
//json中获取航线信息
toApp.getFlightInfoFromJson = function(url,fn){
    $.ajax({
        url: url,
        type:"GET",
        async: false,
        contentType: "application/json",
        dataType: "json",
        beforeSend: loading.start(),
        complete: loading.stop(),
        success: function(resultsome){
            if(fn){
                fn(resultsome);
            }
        },
        error: function(){
            toast("取得城市信息出错");
        }
    });
};


//默认活动结束日期为当下月一号
toApp.activityEndDate = getNextMonthFirstDay();
toApp.toDateSelect = function(data){
    var infoJson = new Object();
    if(typeof data == 'string' ){
         infoJson = JSON.parse(data);
    }else{
        infoJson = data;
    }
    where.init("OW", infoJson.isInternational, infoJson.depCityCode,infoJson.arrCityCode,"D",getToday("yyyy-MM-dd"), addDate(3),infoJson.depCity,infoJson.arrCity,infoJson.depCountryCode,infoJson.arrCountryCode);
    toApp.getPriceInfo();
};

//获取当前月价格信息
toApp.getPriceInfo = function (){
    var currentflightInfo = where.get();
        var depDate = getToday("yyyy-MM-dd");
        var citys = {citys:currentflightInfo.DepCity+"-"+currentflightInfo.ArrCity,depDate:depDate};
        loading.start();
        $.ajax({
            url:"/activityService/getEEMonthly",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(citys),
            dataType: 'json',
            success: function (data) {
                loading.stop();
                toApp.toLowerPrice(data);
            },
            error: function(jqXHR, textStatus, errorMsg){
                loading.stop();
                toast("提取价格日历数据失败");
            }
        });
};
//判断最低价日期
toApp.toLowerPrice = function(data){
    var dataJson = JSON.parse(data);
    //  var dataJson = {"2017-05-01":200,"2017-05-04":0.0,"2017-05-05":99,"2017-05-07":200,"2017-05-09":199,"2016-11-06":0.0,"2016-11-07":0.0,"2016-11-08":0.0,"2016-11-09":0.0,"2016-11-10":0.0,"2016-11-11":0.0,"2016-11-12":0.0,"2016-11-13":0.0,"2016-11-14":0.0,"2016-11-15":0.0,"2016-11-16":0.0,"2016-11-17":0.0,"2016-11-18":0.0,"2016-11-19":0.0,"2016-11-20":0.0,"2016-11-21":0.0,"2016-11-22":0.0,"2016-11-23":0.0,"2016-11-24":0.0,"2016-11-25":0.0,"2016-11-26":0.0,"2016-11-27":0.0,"2016-11-28":0.0,"2016-11-29":0.0,"2016-11-30":0.0,"2016-12-01":0.0,"2016-12-02":0.0,"2016-12-03":0.0,"2016-12-04":0.0,"2016-12-05":0.0,"2016-12-06":0.0,"2016-12-07":0.0,"2016-12-08":0.0,"2016-12-09":0.0,"2016-12-10":0.0,"2016-12-11":0.0,"2016-12-12":0.0,"2016-12-13":0.0,"2016-12-14":0.0,"2016-12-15":0.0,"2016-12-16":0.0,"2016-12-17":0.0,"2016-12-18":0.0,"2016-12-19":0.0,"2016-12-20":0.0,"2016-12-21":0.0,"2016-12-22":0.0,"2016-12-23":0.0,"2016-12-24":0.0,"2016-12-25":0.0,"2016-12-26":0.0,"2016-12-27":0.0,"2016-12-28":0.0,"2016-12-29":0.0,"2016-12-30":0.0,"2016-12-31":0.0};
    var lowestPriceDate = addDate(1);
    for(var key in dataJson){
        if(parseDate(key) > new Date(toApp.activityEndDate) || parseDate(key) < new Date(lowestPriceDate)){
            continue;
        }else{
            if(dataJson[lowestPriceDate] == 0){
                lowestPriceDate = key;
            }else if(dataJson[key] < dataJson[lowestPriceDate] && dataJson[key] > 0){
                lowestPriceDate = key;
            }
        }
    }
    toApp.turnToFlight(lowestPriceDate);
};
//跳转航班查询
toApp.turnToFlight = function(lowestPriceDate){
    var currentflightInfo = where.get();
    var params = {
        flightCity: {
            fromCity:{
                cityName:currentflightInfo.DepCityName,
                cityEName:"",
                cityPinYinAbb:"",
                cityCode:currentflightInfo.DepCity,
                isInternational:"D",
                countryCode: currentflightInfo.countryCode
            },
            toCity:{
                cityName:currentflightInfo.ArrCityName,
                cityEName:"",
                cityPinYinAbb:"",
                cityCode:currentflightInfo.ArrCity,
                isInternational:currentflightInfo.TripType,
                countryCode: currentflightInfo.countryCode
            },
            currentFromOrTo:"0",
            currentCityData:null
        },
        flightDate: {
            fromDate:lowestPriceDate,
            toDate:currentflightInfo.ReturnDate,
            flightType:currentflightInfo.RouteType,
            currentTab:0
        }
    };

    var flightOldParams = {};
    flightOldParams.cityInfo = params.flightCity;
    flightOldParams.airDate = params.flightDate;
/*    if((judgeChannel() == CHANNEL_WEIXIN )||(judgeChannel() == "MWEB")){
        var cityInfo = params.flightCity;
        openpage(' http://m.juneyaoair.com/flight/queryFlight.html?flightType=OW&sendCode='+ cityInfo.fromCity.cityCode+'&arrCode='+ cityInfo.toCity.cityCode+'&tripType='+cityInfo.toCity.isInternational+'&departureDate='+params.flightDate.fromDate);
    }else */if(judgeChannel() == CHANNEL_MOBILE){
        uexWindow.evaluateScript("activity", 0, "App.setStorage(\"flightOldParams\", "+JSON.stringify(flightOldParams)+")");
        uexWindow.evaluateScript("activity", 0, "dealOpt('', '',  "+JSON.stringify(params)+" , 10)");
        history.go(-1);
    }else{
        var cityInfo = params.flightCity;
        openpage(' http://m.juneyaoair.com/flight/queryFlight.html?flightType=OW&sendCode='+ cityInfo.fromCity.cityCode+'&arrCode='+ cityInfo.toCity.cityCode+'&tripType='+cityInfo.toCity.isInternational+'&departureDate='+params.flightDate.fromDate);
    }
};

function getNextMonthFirstDay()  {
    var date = new Date();
    date.setDate(1);
    date.setMonth(date.getMonth()+1);
    return date.Format("yyyy-MM-dd");
}

//判断在什么渠道打开
function judgeChannel(){
    var userAgent = window.navigator.userAgent;
    if(userAgent != null && userAgent != "" && userAgent != undefined){
        if(userAgent.indexOf("Appcan") > 0){
            return CHANNEL_MOBILE;
        }else if(userAgent.indexOf("MicroMessenger") > 0){
            return CHANNEL_WEIXIN;
        }else{
            return "MWEB";
        }
    }
}