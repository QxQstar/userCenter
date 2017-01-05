/**
 * Created by Administrator on 2016/8/6.
 */
var untilEvent = {
    addEvent:function(element,type,hander){
        if(element.addEventListener){
            element.addEventListener(type,hander,false);
        }else if(element.attachEvent){
            element.attachEvent('on'+type,hander);
        }else{
            element['on'+type] = hander;
        }
    },
    removeEvent:function(element,type,hander){
        if(element.removeEventListener){
            element.removeEventListener(type,hander,false);
        }else if(element.detachEvent){
            element.detachEvent("on" + type,hander);
        }else{
            element['on'+type] = null;
        }
    },
    getEvent:function(event){
        return event?event:window.event;
    },
    getTarget:function(event){
        return event.target||event.srcElement;
    },
    getRelated:function(event){
        if(event.relatedTarget){
            return event.relatedTarget;
        }else if(event.toElement){
            return event.toElement;
        }else if(event.fromElement){
            return event.fromElement;
        }else{
            return null;
        }
    }

};
function getOuter(){
    var outer = document.getElementById('outer');
    untilEvent.addEvent(outer,'mouseover',callBackOver);
    untilEvent.addEvent(outer,'mouseout',callBackOut);
}
function callBackOut(event){
    var event = untilEvent.getEvent(event);
    var relatedTarget = untilEvent.getRelated(event);
    var outerList1 = document.getElementById('outerList1');
    var inter1 = document.getElementById('inter1');
    var outerList2 = document.getElementById('outerList2');
    var inter2 = document.getElementById('inter2');
    var flag1 = false,flag2 = false;
    if(relatedTarget !== null){
        var parented = relatedTarget.parentNode;
        do{
            if(parented === outerList1 || relatedTarget === outerList1){
                flag1 = true;
                break;
            }else if(parented === outerList2 || relatedTarget === outerList2){
                flag2 = true;
                break;
            }else{
                parented = parented.parentNode;
            }
        }while(parented !== null);
    }
    if(!flag1){
        $(inter1).animate({height:'0px'},10);
    }
    if(!flag2){
        $(inter2).animate({height:'0px'},10);
    }
}
function callBackOver(event){
    var totalHeight = 170;
    var event = untilEvent.getEvent(event);
    var target = untilEvent.getTarget(event);
    var inter1 = document.getElementById('inter1');
    var inter2 = document.getElementById('inter2');
    if(target.id == 'outerList1' || target.id == "link1"){
        $(inter1).animate({height:totalHeight + "px"},300);
    }
    if(target.id == 'outerList2' || target.id == 'link2'){
        $(inter2).animate({height:totalHeight + 'px'},300);
    }
}
//鼠标移入‘个人中心’或者‘购物车’
function MouseEnter(){
    var cart,cartMenu,items,height,center,centerMenu,head;
    head = $('#header');
    cart = head.find('#cartMenu');
    center = head.find('#center');
    if(cart.length < 1 || center.length < 1 )
        return;
    cartMenu = cart.find('.cart-menu');
    centerMenu = center.find('.center-menu');
    items = cartMenu.find('.c-item');
    if(items.length <= 3){
        height = items.eq(0).outerHeight() * items.length;
    }else{
        height = items.eq(0).outerHeight() * 3 + 50;
    }
    cart
        .unbind('hover')
        .hover(function(){
            cartMenu.height(height);
        },function(){
            cartMenu.height(0);
        });
    center
        .unbind('hover')
        .hover(function(){
            centerMenu.height('auto');
        },function(){
            centerMenu.height(0);
        });

}
//在购物车的下拉列表中删除
function cartDelete (){
    var cart,items;
    cart = $('#header').find('#cartMenu');
    if(cart.length < 1)
        return ;
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
}

//判断购物车是否为空
function checkCart(){
    var cart,num;
    cart = $('#header').find('#cartMenu');
    if(cart.find('.cart-menu').children().length <= 1){
        cart.find('.empty').show();

    }else{
        cart.find('.haveGoods').show();
        num = cart.find('.shuliang');
        ajaxObj.getNum(num);
    }
}
untilEvent.addEvent(window,'load',cartDelete);
untilEvent.addEvent(window,'load',MouseEnter);
untilEvent.addEvent(window,'load',checkCart);
untilEvent.addEvent(window,'load',getOuter);
var ajaxObj = new Ajax();