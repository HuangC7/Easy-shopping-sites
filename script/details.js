$(function(){
    $('.jqzoom').jqzoom({
        zoomType:'standard',
        lens:true,
        preloadImages:false,
        alwaysOn:false,
        zoomWidth:340,
        zoomHeight:340,
        xOffset:10,
        yOffset:0,
        position:'right'
    });
});
$(function(){
    $("#jnProitem ul.imgList li a").bind("click",function(){
        var imgSrc=$(this).find("img").attr("src")
        var i = imgSrc.lastIndexOf(".");
        var unit = imgSrc.substring(i);
        imgSrc=imgSrc.substring(0,i);
        var imgSrc_big=imgSrc+"_big"+unit;
        $("#thickImg").attr("href",imgSrc_big);
    });
});
$(function(){
    var $div_li = $("div.tab_menu ul li");
    $div_li.click(function(){
        $(this).addClass("selected").siblings().removeClass("selected");
        var index = $div_li.index(this);
        $("div.tab_box>div").eq(index).show().siblings().hide();
    }).hover(function(){$(this).addClass("hover");},function(){$(this).removeClass("hover");});
});
$(function(){
    $(".color_change ul li img").click(function(){
        $(this).addClass("hover").parent().siblings().find("img").removeClass("hover");
        var imgSrc = $(this).attr("src");
        var i = imgSrc.lastIndexOf(".");
        var unit = imgSrc.substring(i);
        imgSrc = imgSrc.substring(0,i);
        var imgSrc_small = imgSrc +"_one_small"+unit;
        var imgSrc_big = imgSrc +"_one_big"+unit;
        $("#bigImg").attr({"src":imgSrc_small});
        $("#thickImg").attr("href",imgSrc_big);
        var alt = $(this).attr("alt");
        $(".color_change strong").text(alt);
        var newImgSrc = imgSrc.replace("images/pro_img/","");
        $("#jnProitem .imgList li").hide();
        $("#jnProitem .imgList").find(".imgList_"+newImgSrc).show();
        $("#jnProitem .imgList").find(".imgList_"+newImgSrc).eq(0).find("a").click();
    });

});
$(function(){
    $(".pro_size li").click(function(){
        $(this).addClass("cur").siblings().removeClass("cur");
        $(this).parent().siblings("strong").text( $(this).text() );
    });
});
$(function(){
    var $span = $(".pro_price strong");
    var price = $span.text();
    $("#num_sort").change(function(){
        var num = $(this).val();
        var abb = num * price;
        $span.text(abb);
    }).change();
});
$(function(){
    var $product = $(".jnProDetail");
    $("#cart a").click(function (e) {
        var pro_name = $product.find("h4:first").text();
        var pro_size = $product.find(".pro_size strong").text();
        var pro_color =  $(".color_change strong").text();
        var pro_num = $product.find("#num_sort").val();
        var pro_price = $product.find(".pro_price strong").text();
        var dialog = "感谢您的购买。\n您购买的产品是：\n"+pro_name+"；"+
            "尺寸是："+pro_size+"；\n"+
            "颜色是："+pro_color+"；\n"+
            "数量是："+pro_num+"；\n"+
            "总价是："+pro_price +"元。\n";
        alert(dialog);
        return false;//避免页面跳转
    });
})
$(function(){
    $("ul.rating li a").click(function(){
        var title = $(this).attr("title");
        alert("你给商品评分为："+title);
        var cl = $(this).parent().attr("class");
        $(this).parent().parent().removeClass().addClass("rating "+cl+"star");
        return false;
    });
});