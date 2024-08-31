// 调用ajax发送接口前会先调用ajaxPrefilter函数
$.ajaxPrefilter(function (options) {
    // 在发送真正的Ajax请求前，统一拼接请求的根路径
    options.url = 'http://127.0.0.1:3000' + options.url
    // console.log(options.url);

    if(options.url.indexOf('/my/')!== -1){
        // 统一为有权限的接口，设置 headers 请求头
        options.headers =  {
            Authorization: localStorage.getItem('token') || ''
        }
    }   
})