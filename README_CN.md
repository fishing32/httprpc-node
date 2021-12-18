# httprpc-node
An extremely simple  rpc framework based on http/http2. Support both node and browser.

# why
http是无处不在的，我们给客户端提供的API或在使用很多第三方服务时用的都是http协议。 http协议经过多年的发展已经推出了2.0，3.0标准也将发布。
顾名思义，httprpc是基于http协议的rpc框架，你可以像使用request或axios一样简单地使用它：
```
const { client } = require('httprpc');
const client = new Client();
const resp = await rpc.request({
  method: 'POST',
  uri: 'http://www.fishing32.com/apitest',
  headers:{
    'content-type': 'application/json'
  }
})
```
当然作为一个RPC框架，当然要支持各种微服务治理插件，比如名字服务插件、负载均衡、频控、日志、监控、链路追踪等等。 httprpc通过插件机制统一引入这些工具，甚至连http传输协议都能用插件替换。简单启用httprpc对应的默认的插件既可无缝对接当下最流行的服务治理工具。
同时基于http协议使得你能通过选项和插件完整地控制http传输层，例如content-type, cache-control, keep-alive等，只要简单地启用对应地插件支持即可。httprpc可以自建

还有更多，httprpc支持openapi生态，您可以在定义好openapi描述后，直接通过cli工具生成sdk和server框架。openapi可以用于文档生成、参数校验、自动化测试等，具体参考：

# 与gRPC的区别
简单说就是简便、自由、兼容
- 不限制传输内容格式，httprpc默认使用json传递数据包体，您也可以通过插件使用xml、protobuf或者其它格式。
- 可以替换传输协议，可以选择http或https/2. 或者通过插件自己写传输协议。
- 可以直接对接第三方http服务端，也可以令第三方直接通过https服务访问。
- 不强制接口描述方案，openapi是httprpc推荐的方案，有大量会对性优化，当然您使用protobuf或者没有描述文件也是可以的，http嘛。

# 性能
  不附加插件情况下取决于对应语言的http/s组件性能，node直接用原生http模块，服务端与koa/express相当。

# 用法
- 服务端
```
const { Server } = require('httprpc');
const server = new Server();
server.listen(port, ip);

```
- 使用插件
```
const { Client } = require('httprpc');
const client = new Client(
  async plugin1(ctx) => {
    ...
  }, 
  async plugin2(ctx) => {
    ...
  },
);
```
- 对单个请求独立设置插件选项
```
 const resp = await client.request({ url: 'https://fishing32.com/test'}, {
    'cache-controll': 'no-store',
 })
```

- openapi sdk
```
const { Client, openapiSDK, Server, openapiServer } = require('httprpc');
const server = nw Server(openapiServer('./openapi.yaml'));
server.listen(80);
const client = new Client(openapiSDK('./openapi.yaml'));
client.getXXX('param1');

client.getXXX('param1').options({ 
  'cache-controll': 'no-store',
});
client.postXXX('param1', {/*post body*/}).options({ 
  'cache-controll': 'no-store',
});
```

