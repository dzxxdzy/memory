const store = ["picture/草莓A.png", "picture/橙子A.png", "picture/梨子B.png", "picture/芒果.png", "picture/苹果A.png", "picture/葡萄A.png", "picture/香蕉A.png", "picture/樱桃.png", "picture/蛇果.png", "picture/榴莲.png"];
var temp = []; //临时翻牌数组
var ranking = []; //排行榜
var timerV; //计时器
var num = 0; //计时点
var already = 0;
var INIT_NUM = 10;
$(function() {
        $("#elementTable").html('<img style="height:150px;width:150px;"   src="picture/babysbreath.jpg"  >');
    })
    /**
     * 1、打乱数组元素顺序，使每次生成的元素位置都不一样
     * 2、遍历节点生成4x5表格
     */
function production() {
    if (typeof timerV !== 'undefined') {
        console.log(timerV)
        $("#timer").html(0 + "秒");
        num = 0
        clearInterval(timerV)
    }

    var eleArray = store.concat(store);
    for (let i = 0; i < 10; i++) {
        let index1 = randomNum(),
            index2 = randomNum();
        eleArray[index1] = eleArray.splice(index2, 1, eleArray[index1])[0];
    }

    var vhtml = "";
    $.each(eleArray, function(i, e) {
        if (i == 0 || (i % 4) == 0) {
            vhtml += '<tr>' +
                '<td onClick="deal(this)" class="daimond" attaData="' + e + '" >' +
                '<img style="height:150px;width:150px;display:none"  src="' + e + ' ">' +
                '<img style="height:150px;width:150px;"   src="picture/babysbreath.jpg"  >' +
                '</td>';

        } else if (((i + 1) % 4) == 0) {
            vhtml += '<td onClick="deal(this)" class="daimond" attaData="' + e + '" >' +
                '<img style="height:150px;width:150px;display:none" src=" ' + e + ' ">' +
                '<img  style="height:150px;width:150px;"  src="picture/babysbreath.jpg" >' +
                '</td>' +
                '</tr>';

        } else {
            vhtml += '<td onClick="deal(this)" class="daimond" attaData="' + e + '" >' +
                '<img style="height:150px;width:150px;display:none"  src=" ' + e + ' ">' +
                '<img  style="height:150px;width:150px;"  src="picture/babysbreath.jpg" >' +
                '</td>';
        }
    })

    $("#elementTable").html(vhtml);
    timerV = timer();
}


function gameStart() {
    production();
}
/**
 * 点击水果牌点击事件
 * @param obj:javaScript this
 */
function deal(obj) {
    var mThis = $(obj);
    if (mThis.children(":first").is(":hidden")) {
        if (temp.length == 0) {
            temp.push(mThis);
            mThis.find("img").toggle();
        } else if (temp.length == 1) {
            var oneThis = temp[0];
            temp.push(mThis);
            mThis.find("img").toggle();
            //展示结果一秒
            setTimeout(function() {
                if (oneThis.attr("attaData") != mThis.attr("attaData")) {
                    mThis.find("img").toggle();
                    oneThis.find("img").toggle();
                } else {
                    already++;
                }
                temp.pop(); //清空临时数组元素
                temp.shift(); //清空临时数组元素
                //完成了
                if (already == INIT_NUM) {
                    ranking.push(num);
                    num = 0; //重新初始化
                    already = 0; //重新初始化
                    clearInterval(timerV); //定时器清除;
                    ranking.sort();
                    let mhtml = "";
                    $.each(ranking, function(i, e) {
                        mhtml += '<p><strong>' + (i + 1) + '. ' + e + "秒" + '</strong></p>';
                    })
                    if (confirm('是否需要升级难度？')) {
                        for (let index = 0; index < 4; index++) {
                            store.push(store[Math.floor(Math.random() * store.length)])
                        }
                        INIT_NUM += 4
                    }
                    if (confirm('是否继续游戏？')) {
                        production();
                    }

                    $("#ranking span").after(mhtml);
                }
            }, 1000);
        }
    }


}
/**
 * 生成随机数
 * @param x:上限 ，y:下限
 */
function randomNum(x, y) {
    var x_upper = x,
        y_down = y;
    if (typeof(x_upper) == "undefined") {
        var x_upper = 19; //最少元素为10*2个
    }
    if (typeof(y_down) == "undefined") {
        var y_down = 0;
    }
    var rand = parseInt(Math.random() * (x_upper - y_down + 1) + y_down);
    return rand;
}
/**
 * 计时器
 * clearInterval(timerV);//定时器清除;
 */
function timer() {
    var timerV = setInterval(function() {
        num++;
        $("#timer").html(num + "秒");
    }, 1000);

    return timerV;
}