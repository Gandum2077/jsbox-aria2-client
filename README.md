# JSBox Aria2 Client
JSBox版Aria2客户端。

## Requirements
- JSBox>=1.60.0

## Usage
1. 开启aria2，并启用RPC
- 请参考[aria2文档](https://aria2.github.io/manual/en/html/aria2c.html)

- 快速设置可以参考如下命令，此命令会开启aria2，启用RPC，允许全部外部连接，后台运行，并设定token为123

```
aria2c --enable-rpc --rpc-listen-all=true --rpc-allow-origin-all --rpc-secret=123 --daemon 
```

2. 启动JSBoxAria2Client后，在设置页面进行对应设置  
如果使用了上述快速设置的命令，那么修改以下两个设置即可，否则请自行修改
- host 服务端的ip
- token 123

3. 操作方式：轻点查看细节，长按开始/暂停，左滑删除


## Acknowledgments
- [YAAW](https://github.com/binux/yaaw)
- [aria2.js](https://github.com/sonnyp/aria2.js)
