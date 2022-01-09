$(function () {
    var form = layui.form
    var layer = layui.layer

    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度必须在 1 ~ 6 个字符之间！'
            }
        }
    })
    initUserInfo()
    // 初始化用户信息
    function initUserInfo() {
        $.ajax({
            url: '/my/userinfo',
            method: 'GET',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败')

                }
                // console.log(res)
                form.val('formUserInfo',res.data)
            }
        })
    }

    // 重置表单数据
    $('#btnReset').on('click',function(e){
        // 阻止表单提交
        e.preventDefault()
        initUserInfo()

    })

    // 监听表单提交行为
    $('.layui-form').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            method:'POST',
            url:'/my/userinfo',
            data:$(this).serialize(),
            success:function(res){
                if(res.status !== 0){
                    return layer.msg('更新用户信息失败')
                }
                console.log(res)
                layer.msg('更新用户信息成功')
            }
        })
    })
})