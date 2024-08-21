// 调用ajax发送接口前会先调用ajaxPrefilter函数
$.ajaxPrefilter(function (options) {
    // 在发送真正的Ajax请求前，统一拼接请求的根路径
    options.url = 'http://ajax.frontend.itheima.net' + options.url
    console.log(options.url);
    
})