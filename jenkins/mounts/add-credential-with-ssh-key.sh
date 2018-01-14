#!/bin/sh
# 添加Jenkins服务器上生成的私钥，和Gitlab添加的.pub对应的Key

HOST=http://127.0.0.1:8080
ACCOUNT=root:12345678
# 获取crumb token，用来使用jenkins remote api
CRUMB=`curl -u "$ACCOUNT" $HOST'/crumbIssuer/api/xml?xpath=concat(//crumbRequestField,":",//crumb)'`
# grep [^-]$: 获取行结尾不是-的内容，抓取私钥内容
# tr -d '\n': 删除换行符号
SSHKEY_PRIVATE_KEY=`cat /var/lib/jenkins/.ssh/id_rsa | grep [^-]$ | tr -d '\n'`

# Jenkins > Credentials > (global) > Add Credentials
curl -X POST -u "$ACCOUNT" -H "$CRUMB" $HOST/credentials/store/system/domain/_/createCredentials --data-urlencode 'json={
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
