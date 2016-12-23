/**
 * Created by Administrator on 2016/12/20.
 */
/**
 * 订单
 * @constructor
 */
function Order(){
    this.order = $('#order');
}
/**
 *
 * @returns {Order}
 */
Order.prototype.getNum = function(){
    var num ,order;
    order = this.order;
    num = order.find('.shuliang');
    ajaxObj.getNum(num);
    return this;
};
/**
 *  根据订单的状态设计可进行的操作
 * @returns {Order}
 */
Order.prototype.setHandle = function(){
    var orders,orderItem,status,handle,code;
    orders = this.order;
    orderItem = orders.find('.c-item');
    orderItem.each(function(index,item){
        var $item = $(item);
        status = $item.find('.status').html();
        handle = $item.find('.handle');
        code = $item.attr('data-id');
        if(status === '订单完成'){
            if($item.attr('data-status') === '1' ||$item.attr('data-status') === '' ){
                handle.html('<a href="/single.aspx?m=shaidan&id='+ code +'"class="item shaidan">前往晒单</a><a href="/single.aspx?m=tuihuo&order_code='+ code +'" class="item shenqin">申请售后</a>');
            }else if($item.attr('data-status') === '0'){
                handle.html('<a href="/single.aspx?m=shaidan&id='+ code +'"class="item shaidan">前往晒单</a><a href="/single.aspx?m=cont&cust_id='+ $item.attr('data-statusid') +'" class="item process">查看进度</a>');
            }
        }else if(status === '已发件'){
            handle.html('<div class="item lookFlow">查看物流</div><div class="item shouhuo">确认收货</div>');
        }else if(status === '已付款'){
            handle.html('<div class="item write">等待发货</div>');
        }else if(status === '未付款'){
            handle.html('<a href="/single.aspx?m=pay1&order='+ code +'"  class="item pay">去付款</a><div class="item deleteOrder">取消订单</div>')
        }
    });
    return this;
};
/**
 * 取消订单
 * @returns {Order}
 */
Order.prototype.deleteOrder = function(){
    var order;
    order = this.order;
    order
        .find('.deleteOrder')
        .unbind('click')
        .on('click',function(event){
            var $target,data,parent;
            event.stopPropagation();
            $target = $(event.target);
            parent = $target.parents('.c-item');
            data = {
                id:parent.attr('data-id')
            };
            ajaxObj.deleteOrder(data);
        });
    return this;
};
/**
 * 查看物流
 * @returns {Order}
 */
Order.prototype.lookFlow = function(){
    var order;
    order = this.order;
    order
        .find('.lookFlow')
        .unbind('click')
        .on('click',function(event){
            var $target,data,parent;
            $target = $(event.target);
            event.stopPropagation();
            parent = $target.parents('.c-item');
            data = {
                id:parent.attr('data-id')
            };
            ajaxObj.lookFlow(data);
        });
    return this;
};
/**
 * 复制运单号
 * @returns {Order}
 */
Order.prototype.copy = function(){
    var client = new ZeroClipboard($("#copy"),{
        swfPath: "ZeroClipboard.swf"
    });
    client.on('load',function(client){
        client.on('wrongflash',function(){
            alert("你的flash版本太老,不能自动复制");
        });
        client.on( 'complete', function() {
            alert('复制成功');
        } );
    });

    return this;
};
/**
 * 确认收货
 * @returns {Order}
 */
Order.prototype.shouhuo = function(){
    var orders;
    orders = this.order;
    orders
        .find('.shouhuo')
        .unbind('click')
        .on('click',function(event){
            var $target,data,parent;
            event.stopPropagation();
            $target = $(event.target);
            parent = $target.parents('.c-item');
            data = {
                code:parent.attr('data-id')
            };
            ajaxObj.shouhuo(data);
        });
    return this;
};
var ajaxObj = new Ajax();
var orderObj = new Order();
orderObj
    .getNum()
    .setHandle()
    .deleteOrder()
    .lookFlow()
    .copy()
    .shouhuo();

