/**
 * Created by Administrator on 2016/12/14.
 */

function Cart(){
    this.cartModule = $('#cart');

}
/**
 * ����С��
 */
Cart.prototype.setSubtotal = function(){
    var cart = this.cartModule;

    var cartItem = cart.find('.c-item');
    cartItem.each(function(index,elem){
        var $elem,subtotal,zpPrice,mainPrice,num;
        $elem = $(elem);
        subtotal = $elem.find('.c-subtotal');
        //��Ʒ�ļ۸�
        zpPrice = $elem.find('.zpPrice');
        //��Ʒ������
        num = $elem.find('.num').val();

        if(zpPrice.length > 0){
            zpPrice = parseFloat( zpPrice.html() );
        }else{
            zpPrice = 0;
        }

        mainPrice = parseFloat( $elem.find('.mainPrice').html() );
        subtotal.html( zpPrice + mainPrice*num );
    });
    return this
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
var ajaxObj = new Ajax();
var cartObj = new Cart();
/**
 * ѡ����ȫѡ
 */
Cart.prototype.selection = function(){
    var cart,selects;
    cart = this.cartModule;
    selects = $('.select');
    //�����е�ѡ�����¼�
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
        //�õ���ѡ���Ԫ��
        getSelected = function(){
            var selected;
            selected = $('#cart')
                .find('input[type="checkbox"]')
                .filter(function(index){
                    return $(this).prop('checked');
                });
            return selected;
        };
        //����ѡ��������ͼ۸�
        setNumPrice = function(){
            var selected,price;
            price = 0;
            //�õ���ѡ���checkbox
            selected = getSelected();
            selectNum.html(selected.length);
            selected.each(function(index,elem){
                var parent = $(elem)
                    .parents('.c-item');
                price += parseFloat( parent
                    .find('.c-subtotal')
                    .html() );
            });
            selectPrice.html('��'+price);
        };

        //�����ȫѡ
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
cartObj
    .setSubtotal()
    .deleteItem()
    .selection()
    .setNum();




