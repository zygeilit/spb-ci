#!/bin/bash

systemctl start docker
# 启动runner 开始输出日志
gitlab-runner run
