<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <link rel="shortcut icon" href="favicon.ico"/>
    <title>吉祥航空 微信后台管理系统</title>
    <jsp:include page="pages/includefile/include.jsp"></jsp:include>
    <!-- Tell the browser to be responsive to screen width -->
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <!-- Bootstrap 3.3.6 -->
  <%--  <link rel="stylesheet" href="res/plugins/bootstrap/css/bootstrap.min.css">
    <!-- Font Awesome -->
    <link rel="stylesheet" href="res/plugins/font-awesome/css/font-awesome.min.css">
    <!-- Ionicons -->
    <link rel="stylesheet" href="res/css/ionicons.min.css">
    <!-- Theme style -->
    <link rel="stylesheet" href="res/css/AdminLTE.min.css">
    <!-- iCheck -->--%>
    <link rel="stylesheet" href="res/plugins/iCheck/square/blue.css">

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]-->
    <script src="res/plugins/adapt/html5shiv.min.js"></script>
    <script src="res/plugins/adapt/respond.min.js"></script>
    <!--[endif]-->
</head>
<body class="hold-transition login-page">
<div class="login-box">
    <div class="login-logo">
        <a href=""><b>登录</b>页面</a>
    </div>
    <!-- /.login-logo -->
    <div class="login-box-body">
        <p class="login-box-msg">登录后开始使用</p>

        <form action="/authController/login" method="post">
            <div class="form-group has-feedback">
                <input type="text" class="form-control" placeholder="输入用户名" name="userName">
                <span class="glyphicon glyphicon-user form-control-feedback "></span>
            </div>
            <div class="form-group has-feedback">
                <input type="password" class="form-control" placeholder="输入密码" name="password">
                <span class="glyphicon glyphicon-lock form-control-feedback"></span>
            </div>
            <div class="alert alert-danger" role="alert" style="display: none" id="errMsg">用户名或密码错误</div>
            <div class="row">
                <div class="col-xs-8 ">
                    <div class="checkbox icheck">
                        <label style="padding-left: 20px">
                            <input type="checkbox" id="rememberMe" > 记住用户名
                        </label>
                    </div>
                </div>
                <!-- /.col -->
                <div class="col-xs-4">
                    <button type="submit" class="btn btn-primary btn-block btn-flat">登录</button>
                </div>
                <!-- /.col -->
            </div>
        </form>

        <%--<div class="social-auth-links text-center">--%>
            <%--<p>- OR -</p>--%>
            <%--<a href="#" class="btn btn-block btn-social btn-facebook btn-flat"><i class="fa fa-facebook"></i> Sign in using--%>
                <%--Facebook</a>--%>
            <%--<a href="#" class="btn btn-block btn-social btn-google btn-flat"><i class="fa fa-google-plus"></i> Sign in using--%>
                <%--Google+</a>--%>
        <%--</div>--%>
        <%--<!-- /.social-auth-links -->--%>

        <%--<a href="#">I forgot my password</a><br>--%>
    </div>
    <!-- /.login-box-body -->
</div>
<!-- /.login-box -->

<!-- jQuery 2.2.3 -->
<script src="res/plugins/jQuery/jquery-2.2.3.min.js"></script>
<!-- Bootstrap 3.3.6 -->
<script src="res/plugins/bootstrap/js/bootstrap.min.js"></script>
<!-- iCheck -->
<script src="res/plugins/iCheck/icheck.min.js"></script>
<script>
    $(function () {
        if(localStorage.getItem('userName')) {
            $('input[name="userName"]').val(localStorage.getItem('userName'));
            $('#rememberMe').prop('checked', true);
        }
        var search=window.location.search;
        if(search.indexOf('msg')!=-1){
            $('#errMsg').css('display','block');
        }
        $('#rememberMe').click(function () {
            if($(this).is(":checked")){
                localStorage.setItem('userName',$('input[name="userName"]').val());
            }else{
                localStorage.removeItem("userName");
            }
        });
            //用户名改变时移除记住我
        $('input[name="userName"]').on('input propertychange',function(){
            $('#rememberMe').prop('checked', false);
            localStorage.removeItem("userName");
        });
    });
</script>
</body>
</html>