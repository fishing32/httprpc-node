# httprpc-node
An extremely simple  rpc framework based on http/http2. Support both node and browser.

English [简体中文](README_CN.md)

# why
Http exists everywhere，Most third-party services are published via https. With the advent of http2.0 and 3.0, http is becoming more mature and secure.
As the name implies, httprpc is an rpc framework based on the http protocol. You can use it as simple as [request](https://github.com/request/request) or [axios](https://github.com/axios/axios):
```
const { Client } = require('httprpc');
const client = new Client();
const resp = await rpc.request({
  method: 'POST',
  uri: 'http://www.fishing32.com/apitest',
  headers:{
    'content-type': 'application/json'
  }
})
```
As an RPC framework, it must of course support various microservice management plug-ins, such as name service, load balancing, frequency control, logging, monitoring, link tracking and so on. httprpc engaging with these tools through the plug-in mechanism, Simply enable the default plugin provided by httprpc to connect with the most popular service management tools.

Based on the http protocol, you can completely control the http transport layer through options and plug-ins, such as content-type, cache-control, keep-alive, etc

Also, httprpc supports the openapi ecology. With the openapi definition, you can generate the SDK and server framework through the cli tool. openapi can be used for document generation, parameter veridation, automated testing, etc. For more infomation:[https://swagger.io/][1]

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

