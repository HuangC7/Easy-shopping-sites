window.onload = function () {
    // 封装IE的getElementsByClassName兼容性
    if (!document.getElementsByClassName) {
        document.getElementsByClassName = function (cls) {
            var ret = [];
            var els = document.getElementsByTagName('*');
            for (var i = 0, len = els.length; i < len; i++) {
                if (els[i].className === cls
                    || els[i].className.indexOf(cls + ' ') >= 0
                    || els[i].className.indexOf(' ' + cls + ' ') >= 0
                    || els[i].className.indexOf(' ' + cls) >= 0) {
                    ret.push(els[i]);
                }
            }
            return ret;
        }
    }

    var cartTable = document.getElementById('cartTable');
    var tr = cartTable.children[1].rows;
    var checkInputs = document.getElementsByClassName('check');
    var checkAllInputs = document.getElementsByClassName('check-all');
    var selectedTotal = document.getElementById('selectedTotal');
    var priceTotal = document.getElementById('priceTotal');
    var selected = document.getElementById('selected');
    var foot = document.getElementById('foot');
    var selectedViewList = document.getElementById('selectedViewList');
    var deleteAll = document.getElementById('deleteAll');

    //计算
    function getTotal() {
        var seleted = 0;
        var price = 0;
        var HTMLstr = '';
        for (var i = 0, len = tr.length; i < len; i++) {
            if (tr[i].getElementsByTagName('input')[0].checked) {
                tr[i].className = 'on';
                seleted += parseInt(tr[i].getElementsByTagName('input')[1].value);
                price += parseFloat(tr[i].cells[4].innerHTML);
                HTMLstr += '<div><img src="' + tr[i].getElementsByTagName('img')[0].src + '"><span class="del" index="' + i + '">取消选择</span></div>'
            }
            else {
                tr[i].className = '';
            }
        }

        selectedTotal.innerHTML = seleted;
        //取两位小数
        priceTotal.innerHTML = price.toFixed(2);
        selectedViewList.innerHTML = HTMLstr;

        if (seleted == 0) {
            foot.className = 'foot';
        }
    }

    //小计
    function getSubTotal(tr) {
        var tds = tr.cells;
        var price = parseFloat(tds[2].innerHTML);
        var count = parseInt(tr.getElementsByTagName('input')[1].value);
        var SubTotal = parseFloat(price * count);
        tds[4].innerHTML = SubTotal.toFixed(2);
    }

    for (var i = 0 , len = checkInputs.length; i < len; i++) {
        checkInputs[i].onclick = function () {
            if (this.className === 'check-all check') {
                for (var j = 0; j < checkInputs.length; j++) {
                    checkInputs[j].checked = this.checked;
                }
            }
            if (this.checked == false) {
                for (var k = 0; k < checkAllInputs.length; k++) {
                    checkAllInputs[k].checked = false;
                }
            }
            getTotal();
        }
    }

    selected.onclick = function () {
        if (foot.className == 'foot') {
            if (selectedTotal.innerHTML != 0) {
                foot.className = 'foot show';
            }
        }
        else {
            foot.className = 'foot';
        }
    }

    selectedViewList.onclick = function (e) {
        e = e || window.event;
        var el = e.srcElement;
        if (el.className == 'del') {
            var index = el.getAttribute('index');
            var input = tr[index].getElementsByTagName('input')[0];
            input.checked = false;
            input.onclick();
        }
    }

    for (var i = 0; i < tr.length; i++) {
        tr[i].onclick = function (e) {
            e = e || window.event;
            var el = e.srcElement;
            var cls = el.className;
            var input = this.getElementsByTagName('input')[1];
            var val = parseInt(input.value);
            var reduce = this.getElementsByTagName('span')[1];
            //匹配点击的按钮事件
            switch (cls) {
                case 'add':
                    input.value = val + 1;
                    reduce.innerHTML = '-';
                    getSubTotal(this);
                    break;
                case 'reduce':
                    if (val > 1) {
                        input.value = val - 1;
                    }
                    if (input.value <= 1) {
                        reduce.innerHTML = '';
                    }
                    getSubTotal(this);
                    break;
                case 'delete':
                    var conf = confirm('确定要删除吗？');
                    if (conf) {
                        this.parentNode.removeChild(this);
                    }
                    break
                default :
                    break;
            }
            getTotal();
        }
        tr[i].getElementsByTagName('input')[1].onkeyup = function () {
            var val = parseInt(this.value);
            var tr = this.parentNode.parentNode
            var reduce = tr.getElementsByTagName('span')[1];
            if (isNaN(val) || val < 1) {
                val = 1;
            }
            this.value = val;
            if (val <= 1) {
                reduce.innerHTML = '';
            }
            else {
                reduce.innerHTML = '-';
            }
            getSubTotal(tr);
            getTotal();
        }
    }

    deleteAll.onclick = function () {
        if (selectedTotal.innerHTML != '0') {
            var conf = confirm('确定删除吗？');
            if (conf) {
                for (var i = 0; i < tr.length; i++) {
                    var input = tr[i].getElementsByTagName('input')[0];
                    if (input.checked) {
                        tr[i].parentNode.removeChild(tr[i]);
                        i--;
                    }
                }
            }
        }
    }

    checkAllInputs[0].checked = true;
    checkAllInputs[0].onclick();
}
/*返回顶部js实现----------------*/
$(function (){
    var btn = document.getElementById("btn_2");
    var timer = null;
    var isTop = true;
    var clientHeight = document.documentElement.clientHeight;
    window.onscroll = function(){
        var topValue = document.documentElement.scrollTop ||document.body.scrollTop;
        if(topValue >= (clientHeight / 5)){
            btn.style.display = "block";
        }else{
            btn.style.display = "none";
        }
        if(!isTop){
            clearInterval(timer);
        }
        isTop = false;
    };
    btn.onclick = function(){
        timer = setInterval(function(){
            var topValue = document.documentElement.scrollTop ||document.body.scrollTop;
            var speed = Math.floor(-topValue/6);
            document.documentElement.scrollTop = document.body.scrollTop = topValue + speed;
            isTop = true;
            console.log(topValue - speed);
            if(topValue == 0){
                clearInterval(timer);
            }
        },30);
    }
})

/*返回顶部js实现end-------------*/
/*还存在的问题---------------------------*/
/*不能把商品详细页的数据和购物车页的数据链接起来*/
/*end-----------------------------------*/
