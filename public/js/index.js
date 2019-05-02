$click = $(".click");
click2 = document.getElementsByClassName("click")[0];
$bubble = $(".bubble");
bool = 1;
Bool = 1;
time = 0;
counter = 0;
height = $('.flag').offset().top;//末位置
height_end = $('.flag_g').offset().top;//初位置
distance_all = (height - height_end) / 15;


$("header span").click(function () {
    history.go(-1);
});

$("#up").on('click', function (e) {
    e.stopPropagation();
    e.preventDefault();
    $('html, body').animate({scrollTop: 0}, 'slow');
});


function timedCount() {
    time += 0.1;
    setTimeout("timedCount()", 100);
}

function stopCount() {
    clearTimeout(time);
}

// click2.addEventListener("touchstart",function(){
function chan() {
    var img = $(".flag");
    //    if(toBack)clearTimeout(toBack);
    if (Bool) {
        if (bool) {
            bool = 0;
            timedCount();
        }

        if (height <= height_end) {
            height = height_end;
            Bool = 0;
            stopCount();
            //            $('.button_img').attr('src','img/button2.png');
            //			$bubble.fadeIn(1000);
        } else {
            height -= distance_all;
        }
        if (!Bool) {
            // alert(time);
            $.ajax({
                type: "POST",
                url: nat_url = '/ajax/upload',
                data: {
                    stu_name: "匿名",
                    used_time: time
                },
                dataType: null,
                success: function (data) {
                    if (data.status == 201) {
                        $(".name").html(data.all);
                        $(".rank").html(data.rank);
                        $(".time").html(time.toFixed(2));
                        $bubble.fadeIn(1000);
                        $('.button_img').attr('src', 'img/button2.png');
//                        $('.button_img').click(function(){
                        if (!Bool) $('.show').css('display', 'block');
//                        })
                    } else {
                        alert("网络异常，请稍后重试。");
                    }
                }
            });
        }

        function upFlag() {
            var nowTop = img.offset().top;//现在所处的位置
            var endTop = height;//最终位置
            var distance = (nowTop - endTop);//现在位置到终点的距离
            if (distance > 0.1) {
                img.offset(function (index, current) {
                    return {left: current.left, top: current.top - distance / 10};
                });
                toBack = setTimeout(upFlag, 20);
            } else {
                img.offset(function (index, current) {
                    return {left: current.left, top: endTop};
                });
            }
        }

        upFlag();
        counter += 1;
        //		$flag.animate({top:height},{queue:false},100);//show
    }
}

// )
if (window.navigator.msPointerEnabled) {
    /*Events for IE only*/
    click2.addEventListener("MSPointerOver", function () {
        /*Add mouse over event for touch*/
        chan();
    });
} else {
    click2.addEventListener("touchstart", function () {
        chan();
    });
}