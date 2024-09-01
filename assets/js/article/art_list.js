$(function () {

    // 定义美化时间的过滤器
    template.defaults.imports.dataFormat = function(data) {
        const dt = new Date(data)

        let y = dt.getFullYear()
        let m = dt.getMonth() + 1
        m = m < 10 ? '0' + m : m
        let d = dt.getDay()
        d = d < 10 ? '0' + d : d
        let hh = dt.getHours()
        hh = hh < 10 ? '0' + hh : hh
        let mm = dt.getMinutes()
        mm = mm < 10 ? '0' + mm : mm
        let ss = dt.getSeconds()
        ss = ss < 10 ? '0' + ss : ss

        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
    }

    // 定义一个参数对象，用于请求数据时提交参数
    let q = {
        pagenum: 1,        // 页码值
        pagesize: 2,       // 每页显示的数据量
        cate_id: '',       // 文章分类ID
        state: ''          // 文章的发布状态
    }

    initTable()

    // 获取文章列表数据的方法
    function initTable() {
        $.ajax({
            type: 'GET',
            url: '/my/article/list',
            data: q,
            contentType: 'multipart/form-data',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取文章列表失败！')
                }

                // 使用模板引擎渲染页面的数据
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
            }
        })
    }
})