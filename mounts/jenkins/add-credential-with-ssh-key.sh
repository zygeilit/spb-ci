#!/bin/sh
# 配合 groogy 执行的配置

# 添加Jenkins服务器上生成的私钥，和Gitlab添加的.pub对应的Key
HOST=http://localhost:8080
ACCOUNT=$jenkins_user:$jenkins_pass

# 获取crumb token，用来使用jenkins remote api
# > https://support.cloudbees.com/hc/en-us/articles/219257077-CSRF-Protection-Explained
CRUMB=`curl -u "$ACCOUNT" $HOST'/crumbIssuer/api/xml?xpath=concat(//crumbRequestField,":",//crumb)'`

# grep [^-]$: 获取行结尾不是-的内容，抓取私钥内容
# tr -d '\n': 删除换行符号
SSHKEY_PRIVATE_KEY=`cat $jenkins_home_path/.ssh/id_rsa | grep [^-]$ | tr -d '\n'`

# Jenkins > Credentials > (global) > Add Credentials
# > http://www.greenreedtech.com/creating-jenkins-credentials-via-the-rest-api/
curl -X POST -u "$ACCOUNT" -H "$CRUMB" $HOST/credentials/store/system/domain/_/createCredentials \
  --data-urlencode 'json={
    "": "0",
    "credentials": {
      "scope": "GLOBAL",
      "id": "gitlab_root_user",
      "username": "root",
      "password": "",
      "privateKeySource": {
        "stapler-class": "com.cloudbees.jenkins.plugins.sshcredentials.impl.BasicSSHUserPrivateKey$DirectEntryPrivateKeySource",
        "privateKey": "'$SSHKEY_PRIVATE_KEY'",
      },
      "description": "",
      "stapler-class": "com.cloudbees.jenkins.plugins.sshcredentials.impl.BasicSSHUserPrivateKey"
    }
  }'
