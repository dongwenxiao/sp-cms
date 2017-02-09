import { spMongoDB } from 'sp-mongo'
import Category from './server/models/Category'
import Post from './server/models/Post'
import Tag from './server/models/Tag'
import Router from 'koa-router'
import createRouter from './server/router'

export default class spCms {

    constructor(opt, router, middleware) {

        // mongodb 数据库连接信息
        this.ip = opt.ip
        this.port = opt.port
        this.db = opt.db

        // 所有接口URL前缀
        this.urlPrefix = opt.prefix || '/cms'

        // koa 路由，主要使用 .use() 挂载
        this.rootRouter = router

        // koa 中间件挂载
        this.rootMiddleware = middleware

        this.init()
    }


    init() {


        // 实例化数据库连接对象
        this.dao = new spMongoDB({ ip: this.ip, port: this.port, db: this.db })

        // 当前auth路由
        this.router = createRouter()

        // 配置数据库连接对象和表名
        Category.configDAO(this.dao)
        Category.configCollection('sp_cms_category')
        Post.configDAO(this.dao)
        Post.configCollection('sp_cms_post')
        Tag.configDAO(this.dao)
        Tag.configCollection('sp_cms_tag')

        // handbars 模板注册
        // const views = require('koa-views')
        // this.rootMiddleware.use(views(__dirname + '/server/views', {
        //     extension: 'ejs',
        //     map: {
        //         hbs: 'ejs'
        //     }
        // }))
    }

    /**
     * 挂载到主路由上
     *
     * @memberOf ApiFactory
     */
    mount() {

        // 挂载prefix路由

        const apiRouter = new Router()
        apiRouter.use(this.urlPrefix, this.router.routes(), this.router.allowedMethods())
        this.rootRouter.use(apiRouter)

    }

}