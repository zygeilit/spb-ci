#!/bin/bash

# todo: sh脚本方式启动docker服务失败
systemctl start docker

# 启动runner 开始输出日志
gitlab-runner run
