#!/bin/bash
# >https://gist.github.com/basmussen/8182784
# 命令的方式导入jenkins所需要的插件

HOST=http://127.0.0.1:8080
URL=/pluginManager/installNecessaryPlugins

# git plugin https://wiki.jenkins-ci.org/display/JENKINS/Git+Plugin
curl -XPOST $HOST$URL -d '<install plugin="gitlab@current"/>'

# wait 20 sec
sleep 20

# jenkins safe restart
curl -X POST $HOST/safeRestart
