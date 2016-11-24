我用的服务器是阿里云上的centos 7，想试一下```docker```

```bash
yum install docker
```
```docker -v```

```bash
Docker version 1.10.3, build cb079f6-unsupported
```

当我```docker pull ```的时候遇到过两个问题，一开始是dns问题。我自己是没设置过dns的，初始的时候```cat /etc/resolv.conf``` 

```
options timeout:1 attempts:1 rotate
nameserver 10.242.197.248
nameserver 10.242.197.247
```

然后我加了两个就OK了

```
nameserver 114.114.114.114
nameserver 114.114.114.115
```
第二个就是官方源太慢了，阿里云有提供docker镜像加速服务
阿里云Hub服务管理后台：```http://console.d.aliyun.com/index2.html```
在这里开通容器Hub服务，就可以管理您自己的Docker仓库以及仓库镜像。
我还按照官方教程在服务器上登录了一下。
```bash
docker login --username=${阿里云用户名} registry.cn-hangzhou.aliyuncs.com
#密码就是刚刚设置的密码
```

![阿里云界面](../images/12/0.png)

我没有按官方的步骤配置docker，而是直接编辑```vi /etc/sysconfig/docker```

```
#找到这行
OPTIONS='--selinux-enabled --log-driver=journald'
```
```
#填入自己的专属加速地址
OPTIONS='--selinux-enabled --log-driver=journald --registry-mirror=https://xxxxxxx.mirror.aliyuncs.com'
```
然后```service docker restart```
这个时候```docker pull```会非常快