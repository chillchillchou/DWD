//submit comments

$(".s_text").keyup(function() {
    /*The val() method returns or sets the value attribute of the selected elements.*/
    /*set the value of text to the value of the input field*/
    if(event.keyCode == 13){


    var text = $(".s_text").val();

    //The return statement stops the execution of a function and returns a value from that function.
    /*retrun if text doesn't have a value*/
    if (text == "") {
        return;
    }
    /**/
    /*generate streaming text and assign it to var lable*/
    var _lable = $("<div style='right:20px;top:0px;opacity:1;color:" + getRandomColor() + ";'>" + text + "</div>");
    /*add lable to mask and show all hidden p elements*/
    $(".mask").append(_lable.show());
    //执行init_barrage();动作
    init_barrage();
    $(".s_text").val('');
  }
})

//initialize barrage
function init_barrage() {

    var _top = 0;
    /*loop through every div in mask*/
    $(".mask div").show().each(function() {
        /*$(window).width()获取当前窗口的宽度(不包含滚动条)减去字体的宽*/
        var _left = $(window).width() - $(this).width();
        //maximam window height
        var _height = $(window).height();
        _top += 75;
        if (_top >= (_height - 130)) {
            _top = 0;
        }
        /*将css中left、top、color转换为jquery对象*/
        //turned css to jquery object?
        $(this).css({
            left: _left,
            top: _top,
            color: getRandomColor()
        });
        //pop out texts in given time intervel
        var time = 20000;
        /*idnex()方法返回指定元素相对于其他指定元素的index位置 index()除以2余数为0*/
        if ($(this).index() % 2 == 0) {
            /*则时间为15000*/
            time = 25000;
        }
        /*animate()方法执行css属性集的自定义动画。*/
        $(this).animate({
            left: "-" + _left + "px"
        },
        time,
        function() {
            /*remove()方法移除被选元素，包括所有的文本和子节点*/
            $(this).remove();
        });
    });
}
//获取随机颜色
function getRandomColor() {
    return '#' + (function(h) {
        return new Array(7 - h.length).join("0") + h;
    })((Math.random() * 0x1000000 << 0).toString(16));
}
