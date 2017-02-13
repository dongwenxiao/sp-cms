import Router from 'koa-router'

/**
 * 创建cms相关路由
 *
 * @export
 * @returns
 */
export default function createRouter() {

    const router = new Router()

    return router
        .get('/test', async(ctx) => {
            ctx.body = 'test'
        })

    .get('/post/:id', async(ctx) => { ctx.body = '' })
    .get('/post/', async(ctx) => { ctx.body = '' })
}