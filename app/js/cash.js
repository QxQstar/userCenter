/**
 * Created by Administrator on 2016/12/22.
 */
function Cash(){
    this.recharge = $('#recharge');
}
/**
 * ������ֵ����ť���¼�
 * @returns {Cash}
 */
Cash.prototype.init = function(){
    var chongzhi,recharge,maskDelate;
    recharge = this.recharge;
    chongzhi = $('#chongzhi');
    maskDelate = recharge.find('#maskDelate');
    chongzhi
        .unbind('click')
        .on('click',function(event){
            event.preventDefault();
            event.stopPropagation();
            recharge.show();
        });
    maskDelate
        .unbind('click')
        .on('click',function(event){
            event.preventDefault();
            event.stopPropagation();
            recharge.hide();
        });
    return this;
};
/**
 *  �л�ѡ�
 * @returns {Cash}
 */
Cash.prototype.tabSelect = function(){
    $('#myTab a').click(function (e) {
        e.preventDefault();
        $(this).tab('show')
    });
    return this;
};
var cashObj = new Cash();
    cashObj
        .init()
        .tabSelect();
