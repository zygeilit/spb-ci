#!/bin/sh
# 使用 Gitlab Users API，把jenkins上的ssh-key添加到gitlab服务器

# 参数
SSHKEY_KEY=`cat $jenkins_home_path/.ssh/id_rsa.pub`

# https://docs.gitlab.com/ce/api/users.html#add-ssh-key
# 添加ssh-key，使用Private token，post请求
# 使用root用户添加ssh-key，root用户的 ID 是 1：可使用users api 查看id
curl -H "PRIVATE-TOKEN: '$gitlab_private_token'" -H "Content-Type: application/json" -d '{ "id": "1", "title": "rootkey", "key": "'$SSHKEY_KEY'" }' -X POST http://gitlab:30080/api/v4/users/1/keys
