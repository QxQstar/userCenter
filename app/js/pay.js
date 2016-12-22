/**
 * Created by Administrator on 2016/12/13.
 */

function Pay(){
    this.payMethod = null;
    if($('#payMethod').length > 0){
        this.payMethod = $('#payMethod');
    }
    if($('#sure').length > 0){
        this.sure = $('#sure');
    }

}
/**
 * 网银支付方式是否展开
 * @returns {Pay}
 */
Pay.prototype.isSpread = function(){
    var status,bank;
    if(this.payMethod){
        status = this.payMethod.find('#status');
        bank = this.payMethod.find('#bank');

        //默认情况网银支付是收起状态
        bank.data('status','off');
        status
            .unbind('click')
            .on('click',function(event){
                var $target;
                $target= $(event.target);
                event.preventDefault();
                event.stopPropagation();
                if(bank.data('status') === 'off'){
                    bank.data('status','on');
                    status
                        .find('.info')
                        .html('收起');
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
                        .html('展开');
                    status
                        .find('.statusIcon')
                        .removeClass('on')
                        .addClass('off');
                    bank
                        .height(0);
                }

            });
    }
    return this;
};
/**
 *  支付宝支付
 * @returns {Pay}
 */
Pay.prototype.aliPay = function(){

    var sure,data,items,name,icon,payMethod;
    sure= this.sure;
    payMethod = this.payMethod;
    if(sure && payMethod ) {
        items = sure.find('.c-item');
        icon = payMethod.find('#alipay');

        name = [];
        items.each(function (index, item) {
            var $item;
            $item = $(item);
            name.push($item.find('.name').html());
        });
        data = {
            code: sure.attr('order-code'),
            name: name.join(',')
        };
        icon
            .unbind('click')
            .on('click', function (event) {
                event.stopPropagation();
                ajaxObj.aliPay(data);
            });
    }

    return this;
};

/**
 * 微信支付
 * @returns {Pay}
 */
Pay.prototype.weixinPay = function(){
    var sure,data,code,icon,payMethod;
    sure= this.sure;
    payMethod = this.payMethod;
    if(sure && payMethod ) {
        icon = payMethod.find('#weixinpay');
        code = sure.attr('order-code');
        data = {
            code: code

        };
        icon
            .unbind('click')
            .on('click', function (event) {
                event.stopPropagation();
                ajaxObj.weixinPay(data);
            });
    }
    return this;
};
var ajaxObj = new Ajax();
var payObj = new Pay();

payObj
    .isSpread()
    .aliPay()
    .weixinPay();