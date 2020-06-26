/*省市区联动菜单*/
var province = document.getElementById('province');
var city = document.getElementById('city');
var area = document.getElementById('area');
var codeName = null;
var xmlhttp;
if (window.XMLHttpRequest){
    xmlhttp = new XMLHttpRequest();
}else {
    xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
}
xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
        codeName = JSON.parse(xmlhttp.responseText);
        /*alert(codeName[1].name)*/
        for(var i in codeName){
            if (codeName[i].code.substring(2, 6) == "0000"){
                province.add(new Option(codeName[i].name, codeName[i].code, null));
            }
        }
        //创建默认的省级下拉列表
        province.addEventListener('change', function () {
            for (var i in codeName){
                if (codeName[i].code != province.value & codeName[i].code.substring(4, 6) == "00" & codeName[i].code.substring(0, 3) == province.value.substring(0, 3)){
                    city.add(new Option(codeName[i].name, codeName[i].code, null));
                }
            }
        })
        //创建市级下拉列表
        city.addEventListener('change', function () {
            var thisValue = this.value;
            console.log(thisValue);
            for (var i in codeName){
                    if (codeName[i].code != city.value & codeName[i].code.substring(0, 4) == thisValue.substring(0, 4)) {
                        area.add(new Option(codeName[i].name, codeName[i].code, null));
                    }
            }
        })
    }
}

xmlhttp.open('GET', 'data/china-code.json', true);
xmlhttp.send();
/*---end--------*/
/*还存在的Bug--------------------------*/
/*当省是直辖市时，或是没有市，直接区的，将无法获取其区....*/