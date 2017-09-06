var json;
var timer = null;
var aW = [];
$(function(){
    var $city = $('.site-city li');
    $city.each(function(idx, item){
        var w = $(item).outerWidth(true);
        aW.push(w);
    });

    //绑定click事件
    $(document).on("click",".dishini-btn",function(){
        var data = $(this).data("info");
        if(typeof data == 'object'){
            data = JSON.stringify(data);
        }
        if(data == null || data == '' || data == undefined){
            return false;
        }
        toApp.toDateSelect(data);
    });

    var top = $('.g-site').offset().top;
    $(document).on('scroll', function(){
        var cT = $(this).scrollTop();
        if(cT>=(top+10)){
            $('.g-site').addClass('fix');
        } else {
            $('.g-site').removeClass('fix');
        }
    });
    var $city = $('.site-city li');
    $city.each(function(idx, item){
        var w = $(item).outerWidth(true);
        aW.push(w);
    })
    $('.site-city li').click(function(){
        var idx = $(this).index(),
            left = 0;
        for(var i=0; i<idx; i++){
            left += aW[i];
        }
        left = left+(((aW[idx]-5)/2)-10);
        $('.line').animate({'left': left}, 200);
        $(this).addClass('current').siblings('li').removeClass('current');
        if(json != null && json != undefined){
            getAirLine($(this).attr("data"),json);
        }
        $('.chage-tab-box-item').hide().eq(idx).show();
    });
    $('.site-city li.current').trigger('click');

    $('#backBtn').click(function(event) {
        $('body').animate({'scrollTop': 0}, 500)
    });
    initPage();
});
function showrule(){
    $("#score").bPopup({
        closeClass: 'tt-close'
    });
}
function showOrder(){
    $("#order").bPopup({
        closeClass: 'tt-close'
    });
}
function showHint(){
    $('.coupon-hint').show();
    timer = setTimeout(function(){
        clearTimeout(timer);
        $('.coupon-hint').hide();
    }, 2000)
}


function initPage() {
    var url = "../json/qixi";
    Activity.getAirLineInfoFromJson(url, function (airLineJson) {
        if (airLineJson) {
            json = airLineJson;
            getAirLine("X", json);
        }
    });
}

function drawPage(cityArray, city) {
    var html = "<ul class='clearfix'>";
    $.each(cityArray, function (index, item) {
        html += "<li>" +
            "<div class='title'>" + item.depCity + "&nbsp;-&nbsp;" + item.arrCity + "</div>" +
            "<div class='clearfix text'>" +
            "<div class='text-price'><span class='price'>￥" + item.price + "</span> 起</div>" +
            "<div class='dishini-btn' data-info=\'" + JSON.stringify(item) + "\'><a href='javascript:void(0);'>立即预订</a></div>" +
            "</div></li>";
    });
    html += "</ul>";
    $(".m-list").html(html);
}

//从json中获取航线信息
function getAirLine(city, airLineJson, isInt) {
    var cityArray = new Array();
    $.each(airLineJson, function (index, item) {
        if (city) {
            if (item.customTag == city ) {
                cityArray.push(item);
            }
        }
    });
    if (cityArray) {
        drawPage(cityArray, city);
    } else {
        return null;
    }
}