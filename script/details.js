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
    $("ul.rating li a").click(function(){
        var title = $(this).attr("title");
        alert("你给商品评分为："+title);
        var cl = $(this).parent().attr("class");
        $(this).parent().parent().removeClass().addClass("rating "+cl+"star");
        return false;
    });
});
/*购物车图标数量变化------------*/

jQuery(document).ready(function (a) {
    var j = a(".cd-cart-container");
    var k = 0;
    var $product = $(".jnProDetail");
    if (j.length > 0) {
        var e = j.find(".body");
        var g = e.find(".ul").eq(0);
        var h = j.find(".checkout").find("span");
        var i = j.children(".cd-cart-trigger");
        var f = i.children(".count");
        var d = a(".cd-add-to-cart");
        var o = j.find(".undo");
        var p;
        d.on("click", function (s) {
            s.preventDefault();
            c(a(this))
        });
        i.on("click", function (s) {
            s.preventDefault();
            n()
        });
        j.on("click", function (s) {
            if (a(s.target).is(a(this))) {
                n(true)
            }
        });
        g.on("click", ".delete-item", function (s) {
            s.preventDefault();
            m(a(s.target).parents(".product"))
        });
        g.on("change", "select", function (s) {
            l()
        });
        o.on("click", "a", function (s) {
            clearInterval(p);
            s.preventDefault();
            g.find(".deleted").addClass("undo-deleted").one("webkitAnimationEnd oanimationend msAnimationEnd animationend", function () {
                a(this).off("webkitAnimationEnd oanimationend msAnimationEnd animationend").removeClass("deleted undo-deleted").removeAttr("style");
                l()
            });
            o.removeClass("visible")
        })
    }

    function n(s) {
        var t = (typeof s === "undefined") ? j.hasClass("cart-open") : s;
        if (t) {
            j.removeClass("cart-open");
            clearInterval(p);
            o.removeClass("visible");
            g.find(".deleted").remove();
            setTimeout(function () {
                e.scrollTop(0);
                if (Number(f.find("li").eq(0).text()) == 0) {
                    j.addClass("empty")
                }
            }, 500)
        } else {
            j.addClass("cart-open")
        }
    }

    function c(t) {
        var s = j.hasClass("empty");
        b();
        q(s);
        r(t.data("price"), true);
        j.removeClass("empty")
    }

    function b() {
        var pro_color =  $(".color_change strong").text();
        k = k + 1;
        if (pro_color == "蓝白"){var s = a('<li class="product"><div class="product-image"><a href="#0"><img src="images/pro_img/blue.jpg" alt="placeholder"></a></div><div class="product-details"><h3><a href="#0">免烫高支棉条纹衬衣</a></h3><span class="price">￥200.00</span><div class="actions"><a href="#0" class="delete-item">Delete</a><div class="quantity"><label for="cd-product-' + k + '">Qty</label><span class="select">1</span></div></div></div></li>');}
        if (pro_color == "黄白"){var s = a('<li class="product"><div class="product-image"><a href="#0"><img src="images/pro_img/yellow.jpg" alt="placeholder"></a></div><div class="product-details"><h3><a href="#0">免烫高支棉条纹衬衣</a></h3><span class="price">￥200.00</span><div class="actions"><a href="#0" class="delete-item">Delete</a><div class="quantity"><label for="cd-product-' + k + '">Qty</label><span class="select">1</select></span></div></div></div></li>');}
        if (pro_color == "粉绿"){var s = a('<li class="product"><div class="product-image"><a href="#0"><img src="images/pro_img/green.jpg" alt="placeholder"></a></div><div class="product-details"><h3><a href="#0">免烫高支棉条纹衬衣</a></h3><span class="price">￥200.00</span><div class="actions"><a href="#0" class="delete-item">Delete</a><div class="quantity"><label for="cd-product-' + k + '">Qty</label><span class="select">1</span></div></div></div></li>');}
        g.prepend(s)
    }

    function m(s) {
        clearInterval(p);
        g.find(".deleted").remove();
        var v = s.offset().top - e.children("ul").offset().top, t = Number(s.find(".quantity").find("select").val()),
            u = Number(s.find(".price").text().replace("$", "")) * t;
        s.css("top", v + "px").addClass("deleted");
        r(u, false);
        q(true, -t);
        o.addClass("visible");
        p = setTimeout(function () {
            o.removeClass("visible");
            g.find(".deleted").remove()
        }, 8000)
    }

    function l() {
        var t = 0;
        var s = 0;
        g.children("li:not(.deleted)").each(function () {
            var u = Number(a(this).find("select").val());
            t = t + u;
            s = s + u * Number(a(this).find(".price").text().replace("$", ""))
        });
        h.text(s.toFixed(2));
        f.find("li").eq(0).text(t);
        f.find("li").eq(1).text(t + 1)
    }

    function q(t, v) {
        if (typeof v === "undefined") {
            var pro_num = $product.find("#num_sort").val()
            var pro_num_int = parseInt(pro_num);
            var s = Number(f.find("li").eq(0).text()) + pro_num_int;
            var u = s + 1;
            if (t) {
                f.find("li").eq(0).text(s);
                f.find("li").eq(1).text(u)
            } else {
                f.addClass("update-count");
                setTimeout(function () {
                    f.find("li").eq(0).text(s)
                }, 150);
                setTimeout(function () {
                    f.removeClass("update-count")
                }, 200);
                setTimeout(function () {
                    f.find("li").eq(1).text(u)
                }, 230)
            }
        } else {
            var s = Number(f.find("li").eq(0).text()) + v;
            var u = s + 1;
            f.find("li").eq(0).text(s);
            f.find("li").eq(1).text(u)
        }
    }

    function r(t, s) {
        s ? h.text((Number(h.text()) + t).toFixed(2)) : h.text((Number(h.text()) - t).toFixed(2))
    }
});
/*end---------------------------*/