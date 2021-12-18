# httprpc-node
An extremely simple  rpc framework based on http/http2. Support browser, node, go and java.

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

Also, httprpc supports the openapi ecology. With the openapi definition, you can generate the SDK and server framework through the cli tool. openapi can be used for document generation, parameter veridation, automated testing, etc. For more infomation:[https://swagger.io]

# Difference with gRPC
Easier, more free and more compatible.
- No restriction on the transmission content type, httprpc uses json to transmit the data packet body by default, and you can also use xml, protobuf or other formats through plugins。
- The transmission protocol can be replaced, you can choose http or https/2. Or you can customize the transmission protocol through plugins。
- No need to use server and client at the same time. It can be directly connected to a third-party http server, or a third party can be directly accessed through the https service.
- The interface definition scheme is not mandatory. Openapi is the scheme recommended by httprpc. howerver, you can use protobuf or no definition scheme, it is http.

# Performance
  It depends on the performance of the http/s component of the programming language. directly uses the native http/2 module in nodejs,  the performance is equivalent to koa/express.

# Usage
- server
```
const { Server } = require('httprpc');
const server = new Server();
server.listen(port, ip);

```
- client with plugins
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
- request with options
```
 const resp = await client.request({ url: 'https://fishing32.com/test'}, {
    'cache-controll': 'no-store',
 })
```

- engaging with openapi
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

# loadmap
- server
[] 插件机制
[] 插件: 频率控制
[] 插件: 链路追踪 opentelemetry
[] 插件: 监控 prometheus
[] 插件：缓存控制 cache-control
[] 插件；protobuf

- client
[] 插件机制
[] 支持http cache-control
[] 支持http keep-alive
[] 插件：DNS解析
[] 插件：连接池与负载均衡
[] 插件: 频率控制
[] 插件: 链路追踪 opentelemetry
[] 插件: 监控 prometheus
[] 插件；protobuf

- cli
[] 生成server脚手架
[] 生成client openapi SDK
[] 生成server openapi 路由


# Contributing
Thanks for taking the time to contribute, Please submitting an Issue or contact the email list 
shelton<99699567@qq.com>。
