$(function () {
    // 点击 去注册 链接
    $('#link-reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    // 点击  去登陆 链接
    $('#link-login').on('click', function () {
        $('.reg-box').hide()
        $('.login-box').show()
    })
    // 从layui中获取form对象
    var form = layui.form
    var layer = layui.layer
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        // repwd: function (value) {
        //     var pwd = $('.reg-box [name=passwod]').val()
        //     if (pwd !== value) {
        //         return '两次密码输入不一致'
        //     }
        // }
        repwd: function (value) {
            // 通过形参拿到的是确认密码框中的内容
            // 还需要拿到密码框中的内容
            // 然后进行一次等于的判断
            // 如果判断失败,则return一个提示消息即可
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致！'
            }
        }
    })
    // 监听表单的注册事件
    $('#form_reg').on('submit', function (e) {
        // 阻止默认提交行为
        e.preventDefault()
        // 发起ajax的post请求
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }
        $.post('/api/reguser', data, function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg('注册成功，请登录')
            $('#link-login').click()

        })


    })
    // 监听表单登录事件
    $('#form_login').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败')
                }
                layer.msg('登录成功')
                localStorage.setItem('token',res.token)


                location.href = '/index.html'
            }
        })
    })
})