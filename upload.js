const fs = require('fs')
const path = require('path')
const qiniu = require('qiniu')
const PUBLIC_PATH = path.join(__dirname, '/')

// 上传凭证
const accessKey = 'YsIpsbDFPEM8BX6ux3Jf3gg800PsLKkw53IxGXRe'
const secretKey = 'ino40BGVEMxO3uieHP3Yb6d63Nt0AxyyRB1j4DeV'
const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)

const options = {
  scope: 'yunbo'
}
const putPolicy = new qiniu.rs.PutPolicy(options)
const uploadToken = putPolicy.uploadToken(mac)

const config = new qiniu.conf.Config()
// 空间对应的机房
config.zone = qiniu.zone.Zone_z2
// 是否使用https域名
config.useHttpsDomain = true
// 上传是否使用cdn加速
config.useCdnDomain = true

/**
 * 遍历文件夹递归上传
 * @param {path} src 本地路径
 * @param {string} dist oos文件夹名
 * @param {boolean} isDir 是否为文件夹下文件
 */
async function addFileToOSSSync(src, dist, isDir) {
  const docs = fs.readdirSync(src)
  docs.forEach(function(doc) {
    const _src = src + '/' + doc
    const _dist = dist + '/' + doc
    const st = fs.statSync(_src)
    // 判断是否为文件
    if (st.isFile() && dist !== 'LICENSES`') {
      putOSS(_src, !isDir ? doc : `fonts/${doc}`) // 如果是文件夹下文件，文件名为 fonts/文件名
    }
    // 如果是目录则递归调用自身
    else if (st.isDirectory()) {
      addFileToOSSSync(_src, _dist, true)
    }
  })
}
/**
 *单个文件上传至oss
 */
async function putOSS(src, dist) {
  try {
    const localFile = src
    const formUploader = new qiniu.form_up.FormUploader(config)
    const putExtra = new qiniu.form_up.PutExtra()
    const key = dist
    // 文件上传
    await formUploader.putFile(uploadToken, key, localFile, putExtra, function(
      respErr,
      respBody,
      respInfo
    ) {
      if (respErr) {
        throw respErr
      }
      if (respInfo.statusCode == 200) {
        console.log(key + '上传oss成功')
      } else {
        console.log(respInfo.statusCode)
        console.log(respBody)
      }
    })
  } catch (e) {
    console.log('上传失败'.e)
  }
}
/**
 *上传文件启动
 */
async function upFile() {
  try {
    const src = PUBLIC_PATH + '.nuxt/dist/client'
    const docs = fs.readdirSync(src)
    await addFileToOSSSync(src, docs)
  } catch (err) {
    console.log('上传oss失败', err)
  }
}
upFile()
