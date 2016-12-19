/**
 * Created by Administrator on 2016/12/14.
 */

function Cart(){
    this.cartModule = $('#cart');

}

/**
 * 删除
 */
Cart.prototype.deleteItem = function(){
    var cart,items;
    cart = this.cartModule;
    items = cart.find('.c-item');
    items.each(function(index,item){
        var $elem,deleteNode;
        $elem = $(item);
        deleteNode = $elem.find('.delete');
        //给删除绑定事件
        deleteNode.on('click',function(event){
            var code,parent,data;
            parent = $(event.target).parents('.c-item');
            if(parent.attr('data-code')){
                code = parent.attr('data-code');
                data = {
                    'gouwuchehao':code
                };
            }else{
                code = parent.attr('data-id');
                data = {
                    'id':code
                }
            }
            ajaxObj.cartDelete(data);
        });
    });
    return this;
};
/**
 * 选择与全选
 */
Cart.prototype.selection = function(){
    var cart,selects;
    cart = this.cartModule;
    selects = $('.select');
    //给所有的选择框绑定事件
    selects
        .unbind('click')
        .on('click',function(event){
            event.stopPropagation();
            selectHandle( $(event.target),cart.find('.select') );
        });

    function selectHandle($target,allSelect){
        var all,selectNum,setNumPrice,selectPrice,getSelected;
        all = $('#all');
        selectNum = $('#selectNum');
        selectPrice = $('#selectPrice');
        //得到被选择的元素
        getSelected = function(){
            var selected;
            selected = $('#cart')
                .find('input[type="checkbox"]')
                .filter(function(index){
                    return $(this).prop('checked');
                });
            return selected;
        };
        //设置选择的数量和价格
        setNumPrice = function(){
            var selected,price;
            price = 0;
            //得到被选择的checkbox
            selected = getSelected();
            selectNum.html(selected.length);
            selected.each(function(index,elem){
                var parent = $(elem)
                    .parents('.c-item');
                price += parseFloat( parent
                    .find('.c-subtotal')
                    .html() );
            });
            selectPrice.html('￥'+price.toFixed(2));
        };

        //如果是全选
        if( typeof $target.attr('id') === 'string'){
            allSelect.each(function(index,select){
                var $select = $(select);
                if(all.prop('checked')){
                    $select.prop('checked',true);
                }else{
                    $select.prop('checked',false);
                }
            });

        }else{
            $target.attr('checked',!$target.attr('checked'));
            if(getSelected().length === cart.find('.c-item').length){
                all.prop('checked',true);
            }else{
                all.prop('checked',false);
            }
        }
        setNumPrice();


    }
    return this;
};
/**
 *  加减数量
 */
Cart.prototype.setNum = function(){
    var cart = this.cartModule;
    var add = cart.find('.add');
    var sub = cart.find('.sub');
    var num = cart.find('.num');
    add
        .unbind('click')
        .on('click',changeNum);
    sub
        .unbind('click')
        .on('click',changeNum);
    num
        .unbind('change')
        .on('change',function(event){
            var parent,data,$target;
            event.stopPropagation();
            $target = $(event.target);
            parent = $target.parents('.c-item');
            data = {};

            if(parent.attr('data-code')){
                data.gouwuchehao = parent.attr('data-code')
            }else{
                data.id = parent.attr('data-id')
            }
            data.num = $target.val() | 0;
            if(data.num <= 0){
                data.num = 1;
            }
            if(data.num > 0){
                ajaxObj.changeNum(data);
            }

        });

    function changeNum(event){
        event.stopPropagation();
        var $target,num,data,parent;
        data = {};
        $target = $(event.target);
        num = $target.siblings('.num');
        parent = $target.parents('.c-item');
        if($target.attr('class').indexOf('add') >= 0){
            data.num = (num.val() | 0) + 1;

        }else if($target.attr('class').indexOf('sub') >= 0){
            if( (num.val() | 0 ) >= 2){
                data.num = (num.val() | 0) - 1;
            }
        }

        if(parent.attr('data-code')){
            data.gouwuchehao = parent.attr('data-code')
        }else{
            data.id = parent.attr('data-id')
        }
        ajaxObj.changeNum(data);
    }
    return this;
};
/**
 * 立即结算
 */
Cart.prototype.pay = function(){
    var cart,parent,codeArr,idArr,submit,checked,search;
    cart = this.cartModule;
    codeArr = [];
    idArr = [];
    submit = $('#submit');

    submit.on('click',function(event){
        event.stopPropagation();
        //获取被选择的复选框
        checked = cart.find('input[type=checkbox]').filter(function(){
            return $(this).prop('checked');
        });

        if(checked.length <= 0){
        alert('请选择要结算的商品');
            return this
        }

        checked.each(function(index,item){
            parent = $(item).parents('.c-item');
            if(parent.attr('data-code')) {
                codeArr.push( "'" + parent.attr('data-code') + "'");
            }else if( parent.attr('data-id') ){
                idArr.push( "'" + parent.attr('data-id') +"'" );
            }
        });
        search = "cart="+codeArr+"&id="+idArr ;
        location.href = 'http://www.xiaoyu4.com/Single.aspx?m=sureOrder&'+search;
    });

    return this;
};
var ajaxObj = new Ajax();
var cartObj = new Cart();
cartObj
    .deleteItem()
    .selection()
    .setNum()
    .pay();




