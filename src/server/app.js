const express = require('express')

const app = express()

const joi = require('joi')

const bodyParser = require('body-parser')
//跨域问题
const cors = require('cors')

app.use(cors())

app.use((req,res,next) =>{
    res.cc = function(err,code=1,status=1){ //code表示错误状态
        res.send({
            status,
            code,
            message: err instanceof Error ? err.message : err
        })
    }
    next()
})

//定义解析Token的中间件
const {expressjwt} = require('express-jwt')
const config = require('./config')

app.use(expressjwt({secret: config.jwtSecretKey,algorithms: ['HS256']}).unless({path:[/^\/api/]}))

//配置解析表单数据的中间件
app.use(express.urlencoded({extended:false}))

//配置解析JSON数据的中间件
app.use(bodyParser.json())

//导入并使用用户路由模块
const userRouter = require('./router/user')

app.use('/api',userRouter)

//导入并使用用户信息的路由模块
const userInfoRouter = require('./router/userinfo')

app.use('/info',userInfoRouter)

//导入并使用team信息的路由模块
const teamInfoRouter = require('./router/team')

app.use('/team',teamInfoRouter)

//定义错误级别的中间件
app.use((err,req,res,next) =>{
    //验证失败
    if(err instanceof joi.ValidationError) return res.cc(err)
    //身份认证失败后的错误
    if(err.name === 'UnauthorizedError') return res.cc('身份认证失败！')
    //未知的错误
    res.cc(err)
})

app.use('/api',express.static('public'))


app.listen(3006,() =>{
    console.log('api server running at http://localhost:3006')
})