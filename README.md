# A Graphql wrapper with wxa api (insipired by [graphql-request](https://github.com/graphcool/graphql-request))

## Why using graphql with wechat app?

Because my other projectes are graphql-based.
Most graphql clients(eg. Apollo-Client or Others) are using Fetch or Node-Fetch.

However wechat app(xiaochengxu) apis are using their interfaces (wx:Objects)to send/receive requests/responses
So this repository is trying to solve that problem.

Inspired by graphql-request, which is a light-weight wapper around Fetch.js
I simply hook the wx.request to it...

Hope it works for other graphql lovers.
PRs are welcomed!

## WxApp

* [wxa 框架](https://mp.weixin.qq.com/debug/wxadoc/dev/framework/MINA.html)
* [wxa 组件](https://mp.weixin.qq.com/debug/wxadoc/dev/component/)
* [wxa api](https://mp.weixin.qq.com/debug/wxadoc/dev/api/)
* [wxa 开发者工具](https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/download.html)
