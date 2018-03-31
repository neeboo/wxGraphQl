# A Graphql wrapper with wxa api (inspired by [graphql-request](https://github.com/graphcool/graphql-request))

## Why using graphql with wechat app?

Because my other projectes are graphql-based.
Most graphql clients(eg. Apollo-Client or Others) are using Fetch or Node-Fetch.

However wechat app(xiaochengxu) apis are using their interfaces (wx:Objects)to send/receive requests/responses
So this repository is trying to solve that problem.

Inspired by [graphql-request](https://github.com/graphcool/graphql-request), which is a light-weight wapper around Fetch.js
I simply hook the wx.request to it...

Hope it works for other graphql lovers.
PRs are welcomed!

## Todo

* FlowTypes
* Typescript version
* Demo and usage instructions

## WxApp

* [WxApp frameworks](https://mp.weixin.qq.com/debug/wxadoc/dev/framework/MINA.html)
* [WxApp components](https://mp.weixin.qq.com/debug/wxadoc/dev/component/)
* [WxApp apis](https://mp.weixin.qq.com/debug/wxadoc/dev/api/)
* [WxApp devtools](https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/download.html)
