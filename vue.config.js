module.exports = {
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': [
          './src/theme'
        ]
      }
    }
  },
  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true
    }
  },
  configureWebpack: {
    // 给开发服务器做选项传递
    devServer: {
        // 做个前置中间件，在开发服务器启动之前进行监听，相当于一个服务器，可以mock数据
        before(app) {
            app.get('/api/goods', function(req,res){
                // 返回数据，code是状态
                res.json({
                   code:0,
                   list:[
                    {id:1, text:'wdd', price:'22'},
                    {id:2, text:'ewwd', price:'232'}
                   ]     
                })
            })

            app.get('/api/login', function(req,res){
              // get请求是查询参，所以可以从query中获取
              // 若是post请求，则从body中获取
              const {username,password} = req.query;
              if(username==='aa' && password =='1'){
                // 账号密码匹配则登录成功，返回数据
                  res.json({
                    code:0,
                    token:'jilei'
                })
              } else {
                // 没有正常登录
                res.json({
                  code:1,
                  message:'用户名或密码错误'
                })
              }
             
            })
            
        }
    }
}

}
