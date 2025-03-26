
#### 基于vue3+cloudflare workers+web-push的一个开源私有的推送应用

![WechatIMG2413.png](https://wp-cdn.4ce.cn/v2/qDBT3i6.png)

#### 安装教程
``` bash
# 克隆项目
git clone https://github.com/Nicholas003/super-push.git
# 进入项目目录
cd super-push
```

``` bash
# 安装依赖
yarn
```
```bash
##创建数据库
npx wrangler d1 create super-push
# 把返回值放到wrangler.jsonc中
# "d1_databases": [
# 		{
# 			"binding": "DB",
# 			"database_name": "super-push",
# 			"database_id": "<yourid>"
# 		}
# 	],

# 数据库推到cloudflare
npx wrangler d1 execute super-push --remote --file=./schema.sql
# 执行sql 这是本地调试用的
npx wrangler d1 execute super-push --local --file=./schema.sql


```
#### 配置秘钥

[生成公钥私钥](https://web-push-codelab.glitch.me/)

``` bash
.dev.vars.example 重命名为 .dev.vars
## 上面网站的东西放在文件里，本地调试用
# 执行下面命令 给cloudflare添加秘钥
npx wrangler secret put publicKey
npx wrangler secret put privateKey

```
### 最后执行一下 
``` bash
yarn deploy
```

---

API参数


|  参数名   | 解释  |
|  ----  | ----  |
| title  | 通知标题 非必填 |
| body  | 通知内容 非必填 |
|  data | 数据 非必填 |
| icon  | 图标 非必填 |
| redirect_uri  | 请求后重定向的地址 非必填 |

https://workers.dev/api/push/092475192834fd77ff9ab67b332dac06?title=hello&body=world&data=hello-world&icon=https%3A%2F%2Fwp-cdn.4ce.cn%2Fv2%2FL5Hcdwr.png&redirect_uri=

get或者post请求都可以

如果cloudflare关联了git 需要在构架时添加 YARN_VERSION=1 NODE_VERSION=20.18.3

### 使用教程 

#### PC
建议使用Edge浏览器 Chrome会被墙
可以添加到桌面也可以不添加
然后开启推送
#### IOS
使用Safari浏览器
把应用添加到主屏幕
然后开启推送
#### Android
没试过

---

如果项目对你有帮助，欢迎star和fork