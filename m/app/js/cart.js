/**
 * Created by Administrator on 2016/12/14.
 */

function Cart(){
    this.cartModule = $('#cart');

}
/**
 * ������ﳵ��Ϊ�գ�����ʾ�����ȫѡ
 * @returns {Cart}
 */
Cart.prototype.showAllSelect = function(){
    var all,footer;

    if(this.cartModule.children().length > 0){
        all = $('.all');
        footer = $('#footer');
        all.css('display','inline');
        footer.show();
    }else{
        $('#empty').show();
    }
    return this;
};
/**
 * ɾ��
 */
Cart.prototype.deleteItem = function(){
    var cart,items;
    cart = this.cartModule;
    items = cart.find('.c-item');
    items.each(function(index,item){
        var $elem,deleteNode;
        $elem = $(item);
        deleteNode = $elem.find('.delete');
        //��ɾ�����¼�
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
 * ѡ����ȫѡ
 */
Cart.prototype.selection = function(){
    var cart,selects,me;
    me = this;
    cart = me.cartModule;
    selects = $('.select');
    //�����е�ѡ�����¼�
    selects
        .unbind('click')
        .on('click',function(event){
            event.stopPropagation();
            selectHandle( $(this),cart.find('.select') );
        });

    function selectHandle($target,allSelect){
        var all,selectNum,selectPrice,prevSib;
        all = $('#all');
        selectNum = $('#selectNum');
        selectPrice = $('#selectPrice');
        prevSib = $($target.prev('span')[0]);
        prevSib.toggleClass('on');

        //�����ȫѡ
        if( typeof $target.attr('id') === 'string'){

            allSelect.each(function(index,select){
                var $select;
                $select = $(select);
                if(all.prop('checked')){
                    $select
                        .prop('checked',true)
                        .parents('.c-item')
                        .addClass('on');
                    $($select.prev()[0]).addClass('on');
                }else{
                    $select
                        .prop('checked',false)
                        .parents('.c-item')
                        .removeClass('on');
                    $($select.prev()[0]).removeClass('on');
                }
            });

        }else{

            $target.parents('.c-item').toggleClass('on');

            if(me.getSelected().length === cart.find('.c-item').length){
                all
                    .prop('checked',true);

                $(all.prev()[0]).addClass('on');


            }else{
                all.prop('checked',false);
                $(all.prev()[0]).removeClass('on');
            }
        }
        me.setNumPrice();


    }
    return this;
};
/**
 * ����ѡ��������ͼ۸�
 * @returns {Cart}
 */
Cart.prototype.setNumPrice = function(){
    var selected,price,selectPrice,selectNum;
    price = 0;
    selectPrice = $('#selectPrice');
    selectNum = $('#selectNum');
    //�õ���ѡ���checkbox
    selected = this.getSelected();
    selectNum.html(selected.length);
    selected.each(function(index,elem){
        var parent = $(elem)
            .parents('.c-item');
        price += parseFloat( parent
            .find('.c-subtotal')
            .html().replace('��',""));
    });
    selectPrice.html('��'+price.toFixed(2));
   return this;
};
/**
 * �õ���ѡ���Ԫ��
 * @returns {*|jQuery}
 */
Cart.prototype.getSelected = function(){
    var selected,cart;
    cart = this.cartModule;
    selected = cart
        .find('input[type="checkbox"]')
        .filter(function(){
            return $(this).prop('checked');
        });
    return selected;
};
/**
 *  �Ӽ�����
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
 * ��������
 */
Cart.prototype.pay = function(){
    var cart,parent,codeArr,idArr,submit,checked,search;
    cart = this.cartModule;
    codeArr = [];
    idArr = [];
    submit = $('#submit');

    submit.on('click',function(event){
        event.stopPropagation();
        //��ȡ��ѡ��ĸ�ѡ��
        checked = cart.find('input[type=checkbox]').filter(function(){
            return $(this).prop('checked');
        });

        if(checked.length <= 0){
        alert('��ѡ��Ҫ�������Ʒ');
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
    .showAllSelect()
    .setNumPrice()
    .deleteItem()
    .selection()
    .setNum()
    .pay();




