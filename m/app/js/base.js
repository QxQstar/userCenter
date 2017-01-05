/**
 * Created by Administrator on 2016/12/13.
 */




/**
 *
 * @constructor
 */
function Base(){
    this.addressPoP = null;
    this.maskDelate = null;
    this.newAddress = null;
    this.save = null;
    this.addressList = null;
    this.addAddress = null;
    if($('#mask').length > 0){
        //编辑地址的弹窗
        this.addressPoP = $('#mask');
    }
    if($('#maskDelate').length >0){
        //关闭地址弹窗的icon
        this.maskDelate = $('#maskDelate');
    }
    if($('#newAddress').length >0){
        //编辑地址的表单
        this.newAddress = $('#newAddress');
    }

    if($('#save').length >0) {
        //保存修改的个人信息
        this.save = $('#save');
    }
    if($('#addressList').length >0) {
        //地址列表
        this.addressList = $('#addressList');
    }
    if($('#addAddr').length >0) {
        //添加新地址的icon
        this.addAddress = $('#addAddr');
    }
    return this;

}

/**
 * 查看订单详情
 */
Base.prototype.lookDetail = function(){
    var lookOrder = $('.lookOrder');
    if(lookOrder.length > 0) {
        lookOrder.on('click', function (event) {
            event.stopPropagation();
            var data, parent;
            parent = $(event.target).parents('.u-item');
            if(parent.length <= 0){
                parent = $(event.target).parents('.c-item');
            }
            data = {};

            data.gouwuchehao = parent.attr('data-code');
            data.type = parent.attr('data-type');
            ajaxObj.detail(data);
        });
    }

    return this;
};

/**
 * 保存新地址
 */
 Base.prototype.submitNewAdd = function(){
     var submit,newAddress,me;
     me = this;
     newAddress = me.newAddress;
     if(me.newAddress){
         submit = newAddress.find('#submit');
         submit
             .unbind('click')
             .on('click',function(event){
                 var nameValue,telValue,cityValue,areaValue,countyValue,
                     detailValue,data,tel,name,DropDownList1,DropDownList2,DropDownList3,detail,mask;
                 event.stopPropagation();
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
                     if(location.hash){
                         data = {
                             id:location.hash.slice(1),
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

     }
     return this
 };
/**
 * 编辑地址
 */
Base.prototype.editAdd = function(){
    var newAddress;
    newAddress = this.newAddress;
    if(newAddress && location.hash){
        ajaxObj.editAdd({id:location.hash.slice(1)},newAddress);
    }
    return this;
};
/**
 * 保存个人信息的修改
 */
Base.prototype.saveMessage = function(){
    var save,message,sex,shengri,email,shouji;
    message = $('#message');
    save = this.save;
    if(message.length > 0 && save) {
        sex = message.find('#sex');
        shengri = message.find('#shengri');
        email = message.find('#email');
        shouji = message.find('#shouji');

        save
            .on('click', function (event) {
                var sexValue, shengriValue, emailValue, shoujiValue, data;
                event.preventDefault();
                event.stopPropagation();
                sexValue = sex.val();
                shengriValue = shengri.val();
                emailValue = email.val();
                shoujiValue = shouji.val();
                if (shoujiValue.length <= 0) {
                    alert('输入手机号码');
                } else if (!/(?:^1[3,8]\d{9}$)|(?:^15[^4]\d{8}$)|(?:^14[7,5,9]\d{8}$)|(?:^17[3,6,7,8]\d{8}$)/.test(shoujiValue)) {
                    alert('手机号码格式不正确');
                } else if (emailValue.length <= 0) {
                    alert('输入电子邮箱')
                } else if (!/\w+@\w+\.\w/.test(emailValue)) {
                    alert('电子邮箱格式不正确');
                } else {
                    data = {
                        phone_num: shoujiValue,
                        email: emailValue,
                        sex: sexValue,
                        birth: shengriValue
                    };
                    ajaxObj.updateMessage(data);
                }

            });
    }
    return this;
};


/**
 * 删除地址
 */
Base.prototype.deleteAdd = function(){
    var addressList;
    addressList = this.addressList;
    if(addressList){
        addressList
            .find('.delete')
            .unbind('click')
            .click('click',function(event){
                event.stopPropagation();
                var id = $(this).parents('.f-clearfix').attr('data-id');
                var data = {
                    'id':id
                };
                ajaxObj.deleteAdd(data);
            });

    }

    return this;
};
/**
 * 设置默认地址
 */
Base.prototype.setDefault = function(){
    var addressList;
    addressList = this.addressList;
    if(addressList){
        addressList
            .find('.status')
            .unbind('click')
            .on('click',function(event){
                event.stopPropagation();
                var id = $(this).parents('.f-clearfix').attr('data-id');
                var data = {
                    'id':id
                };
                ajaxObj.setAdd(data);
            })
    }
    return this;
};
/**
 * 设置小计
 */
Base.prototype.setSubtotal = function(){
    var parent;
    if($('#cart').length >= 1){
        parent = $('#cart');
    }else if($('#sure').length >= 1){
        parent = $('#sure');
    }
    if(parent){
        var items = parent.find('.c-item');
        items.each(function(index,elem){
            var $elem,subtotal,zpPrice,mainPrice,num;
            $elem = $(elem);
            subtotal = $elem.find('.c-subtotal');
            //作品的价格
            zpPrice = $elem.find('.zpPrice');
            //产品的数量
            if(parent.attr('id') === 'cart') {
                num = $elem.find('.num').val();
            }else{
                num = $elem.find('.num').html();
            }

            if(zpPrice.length > 0){
                zpPrice = parseFloat( zpPrice.html().replace('￥','') );
            }else{
                zpPrice = 0;
            }

            mainPrice = parseFloat( $elem.find('.mainPrice').html().replace('￥','') );
            subtotal.html( zpPrice + mainPrice*num );
        });
    }
    return this;
};
/**
 * 获取印图数量
 * @returns {Base}
 */
Base.prototype.getNum = function(){
    var cart,order,sure,container,num,curWarp;
    container = $('#container');
    cart = container.find('#cart');
    order = container.find('#order');
    sure = container.find('#sure');

    if(sure.length > 0){
        curWarp = sure;
    }else if(order.length > 0){
        curWarp = order;
    }else if(cart.length > 0){
        curWarp = cart;
    }else{
        return this;
    }
    num = curWarp.find('.shuliang');
    ajaxObj.getNum(num);
    return this;
};
/**
 * 头部导航展开或者折叠
 * @returns {Base}
 */
Base.prototype.headNav = function(){
    var headTitle = $("#headTitle");
    var button = headTitle.find(".show");
    button.click(function(){
        if(parseInt(headTitle.find("ul").css("right")) < 0){
            $(this).find("span").eq(0).addClass("one")
                .next("span").addClass("two")
                .next("span").addClass("three");

            headTitle.find(".f-mask").css("display","block")
                .next(".rightNav").find("ul").animate({"right":"0"},400);
        }else{
            $(this).find("span").removeClass();
            headTitle.find(".f-mask").css("display","none")
                .next(".rightNav").find("ul").animate({"right":"-300px"},400);
        }
    });
    return this;
};
/**
 * 回退
 * @returns {Base}
 */
Base.prototype.back = function(){
    var back;
    back = $('#back');
    back
        .on('click',function(){
            location.href = document.referrer;
        });
    return this;
};

//发送ajax的对象
var ajaxObj = new Ajax();

var baseObj = new Base();

baseObj
    .headNav()
    .getNum()
    .setSubtotal()
    .lookDetail()
    .submitNewAdd()
    .editAdd()
    .saveMessage()
    .deleteAdd()
    .setDefault()
    .back();

