#!/bin/bash
# >https://gist.github.com/basmussen/8182784
# 命令的方式导入jenkins所需要的插件

HOST=http://127.0.0.1:8080
URL=/pluginManager/installNecessaryPlugins
ACCOUNT=root:12345678
CRUMB=Jenkins-Crumb:1df73a8c77fdfdf0e4b67ff7e6cd095c

# 安装gitlab插件，和Gitlab对接需要在Jenkins安装此插件
curl -XPOST -u "$ACCOUNT" -H "$CRUMB" $HOST$URL -d '<install plugin="gitlab-plugin@current"/>'

# wait 20 sec
sleep 20

# jenkins safe restart
curl -XPOST -u "$ACCOUNT" -H "$CRUMB" $HOST/safeRestart
