
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
    var i, s = t(e), n = this._getInst(s[0]);
    this._get(n, "gotoCurrent") && n.currentDay ? (n.selectedDay = n.currentDay,
        n.drawMonth = n.selectedMonth = n.currentMonth,
        n.drawYear = n.selectedYear = n.currentYear) : (i = new Date,
        n.selectedDay = i.getDate(),
        n.drawMonth = n.selectedMonth = i.getMonth(),
        n.drawYear = n.selectedYear = i.getFullYear()),
        this._notifyChange(n),
        this._adjustDate(s)
}

var headerHtml = $("#material-header-holder .ui-datepicker-material-header");

var changeMaterialHeader = function(header, date) {
    console.log(date)
    var year   = date.format('YYYY');
    console.log(year)
    var month  = date.format('MMM');
    var dayNum = date.format('D');
    var isoDay = date.isoWeekday();

    var weekday = [ '星期一', '星期二', '星期三', '星期四', '星期五', '星期六','星期日'];

    $('.ui-datepicker-material-day', header).text(weekday[isoDay]);
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

$("input[data-type='date']").on("focus", function() {
    //var date;
    //if (this.value == "") {
    //  date = moment();
    //} else {
    //  date = moment(this.value, 'MM/DD/YYYY');
    //}

    $(".ui-datepicker").prepend(headerHtml);
    //$(this).datepicker._selectDate(this, date);
});

var datepickers = $("input[data-type='date']").datepicker({
    showButtonPanel: true,
    closeText: '确定',
    defaultDate: new Date(),
    onSelect: function(date, inst) {
        changeMaterialHeader(headerHtml, moment(date, 'YYYY-MM-DD'));
    }
});
console.log(datepickers);
changeMaterialHeader(headerHtml, moment());
$('input').datepicker('show');
$(".ui-state-highlight").addClass("ui-state-active");

//汉化

/**
 *
 */
