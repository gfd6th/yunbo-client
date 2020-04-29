- demo:

  - 前台: http://yunbo.vifashion.cn
  - 源码: https://github.com/gfd6th/yunbo-client
    
     
    ![二维码](https://github.com/gfd6th/yunbo-client/blob/master/qrcode.jpg)

    加入群组的口令: rightCode
    微信服务号: yunbo020

  - 后台: http://yunbo.api.vifashion.cn
  - 后台源码: https://github.com/gfd6th/yunbo-api
    管理员账户: admin/admin

### 项目说明

基于微信服务号授权的课程点播系统.

### 特色

- 用户授权后, 获取用户的微信资料自动创建会员
- 返利模式. 每个分销人员有自己的进群口令, 学生输入口令后自动加入分销人员的群组
- 微信支付. 付款后分销人员可以获得对应的佣金提成, 同时管理员和分销人员都会收到来自微信服务号的提醒

### 技术栈

- 前端

  - vant
  - vue
  - nuxt

- 后端
  - laravel
  - laravel-admin
  - easywechat

**任何课程, 视频的操作(增删改)一定要清除缓存, 前台才会看到效果**

1. 先创建课程
2. 去视频管理里面上传视频, 获得视频的外链 url
3. 回到课程管理里面, 编辑课程, 下方会看到关联到这个课程里面的视频, 可以拖拽重新排序. 第一个视频一定要设置成免费, 因为这个是进入课程默认选择的视频, 如果不免费的话, 前台看到这一节的背景色会和反白的颜色一样, 不好看
4. 右上角清除缓存

### 群组管理

1. 用户需要首先登录并且输入正确的口令, 注册成为用户.
2. 新建一个群组, 把所有权给这个用户

### 本地开发方法

#### 客户端

微信公众号设置好公网 ip 和白名单, 然后通过 frp 转发到本地
`npm run dev` 后会在本地开启 3000 端口,
nuxt.config.js 中

```json
{
  "axios": {
    "host": "http://locahost:8080",
    "proxy": true,
    "prefix": "/api"
  },
  "env": {
    "baseUrl": process.env.BASE_URL || "http://localhost:3000/"
  }
}
```

---

#### 服务端

** 记录碰到的一个问题: 使用 frp 到本地, 如果用 `php artisan serve --host 0.0.0.0 --port 8080`, 会无法外网访问, 弄不清楚原因, 记得以前好像可以的, 不知道为什么现在不行了, 所以目前先把服务端部署到云主机上面去调试吧. **

** 记住: 因为采用了缓存, 每次有数据库有变动, 需要再后台界面刷新缓存, 或者运行命令行 `php artisan cache:clear` 清空缓存 **

1. 配置好本地数据库
2. 配置好微信支付的证书, 默认在 storage 目录下
3. `php artisan migrate:refresh --seed`

### 部署

```json
{
  "axios": {
    "host": "http://yunbo.api.vifashion.cn/api"
  },
  "env": {
    "baseUrl": process.env.BASE_URL || "http://yunbo.api.vifashion.cn/"
  }
}
```
