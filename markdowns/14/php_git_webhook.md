> 一个朋友在参考 [一个教程](http://m.aoh.cc/149.html) 时遇到问题, 我帮助他搞了很久, 现在记录一下经验.

> 本文是基于 **已经搭建好LAMP环境** 的前提下

# 一. 文件权限

不管是nginx还是apache服务器,执行php代码的**都不是root**或者你登录的那个账号, centos中是 `www` , ubuntu中是 `www-data` , 以下统称他们为www.

## 确认www的home文件夹位置

### 1. 为什么?

当我们配置 `sudo -Hu www git config --global user.email` 等时配置文件需要放入home文件夹,如果不存在就会出错.

### 2. 怎么确认?

`cat /etc/passwd` 找到类似下面的,home文件夹是倒数第二个':'后面的文件夹, 然后确认文件夹是否存在, 用户和用户组是否属于www.

```
//centos一般为/home/www
www:x:33:33:www-data:/home/www:/usr/sbin/nologin
```

```
//ubuntu一般为/var/www
www-data:x:33:33:www-data:/var/www:/usr/sbin/nologin
```

### 3. 不存在如何处理

```
//以centos为例, ubuntu一般已经建好了
# mkdir /home/www
# chown -R www:www /home/www
```

## 确认项目文件夹的权限

这个比较无脑, 如果你不是很肯定权限没有问题, 执行下面的命令即可. **推荐执行**, 而且无副作用.

```
//以centos为例, 假设项目文件夹为/var/www/test
# chown -R www:www /var/www/test
```

> 需要注意的是, 之后请 **不要直接使用git命令** ,否则文件权限又会发生变化

# 二. php配置

一般为了服务器安全, 默认的php.ini会禁用一些function, 比如`exec`, `shell_exec`等. 在这里不探讨安全问题, 只是单纯的想使用webhook带来的便利.

## 如何确认?

* 可以随便写个phpinfo()的测试php,查找 `disable_functions` 和 `Loaded Configuration File` 查看shell_exec有没有被禁用和php.ini的位置

* 熟悉自己配置的可以直接看php.ini的 `disable_functions`

## 如何处理?

* 编辑php.ini, 把 `shell_exec` 从 `disable_functions` 中删除
* 重启nginx,apache,php-fpm

> nginx尤其要 **注意重启php-fpm** , 只重启nginx不会生效

# 三. php代码

教程中, 有如下代码
```
//举例说明, 不要直接套用
$cmd = "sudo -Hu www cd $target && git pull";
shell_exec($cmd);
```

如果恰巧这段代码在你需要webhook的那个git项目文件中, $cmd可以做如下改变 `$cmd = "git pull";`

因为执行代码时的$PWD就是那个php文件的文件夹, 所以不用切换目录, 而且也不用sudo切换用户权限

做简单记录, `$cmd = "git pull 2>&1 >> /tmp/git.log";`

如果是管理其他项目, 就需要cd到那个目录, 而且可能需要切换权限

> centos 需要注意, sudo可能需要从yum安装, 而且可能默认需要一个tty, 使用visudo可以修改配置, 具体可以查看出错信息去网上搜索


# 四. 总结

* 我之前就弄过webhook, 但是没遇到过这些问题, ubuntu确实要比centos容易上手一些, 但是centos能学到更多东西.

* 还有webhook需要注意安全, 一定要验证好是git发过来的请求, 过滤掉非法用户. 还有要做好log.
