// 每次调用$.get()或$.post()或者$.ajax()都会先调用这个函数
// 这个函数提供了ajax的配置对象
$.ajaxPrefilter(function(options){
    options.url = 'http://api-breakingnews-web.itheima.net'+options.url
    console.log(options.url)
})