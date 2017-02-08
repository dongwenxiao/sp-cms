import Model from 'sp-model'

export default class Post extends Model {

    constructor({ title, desc, subDesc, titleImg, author, editor, publishTime, content, refLink }) {

        super()

        this.title = title
        this.desc = desc
        this.subDesc = subDesc
        this.titleImg = titleImg
        this.author = author
        this.editor = editor
        this.publishTime = publishTime
        this.content = content
        this.refLink = refLink
    }

}