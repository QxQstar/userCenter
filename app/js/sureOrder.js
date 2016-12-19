/**
 * Created by Administrator on 2016/12/19.
 */
/**
 *  确认订单
 * @constructor
 */
function SureOrder(){
    this.sure = $('#sure');
    this.footer = $('#orderFooter');
    return this;
}
SureOrder.prototype.init = function(){
    var addressList,$target;
    addressList = $('#addressList');
    $target = addressList.find('.selected');
    ajaxObj.getFlowMoney({id:$target.attr('data-id')});
    return this;
};
/**
 * 选择地址
 */
SureOrder.prototype.selectAdd = function(){
    var addressList,item;
    addressList = $('#addressList');
    item = addressList.children().not(function(){
        return $(this).attr('class').indexOf('addDesc') >= 0;
    });
    item
        .unbind('click')
        .on('click',function(event){
            event.stopPropagation();
            var $target = $(this);
            $target.siblings().removeClass('selected');
            $target.addClass('selected');
            ajaxObj.getFlowMoney({id:$target.attr('data-id')});
        });

    return this;

};
/**
 * 总价
 */
SureOrder.prototype.totalPrice = function(){
    var subtotal,allMoney,flowMoney,reduceMoney,num;
    subtotal= this.sure.find('.c-subtotal');
    allMoney = this.footer.find('#allMoney');
    num = 0;
    subtotal.each(function(index,item){
        num += parseFloat( $(item).html() );
    });
    allMoney.html('￥'+num);

    return this;
};

var ajaxObj = new Ajax();
var orderObj = new SureOrder();
orderObj
    .init()
    .totalPrice()
    .selectAdd();