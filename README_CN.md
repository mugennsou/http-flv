# HTTP-FLV

## 介绍

本项目为基于 [nginx-http-flv-module](https://github.com/winshining/nginx-http-flv-module) 制作的 Docker 镜像。
内含整合 [flv.js](https://github.com/bilibili/flv.js) 的 demo。

## 安装

使用 Docker 拉取镜像：

```shell
docker pull mugennsou/nginx-http-flv
```

注: 你可以拉取 `mugennsou/nginx-http-flv:dev` tag 以使用最新版本（不稳定，但包含原作者所有修改）的 http-flv-modlue。

## 使用

启动 nginx-http-flv 服务器：

```shell
docker run --rm -it -p 80:80 -p 1935:1935 mugennsou/nginx-http-flv
```

使用 ffmpeg 向 nginx-http-flv 的 RTMP 服务器推流：

```shell
ffmpeg -re -i example.mp4 -vcodec copy -acodec copy -f flv rtmp://127.0.0.1/demo/stream-1
```

然后打开浏览器，访问地址 127.0.0.1 即可查看效果。

## 自定义

### RTMP 部分

配置文件位于镜像中 `/etc/nginx/conf.d/rtmp/rtmp.conf` 文件，其基本格式为：

```nginx
rtmp {
    out_queue               4096;
    out_cork                8;
    max_streams             64;

    server {
        listen              1935; # 需要监听的端口。可选，默认为 1935

        application demo { # 应用名，需与 ffmpeg 推送的 appname 一致
            live            on;
            gop_cache       on; # 打开GOP缓存，降低播放等待时间
        }
    }
}

```

你可以建立多个 `server` 以监听不同端口，或者一个 server 下建立多个 `application`。

### HTTP-FLV 部分

配置文件位于镜像中 `/etc/nginx/conf.d/http/http-flv.conf` 文件，基本格式与普通的 http 服务写法类似：

```nginx
server {
    listen                          80;
    root                            /var/www;
    charset                         utf-8;

    location / { # 静态 web 服务，如果 web 服务与推流服务分开则不需要这部分
        index                       index.html;
    }

    location /live { # 推流服务
        flv_live                    on;
        chunked_transfer_encoding   on;

        # 此处可以通过 NGINX 添加 HTTP 头解决跨域问题
        # add_header                  'Access-Control-Allow-Origin' '*';
        # add_header                  'Access-Control-Allow-Credentials' 'true';
    }
}
```

### FFMPEG 部分

ffmpeg 推流方式为：

```shell
ffmpeg -re -i example.mp4 -vcodec copy -acodec copy -f flv rtmp://host[:port]/appname/streamname
```

- port 为可选，默认为 1935，需与 RTMP 服务监听端口一致
- appname 必选，需与 RTMP 服务的 `application` 名一致
- streamname 必须按，推流的流名称

### 前端 HTTP/flv.js 部分

[flv.js](https://github.com/bilibili/flv.js) 会将 nginx-http-flv 的推流转换为 html5 可直接播放的流媒体。

流地址:

```
http://host[:port]/live?app=demo&stream=stream-1
```

注：

- port 为可选，默认为 80，对应 http 服务的端口
- app 为 RTMP 服务的 `application` 名
- stream ffmpeg 推流时指定的流名称

更多参考：

[nginx-http-flv-module](https://github.com/winshining/nginx-http-flv-module)

[nginx-rtmp-module](https://github.com/arut/nginx-rtmp-module)

[flv.js](https://github.com/bilibili/flv.js)

[docker-nginx](https://github.com/nginxinc/docker-nginx)
