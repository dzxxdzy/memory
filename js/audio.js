/*
 * muted 静音
 * autoplay 自动播放
 * loop 循环播放
 */
var audio = document.getElementById('myaudio');
var t1 = 3e3; //如果是轮询，这个时间必须大于音频的长度。如果是webscoket，应该设置一个状态play，避免重复播放，如下：
var t2 = 20 * 1000; //音频的长度，确保能够完整的播放给用户
var play = false;
var tid = null;

function run() {
    if (play) {
        return false;
    }
    audio.currentTime = 0; //设置播放的音频的起始时间
    audio.volume = 0.5; //设置音频的声音大小
    audio.muted = false; //关闭静音状态
    play = true;
    setTimeout(function() {
        play = false;
        audio.muted = true; //播放完毕，开启静音状态
    }, t2);
}
tid = setInterval(function() {
    run(); //假装在轮询服务器，或者从websocket拉取数据
}, t1);

function closeMusic() {
    audio.muted = true; //关闭静音状态
    if (tid) {
        clearInterval(tid)
    }

}