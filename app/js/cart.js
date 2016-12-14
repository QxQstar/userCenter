/**
 * Created by Administrator on 2016/12/14.
 */
//加载后就要执行的操作
(function(){
    //发送ajax的对象
    var ajaxObj = new Ajax();


    //计算单笔订单的总价并且为删除绑定事件
    var cart = $('#cart');
    var cartItem = cart.find('.c-item');
    cartItem.each(function(index,elem){
        var $elem,subtotal,zpPrice,mainPrice,deleteNode;
        $elem = $(elem);
        subtotal = $elem.find('.c-subtotal');
        zpPrice = $elem.find('.zpPrice');
        if(zpPrice.length > 0){
            zpPrice = parseFloat( zpPrice.html() );
        }else{
            zpPrice = 0;
        }
        mainPrice = parseFloat( $elem.find('.mainPrice').html() );
        subtotal.html( zpPrice + mainPrice );
        deleteNode = $elem.find('.delete');
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

    //加或者减
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
            var timer,parent,data,$target;
            event.stopPropagation();
            $target = $(event.target);
            parent = $target.parents('.c-item');
            data = {};

            clearTimeout(timer);

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
        var $target,num,timer,data,parent;
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





    //选择
    var select  =  $('.select');
    select
        .unbind('click')
        .on('click',function(event){
            event.stopPropagation();
            selectHandle( $(event.target),cart.find('input[type="checkbox"]') );
        });
    /**
     * 实现选择的操作
     * @param $target 被点击的选择框 jquery对象
     * $param allSelect cart中所有的选择框不包括全选 jquery对象
     */
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
        //设置被选择的数量和价格
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
            selectPrice.html('￥'+price);
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
            if(getSelected().length === $('#cart').find('.c-item').length){
                all.prop('checked',true);
            }else{
                all.prop('checked',false);
            }
        }
        setNumPrice();


    }
})();



