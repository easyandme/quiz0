$(function() {
  "use strict";

var n = 1,
    questions,
    playing = false,
    s = 0,
    w, fs,
    u = 0,
    k,
    l = 0,
    m = 0,
    z = 0,
    r = 0,
    qar = [];

function firstSong() {
      questions = qar;
      w = Math.floor((Math.random()*(questions.length)));
      k = questions[w];
      questions.splice(w, 1);
      $("#welcome").addClass("bounceOutUp animatedFast");
      setTimeout(function(){
        $("#welcome").detach();
        $("#randomize").fadeIn(350);
      }, 350);
      setTimeout(function(){
        $("#randomize").fadeOut(1650);
      }, 1350);
      setTimeout(function(){
      $("#start").prepend(p.t);
      $("#progressbar").fadeIn(3000);
      $(".questions").css("visibility", "visible").addClass("bounceInUp animated");
      $(".questionDes").html(k.describe).append(k.music, k.playButton);
      $("#choiceA").text(k.A.describe);
      $("#choiceB").text(k.B.describe);
      $("#choiceC").text(k.C.describe);
      $(".questions").append(k.passButton);
      document.getElementById("song").play();
      document.getElementById("song").addEventListener("ended", function(){$("#button1").html("<b>再听一次</b>");playing = false;});
      playing = true;
    }, 3000);
  }

  $("#start_btn").on("click", function() {
      document.getElementById("start_audio").oncanplaythrough = firstSong();   
      document.getElementById("start_audio").play();
    });

  $("button.choice").on("click", function() {
      var d = $(this).attr("data-choice");
      if (k[d].score) {m = eval(k[d].score);r++} else if (k[d].straw) {fs = eval(k[d].straw); m = 0} else {m = 0};
      var y = k[d].bonus || 0;
      document.getElementById("song").pause();
      s = s + m;
      u = u + y;
      l = l + 10; 
      $("#progressbar>div").css("width", l + "%");
      $(".questions").removeClass("bounceInUp animated").addClass("bounceOutUp animatedFast");
      if (!$("body").hasClass("noHover")) {
        $("body").addClass("noHover");
      }; 
   setTimeout(
      function() {
    var a = Math.floor((Math.random()*(questions.length))),
        v = questions[a];
        k = v;
        questions.splice(a, 1);
        $(".questions").addClass("bounceInUp animated");
        $(".questionDes").html(v.describe).append(v.music, v.playButton);
        $("#choiceA").text(v.A.describe);
        $("#choiceB").text(v.B.describe);
        $("#choiceC").text(v.C.describe);
        document.getElementById("song").oncanplaythrough = document.getElementById("song").play();
        playing = true;
        document.getElementById("song").addEventListener("ended", function(){$("#button1").html("<b>再听一次</b>");playing = false;});
        n++;
        $(".notification").hide();
     if (n > 10) {   
        $(p.t).detach();
        document.title = "暴露年龄的不是脸，是它！听听看，你真的老了吗？"
      document.getElementById("song").pause();
      $("body").append(p.g, p.d);
      $("#finalScore").text(fs||s/r|0).prop("counter", 0).animate({
         counter: $("#finalScore").text()
      }, {
        duration: 2000,
        easing: "swing",
        step: function(now) {
            $(this).text(Math.ceil(now));
          }
      });
      if (u == 0) {$("#ptg").css("visibility", "hidden");setTimeout(function(){$("img[src='./images/tripleF.png']").show();}, 1500)} else if (u == 100){$("#ptg").css("visibility", "hidden");setTimeout(function(){$("img[src='./images/tripleA.png']").show();}, 1500)} else {
        setTimeout(function(){
          $("#percentage").text(u).prop("Counter", 0).animate({
         Counter: $("#percentage").text()
      }, {
        duration: 1000,
        easing: "swing",
        step: function(now) {
            $(this).text(Math.ceil(now));
          }
      })
      }, 500);
        $("#correctNumber").text(u/10);
        setTimeout(function(){$("#friend").css("visibility","visible")},1000);
}
      
      
      $("#restart").on("click", function(){
            $.getJSON("data/data.json", function(e){
            $.extend(questions, e)
            });
            n = 1;
            playing = false;
            s = 0;
            u = 0;
            l = 0;
            z = 0;
            r = 0;
            z = 0;
           fs = null;
            $(".roland, #ending, #dead_layer").addClass("bounceOut animated");
            setTimeout(function(){$("#ending, #dead_layer").detach();}, 350);
            $("#progressbar, #button2, .pass").remove();
            $(".questions").css("visibility", "hidden");
            document.getElementById("start_audio").play();
            firstSong();
         });
      $("#share").on("click", function(){
           $("#mask").css("display","block");
           $("#roland").css("display","none");
         });
      $("#mask").on("click", function(){
           $("#mask").css("display","none");
         });
     };

        $("body").removeClass("noHover"); 
      
       $("#pg").text(n - 1 + "/10");
    }, 200); 
});

/* Music Play */
$("body").on("click", "#button1", function() {
  var audio = document.getElementById("song");
  if (!audio.paused){playing = true};
  if (playing == false) {
    audio.oncanplaythrough = audio.play();
    playing = true;
    $("#button1").html("<b>暂停</b>");
  } else {
    audio.pause();
    playing = false;
    $("#button1").html("<b>点击播放</b>");
  }
  audio.addEventListener("ended", function(){$("#button1").html("<b>再听一次</b>");playing = false;});
});

/* PASS */
$("body").on("click", "#button2", function() {
        document.getElementById("song").pause();
        $(".questions").removeClass("bounceInUp animated").addClass("bounceOutUp animatedFast");
        setTimeout(function(){var a = Math.floor((Math.random()*(questions.length))),
        v = questions[a];
        k = v;
        questions.splice(a, 1);
        $(".questions").addClass("bounceInUp animated");
        $(".questionDes").html(v.describe).append(v.music, v.playButton);
        $("#choiceA").text(v.A.describe);
        $("#choiceB").text(v.B.describe);
        $("#choiceC").text(v.C.describe);
        document.getElementById("song").oncanplaythrough = document.getElementById("song").play();
        playing = true;
        z++;
         if (z > 9) {
        $(".pass").css("visibility", "hidden");
      } else if (z > 6 && z <= 9) {
        var x = 10 - z;
        $("#button2").html("<b>还剩</b>"+ x + "<b>次</b>").css({"color": "#D24F19", "font-size": "14px"});
      } else {
        $(".pass").fadeIn(300);
      }
}, 0);
});

setInterval(function(){
  $("#start_btn").removeClass("fadeInUp").toggleClass("shake");
}, 3000);
 

/*Hover Touch Exchange*/
$('body').bind('touchstart', function() {});
  FastClick.attach(document.body);

/*All the appending stuff*/
var p = {
  t: "<div hidden id='progressbar'><div><span id='pg'></span></div></div></div>",
  d: "<div id='friend'><p>合作伙伴：阿卡贝拉人声兄弟组合</p></div><div id='dead_layer'></div>",
  g: "<div class='roland bounceInDown animated'><div style='margin-left: 60px;margin-top:10px;'><p style='color: #fff;font-size: 12px;width: 100%;'>世界电声乐器领导品牌</p><img src='./images/roland.png'><p style='color: #fff;font-size: 12px;width: 100%;margin-top:42px;margin-left:0;'>友情赞助</p></div></div><div id='ending'><center><div class='bounceInDown animated' id='ptg'><div style='margin-top:6px;'>答对<span id='correctNumber'></span>题<br>暴露指数<br><span class='perc' id='percentage'></span><span class='perc'>%</span></div></div><img class='tri' hidden src='./images/tripleA.png'><img class='tri' hidden src='./images/tripleF.png'><p class='prologue bounceInDown animated' style='height:140px;background-color:#F2E436;text-align:center;margin-top:1em;'><span style='position: absolute;left: 10px;color: #000;font-family: microsoft yahei;font-size:1.2em;'>你暴露的年龄为</span><br><br><span id='finalScore'></span></p><button class='btn bounceInDown animatedDelayed' id='restart'>换歌再测一次</button><a href='http://mp.weixin.qq.com/s?__biz=MjM5NTE0NjEzOA==&mid=207591669&idx=1&sn=aff25f35d7dcdb78d917ba0c79102986#rd'><button class='btn bounceInDown animatedDelayed' id='story'>查看答案 +  抽奖</button></a><div class='bounceInDown animatedDelayed' style='width: 22em;margin-left: -4px;color: #ef8222; font-size: 12px; margin-top: 7px;font-weight: bold;'>奖品为BOSS限量复刻版鼠标、人声兄弟签名EP<br><span style='color:#CACACA'></span></div><a href='http://mp.weixin.qq.com/s?__biz=MjM5NTE0NjEzOA==&mid=207591669&idx=1&sn=aff25f35d7dcdb78d917ba0c79102986#rd'><div class='bounceInDown animatedDelayed' id='gifts'></div></a>"    
    };

  $.getJSON("data/data.json", function(e){
        $.extend(qar, e);
    });


});