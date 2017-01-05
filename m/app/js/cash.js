/**
 * Created by Administrator on 2016/12/22.
 */
function Cash(){
    this.recharge = $('#recharge');
    this.payMethod = $('#payMethod');
}
/**
 * ������ֵ����ť���¼�
 * @returns {Cash}
 */
Cash.prototype.init = function(){
    var chongzhi,recharge,maskDelate;
    recharge = this.recharge;
    chongzhi = $('#chongzhi');
    maskDelate = recharge.find('#maskDelate');
    chongzhi
        .unbind('click')
        .on('click',function(event){
            event.preventDefault();
            event.stopPropagation();
            recharge.show();
        });
    maskDelate
        .unbind('click')
        .on('click',function(event){
            event.preventDefault();
            event.stopPropagation();
            recharge.hide();
        });
    return this;
};
/**
 *  �л�ѡ�
 * @returns {Cash}
 */
Cash.prototype.tabSelect = function(){
    $('#myTab a').click(function (e) {
        e.preventDefault();
        $(this).tab('show')
    });
    return this;
};

/**
 * ����/չ��
 * @returns {Cash}
 */
Cash.prototype.isSpread = function(){
    var status,bank,recordList,spread;
    recordList = $('#record').find('.recordList');
    if(this.payMethod){
        status = this.payMethod.find('#status');
        bank = this.payMethod.find('#bank');

        //Ĭ���������֧��������״̬
        bank.data('status','off');
        status
            .unbind('click')
            .on('click',function(event){
                event.preventDefault();
                event.stopPropagation();
                if(bank.data('status') === 'off'){
                    bank.data('status','on');
                    status
                        .find('.info')
                        .html('����');
                    status
                        .find('.statusIcon')
                        .removeClass('off')
                        .addClass('on');
                    bank
                        .height('auto');
                }else{
                    bank.data('status','off');
                    status
                        .find('.info')
                        .html('չ��');
                    status
                        .find('.statusIcon')
                        .removeClass('on')
                        .addClass('off');
                    bank
                        .height(0);
                }

            });

    }
    if(recordList.children().length > 0){
        spread = recordList.find('.m-bottom');
        spread
            .unbind('click')
            .on('click',function(event){
                var $target;
                event.stopPropagation();
                $target = $(event.target);
                if($target.html.trim() === 'չ��'){
                    $target.html('����');
                    $target.prev().height('auto');
                }else{
                    $target.html('չ��');
                    $target.prev().height(40);
                }

            });
    }

    return this;
};
/**
 * �������ֵ
 * @returns {Cash}
 */
Cash.prototype.codeRecharge = function(){
    var recharge,submit,code;
    recharge  = this.recharge;
    submit = recharge.find('#submit');
    code = recharge.find('#code');
    submit
        .unbind('click')
        .on('click',function(event){
            var codeVal;
            codeVal = code.val();
            event.stopPropagation();
            event.preventDefault();
            if(codeVal){
                ajaxObj.codeRecharge({
                    code:codeVal
                });
            }
        });

    return this;
};
/**
 * �ֽ��ֵ
 * @returns {Cash}
 */
Cash.prototype.cashRecharge = function(){
    var aliPay,weixinpay,recharge,jine,bank;
    recharge = this.recharge;
    aliPay = recharge.find('#alipay');
    weixinpay = recharge.find('#weixinpay');
    jine = recharge.find('#jine');
    bank = recharge.find('#bank');
    aliPay
        .unbind('click')
        .on('click',payHandle);
    weixinpay
        .unbind('click')
        .on('click',payHandle);
    bank
        .find('.c-item')
        .unbind('click')
        .on('click',payHandle);
    function payHandle(event){
        event.stopPropagation();
        var jineVal,$target;
        jineVal= jine.val().trim();
        $target = $(this);
        if(/^\d+\.?\d*$/.test(jineVal)){
            if($target.attr('id')) {
                ajaxObj.cashRecharge({
                    type: $target.attr('id'),
                    price: parseFloat(jineVal)
                });
            }else{
                ajaxObj.cashRecharge({
                    type:'bank',
                    bank_id:$target.attr('data-id'),
                    price: parseFloat(jineVal)
                });
            }
        }

    }
    return this;
};
/**
 * ���������ϸ����ʾ��ϸ
 * @returns {Cash}
 */
Cash.prototype.showDetail =function(){
    var record;
    record = $('#record');
    if(record.find('.recordList').children().length > 0){
       record.show();
    }
    return this;
};

var ajaxObj = new Ajax();
var cashObj = new Cash();
    cashObj
        .init()
        .showDetail()
        .tabSelect()
        .isSpread()
        .codeRecharge()
        .cashRecharge();

