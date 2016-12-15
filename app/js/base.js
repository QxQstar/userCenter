/**
 * Created by Administrator on 2016/12/13.
 */
//发送ajax的对象
var ajaxObj = new Ajax();


var mask = $('#mask');
var addAddress = $('#addAddr');
var maskDelate = $('#maskDelate');
var flowMask = $('#flowMask');
//产品名称的父元素
var profile = $('.profile');
//查看订单详情
var lookOrder = $('.lookOrder');
//查看物流
var lookFlow = $('.lookFlow');
var newAddress = $('#newAddress');
if(newAddress.length >= 1) {
    var submit = newAddress.find('#submit');
}
//添加地址
addAddress.unbind('click').on('click',function(event){
    event.stopPropagation();
    mask.show();
});
//提交新地址
submit
    .unbind('click')
    .on('click',function(event){
        var nameValue,telValue,cityValue,areaValue,countyValue,
            detailValue,id,newAddress,data,tel,name,DropDownList1,DropDownList2,DropDownList3,detail;
        event.stopPropagation();
        newAddress = $('#newAddress');
        name = newAddress.find('#name');
        tel = newAddress.find('#tel');
        detail = newAddress.find('#detail');
        DropDownList1 = newAddress.find('#DropDownList1');
        DropDownList2 = newAddress.find('#DropDownList2');
        DropDownList3 = newAddress.find('#DropDownList3');
        nameValue = name.val();
        telValue = tel.val();
        detailValue = detail.val();
        areaValue = DropDownList1.val();
        cityValue = DropDownList2.val();
        countyValue = DropDownList3.val();
        if(nameValue.length <= 0){
            alert('输入收货人姓名');
        }else if(telValue.length <= 0){
            alert('输入联系电话');

        }else if(!/(?:^1[3,8]\d{9}$)|(?:^15[^4]\d{8}$)|(?:^14[7,5,9]\d{8}$)|(?:^17[3,6,7,8]\d{8}$)/.test(telValue)){
            alert('电话号码格式不正确');
        }else if(areaValue === '省份'){
            alert('选择省份');
        }else if(cityValue === '地级市'){
            alert('选择地级市');
        }else if(countyValue === '市、县级市'){
            alert('市、县级市');
        }else if(detailValue.length <= 0){
            alert('输入详细地址')
        }else {
            console.log(mask.attr('data-id'));
            if(typeof mask.attr('data-id') !== 'undefined'){
                data = {
                    id:mask.attr('data-id'),
                    name: nameValue,
                    phone_num: telValue,
                    detail: detailValue,
                    area: areaValue,
                    city: cityValue,
                    county: countyValue,
                    tel: telValue
                };
            }else{
                data = {
                    name: nameValue,
                    phone_num: telValue,
                    detail: detailValue,
                    area: areaValue,
                    city: cityValue,
                    county: countyValue,
                    tel: telValue
                };
            }

            ajaxObj.newAdd(data);
        }
    });
maskDelate.unbind('click').on('click',function(event){
    event.stopPropagation();
    mask.hide();
});
//订单详情
lookOrder.on('click',function(event){
    event.stopPropagation();
    var data,parent;
    parent = $(event.target).parents('.c-item');
    data = {};

    data.gouwuchehao = parent.attr('data-code');
    data.type = parent.attr('data-type');

    ajaxObj.detail(data);
});
//物流
lookFlow.on('click',function(event){
    event.stopPropagation();
    flowMask.show();
});
//在分辨率大于1100px时，要保证产品的图片和名称要水平显示
(function() {
    var parent,sibling;
    if ($(window).width() > 1100) {
        profile.each(function(index,elem){
           parent = $(elem).parent();
            sibling = parent.find('.img');
            $(elem).css('width',( parent.width() - sibling.width() - parseInt( sibling.css('margin-right') )) + 'px');
        });
    }
})();


//地址的列表的长度
(function(){
    var addressList,count,item,next,pre,switchAdd,parentWidth;
    addressList = $('#addressList');
    addressList.css({
        marginLeft:0
    });
    parentWidth = addressList.parent().width();

    next = $('#next');
    pre = $('#pre');
    count = addressList.attr('data-count') | 0;
    item = addressList.children('.desc').first();
    switchAdd = function(event){
        var $target,marginLeft;
        event.stopPropagation();
        $target = $(event.target);
        marginLeft = parseFloat( addressList.css('marginLeft') );
        if($target.attr('id') === 'next' || $target.parent().attr('id') === 'next'){
            if(marginLeft > parentWidth - addressList.width()){
                addressList.animate({
                    marginLeft:marginLeft - item.outerWidth() + 'px'
                },400,function(){
                    marginLeft = parseFloat( addressList.css('marginLeft') );
                    if(marginLeft <= parentWidth - addressList.width() ){
                        next.hide();
                    }
                    pre.show();
                });

            }
        }else{
            if( marginLeft <= -item.outerWidth() ){
                addressList.animate({
                    marginLeft:marginLeft + item.outerWidth() + 'px'
                },400,function(){
                    marginLeft = parseFloat( addressList.css('marginLeft') );
                    if(marginLeft > -item.outerWidth() ){
                        pre.hide();
                    }
                    next.show();
                });

            }
        }
    };
    addressList
        .width( item.outerWidth() * (count+1) + 25 * count);

    if( addressList.width() < parentWidth ){
        next.hide();
        pre.hide()
    }else{
        pre.hide();
    }

    next
        .unbind('click')
        .on('click',switchAdd);
    pre
        .unbind('click')
        .on('click',switchAdd)


})();

//保存个人信息的修改
(function(){
    var save,body,message,sex,shengri,email,shouji;
    message = $('#message');
    sex = message.find('#sex');
    shengri = message.find('#shengri');
    email = message.find('#email');
    shouji = message.find('#shouji');
    save = $('#save');
    save
        .on('click',function(event){
            var sexValue,shengriValue,emailValue,shoujiValue,data;
            event.preventDefault();
            event.stopPropagation();
            sexValue = sex.val();
            shengriValue = shengri.val();
            emailValue = email.val();
            shoujiValue = shouji.val();
            if(shoujiValue.length <= 0){
                alert('输入手机号码');
            }else if(!/(?:^1[3,8]\d{9}$)|(?:^15[^4]\d{8}$)|(?:^14[7,5,9]\d{8}$)|(?:^17[3,6,7,8]\d{8}$)/.test(shoujiValue)){
                alert('手机号码格式不正确');
            }else if(emailValue.length <= 0){
                alert('输入电子邮箱')
            }else if(!/\w+@\w+\.\w/.test(emailValue)){
                alert('电子邮箱格式不正确');
            }else{
                data = {
                    phone_num:shoujiValue,
                    email : emailValue,
                    sex:sexValue,
                    birth:shengriValue
                };
                ajaxObj.updateMessage(data);
            }

        });
})();
(function(){
    var edit = $('#addressList').find('.edit');
    edit
        .unbind('click')
        .on('click',function(event){
            var $target,parent;
            event.stopPropagation();
            $target = $(event.target);
            parent = $target.parents('.f-clearfix');
            ajaxObj.editAdd({id:parent.attr('data-id')},mask);
        });
})();




