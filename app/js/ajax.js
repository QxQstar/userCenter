/**
 * Created by Administrator on 2016/12/14.
 */

/**
 * ajax类
 * @constructor
 */
function Ajax(){

}
/**
 * 在购物车中删除
 * @param data 购物车号或者id 对象
 */
Ajax.prototype.cartDelete = function(data){

    $.ajax({
        type:'post',
        url:'/pw/index.php/api/cart/deleteData',
        data:data,
        dataType:'json',
        success:function(result){
            if(result.status){
                alert(result.msg);
                location.reload();
            }else{
                alert(result.msg);
            }
        }
    });
};
/**
 * 订单详情
 * @param data 购物车号或者id 对象
 */
Ajax.prototype.detail = function(data){
    $.ajax({
        type:'post',
        url:'/pw/index.php/api/cart/detailData',
        data:data,
        dataType:'json',
        success:function(result){
            if(result.status){

                var html,num,price,container;
                container = $('#container');
                var mask = $('<div class="f-mask"></div>');

                html = '<div class="m-ordDetail" id="ordDetail">' +
                            '<span class="f-maskDelate" id="delete">'+
                            '</span>'+
                            '<div class="m-head f-clearfix">'+
                                '<div class="title f-float-l">'+
                                    ' 已选印图' +
                                    '<span class="preview">预览</span>'+
                                '</div>'+
                                '<div class="f-float-r total">'+
                                        '小计（<span class="num" id="num">4</span>件商品）：'+
                                        '<span class="price" id="price"></span>'+
                                '</div>'+
                            '</div>'+
                            '<p class="m-footer">'+
                                '支持两面印图和多个图案组合'+
                                '<br>'+
                                '印图实际是金属颜色，图中只是为了方便辨识，请以实物颜色为准'+
                            '</p>'+
                        '</div>';

                mask.html(html);
                mask
                    .find('#delete')
                    .on('click',function(event){
                        $(event.target).unbind('click');
                        mask.remove();
                    });
                var ul = $('<ul class="container m-details"></ul>');
                mask
                    .find('.m-head')
                    .after(ul);
                html = '';
                price = 0;
                $.each(result.data,function(index,cur){
                    html += '<li class="row c-item">' +
                                '<div class="f-pm-0 col-md-10 col-sm-10 f-clearfix">' +
                                    '<div class="img f-float-l">' +
                                        '<img src="'+ cur.thumb +'"/>' +
                                    '</div>' +
                                    '<div class="desc f-float-l">' +
                                        '<p class="name">'+ cur.biaoti +'</p>' +
                                        '<p class="num"> 数量:'+cur.shuliang+'</p>' +
                                        '<p class="subtotal">单价:￥'+cur.danjia+'</p>' +
                                    '</div>' +
                                '</div>' +
                                '<div class="f-pm-0 col-md-2 col-sm-2 subtotal">￥'+cur.xiaoji+'</div>' +
                            '</li>';

                    price = ( parseFloat(price) + parseFloat( cur.xiaoji ) ).toFixed(2);

                });
                ul.html(html);
                num = mask.find('#num');
                num.html(result.data.length);
                mask.find('#price').html(price);
                container.append(mask);
            }else{

            }
        }
    });
};
/**
 * 购物车中加减数量
 * @param data
 */
Ajax.prototype.changeNum = function(data){
    $.ajax({
        type:'post',
        url:'/pw/index.php/api/cart/changeNum',
        data:data,
        dataType:'json',
        success:function(result){
            if(result.status){
                location.reload();
            }
        }
    });
};