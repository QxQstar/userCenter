/**
 * Created by Administrator on 2016/12/14.
 */

/**
 * ajax��
 * @constructor
 */
function Ajax(){

}
/**
 * �ڹ��ﳵ��ɾ��
 * @param data ���ﳵ�Ż���id ����
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
 * ��������
 */
Ajax.prototype.detail = function(data){
    var me = this;
    $.ajax({
        type:'post',
        url:'/pw/index.php/api/cart/detailData',
        data:data,
        dataType:'json',
        success:function(result){
            if(result.status){

                var html,num,price,container,preview;
                container = $('#container');
                var mask = $('<div class="f-mask" id="maskDetail"></div>');

                html = '<div class="m-ordDetail" id="ordDetail">' +
                            '<span class="f-maskDelate" id="delete">'+
                            '</span>'+
                            '<div class="m-head f-clearfix">'+
                                '<div class="title f-float-l">'+
                                    ' ��ѡӡͼ' +
                                    '<span class="preview" id="preview">Ԥ��</span>'+
                                '</div>'+
                                '<div class="f-float-r total">'+
                                        'С�ƣ�<span class="num" id="num">4</span>����Ʒ����'+
                                        '<span class="price" id="price"></span>'+
                                '</div>'+
                            '</div>'+
                            '<p class="m-footer">'+
                                '֧������ӡͼ�Ͷ��ͼ�����'+
                                '<br>'+
                                'ӡͼʵ���ǽ�����ɫ��ͼ��ֻ��Ϊ�˷����ʶ������ʵ����ɫΪ׼'+
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
                                        '<p class="num"> ����:'+cur.shuliang+'</p>' +
                                        '<p class="subtotal">����:��'+parseFloat(cur.danjia).toFixed(2)+'</p>' +
                                    '</div>' +
                                '</div>' +
                                '<div class="f-pm-0 col-md-2 col-sm-2 subtotal">��'+parseFloat(cur.xiaoji).toFixed(2)+'</div>' +
                            '</li>';

                    price = ( parseFloat(price) + parseFloat( cur.xiaoji ) ).toFixed(2);

                });
                ul.html(html);
                num = mask.find('#num');
                num.html(result.data.length);
                mask.find('#price').html(price);
                container.append(mask);
                //��Ԥ�����¼�
                preview = mask.find('#preview');
                preview.on('click',function(event){
                    event.stopPropagation();
                    me.preview(data);
                });
            }
        }
    });
};
/**
 * ���ﳵ�мӼ�����
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
/**
 * ����Ĭ�ϵ�ַ
 * @param data
 */
Ajax.prototype.setAdd = function (data) {
    $.ajax({
        type:'post',
        url:'/pw/index.php/api/message/setadd',
        data:data,
        dataType:'json',
        success:function(result){
            if(result.status){
                alert(result.msg);
                location.reload();
            }
        }
    });
};
/**
 * ɾ����ַ
 * @param data
 */
Ajax.prototype.deleteAdd = function (data) {
    $.ajax({
        type:'post',
        url:'/pw/index.php/api/message/deleteadd',
        data:data,
        dataType:'json',
        success:function(result){
            if(result.status){
                alert(result.msg);
                location.reload();
            }
        }
    });
};
/**
 *  ����µ�ַ
 * @param data �µ�ַ������ һ������
 */
Ajax.prototype.newAdd = function(data){
    $.ajax({
        type:'post',
        url:'/pw/index.php/api/message/insertadd',
        data:data,
        dataType:'json',
        success:function(result){
            if(result.status){
                alert(result.msg);
                location.reload();
            }
        }
    });
};
/**
 * �޸�����
 * @param data
 */
Ajax.prototype.updateMessage = function(data){
    $.ajax({
        type:'post',
        url:'/pw/index.php/api/message/setuser',
        data:data,
        dataType:'json',
        success:function(result){
            if(result.status){
                location.href = result.data;
            }
        }
    });
};
/**
 *  �����޸ĵ�ַ������
 * @param data ������̨������
 * @param addMask �༭��ַ�Ĵ���
 */
Ajax.prototype.editAdd = function(data,addMask){
    $.ajax({
        type:'post',
        url:'/pw/index.php/api/message/getadd',
        data:data,
        dataType:'json',
        success:function(result){
            if(result.status){
                var name,detail,tel;
                name = addMask.find('#name');
                detail = addMask.find('#detail');
                tel = addMask.find('#tel');
                name.val(result.data.shoujianrenxingming);
                detail.val(result.data.jiedaodizhi);
                tel.val(result.data.shoujihaoma);
                _init_area(result.data.suozaidiqu,"-");
                addMask.attr('data-id',result.data.id);
                addMask.show();
            }
        }
    });
};
/**
 * Ԥ��
 * @param data
 */
Ajax.prototype.preview = function(data){
    if(data.type === '���'){
        $.ajax({
            type:'post',
            url:'/pw/index.php/api/show/pics',
            data:{
                cart_code:data.gouwuchehao
            },
            dataType:'json',
            success:success
        });
    }else if(data.type ==='��Ʒ'){
        $.ajax({
            type:'post',
            url:'/pw/index.php/api/show/product',
            data:{
                cart_code:data.gouwuchehao
            },
            dataType:'json',
            success:success
        });
    }

    //����ɹ��Ļص�����
    function success(result) {
        if (result.status) {
            var previewBox, html,body,deleteNode,ratio;
            var maskDetail = $('#maskDetail');
            var mask = $('<div class="f-mask"></div>');

            html = '<div class="m-previewBox" id="previewBox">' +
                        '<span class="f-maskDelate" id="delete">' +
                        '</span>' +
                        '<div class="body">' +
                        '</div>' +
                '</div>';

            mask.html(html);
            previewBox = mask.find('#previewBox');
            body = mask.find('.body');
            html = "";
            if (data.type === '��Ʒ') {
                previewBox.addClass('m-previewBoxCP');
                previewBox.css({
                    'backgroundImage':"url("+result.data.bg+")",
                    'backgroundSize':'100% 100%'
                });
                $.each(result.data.data,function(index,item){
                    html += '<img ' +
                        'src="'+ item.z_img +
                        '" style="position: absolute;' +
                        'top:'+ item.y *567/335+'px;' +
                        'left:'+ item.x *567/335+'px; ' +
                        'height:'+ item.height/3 +'px;' +
                        'width:'+ item.width/3 +'px "/>';
                });

            } else if (data.type === '���') {
                previewBox.addClass('m-previewBoxXK');
                previewBox
                    .addClass('bg-'+ result.data.bg)
                    .width($(window).height() * 0.9 * result.data.ratio);
                //��ԭ�������ڵı���
                ratio = result.data.screen_height / ( $(window).height() * 0.9 );
                console.log(ratio);
                $.each(result.data.data,function(index,item){
                    console.log(item.m_x);

                    html+= '<div class="picGroup" style="top:'+ item.m_y / ratio +'px; left:'+ item.m_x /ratio +'px">'+
                                '<img class="frame" src="'+ item.pic_src +'" style="width:'+ item.pic_width / ratio +'px; height: '+ item.pic_height/ ratio+'px"/>'+
                                '<img class="pic" src="'+ item.ma_src +'"/>' +
                            '</div>'
                })

            }


            body.html(html);
            maskDetail.remove();
            $('#container').append(mask);
            deleteNode = mask.find('#delete');
            deleteNode.on('click',function(event){
                event.stopPropagation();
                mask.remove();
            });
        }else{

        }
    }
};
/**
 * �����˷�
 *  @param data ��ַ��id
 */
Ajax.prototype.getFlowMoney = function(data){
    $.ajax({
        type:'post',
        url:'/pw/index.php/api/so/luggage',
        data:data,
        dataType:'json',
        success:function(result){
           var flowMoney;
            if(result.status){
                flowMoney = $('#flowMoney');
                flowMoney.html('��' + parseFloat( result.data ).toFixed(2))
            }
        }
    });
};