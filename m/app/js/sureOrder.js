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
    this.addressList = $('#addressList');
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
    var addressList,item,me;
    me = this;
    addressList = this.addressList;
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
            ajaxObj.getFlowMoney({id:$target.attr('data-id')},me);
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
    ajaxObj.getCoupons(data,this);
    return this;
};
/**
 * 根据得到的优惠券数据，生成优惠券
 * @param result 返回的优惠券数据
 * @returns {SureOrder}
 */
SureOrder.prototype.setCoupons = function(result){
    var productyhq,orderyhq,reduce,items,order,product,bianhao,me;
    productyhq= $('#productyhq');
    orderyhq = $('#orderyhq');
    reduce = $('#reduce');
    items='';
    order = 0;
    product = 0;
    bianhao = [];
    me = this;


    if(result.data && result.data.order){
        orderyhq.show();
        reduce.show();
        order = parseFloat( result.data.order.mianzhi);
        items = '<span class="f-pm-0 f-center on" data-price="'+ order.toFixed(2) +'" data-bianhao="'+ result.data.order.youhuiquanbianhao +'"> '+ result.data.order.biaoti +" ￥ "+ order +'</span>';
        orderyhq.find('.item').html(items);
        items = '';
    }


    if(result.data && result.data.product){
        productyhq.show();
        reduce.show();
        product = parseFloat( result.data.product.sum );

        $.each(result.data.product.data,function(index,item){
            bianhao.push( item.youhuiquanbianhao );
        });
        items +='<span class="f-pm-0 f-center on" data-price="'+ product.toFixed(2) +'" data-bianhao="'+ bianhao +'">'+ '组合优惠￥' + product +'</span>';
        productyhq.find('.item').html(items);

    }
    if(order > product){
        productyhq.find('.on').removeClass('on');
    }else{
        orderyhq.find('.on').removeClass('on');
    }
    me.setReduce(reduce);

    productyhq
        .find('.item')
        .find('span')
        .unbind('click')
        .on('click',clickHandle);
    orderyhq
        .find('.item')
        .find('span')
        .unbind('click')
        .on('click',clickHandle);
    function clickHandle(event){
        var $target = $(event.target);
        event.stopPropagation();
        $target.toggleClass('on');
        if($target.parents('#productyhq').length > 0){
            orderyhq.find('.item span').removeClass('on');
        }
        if($target.parents('#orderyhq').length > 0){
            productyhq.find('.item span').removeClass('on');
        }
        me.setReduce(reduce);
    }
   return this;
};
/**
 * 显示优惠券减免
 * @param reduce 优惠券减免 jquery节点
 * @returns {SureOrder}
 */
SureOrder.prototype.setReduce = function(reduce){
    var on,reduceMoney,data;
    reduceMoney = reduce.find('#reduceMoney');
    on = $('#orderFooter').find('.on');
    if(on.length > 0){
        data = on.attr('data-price');
    }else{
        data = 0;
    }
    reduceMoney.html('￥'+data);
    this.finalPrice();
    return this;
};
/**
 * 订单需要结算的价格
 * @returns {SureOrder}
 */
SureOrder.prototype.finalPrice = function(){
    var totalPrice,flowMoney,reduceMoney,allMoney;
    totalPrice = $('#totalPrice');
    flowMoney = parseFloat($('#flowMoney').html().slice(1)) || 0;
    reduceMoney = parseFloat($('#reduceMoney').html().slice(1)) || 0;
    allMoney = parseFloat($('#allMoney').html().slice(1)) || 0;
    totalPrice.html('￥' + (allMoney - reduceMoney + flowMoney).toFixed(2));
    this.submitOrder();
    return this;
};
/**
 * 提交订单
 * @returns {SureOrder}
 */
SureOrder.prototype.submitOrder = function(){
    var submit,selectedAdd,order,data,footer,items,cart_id,cart_code;
    submit= $('#submitOrder');
    selectedAdd = this.addressList.find('.selected');
    order = this.sure;
    footer = this.footer;
    data={};
    items = order.find('.c-item');
    data = {
        name:selectedAdd.find('.name').html(),
        phone_num:selectedAdd.find('.tel').html(),
        street:selectedAdd.find('.smallAddr').html(),
        area :selectedAdd.find('.bigAddr').html(),
        yunfei:footer.find('#flowMoney').html().slice(1)
    };
    data.order_code = order.attr('data-code');
    cart_id=[];
    cart_code =[];
    items.each(function(index,item){
        var $item,data;
        $item = $(item);
        data = $item.attr('data-code');
        if(data){
            cart_code.push(data);
        }else{
            cart_id.push($item.attr('data-id'));
        }

    });
    data.cart_code = cart_code.join(',');
    data.cart_id = cart_id.join(',');
    data.yhq_id = footer.find('.on').attr('data-bianhao');
    submit
        .unbind('click')
        .on('click',function(event){
            event.preventDefault();
            event.stopPropagation();
            data.note = footer.find('#message').val();
            ajaxObj.submitOrder(data);
        });
    return this;
};
/**
 * 展开地址列表
 * @returns {Base}
 */
SureOrder.prototype.spreadAdd = function(){
    if(this.addressList){
        var addressList,spread;
        addressList = this.addressList;
        if(addressList.children().length > 1){
            spread = $('#spread');
            spread.show();
            addressList
                .outerHeight(152);
            spread
                .unbind('click')
                .on('click',function(event){
                    var $target;
                    event.preventDefault();
                    $target = $(event.target);
                    if($target.attr('class').indexOf('on')>0){
                        $target
                            .removeClass('on')
                            .addClass('off')
                            .prev().outerHeight('auto');
                    }else{
                        $target
                            .removeClass('off')
                            .addClass('on')
                            .prev()
                            .outerHeight(152);
                    }
                });
        }

    }
    return this;
};
var ajaxObj = new Ajax();
var orderObj = new SureOrder();
orderObj
    .init()
    .spreadAdd()
    .totalPrice()
    .selectAdd()
    .getCoupons();