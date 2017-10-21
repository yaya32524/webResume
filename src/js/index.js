
var oNav = document.querySelector("nav");
window.onscroll = function () {
    if (window.scrollY <= 0 && document.documentElement.offsetWidth >= 768) {
        oNav.className = "nav-active";
    } else {
        oNav.className = "";
    }
};
var oNavBtns = document.querySelector(".nav-btns");
var oMenu = document.querySelector(".menu");
var look = true;
oNavBtns.onclick = function () {
    if (look) {
        oMenu.style.height = "240px";
    } else {
        oMenu.style.height = "0";
    }
    look = !look;
};

$("#sub-btn").click(function () {
    if($("#name,#email,#content").val()==""){
        $(".mon").show();
        $(".mon-content .prompt").text("请输入内容！");
    }else{
        $.ajax({
            type: "post",
            url: "/sendemail",
            data: { 
                "nickname": $("#name").val(),
                "useremail": $("#email").val(), 
                "content": $("#content").val()},
            async: true,
            success: function (msg) {
                if(msg.msg==1){
                    $(".mon").show();
                    $(".mon-content .prompt").text("发送成功！");
                    $("#name,#email,#content").val("");
                }
            }
        });
    }
    
});
$(".close").click(function(){
    $(".mon").hide();
});
$(".menu li").click(function(){

})
$(".down").click(function(){
    $("html,body").animate({"scrollTop": $("header").height()-$("nav").height()+"px"},800);

});
var menulis=document.querySelectorAll(".menu li");
menulis[0].onclick=function(){
    var heigth=$("header").height()-$("nav").height();
    moveScroll(heigth);
}
menulis[1].onclick=function(){
    var heigth=$("header").height()-$("nav").height()+$(".basic-info").outerHeight();
    moveScroll(heigth);
}
menulis[2].onclick=function(){
    var heigth=$("header").height()-$("nav").height()+$(".basic-info").outerHeight()+$(".project").outerHeight();
    moveScroll(heigth);
}
menulis[3].onclick=function(){
    var heigth=$("header").height()-$("nav").height()+$(".basic-info").outerHeight()+$(".project").outerHeight()+$(".skill").outerHeight()+$(".achievement").outerHeight();
    moveScroll(heigth);
}
menulis[4].onclick=function(){
    var heigth=$("header").height()-$("nav").height()+$(".basic-info").outerHeight()+$(".project").outerHeight()+$(".skill").outerHeight()+$(".achievement").outerHeight()+$(".history").outerHeight();
    moveScroll(heigth);
}
menulis[5].onclick=function(){
    var heigth=$("header").height()-$("nav").height()+$(".basic-info").outerHeight()+$(".project").outerHeight()+$(".skill").outerHeight()+$(".achievement").outerHeight()+$(".history").outerHeight()+$(".evaluate").outerHeight();
    moveScroll(heigth);
}
function moveScroll(movheight){
    $("html,body").animate({"scrollTop": movheight},1000);
}
$(".container>a").click(function(){
    moveScroll(0);
});

$(window).resize(function() {
    if($('body').innerWidth()>758){
        $('nav .menu').height(0);
    }
});
$(".evaluate .btns li").click(function(){
    $(this).addClass("active").siblings().removeClass("active");
    $(".intr-box ul").css({left:-($(this).index()*$(".intr-box ul li").width())});
});