// 每次调用$.get()或$.post()或者$.ajax()都会先调用这个函数
// 这个函数提供了ajax的配置对象
$.ajaxPrefilter(function(options){
    options.url = 'http://api-breakingnews-web.itheima.net'+options.url
    console.log(options.url)
    // 统一为权限接口 设置headers的请求头
    if(options.url.indexOf('/my/') !== -1){
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }

    }

    
    // 全局统一挂载 complete 回调函数
    options.complete = function(res){
        // console.log(res)
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            
            // 1. 强制清空 token
            localStorage.removeItem('token')
            // 2. 强制跳转到登录页面
            location.href = '/login.html'
        }

    }
})