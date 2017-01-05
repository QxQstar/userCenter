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
        //�༭��ַ�ĵ���
        this.addressPoP = $('#mask');
    }
    if($('#maskDelate').length >0){
        //�رյ�ַ������icon
        this.maskDelate = $('#maskDelate');
    }
    if($('#newAddress').length >0){
        //�༭��ַ�ı�
        this.newAddress = $('#newAddress');
    }

    if($('#save').length >0) {
        //�����޸ĵĸ�����Ϣ
        this.save = $('#save');
    }
    if($('#addressList').length >0) {
        //��ַ�б�
        this.addressList = $('#addressList');
    }
    if($('#addAddr').length >0) {
        //����µ�ַ��icon
        this.addAddress = $('#addAddr');
    }
    return this;

}

/**
 * �鿴��������
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
 * �����µ�ַ
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
                     alert('�����ջ�������');
                 }else if(telValue.length <= 0){
                     alert('������ϵ�绰');

                 }else if(!/(?:^1[3,8]\d{9}$)|(?:^15[^4]\d{8}$)|(?:^14[7,5,9]\d{8}$)|(?:^17[3,6,7,8]\d{8}$)/.test(telValue)){
                     alert('�绰�����ʽ����ȷ');
                 }else if(areaValue === 'ʡ��'){
                     alert('ѡ��ʡ��');
                 }else if(cityValue === '�ؼ���'){
                     alert('ѡ��ؼ���');
                 }else if(countyValue === '�С��ؼ���'){
                     alert('�С��ؼ���');
                 }else if(detailValue.length <= 0){
                     alert('������ϸ��ַ')
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
 * �༭��ַ
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
 * ���������Ϣ���޸�
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
                    alert('�����ֻ�����');
                } else if (!/(?:^1[3,8]\d{9}$)|(?:^15[^4]\d{8}$)|(?:^14[7,5,9]\d{8}$)|(?:^17[3,6,7,8]\d{8}$)/.test(shoujiValue)) {
                    alert('�ֻ������ʽ����ȷ');
                } else if (emailValue.length <= 0) {
                    alert('�����������')
                } else if (!/\w+@\w+\.\w/.test(emailValue)) {
                    alert('���������ʽ����ȷ');
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
 * ɾ����ַ
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
 * ����Ĭ�ϵ�ַ
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
 * ����С��
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
            //��Ʒ�ļ۸�
            zpPrice = $elem.find('.zpPrice');
            //��Ʒ������
            if(parent.attr('id') === 'cart') {
                num = $elem.find('.num').val();
            }else{
                num = $elem.find('.num').html();
            }

            if(zpPrice.length > 0){
                zpPrice = parseFloat( zpPrice.html().replace('��','') );
            }else{
                zpPrice = 0;
            }

            mainPrice = parseFloat( $elem.find('.mainPrice').html().replace('��','') );
            subtotal.html( zpPrice + mainPrice*num );
        });
    }
    return this;
};
/**
 * ��ȡӡͼ����
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
 * ͷ������չ�������۵�
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
 * ����
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

//����ajax�Ķ���
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

