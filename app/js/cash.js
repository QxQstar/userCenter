/**
 * Created by Administrator on 2016/12/22.
 */
function Cash(){
    this.recharge = $('#recharge');
    this.payMethod = $('#payMethod');
}
/**
 * 给‘充值’按钮绑定事件
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
 *  切换选项卡
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
 * 收起或者展开网银支付
 * @returns {Cash}
 */
Cash.prototype.isSpread = function(){
    var status,bank;
    if(this.payMethod){
        status = this.payMethod.find('#status');
        bank = this.payMethod.find('#bank');

        //默认情况网银支付是收起状态
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
 * 输入码充值
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
 * 现金充值
 * @returns {Cash}
 */
Cash.prototype.cashRecharge = function(){
    var aliPay,weixinpay,recharge,jine;
    recharge = this.recharge;
    aliPay = recharge.find('#alipay');
    weixinpay = recharge.find('#weixinpay');
    jine = recharge.find('#jine');
    aliPay
        .unbind('click')
        .on('click',payHandle);
    weixinpay
        .unbind('click')
        .on('click',payHandle);

    function payHandle(event){
        event.stopPropagation();
        var jineVal,$target;
        jineVal= jine.val().trim();
        $target = $(this);
        if(/^\d+\.?\d*$/.test(jineVal)){
            ajaxObj.cashRecharge({
                type:$target.attr('id'),
                price:  parseFloat( jineVal )
            });
        }

    }
    return this;
};
var ajaxObj = new Ajax();
var cashObj = new Cash();
    cashObj
        .init()
        .tabSelect()
        .isSpread()
        .codeRecharge()
        .cashRecharge();
