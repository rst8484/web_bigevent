$(function () {
    // 没有登录无法访问后台主页
    // if (!localStorage.getItem('token')) {
    //     location.href = '/login.html';
    // }
    
    // 调用 getUserInfo 函数获取用户信息
    getUserInfo();

    // 退出按钮的点击事件
    $('#btnLogout').on('click', function () {
        // 添加弹窗提示
        layer.confirm('确定要退出吗？', { icon: 3, title: '提示' }, function (index) {
            // 清空本地存储中的 token
            localStorage.removeItem('token');
            // 页面跳转
            location.href = '/login.html';
            // 关闭弹窗
            layer.close(index);
        });
    });


})

// 获取用户信息
function getUserInfo() {
    $.ajax({
        type: 'GET',
        url: '/my/userinfo',

        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！');
            }
            // 调用 renderAvatar 渲染用户头像
            renderAvatar(res.data);
        },
        // 无论成功还是失败，最终都会调用 complete 函数
        complete: function (res) {
            if (res.responseJSON.status!== 0 && res.responseJSON.status!== 401) {
                // 清空本地存储中的 token
                localStorage.removeItem('token');
                // 页面跳转
                location.href = '/login.html';  
                return layui.layer.msg('获取用户信息失败！');
            }

        }

    })
}


// 渲染用户头像
function renderAvatar(user) {
    // 获取用户的名称
    var name = user.nickname || user.username;
    // 按需渲染用户的头像
    // 1. 设置欢迎文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
    // 2. 按需渲染用户的头像
    if (user.user_pic !== null) {
        // 有头像：渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide();
    } else {
        // 没有头像：渲染文本头像
        $('.layui-nav-img').hide();
        var first = name[0].toUpperCase();
        $('.text-avatar').html(first).show();
    }
    // 3. 渲染用户的菜单
    if (user.user_pic !== null) {
        $('.text-avatar').hide();
        $('.layui-nav-img').show();
    } else {
        $('.text-avatar').show();
        $('.layui-nav-img').hide();
    }
} 