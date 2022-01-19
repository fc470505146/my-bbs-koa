const path = require('path')
const formidable = require('formidable')
const headImgPath = path.join(__dirname, '../../public/img')
const parseUpload = async (ctx, next) => {
    const form = formidable({
        uploadDir: headImgPath,
        keepExtensions: true,
        filter: ({ mimetype }) => {
            return mimetype && mimetype.includes('image')
        },
    })
    await new Promise((resolve, reject) => {
        form.parse(ctx.req, (err, fields, files) => {
            if (err) {
                console.error('解析文件错误', err)
                reject(err)
                return
            }
            Object.assign(ctx.state, { fields, files })
            resolve()
        })
    })
    await next()
}
const headExcelPath = path.join(__dirname, '../assets/excel')
const paresExcel = async (ctx, next) => {
    const form = formidable({
        uploadDir: headExcelPath,
        keepExtensions: true,
        filter: ({ mimetype }) => {
            return mimetype && 1
        },
    })
    await new Promise((resolve, reject) => {
        form.parse(ctx.req, (err, fields, files) => {
            if (err) {
                console.error('解析文件错误', err)
                reject(err)
                return
            }
            Object.assign(ctx.state, { fields, files })
            resolve()
        })
    })
    await next()
}
module.exports = { parseUpload, paresExcel }
