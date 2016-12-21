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
 * @returns {SureOrder}
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
 * @returns {SureOrder}
 */
SureOrder.prototype.totalPrice = function(){
    var subtotal,allMoney,num;
    subtotal= this.sure.find('.c-subtotal');
    allMoney = this.footer.find('#allMoney');
    num = 0;
    subtotal.each(function(index,item){
        num += parseFloat( $(item).html() );
    });
    allMoney.html('￥'+num.toFixed(2));

    return this;
};
/**
 * 获取优惠券
 * @returns {SureOrder}
 */
SureOrder.prototype.getCoupons = function(){
    var order,items,data,pridObj,footer;
    order = this.sure;
    footer = this.footer;
    items = order.find('.c-item');
    data = {};
    pridObj = {};
    data.totalPrice = footer
                        .find('#allMoney')
                        .html()
                        .split('￥')[1];
    data.item = {};
    items.each(function(index,item){
        var $item,type,id;
        $item= $(item);
        type = $item.attr('data-type');
        if(type === '相框'){
            data.item[index] = {
                type:type
            };
        }else{
            id = $item.attr('data-prid');
            if( !(id in pridObj) ){
                pridObj[id] = true;
                data.item[index] = {
                    type:type,
                    id:id
                };
            }
        }
    });
    ajaxObj.getCoupons(data);
    return this;
};
var ajaxObj = new Ajax();
var orderObj = new SureOrder();
orderObj
    .init()
    .totalPrice()
    .selectAdd()
    .getCoupons();