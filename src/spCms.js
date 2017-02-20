import { spMongoDB } from 'sp-mongo'
import { mountCrudRouter } from 'sp-api/src/spApi'
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
        // Category.configDAO(this.dao)
        // Category.configCollection('sp_cms_category')
        // Post.configDAO(this.dao)
        // Post.configCollection('sp_cms_post')
        // Tag.configDAO(this.dao)
        // Tag.configCollection('sp_cms_tag')

        mountCrudRouter('sp_cms_category', this.router, this.dao)
        mountCrudRouter('sp_cms_post', this.router, this.dao)
        mountCrudRouter('sp_cms_tag', this.router, this.dao)
        mountCrudRouter('sp_cms_nav', this.router, this.dao)
        mountCrudRouter('sp_cms_banner', this.router, this.dao)

        // TODO 默认数据格式、html的urlencode处理


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
     * @memberOf CmsFactory
     */
    mount() {

        // 挂载prefix路由

        const cmsRouter = new Router()
        cmsRouter.use(this.urlPrefix, this.router.routes(), this.router.allowedMethods())
        this.rootRouter.use(cmsRouter)

    }

}