#!/bin/bash
# > https://gist.github.com/basmussen/8182784
# > https://support.cloudbees.com/hc/en-us/articles/219257077-CSRF-Protection-Explained
# 命令的方式导入jenkins所需要的插件

HOST=http://127.0.0.1:8080
ACCOUNT=root:12345678
# > https://support.cloudbees.com/hc/en-us/articles/219257077-CSRF-Protection-Explained
CRUMB=`curl -u "$ACCOUNT" '$HOST/crumbIssuer/api/xml?xpath=concat(//crumbRequestField,":",//crumb)'`

# 安装gitlab插件，和Gitlab对接需要在Jenkins安装此插件
curl -XPOST -u "$ACCOUNT" -H "$CRUMB" $HOST/pluginManager/installNecessaryPlugins -d '<install plugin="gitlab-plugin@current"/>'

# wait 20 sec
sleep 20

# jenkins safe restart
curl -XPOST -u "$ACCOUNT" -H "$CRUMB" $HOST/safeRestart
