# HTTP-FLV

## Introduction

This repo is a Docker image of [nginx-http-flv-module](https://github.com/winshining/nginx-http-flv-module), include a [flv.js](https://github.com/bilibili/flv.js) demo.

[中文说明](https://github.com/mugennsou/http-flv/blob/master/README_CN.md)

## Installation

Pull Docker image:

```shell
docker pull mugennsou/nginx-http-flv
```

Note: you can pull the `mugennsou/nginx-http-flv:dev` tag to experience the latest (in developing) nginx-http-module.

## Usage

Start nginx-http-flv server:

```shell
docker run --rm -it -p 80:80 -p 1935:1935 mugennsou/nginx-http-flv
```

Push RTMP stream to nginx-http-flv server:

```shell
ffmpeg -re -i example.mp4 -vcodec copy -acodec copy -f flv rtmp://127.0.0.1/demo/stream-1
```

Then browse [http://127.0.0.1](http://127.0.0.1), enjoy it!

You can read here for more details:

[nginx-http-flv-module](https://github.com/winshining/nginx-http-flv-module)

[nginx-rtmp-module](https://github.com/arut/nginx-rtmp-module)

[flv.js](https://github.com/bilibili/flv.js)

[docker-nginx](https://github.com/nginxinc/docker-nginx)
