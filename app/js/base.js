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
 * ������ɾ�Ҫִ�еĲ���
 */
Base.prototype.init = function(){

    var count ,item,profile,parent,sibling,addressList;
    addressList = this.addressList;
    if(addressList){
        //��ַ���ܳ���
        count= addressList.attr('data-count') | 0;
        //��һ����ַ��
        item  = addressList.children('.desc').first();
        //���õ�ַ�б�Ŀ�ȣ������еĵ�ַһ����ʾ
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
        //�ڷֱ��ʴ���1100pxʱ���������Ƶ��������ٶ�Ҫ��֤��Ʒ��ͼƬ������Ҫˮƽ��ʾ
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
 *  ʹ��ַ�б�Ŀ��������л�
 */
Base.prototype.switchAdd = function(){
    var next,pre,address,parentWidth,me,item,addressList;
    //��ַģ��
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

        //��next��pre���¼�
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
 * �鿴��������
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
 * ����µ�ַ,���ӺŰ��¼�
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
 * �༭��ַ
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
 * �ر��޸ĵ�ַ�ĵ���
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

//����ajax�Ķ���
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

