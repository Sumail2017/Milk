/**
 * Created by zc on 2017/6/16.
 */

var QFlight = {
    RouteType: "OW",
    TripType: "D",
    DepCity: "SHA",
    ArrCity: "SYX",
    DirectType: "D",
    DepartureDate: addDate(1),
    ReturnDate: addDate(3),
    LastDepartureDate: "",
    LastReturnDate: "",
    DepCityName: "上海",
    ArrCityName: "三亚",
    FlightDirection: "G",
    CountryCode:"CN"
};

var DEFAULT_FLIGHT = JSON.stringify(QFlight);
//航班查询条件
Where = function() {};
WHERE_STORAGE = "_WHERE_STORAGE";
Where.prototype = {
    store: function(flt) {
        setStorage(WHERE_STORAGE, flt);
    },
    clear: function() {
        removeStorage(WHERE_STORAGE);
    },
    init : function(RouteType, TripType, DepCity, ArrCity, DirectType, DepartureDate, ReturnDate, DepCityName, ArrCityName,DepCountryCode,ArrCountryCode) {
        QFlight.RouteType = RouteType;
        QFlight.TripType = TripType;
        QFlight.DepCity = DepCity;
        QFlight.ArrCity = ArrCity;
        QFlight.DirectType = DirectType;
        QFlight.DepartureDate = DepartureDate;
        QFlight.ReturnDate = ReturnDate;
        QFlight.LastDepartureDate = DepartureDate;
        QFlight.LastReturnDate = ReturnDate;
        QFlight.DepCityName = DepCityName;
        QFlight.ArrCityName = ArrCityName;
        QFlight.DepCountryCode = DepCountryCode;
        QFlight.ArrCountryCode = ArrCountryCode;
        this.clear();
        this.store(QFlight);
    },
    setDate: function(depdate, rtndate, current){
        var QueryFlight = this.get();
        QueryFlight.DepartureDate = depdate;
        QueryFlight.ReturnDate = rtndate;
        this.store(QueryFlight);
    },
    updateLastDate: function(){
        var QueryFlight = this.get();
        QueryFlight.LastDepartureDate = QueryFlight.DepartureDate;
        QueryFlight.LastReturnDate = QueryFlight.ReturnDate;
        this.store(QueryFlight);
    },
    wrapDate: function(last){
        var QueryFlight = this.get();
        if (last==undefined || last) {
            QueryFlight.LastDepartureDate = QueryFlight.DepartureDate;
            QueryFlight.LastReturnDate = QueryFlight.ReturnDate;
        }else if (QueryFlight.LastDepartureDate!=""){
            QueryFlight.DepartureDate = QueryFlight.LastDepartureDate;
            QueryFlight.ReturnDate = QueryFlight.LastReturnDate;
        }
        this.store(QueryFlight);
    },
    update: function(str) {
        var QueryFlight = JSON.parse(str);
        this.store(QueryFlight);
    },
    get: function() {
        var strJSON = juneyaowx.getItem(WHERE_STORAGE);
        if (strJSON == undefined)
            strJSON = DEFAULT_FLIGHT;
        var objFlt = JSON.parse(strJSON);
        return objFlt;
    },
    single : function() {
        return (this.getRouteType() == "OW");
    },
    getDepartureDate: function(){
        var QueryFlight = this.get();
        return QueryFlight.DepartureDate;
    },
    getReturnDate: function(){
        var QueryFlight = this.get();
        return QueryFlight.ReturnDate;
    },
    getRouteType: function() {
        var QueryFlight = this.get();
        return QueryFlight.RouteType;
    },
    setRouteType: function(v) {
        var QueryFlight = this.get();
        QueryFlight.RouteType = v;
        this.store(QueryFlight);
    },
    back : function() {
        return (this.getFlightDirection() == "B");
    },
    setBack: function(){
        var QueryFlight = this.get();
        QueryFlight.FlightDirection = "B";
        this.store(QueryFlight);
    },
    setGo: function(v){
        var QueryFlight = this.get();
        QueryFlight.FlightDirection = "G";
        this.store(QueryFlight);
    },
    getFlightDirection: function(){
        var QueryFlight = this.get();
        return QueryFlight.FlightDirection;
    },
    demostic: function(){
        return (this.getTripType() == "D");
    },
    getTripType: function(){
        var QueryFlight = this.get();
        return QueryFlight.TripType;
    },
    setTripType: function(v){
        var QueryFlight = this.get();
        QueryFlight.TripType = v;
        this.store(QueryFlight);
//		this.toJSON();
    },
    toJSON : function() {
        var QueryFlight = this.get();
        var obj = {
            QueryFlightFareReq : {
                channelCode: CHANNEL_WEIXIN,
                flightType: QueryFlight.RouteType,
                tripType: QueryFlight.TripType,
                sendCode: QueryFlight.DepCity,
                arrCode: QueryFlight.ArrCity,
                directType: QueryFlight.DirectType,
                departureDate: QueryFlight.DepartureDate,
                returnDate: QueryFlight.ReturnDate
            }
        };
        var jsonStr = JSON.stringify(obj);
        debug("查询条件..."+jsonStr);
        return jsonStr;
    },
    getTitle: function(){
        var QueryFlight = this.get();
        if (this.back())
            return QueryFlight.ArrCityName +"→"+ QueryFlight.DepCityName;
        else
            return QueryFlight.DepCityName +"→"+ QueryFlight.ArrCityName;
    }
}
var where = new Where();

