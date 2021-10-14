服务器购买后，通过`ssh root@服务器公网ip`连接到服务器，输入密码后即可登录。

 

登录成功后，输入：`apt-get update`先更新一下。

然后使用如下命令安装相关软件

```
// 安装mongodb
apt-get install mongodb

// 安装nodejs
apt-get install nodejs

// 安装npm
apt-get install npm 

// 安装nginx，用于配置多项目共存于同一服务器
apt-get install nginx
```

 

然后本地下载xftp7，连接上服务器后。上传到服务器。

```
// 安装pm2 用于后台常驻启动nodejs项目 pm2是查看进程的包
npm i -g pm2 
// pm2启动项目
pm2 start index.js
```

更新服务器nginx配置

```
nginx -s reload
```

数据库启动命令，--fork参数用于常驻后台启动数据库（此命令只能用于linux系统，windows无效）

```
mongod --dbpath=数据库路径 --logpath=日志路径 --port=数据库端口 --fork
```

nginx -s reload   

pm2 ls查看运行进程

pm2 stop ID   停止



修改server.conf文件的server_name “网址” ，proxy_pass “端口”

/etc/nginx/conf.d    上传server.conf文件 ，

服务器   nginx -s reload

mongoDB compass 查看服务器数据库  **More Options**>**SSH Tunnel**

**SSH Hostname**:服务器地址  

**SSH Username**：root

**SSH Password**:服务器密码
