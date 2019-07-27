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
              // 中间件（请求和响应的预处理操作），可以在其他执行之前先执行,
              // 检查token
              // app.use(function(req,res,next) {
              //   console.log(req.headers.token,req.path,'req.headers.token-req.path')
              //   console.log(/^\/api/.test(req.path),'888')
              //     if(/^\/api/.test(req.path)){ //只校验/api开头的请求
              //       if(req.path == '/api/login' || req.headers.token) {
              //         next();
              //       } else {
              //         res.sendStatus(401); //错误状态表示用户需要登录
              //       }
              //     }else{
              //       next()
              //     }
              // })
             
  
              app.get('/api/goods', function(req,res){
                  // 返回数据，code是状态
                //   res.json({
                //      code:0,
                //      list:[
                //       {id:1, text:'wdd', price:'22'},
                //       {id:2, text:'ewwd', price:'232'}
                //      ]     
                //   })
                  res.json({
                    code:0,
                    slider:[
                     {id:1, img:'/img/66.png'},
                     {id:2, img:'/img/22.jpg'},
                     {id:3, img:'/img/33.jpg'},
                     {id:4, img:'/img/44.jpg'},
                    ],
                    data:{
                      fe:[
                        {
                          id:1,
                          title:'js',
                          price:'12',
                          img:'/img/11.jpg',
                          count:100
                        },
                        {
                          id:2,
                          title:'css',
                          price:'123',
                          img:'/img/22.jpg',
                          count:130
                        },
                        {
                          id:3,
                          title:'vue',
                          price:'132',
                          img:'/img/33.jpg',
                          count:1030
                        },
                        {
                          id:4,
                          title:'react',
                          price:'132',
                          img:'/img/33.jpg',
                          count:1030
                        },
                        {
                          id:5,
                          title:'angular',
                          price:'132',
                          img:'/img/33.jpg',
                          count:1030
                        },
                      ],
                      python:[
                        {
                          id:11,
                          title:'python1',
                          price:'12',
                          img:'/img/11.jpg',
                          count:100
                        },
                        {
                          id:22,
                          title:'python2',
                          price:'123',
                          img:'/img/22.jpg',
                          count:130
                        }
                      ],
                      java:[
                        {
                          id:121,
                          title:'java1',
                          price:'12',
                          img:'/img/11.jpg',
                          count:100
                        },
                        {
                          id:211,
                          title:'java2',
                          price:'123',
                          img:'/img/22.jpg',
                          count:130
                        },
                        {
                          id:311,
                          title:'java3',
                          price:'132',
                          img:'/img/33.jpg',
                          count:1030
                        },
                      ],
                      bigdata:[
                        {
                          id:41,
                          title:'Hadoop',
                          price:'12',
                          img:'/img/11.jpg',
                          count:100
                        },
                        {
                          id:42,
                          title:'数据挖掘',
                          price:'123',
                          img:'/img/22.jpg',
                          count:130
                        },
                        {
                          id:43,
                          title:'数据分析',
                          price:'132',
                          img:'/img/33.jpg',
                          count:1030
                        },
                      ],
                      ai:[
                        {
                          id:51,
                          title:'人脸识别',
                          price:'12',
                          img:'/img/33.jpg',
                          count:100
                        },
                        {
                          id:52,
                          title:'门禁系统',
                          price:'123',
                          img:'/img/22.jpg',
                          count:130
                        },
                        {
                          id:53,
                          title:'刷脸支付',
                          price:'132',
                          img:'/img/11.jpg',
                          count:1030
                        },
                      ],
                    },
                    keys:['fe','python','java','bigdata','ai']     
                 })
              })
              // get请求/api/login
              /* app.get('/api/login', function(req,res){
                // get请求是查询参，所以可以从query中获取
                // 若是post请求，则从body中获取
                const {username,password} = req.query;
                if(username==='aa' && password =='1'){
                  // 账号密码匹配则登录成功，返回数据
                    res.json({
                      code:0,
                      token:'loginok'
                  })
                } else {
                  // 没有正常登录
                  res.json({
                    code:1,
                    message:'用户名或密码错误'
                  })
                }
              }) */
              // post请求
              app.post('/api/login', function(req,res){
                // get请求是查询参，所以可以从query中获取
                // 若是post请求，则从body中获取
                let body = [];
                req.on('data',chunk => {
                  // 接收到一部分数据,chunk是Buffer对象
                  body.push(chunk);
                }).on('end', () => {
                  //数据接收完毕，将body转换为完整的buffer
                  body = Buffer.concat(body).toString();
                  // 转换并保存前台传递的user
                  const { username, password } = JSON.parse(body);
                    if(username==='aa' && password =='1'){
                    // 账号密码匹配则登录成功，返回数据
                      res.json({
                        code:0,
                        token:'loginok'
                      })
                    } else {
                    // 没有正常登录
                     res.json({
                       code:1,
                       message:'用户名或密码错误'
                     })
                    }
                })
               
              })
  
              app.get('/api/logout', function(req, res) {
                res.json({code:-1})
              })
              
          }
      }
  }
  
  }
  