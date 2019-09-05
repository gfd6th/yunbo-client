### 部署 SPA 到七牛云

使用 HTML5 路由会导致在请求子路由的时候由于 CDN 或服务器上不存在对应的路径而返回 404 的问题，在服务器上通常会设置
如果请求不存在的路径就默认返回 index.html。而在 CDN 上就没那么简单了，因为 CDN 只提供文件存取服务无法添加复杂的逻辑。

解决方法:
七牛云可以设置用户自定义的 404 页面，这时候设置 404 页面为 index.html
这样设置以后可以解决路由问题，但是打开控制台会发现虽然页面有返回但是状态码是 404，这样很不好看。
后来搜了下七牛云的文档，发现
