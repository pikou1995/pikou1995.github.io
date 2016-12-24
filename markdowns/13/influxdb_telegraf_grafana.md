# 环境

centos 7.2 64bit
InfluxDB v1.1.1
Telegraf v1.1.2

# 安装

到[influxdata官网](https://www.influxdata.com/downloads)下载InfluxDB(数据库)和Telegraf(记录数据的程序)并安装,官网上教程很详细

influxdata的视图展示软件Chronograf权限设置很不友好,我试过以后就放弃了,改用[Grafana](http://grafana.org/download/),很nice

# 配置

> InfluxDB

InfluxDB 使用http协议连接,配置文件上也可以使用本地sock,但是我没成功过.

```
service influxdb start
```

influxdb操作有点像mysql,语句简单易懂
influxdb默认连接是不需要密码的,而且没有默认用户,为了安全起见,我设置了必须要密码

先创建user

```bash
#influx 是命令名,后面参数是格式化时间的,具体看官网文档,我没怎么的到.
influx -precision rfc3339
#连接后创建管理员用户
>CREATE USER <username> WITH PASSWORD '<password>' WITH ALL PRIVILEGES
```

```bash
vi /etc/influxdb/influxdb.conf
------------------------------------
# 取消下面一行的注释(207行附近)
[http]
  # Determines whether HTTP endpoint is enabled.
  # enabled = true

  # The bind address used by the HTTP service.
  # bind-address = ":8086"

  # Determines whether HTTP authentication is enabled.
# 取消下面一行的注释(215行附近) 
   auth-enabled = true
```

可以启动服务

```bash
service influxdb restart

influx -precision rfc3339
#验证权限
>auth
username:
password:
```
也可以使用把账号密码写在命令行中登录,可能在shell编程的时候会用到,但我不用,因为可能会留在bash.history中
```
influx -username xxxx -password xxxx
```
>Telegraf

好了,现在配置Telegraf向InfluxDB中填数据

```bash
vi /etc/telegraf/telegraf.conf
-----------------------------
# Configuration for influxdb server to send metrics to
[[outputs.influxdb]]
  ## The full HTTP or UDP endpoint URL for your InfluxDB instance.
  ## Multiple urls can be specified as part of the same cluster,
  ## this means that only ONE of the urls will be written to each interval.
  # urls = ["udp://localhost:8089"] # UDP endpoint example
  urls = ["http://localhost:8086"] # required
  ## The target database for metrics (telegraf will create it if not exists).
  #可以改也可以使用默认的数据库
  database = "xxxxx" # required

  ## Retention policy to write to. Empty string writes to the default rp.
  retention_policy = ""
  ## Write consistency (clusters only), can be: "any", "one", "quorum", "all"
  write_consistency = "any"

  ## Write timeout (for the InfluxDB client), formatted as a string.
  ## If not provided, will default to 5s. 0s means no timeout (not recommended).
  timeout = "5s"
  #填入刚刚新增的用户名
  username = "xxxx"
  #对应的密码
  password = "xxxx"
  ## Set the user agent for HTTP POSTs (can be useful for log differentiation)
  # user_agent = "telegraf"
  ## Set UDP payload size, defaults to InfluxDB UDP Client default (512 bytes)
  # udp_payload = 512

  -----------------------------
  #根据我自己的实际需求,我关了两个默认开启的监控
  #用#注释即可
  [[inputs.kernel]]
  [[inputs.swap]]
  #开启了docker
  # # Read metrics about docker containers
 [[inputs.docker]]
#   ## Docker Endpoint
#   ##   To use TCP, set endpoint = "tcp://[ip]:[port]"
#   ##   To use environment variables (ie, docker-machine), set endpoint = "ENV"
   endpoint = "unix:///var/run/docker.sock"
#   ## Only collect metrics for these containers, collect all if empty
#   container_names = []
#   ## Timeout for docker list, info, and stats commands
   timeout = "5s"
#
#   ## Whether to report for each container per-device blkio (8:0, 8:1...) and
#   ## network (eth0, eth1, ...) stats or not
   perdevice = true
#   ## Whether to report for each container total blkio and network stats or not
#   total = false

```

服务器有mysql, apache, nginx什么的都可以监控,取消对应的注释,然后简单配置一下就可以了
#### 如果你也用docker,一定要注意/var/run/docker.sock的权限,默认这个权限是root:root 660的
#### docker只有在有docker这个组存在时才会是root:docker 660,这也是为了安全,因为有这个读写权限,就可以控制docker了.
#### 如果service telegraf status显示docker没启动什么的,就是权限不对,要找到或创建docker组,把telegraf加入进去才能正常工作

> Grafana

现在开始配置展示数据

为了安全,需要把grafana的在线注册关闭

```bash
vi /etc/grafana/grafana.ini
-----------------------------------
#################################### Users ####################################
[users]
# disable user signup / registration
allow_sign_up = false
```

启动服务

```bash
service grafana-server start
```

登录3000端口,账号密码都是admin,然后改密码,自己在网页上多点点就找到了.

然后是配置,配置都是在web端弄得,思路就是先配置Data Source(数据源),然后配置Dashboards
具体教程自己看文档,我保存一下我的配置文件备用 [setting.json](../data/13/setting.json)

留一张酷酷的图

![Dashboard](../images/13/0.png)