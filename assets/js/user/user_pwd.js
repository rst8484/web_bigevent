$(function () {
    // 从 layui 中获取 form 对象
    var form = layui.form
    var layer = layui.layer;
    // 通过form.verify()函数自定义校验规则
    form.verify({
        // 自定义一个叫pwd的检验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        // 自定义一个叫samePwd的检验规则
        samePwd: function (value) {
            if (value === $('[name=oldPwd]').val()) {
                return '新旧密码不能一致'
            }
        },
        // 自定义一个叫repwd的检验规则,判断两次密码是否一致
        repwd: function (value) {
            let pwd = $('[name=newPwd]').val()
            if (pwd!== value) {
                return '两次密码不一致'
            }
        }
    })

    $('.layui-form').submit(function (e) {
        // 阻止默认行为
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status!== 0) {
                    return layer.msg('修改密码失败！')
                }
                layer.msg('修改密码成功！')
                // 重置表单
                $('#.layui-form')[0].reset()
                // 调用父页面的 changePwd 方法
                // parent.changePwd()
            }
        })
    })

    

})