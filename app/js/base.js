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
 * 加载完成就要执行的操作
 */
Base.prototype.init = function(){

    var count ,item,profile,parent,sibling,addressList;
    addressList = this.addressList;
    if(addressList){
        //地址的总长度
        count= addressList.attr('data-count') | 0;
        //第一个地址块
        item  = addressList.children('.desc').first();
        //设置地址列表的宽度，让所有的地址一行显示
        addressList
            .width( item.outerWidth() * (count+1) + 25 * count)
            .css({
                marginLeft:0
            });
        if(! addressList.width()){
            addressList.width('auto');
        }
    }

    profile = $('.profile');

    if(profile.length > 0) {
        //在分辨率大于1100px时，不管名称的字数多少都要保证产品的图片和名称要水平显示
        if ($(window).width() > 1100) {
            profile.each(function (index, elem) {
                parent = $(elem).parent();
                sibling = parent.find('.img');
                $(elem).css('width', ( parent.width() - sibling.width() - parseInt(sibling.css('margin-right'))) + 'px');
            });
        }
    }

    return this;
};
/**
 *  使地址列表的可以左右切换
 */
Base.prototype.switchAdd = function(){
    var next,pre,address,parentWidth,me,item,addressList;
    //地址模块
    address = $('#address');
    if(address.length > 0) {
        next = address.find('#next');
        pre = address.find('#pre');
        addressList = this.addressList;
        item = addressList.children('.desc').first();

        parentWidth = addressList.parent().width();

        if (addressList.width() < parentWidth) {
            next.hide();
            pre.hide()
        } else {
            pre.hide();
        }

        //给next和pre绑定事件
        next
            .unbind('click')
            .on('click', handle);
        pre
            .unbind('click')
            .on('click', handle);

        function handle(event) {
            var $target, marginLeft;
            event.stopPropagation();
            $target = $(event.target);
            marginLeft = parseFloat(addressList.css('marginLeft'));

            if ($target.attr('id') === 'next' || $target.parent().attr('id') === 'next') {
                if (marginLeft > parentWidth - addressList.width()) {
                    addressList.animate({
                        marginLeft: marginLeft - item.outerWidth() + 'px'
                    }, 400, function () {
                        marginLeft = parseFloat(addressList.css('marginLeft'));
                        if (marginLeft <= parentWidth - addressList.width()) {
                            next.hide();
                        }
                        pre.show();
                    });

                }
            } else {
                if (marginLeft <= -item.outerWidth()) {
                    addressList.animate({
                        marginLeft: marginLeft + item.outerWidth() + 'px'
                    }, 400, function () {
                        marginLeft = parseFloat(addressList.css('marginLeft'));
                        if (marginLeft > -item.outerWidth()) {
                            pre.hide();
                        }
                        next.show();
                    });

                }
            }

        }
    }
    return this;
};
/**
 * 查看订单详情
 */
Base.prototype.lookDetail = function(){
    var lookOrder = $('.lookOrder');
    if(lookOrder.length > 0) {
        lookOrder.on('click', function (event) {
            event.stopPropagation();
            var data, parent;
            parent = $(event.target).parents('.c-item');
            data = {};

            data.gouwuchehao = parent.attr('data-code');
            data.type = parent.attr('data-type');

            ajaxObj.detail(data);
        });
    }

    return this;
};
/**
 * 添加新地址,给加号绑定事件
 */
Base.prototype.newAdd = function(){
    var addAddress = this.addAddress;
    var mask =  this.addressPoP;
    if(addAddress && mask){
        addAddress
            .unbind('click')
            .on('click',function(event){
                event.stopPropagation();
                mask.show();
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
                     detailValue,id,data,tel,name,DropDownList1,DropDownList2,DropDownList3,detail,mask;
                 event.stopPropagation();
                 mask = me.addressPoP;
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

     }
     return this
 };
/**
 * 编辑地址
 */
Base.prototype.editAdd = function(){
    var addressList,edit,addressPoP;
    addressList = this.addressList;
    addressPoP = this.addressPoP;
    if(addressList){
        edit = addressList.find('.edit');
        edit
            .unbind('click')
            .on('click',function(event){
                var $target,parent;
                event.stopPropagation();
                $target = $(event.target);
                parent = $target.parents('.f-clearfix');
                ajaxObj.editAdd({id:parent.attr('data-id')},addressPoP);
            });
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
 * 关闭修改地址的弹窗
 */
Base.prototype.closePop = function(){
    var addressPoP;
    addressPoP= this.addressPoP;
    if(addressPoP){
        addressPoP
            .find('#maskDelate')
            .unbind('click')
            .on('click',function(){
                event.stopPropagation();
                addressPoP.hide();
            });
    }
    return this
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

//发送ajax的对象
var ajaxObj = new Ajax();

var baseObj = new Base();

baseObj
    .init()
    .switchAdd()
    .lookDetail()
    .newAdd()
    .submitNewAdd()
    .editAdd()
    .saveMessage()
    .closePop()
    .deleteAdd()
    .setDefault();

