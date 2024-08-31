// 获取裁剪区域的 DOM 元素
var $image = $('#image')

// 配置选项
const options = {
    // 纵横比
    aspectRatio: 4/3,
    // 指定预览区域
    preview: '.img-preview'
}

// 初始化裁剪区域
$image.cropper(options)


// 为上传按钮绑定点击事件
$('#btnChooseImage').on('click', function () {
    $('#file').click()
})

// 为文件选择框绑定 change 事件
$('#file').on('change', function (e) {
    // 获取文件列表   
    var fileList = e.target.files
    // 没有选择文件，直接返回
    if (fileList.length === 0) {
        return
    }
    // 拿到用户选择的文件
    var file = e.target.files[0]
    // 根据文件创建一个对应的 URL 地址
    var newImgURL = URL.createObjectURL(file)
    // 为裁剪区域重新设置图片
    $image
    .cropper('destroy')      // 销毁旧的裁剪区域
    .attr('src', newImgURL);
    
    // 初始化裁剪区域
    $image
       .cropper('destroy')      // 销毁旧的裁剪区域
       .attr('src', newImgURL)  // 重新设置图片路径
       .cropper(options)        // 重新初始化裁剪区域
})

// 为确定按钮绑定点击事件
$('#btnUpload').on('click', function () {
    // 拿到用户裁剪之后的头像
    var dataURL = $image
    .cropper('getCroppedCanvas', {
        // 创建一个 Canvas 画布
        width: 100,
        height: 100
    })
   .toDataURL('image/png')

    $.ajax({
        type: 'post',
        url: '/my/update/avatar',
        data: {
            avatar: dataURL
        },
        success: function (res) {
            if (res.status!== 0) {
                return layui.layer.msg('更换头像失败！')
            }
            layui.layer.msg('更换头像成功！')
            // 调用 initUserInfo() 函数重新获取用户信息并渲染表单
            window.parent.getUserInfo()
        }
    })
})