/*my own shop 折扣店 sep.27*/
$(function(){(
  /*-----------jQuery插件实现轮播图------------*/
   function(){
		var curr = 0;
		$("#jsNav .trigger").each(function(i){
			$(this).click(function(){
				curr = i;
				$("#js img").eq(i).fadeIn("slow").siblings("img").hide();
				$(this).siblings(".trigger").removeClass("imgSelected").end().addClass("imgSelected");
				return false;
			});
		});
		
		var pg = function(flag){
			if (flag) {
				if (curr == 0) {
					todo = 4;
				} else {
					todo = (curr - 1) % 5;
				}
			} else {
				todo = (curr + 1) % 5;
			}
			$("#jsNav .trigger").eq(todo).click();
		};
		
		//ǰ
		$("#prev").click(function(){
			pg(true);
			return false;
		});
		
		//
		$("#next").click(function(){
			pg(false);
			return false;
		});
		
		//Զ
		var timer = setInterval(function(){
			todo = (curr + 1) % 5;
			$("#jsNav .trigger").eq(todo).click();
		},2000);
		
		$("#js,#prev,#next").hover(function(){
				clearInterval(timer);
			},
			function(){
				timer = setInterval(function(){
					todo = (curr + 1) % 5;
					$("#jsNav .trigger").eq(todo).click();
				},2000);			
			}
		);
	})();
	
	 /*-----------jQuery插件实现轮播图end------------*/
	 
	 
	 	
	 /*-----------首页变色start-----------*/
	 $(".look").hover(function(){
	 $(this).addClass("changecolor");
	 },
	 function(){
	 $(this).removeClass("changecolor");
	 });
	 
});
 /*-----------首页变色end-----------*/
  /*-----------注册界面提醒-----------*/
$(function(){
    $(".spsearch span").hide();
$("input.spnormal").focus(function(){

    $(this).next().show();
});
$(".spnormal").blur(function(){
    console.log("k");
    $(this).next().hide();
});
});

    /*-----------注册界面提醒end-----------*/
/*以下是新增的JS内容---------------------------------------------------------------------------*/
/*注册功能-------------------------------------------------*/
/*function createJson(prop, val) {
    if (typeof val === "undefined") {
        delete UserJson[prop];
    } else {
        UserJson[prop] = val;
    }
}*/
var _username =0;
var _password =0;
//验证用户名
function checkusername() {
    //定义用户名的正则表达式
    var regname = /^[a-zA-Z][a-zA-Z0-9_]{5,17}$/;
    var username = $("#username").val();

    if(username == ''){
        alert("用户名不能为空！");
        return false;
    }else if(regname.test(username) != true){
        alert("用户名格式不正确！");
        return false;
    }
    _username = username;
    return true;
}
//验证密码
function checkpassword() {
    //定义密码的正则表达式
    var regpassword = /^[a-zA-Z0-9]\w{5,15}/;
    var password1 = $("#password-1").val();

    if(password1 == ''){
        alert("密码不能为空！");
        return false;
    }else if(regpassword.test(password1) != true){
        alert("密码格式不正确！");
        return false;
    }
    return true;
}
//验证密码是否一致
function recheckpassword() {
    var password1 = $("#password-1").val();
    var password2 = $("#password-2").val();
    if(password1 != password2){
        alert("两次密码不一致！");
        return false;
    }
    _password = password1;
    return true;
}
//验证邮箱
function checkemail() {
    //定义邮箱的正则表达式
    var regemail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    var email = $("#e-mail").val();
    if(email == ""){
        alert("邮箱不能为空!");
        return false;
    }else if(regemail.test(email) != true){
        alert("邮箱格式不正确！");
        return false;
    }
    return true;
}
//验证手机号
function checkphoneNum() {
    //定义手机的正则表达式
    var regMobile = /^1[34578]\d{9}$/;
    var regTel =  /0\d{2}-\d{8}/;
    var phoneNum = $("#phoneNum").val();
    if (phoneNum == ''){
        alert("手机号不能为空！");
        return false;
    }else if(regMobile.test(phoneNum) != true && regTel.test(phoneNum) != true){
        alert("手机号格式不正确!")
        return false;
    }
    return true;
}
//
function checksum() {
    var arr = $.cookie("users")?JSON.parse($.cookie("users")):[];
    var user = {
        username :_username,
        pwd:_password
    }
    if(checkusername() && checkpassword() && checkemail() && checkphoneNum()){
        arr.push(user);
        $.cookie("users",JSON.stringify(arr),{expires:30,Path:"/"});
        console.log($.cookie("users"));
        alert("注册成功！");
        window.location.href='index.html';
    }
    return false;
}

/*注册功能end-----------------------------------------------*/
/*登录功能-------------------------------------------------*/

function login() {
    var password = $("#loginpassword").val();
    var name = $("#loginname").val();
    var arr = $.cookie("users");
    arr = JSON.parse(arr);
    for (var i=0;i<arr.length;i++) {
        if (password == arr[i].pwd || name == arr[i].username) {
            alert("用户名是:" + arr[i].username + "密码是:" + arr[i].pwd);
            window.location.href = 'index.html';
            return true;
        }
    }
    alert("用户或密码有误");
    return false;
}

var btn = document.getElementById("btn");
var layer = document.getElementById("mini_main");
var ast = document.getElementById("as");
//单击弹出消息框
btn.addEventListener("click", function () {
    layer.style.display = "block";
})
//单击“取消”按钮关闭消息框
ast.addEventListener("click",function () {
    layer.style.display = "none";
})

/*
//遮罩层
$(document).ready(function () {
    $(".mini_login").hide();
    $("#cover").hide();
    $("#cover").click(function () {
        $(".mini_login").hide();
        $(this).hide();
    })
})
function showMinLogin() {
    $("#mini_login").show();
    $("#cover").show();
}
function closeLogin() {
    var min_login = document.getElementsByClassName("mini_login")[0];
    var cover = document.getElementsByClassName("cover");
    min_login.style.display = "none";
    cover.style.display = "none";
}*/

/*登录功能end----------------------------------------------*/
/*轮播图---------------------*/
var innerItems = document.getElementsByClassName("carousel-item");
var indicatorsLists = document.getElementsByClassName("ci-li");
var controlRight = document.getElementsByClassName("right")[0];
var controlLeft = document.getElementsByClassName("left")[0];
var current = 0;
innerItems[current].className = "carousel-item active";
indicatorsLists[current].className = "ci-li active";
function slide() {
    for(var i = 0, len = indicatorsLists.length; i < len; i++){
        innerItems[i].className = "carousel-item";
        indicatorsLists[i].className = "ci-li";
        indicatorsLists[i].index = i;
        indicatorsLists[i].onclick = function () {
            if(this.index == current){
                return false;
            }else{
                current = this.index;
                slide();
            }
        }
    }
    innerItems[current].className = "carousel-item active";
    indicatorsLists[current].className = "ci-li active";
    console.log(current);
}
controlLeft.onclick = function(){
    current--;
    if (current == -1){
        current = indicatorsLists.length - 1;
    }
    slide();
}
controlRight.onclick = function () {
    current++;
    if (current == indicatorsLists.length){
        current = 0;
    }
    slide();
}
var timer = setInterval(controlRight.onclick, 3000);
controlLeft.onmouseover = controlRight.onmouseover = function () {
    clearInterval(timer);
    controlLeft.style.opacity = 1;
    controlRight.style.opacity = 1;
}
controlLeft.onmouseout = controlRight.onmouseout = function () {
    timer = setInterval(controlRight.onclick, 3000);
    controlLeft.style.opacity = 0;
    controlRight.style.opacity = 0;
}
/*轮播图end------------------*/
/*倒计时--------------------*/
function FreshTime()
{
    var endtime= new Date("2020/11/20,12:20:12");//结束时间
    var nowtime = new Date();//当前时间
    var lefttime= parseInt((endtime.getTime()-nowtime.getTime())/1000);
    d = parseInt(lefttime/3600/24);
    h = parseInt((lefttime/3600)%24);
    m = parseInt((lefttime/60)%60);
    s = parseInt(lefttime%60);

    document.getElementById("LeftTime").innerHTML="促销还剩" + d+"天"+h+"小时"+m+"分"+s+"秒";
    if(lefttime<=0){
        document.getElementById("LeftTime").innerHTML="团购已结束";
        clearInterval(sh);
    }
}
FreshTime();
var sh;
sh = setInterval(FreshTime,1000);
/*倒计时end-----------------*/
/*tab选项-------------------*/
$('.cart-2').hover(function  () {
        $('.cart-more').eq(0).show();
    },
    function  () {
        $('.cart-more').eq(0).hide();
    });
$('.cart-3').hover(function  () {
        $('.cart-more').eq(1).show();
    },
    function  () {
        $('.cart-more').eq(1).hide();
    });
$('.cart-4').hover(function  () {
        $('.cart-more').eq(2).show();
    },
    function  () {
        $('.cart-more').eq(2).hide();
    });
$('.cart-5').hover(function  () {
        $('.cart-more').eq(3).show();
    },
    function  () {
        $('.cart-more').eq(3).hide();
    });
$('.cart-6').hover(function  () {
        $('.cart-more').eq(4).show();
    },
    function  () {
        $('.cart-more').eq(4).hide();
    });
$('.cart-7').hover(function  () {
        $('.cart-more').eq(5).show();
    },
    function  () {
        $('.cart-more').eq(5).hide();
    });
$('.cart-8').hover(function  () {
        $('.cart-more').eq(6).show();
    },
    function  () {
        $('.cart-more').eq(6).hide();
    });
$('.cart-9').hover(function  () {
        $('.cart-more').eq(7).show();
    },
    function  () {
        $('.cart-more').eq(7).hide();
    });
$('.cart-more').hover(function  () {
    $(this).show();
},function  () {
    $(this).hide();
})
/*tab选项end----------------*/
/*自定义tab选项插件---------------*/
window.onload = function(){
    var items = document.getElementById("list").getElementsByTagName("li");
    var	divs = document.getElementById("item").getElementsByTagName("div");
    for(var i = 0,len = items.length; i < len; i++){
        items[i].onmouseover = function(){
            for(var j = 0,len = items.length; j < len; j++){
                if(this == items[j]){
                    divs[j].style.display = "block";
                    document.getElementById("item").style.marginLeft = j * 85 + 'px';
                }
            }
        }
        items[i].onmouseout = function () {
            for(var j = 0,len = items.length; j < len; j++) {
                divs[j].style.display = "none";
            }
        }
    }
}
/*自定义tab选项插件end -----------*/
/*jQuery实现无缝滚动---------------*/
$(function () {
    var segmentWidth = 0;
    $("#container #content li").each(function(){
        segmentWidth+= $(this).outerWidth(true)
    });

    $("#container #content li").clone().appendTo($("#container #content"));
    run(60000);

    function run(interval){
        $("#container #content").animate({"left":-segmentWidth}, interval,"linear",function(){
            $("#container #content").css("left",0);
            run(60000);
        });
    }

    $("#container").mouseenter(function(){
        $("#container #content").stop();
    }).mouseleave(function(){
        var passedCourse = -parseInt($("#container #content").css("left"));
        var time = 6000 * (1 - passedCourse/segmentWidth);
        run(time);
    });
})
/*jQuery实现无缝滚动end------------*/
/*返回顶部1-----------------------*/
$('.btn-top').click(function  () {
    $('html,body').stop().animate({scrollTop:0},300);
})
$('.btn-top').hover(function  () {
    $('.btn-top .ups').css('display','block').stop().animate({"right":40,opacity:1},400)
},function  () {
    $('.btn-top .ups').stop().animate({"right":60,opacity:0},400,function  () {
        $(this).css("display","none")
    })
})
/*返回顶部1end--------------------*/