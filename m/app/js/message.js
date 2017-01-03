$(function () {
    var ajaxObj = new Ajax();

    var setAdd = $(".m-address").find('.status');
    setAdd.on('click', function () {
        var id = $(this).parents('.f-clearfix').attr('data-id');
        var data = {
            'id':id
        };
        ajaxObj.setAdd(data);
    });

    var deleteAdd = $(".m-address").find('.delete');
    deleteAdd.on('click', function () {
        var id = $(this).parents('.f-clearfix').attr('data-id');
        var data = {
            'id':id
        };
        ajaxObj.deleteAdd(data);
    })
});
