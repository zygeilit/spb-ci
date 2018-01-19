#!/bin/bash

# 初始化服务，用于systemctl命令，解决权限问题
# /usr/sbin/init

systemctl start docker

# 启动runner 开始输出日志
gitlab-runner run
