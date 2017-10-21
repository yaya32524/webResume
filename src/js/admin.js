var lo=true;
$(".menu-list li:eq(0) span").click(function(){
    if(lo){
        $(this).next().height("156px");
    }else{
        $(this).next().height("0px");
    }
    lo=!lo;
});

$(".basic-info-box:eq(0) input,.basic-info-box:eq(0) textarea").attr("disabled","true");
$(".menu-list li:gt(0)").click(function(){
    $(".menu-list li:gt(0)").css({background:""})
    $(this).css({background:"#337ab7"});
});
$(".menu-list .info li").click(function(){
    g=true;
    $(".info-box input,.info-box textarea").attr("disabled","true");
    $(".basic-info-box:eq(0)").show().siblings(".basic-info-box").hide();
    $(".info-box").eq($(this).index()).show().siblings(".info-box").hide();
});
$(".menu-list>li:gt(0)").click(function(){
    g=true;
    $(".info-box input,.info-box textarea").attr("disabled","true");
    $(".basic-info-box:eq(0)").show().siblings(".basic-info-box").hide();
    $(".info-box").eq($(this).index()+3).show().siblings(".info-box").hide();
});
var g=true;
$(".basic-info-box .update").click(function(){
    if(g){
        $(this).css({background:"#ccc"}).next().removeAttr("disabled").css({background:"#337ab7"});
        $(".info-box input,.info-box textarea").removeAttr("disabled");
    }else{
        $(".info-box input,.info-box textarea").attr("disabled","true");
        $(this).css({background:"#337ab7"}).next().attr("disabled","true").css({background:"#ccc"});
    }
    g=!g;
});
$(".menu-list>li:gt(3)").click(function(){
    console.log($(this).index())
    $(".basic-info-box").eq($(this).index()-3).show().siblings(".basic-info-box").hide();
});
var addbtn=document.querySelectorAll(".addbtn");

for(var i=0;i<addbtn.length;i++){
    addbtn[i].index=i;
    addbtn[i].onclick=function(){
        $(".info-list").hide();
        if(this.index==0){
            this.parentNode.parentNode.setAttribute("action","/upweb");
        }else{
            this.parentNode.parentNode.setAttribute("action","/upexperience");
        }
        $(".info-list").eq(this.index).show().find("input").val("");
        $(".info-list input,.info-list textarea").removeAttr("disabled");
    }
}

$(".closebtn").click(function(){
    $(this).parent().parent().hide(); 
});
$(".info-list .sub").css({background:"#337ab7"}).removeAttr("disabled");
$(".info-list .sub").click(function(){
    if($(this).parents(".info-list").find("input:text").val()==""){
        alert("请输入内容！");
        return false;
    }
});

$(".del").click(function(){
    var _this=$(this);
    var k=_this.parents("tr").attr("liid");
    var urls=_this.parents("table").attr("id");
    $.ajax({
        type:"get",
        url:"/"+urls+"?_id="+k,
        async:true,
        success:function(msg){
            if(msg.msg==1){
               _this.parents("tr").remove();
            }
        }
    });
});
$(".modify").click(function(){
    $(this).parents('table').next().show();
    var url="/"+$(this).parents("table").attr("id")+"?_id="+$(this).parents("tr").attr("liid"); 
    $(this).parents('form').attr("action",url);
    $(".info-list input,.info-list textarea").removeAttr("disabled");
    var obj= $(this).parents("table").next().find(".input-info");
    var objs=$(this).parent().siblings();
    update(obj,objs);
    
})
function update(obj,objs){
    if(obj.siblings(".input-info").length==5){
        obj[0].querySelector("input").value=objs[0].innerHTML;
        obj[1].querySelector("input").value=objs[1].innerHTML;
        obj[2].querySelector("input").value=objs[3].innerHTML;
        obj[3].querySelector("input").value=objs[4].innerHTML;
        // obj[4].querySelector("input").filename=objs[2].querySelector("img").getAttribute("src");
        var optionList=obj[3].querySelectorAll("option");
        for(var i=0;i<optionList.length;i++){
            if(optionList[i].innerHTML==objs[4].innerHTML){
                optionList[i].setAttribute("selected","selected");
            }
        }
    }else if(obj.siblings(".input-info").length==4){
        // obj[0].querySelector("input").value=objs[0].innerHTML;
       console.log(objs[0].innerHTML)
       console.log(objs[1].innerHTML)
       console.log(objs[2].innerHTML)
       console.log(objs[3].innerHTML)
        obj[1].querySelector("input").value=objs[0].innerHTML;
        obj[2].querySelector("input").value=objs[1].innerHTML;
        obj[3].querySelector("textarea").innerText=objs[3].innerHTML;
    }
}