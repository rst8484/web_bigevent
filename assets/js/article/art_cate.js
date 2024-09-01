$(function () {
    var layer = layui.layer

    initArtCateList()

    // 获取文章分类列表
    function initArtCateList() {
        $.ajax({
            type: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('获取文章分类列表失败！')
                }
                // console.log(res.data);
                let htmlStr = template('tpl-table', res)
                // console.log(htmlStr);
                $('#ulArtCate').html(htmlStr)
            }
        })
    }

    let index = null;
    // 为添加分类按钮绑定点击事件
    $('#btnAddCate').on('click', function (e) {
        // 在此处输入 layer 的任意代码
        index = layer.open({
            type: 1, // page 层类型
            area: ['500px', '300px'],
            title: '添加文章分类',
            shade: 0.6, // 遮罩透明度
            anim: 0, // 0-6 的动画形式，-1 不开启
            content: $('#dialog-add').html()

        });
    })

    // 通过代理的形式，为form-add表单绑定提交事件
    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault()
        // console.log('OK')
        $.ajax({
            type: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('添加文章分类失败！')
                }
                // 调用 initArtCateList() 函数重新获取文章分类列表并渲染表格
                initArtCateList()
                // 关闭弹出层
                layer.close(index)
            }

        })

    })


    // 通过代理的形式，为表格btn-edit按钮绑定编辑事件
    $('tbody').on('click', '.btn-edit', function () {
        // 弹出一个编辑框
        index = layer.open({
            type: 1, // page 层类型
            area: ['500px', '300px'],
            title: '修改文章分类',
            shade: 0.6, // 遮罩透明度
            anim: 0, // 0-6 的动画形式，-1 不开启
            content: $('#dialog-edit').html()

        });

        let id = $(this).attr('data-id')
        // 发起ajax请求，根据id获取文章分类的具体信息
        $.ajax({
            type: 'GET',
            url: '/my/article/cates/' + id,
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('获取文章分类失败！')
                }

                // 为表单填充数据       
                $('#form-edit [name=id]').val(res.data.id)
                $('#form-edit [name=name]').val(res.data.name)
                $('#form-edit [name=alias]').val(res.data.alias)
            }
        })

    })

    // 通过代理的形式，为form-edit表单绑定提交事件
    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault()
        console.log($(this).serialize())
        $.ajax({
            type: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    // return layui.layer.msg('修改文章分类失败！')
                    return layui.layer.msg(res.message)
                }
                // 调用 initArtCateList() 函数重新获取文章分类列表并渲染表格
                initArtCateList()
                // 关闭弹出层
                layer.close(index)
            }

        })

    })

    // 通过代理的形式，为删除按钮btn-del添加点击事件
    $('tbody').on('click', '.btn-del', function () {
        let id = $(this).attr('data-id')
        // 弹出一个提醒框
        layer.confirm('确定删除？', { icon: 3 }, function (index) {
            // layer.msg('点击确定的回调', { icon: 1 });
            // 删除分类
            $.ajax({
                type: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function (res) {                   
                    if (res.status !== 0) {
                        return layui.layer.msg(res.message)
                    }
                    layui.layer.msg('删除分类成功！')
                    layer.close(index)
                    // 调用 initArtCateList() 函数重新获取文章分类列表并渲染表格
                    initArtCateList()
                }
            })
        }, function () {
            initArtCateList()
        });

    })


})