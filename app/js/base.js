/**
 * Created by Administrator on 2016/12/13.
 */
//����ajax�Ķ���
var ajaxObj = new Ajax();


var mask = $('#mask');
var addAddress = $('#addAddr');
var maskDelate = $('#maskDelate');
var flowMask = $('#flowMask');
//��Ʒ���Ƶĸ�Ԫ��
var profile = $('.profile');
//�鿴��������
var lookOrder = $('.lookOrder');
//�鿴����
var lookFlow = $('.lookFlow');
var newAddress = $('#newAddress');
if(newAddress.length >= 1) {
    var submit = newAddress.find('#submit');
}
//��ӵ�ַ
addAddress.unbind('click').on('click',function(event){
    event.stopPropagation();
    mask.show();
});
//�ύ�µ�ַ
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
//��������
lookOrder.on('click',function(event){
    event.stopPropagation();
    var data,parent;
    parent = $(event.target).parents('.c-item');
    data = {};

    data.gouwuchehao = parent.attr('data-code');
    data.type = parent.attr('data-type');

    ajaxObj.detail(data);
});
//����
lookFlow.on('click',function(event){
    event.stopPropagation();
    flowMask.show();
});
//�ڷֱ��ʴ���1100pxʱ��Ҫ��֤��Ʒ��ͼƬ������Ҫˮƽ��ʾ
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


//��ַ���б�ĳ���
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

//���������Ϣ���޸�
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
                alert('�����ֻ�����');
            }else if(!/(?:^1[3,8]\d{9}$)|(?:^15[^4]\d{8}$)|(?:^14[7,5,9]\d{8}$)|(?:^17[3,6,7,8]\d{8}$)/.test(shoujiValue)){
                alert('�ֻ������ʽ����ȷ');
            }else if(emailValue.length <= 0){
                alert('�����������')
            }else if(!/\w+@\w+\.\w/.test(emailValue)){
                alert('���������ʽ����ȷ');
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




