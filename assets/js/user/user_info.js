$(function(){
    // 调用layui中的form模块
    var form = layui.form
    
    // 初始化用户信息
    initUserInfo()
    

    // 添加验证规则
    form.verify({
        // 自定义一个昵称的校验规则
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称必须在 1 ~ 6 个字符之间！'
            }
        }
    })

    // 初始化用户信息
    function initUserInfo() {
        // 发送ajax请求获取用户信息
        $.ajax({
            type: 'get',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status!== 0) {
                    return layui.layer.msg('获取用户信息失败！')
                }

                console.log(res.data);
                
                // 表单赋值
                form.val('formUserInfo', {
                    nickname: res.data.nickname,
                    username: res.data.username,
                    email: res.data.email
                })

            }
        })
    }

    // 重置表单
    $('#btnReset').on('click', function (e) {
        // 阻止表单的默认重置行为
        e.preventDefault()
        // 调用initUserInfo()函数重新获取用户信息并渲染表单
        initUserInfo()
    })

    // 监听表单提交事件
    $('.layui-form').on('submit', function (e) {
        // 阻止表单的默认提交行为
        e.preventDefault()
        // 发起ajax请求
        $.ajax({
            type: 'post',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status!== 0) {
                    return layui.layer.msg('修改用户信息失败！')
                }

                // 调用initUserInfo()函数重新获取用户信息并渲染表单
                initUserInfo()

                // 调用layer模块的msg方法弹出提示信息
                layui.layer.msg('修改用户信息成功！')

                // 调用父页面的方法，重新渲染用户头像和用户信息
                window.parent.getUserInfo()
            }
        })
    })
})