/**
 * Created by Administrator on 2016/12/20.
 */
/**
 * ����
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
 *  ���ݶ�����״̬��ƿɽ��еĲ���
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
        if(status === '�������'){
            if($item.attr('data-status') === '1' ||$item.attr('data-status') === '' ){
                handle.html('<a href="/single.aspx?m=shaidan&id='+ code +'"class="item shaidan">ǰ��ɹ��</a><a href="/single.aspx?m=tuihuo&order_code='+ code +'" class="item shenqin">�����ۺ�</a>');
            }else if($item.attr('data-status') === '0'){
                handle.html('<a href="/single.aspx?m=shaidan&id='+ code +'"class="item shaidan">ǰ��ɹ��</a><a href="/single.aspx?m=cont&cust_id='+ $item.attr('data-statusid') +'" class="item process">�鿴����</a>');
            }
        }else if(status === '�ѷ���'){
            handle.html('<div class="item lookFlow">�鿴����</div><div class="item shouhuo">ȷ���ջ�</div>');
        }else if(status === '�Ѹ���'){
            handle.html('<div class="item write">�ȴ�����</div>');
        }else if(status === 'δ����'){
            handle.html('<a href="/single.aspx?m=pay1&order='+ code +'"  class="item pay">ȥ����</a><div class="item deleteOrder">ȡ������</div>')
        }
    });
    return this;
};
/**
 * ȡ������
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
 * �鿴����
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
 * �����˵���
 * @returns {Order}
 */
Order.prototype.copy = function(){
    var client = new ZeroClipboard($("#copy"),{
        swfPath: "ZeroClipboard.swf"
    });
    client.on('load',function(client){
        client.on('wrongflash',function(){
            alert("���flash�汾̫��,�����Զ�����");
        });
        client.on( 'complete', function() {
            alert('���Ƴɹ�');
        } );
    });

    return this;
};
/**
 * ȷ���ջ�
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

