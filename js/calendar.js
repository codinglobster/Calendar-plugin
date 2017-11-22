
//---------------------------汉化------------------------------------
$.datepicker.regional['zh-CN'] = {
    closeText: '关闭',
    prevText: '<上月',
    nextText: '下月>',
    currentText: '今天',
    monthNames: ['一月', '二月', '三月', '四月', '五月', '六月',
        '七月', '八月', '九月', '十月', '十一月', '十二月'],
    monthNamesShort: ['一', '二', '三', '四', '五', '六',
        '七', '八', '九', '十', '十一', '十二'],
    dayNames: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
    dayNamesShort: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
    dayNamesMin: ['日', '一', '二', '三', '四', '五', '六'],
    weekHeader: '周',
    dateFormat: 'yy-mm-dd',
    firstDay: 1,
    isRTL: false,
    showMonthAfterYear: true,
    yearSuffix: '年'
};
$.datepicker.setDefaults($.datepicker.regional['zh-CN']);
//------------------------汉化结束-------------------------------------
//-------------------------重写今天方法--------------------------------
$.datepicker._gotoToday = function(e) {
    $('#destDiv').datepicker( "setDate", new Date());
    changeMaterialHeader(headerHtml, moment());
    $(".ui-datepicker").prepend(headerHtml);
}
$.datepicker._hideDatepicker = function(e) {

}

var headerHtml = $("#material-header-holder .ui-datepicker-material-header");

var changeMaterialHeader = function(header, date) {
    var year   = date.format('YYYY');
    var month  = date.format('MMM');
    var dayNum = date.format('D');
    var isoDay = date.isoWeekday();

    var weekday = [ '星期日','星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];

    $('.ui-datepicker-material-day', header).text(weekday[isoDay]);//在header中查询day
    $('.ui-datepicker-material-year', header).text(year);
    $('.ui-datepicker-material-month', header).text(month);
    $('.ui-datepicker-material-day-num', header).text(dayNum);
};

$.datepicker._selectDateOverload = $.datepicker._selectDate;
$.datepicker._selectDate = function(id, dateStr) {
    var target = $(id);
    var inst = this._getInst(target[0]);
    inst.inline = true;
    $.datepicker._selectDateOverload(id, dateStr);
    inst.inline = false;
    this._updateDatepicker(inst);
    headerHtml.remove();
    $(".ui-datepicker").prepend(headerHtml);
};

var datepickers = $('#destDiv').datepicker({
    showButtonPanel: true,
    closeText: '确定',
    defaultDate: new Date(),
    onSelect: function(date, inst) {
        changeMaterialHeader(headerHtml, moment(date, 'YYYY-MM-DD'));
    }
});

$(".ui-state-highlight").addClass("ui-state-active");
changeMaterialHeader(headerHtml, moment());//初始化顶部数据
$(".ui-datepicker").prepend(headerHtml);//将html插入头部，使样式能够生效
$('#destDiv').datepicker('show');//显示选择器

$(".content-img").on('click',function(e){
    var parentDiv = $(this).parents('.text-content');
    parentDiv.toggleClass('inverse');
})
$(".turn-back").on('click',function(e){
    var parentDiv = $(this).parents('.text-content');
    parentDiv.toggleClass('inverse');
})
//$('#destDiv').on("focus", function() {
//     $(".ui-datepicker").prepend(headerHtml);
// });