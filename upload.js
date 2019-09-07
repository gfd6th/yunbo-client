const fs = require('fs')

const qiniu = require('qiniu')
// 上传凭证
const accessKey = 'YsIpsbDFPEM8BX6ux3Jf3gg800PsLKkw53IxGXRe'
const secretKey = 'ino40BGVEMxO3uieHP3Yb6d63Nt0AxyyRB1j4DeV'
const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
const config = new qiniu.conf.Config()

// 存储空间名称
const bucket = 'yunbo'

// 要上传的资源目录
const staticPath = '.nuxt/dist/client'

// 上传后的文件前缀
const prefix = 'cdn'

// 空间对应的机房

// 创建并修改配置对象(Zone_z0=华东 Zone_z1=华北 Zone_z2=华南 Zone_na0=北美)
config.zone = qiniu.zone.Zone_z2
// 是否使用https域名
config.useHttpsDomain = true
// 上传是否使用cdn加速
config.useCdnDomain = true
// 创建额外内容对象
const putExtra = new qiniu.form_up.PutExtra()

// 创建表单上传对象
const formUploader = new qiniu.form_up.FormUploader(config)
// 文件上传方法
function uploadFile(localFile) {
  // 配置上传到七牛云的完整路径
  const key = localFile.replace(staticPath, prefix)
  const options = {
    scope: bucket + ':' + key
  }
  const putPolicy = new qiniu.rs.PutPolicy(options)
  // 生成上传凭证
  const uploadToken = putPolicy.uploadToken(mac)
  // 上传文件
  formUploader.putFile(uploadToken, key, localFile, putExtra, function(
    respErr,
    respBody,
    respInfo
  ) {
    if (respErr) throw respErr
    console.log('已上传: ', respBody.key)
  })
}
// 目录上传方法
function uploadDirectory(dirPath) {
  fs.readdir(dirPath, function(err, files) {
    if (err) throw err
    // 遍历目录下的内容
    files.forEach((item) => {
      const path = `${dirPath}/${item}`
      fs.stat(path, function(err, stats) {
        if (err) throw err
        // 是目录就接着遍历 否则上传
        if (stats.isDirectory()) uploadDirectory(path)
        else uploadFile(path, item)
      })
    })
  })
}
fs.exists(staticPath, function(exists) {
  if (!exists) {
    console.log('目录不存在！')
  } else {
    console.log('开始上传...')
    uploadDirectory(staticPath)
  }
})
