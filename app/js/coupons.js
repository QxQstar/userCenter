/**
 * Created by Administrator on 2016/12/21.
 */
/**
 * ”≈ª›»Ø
 * @returns {Coupons}
 * @constructor
 */
function Coupons(){
    this.coupons = $('#coupons');
    return this;
}
/**
 *
 * @returns {Coupons}
 */
Coupons.prototype.getShortName = function(){
    var coupons,condition;
    coupons = this.coupons;
    condition = coupons.find('.condition');
    ajaxObj.getShortName(condition);
    return this;
};
var ajaxObj = new Ajax();
var couponsObj = new Coupons();
couponsObj
    .getShortName();