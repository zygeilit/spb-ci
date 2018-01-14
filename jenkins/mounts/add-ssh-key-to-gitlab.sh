#!/bin/sh
# 使用 Gitlab Users API，把jenkins上的ssh-key添加到gitlab服务器

# 参数
PRIVATE_TOKEN=zoH2FsNGh4NYFiX9spHe
SSHKEY_KEY=`cat /var/lib/jenkins/.ssh/id_rsa.pub`

# https://docs.gitlab.com/ce/api/users.html#add-ssh-key
# 添加ssh-key，使用Private token，post请求
# 使用root用户添加ssh-key，root用户的 ID 是 1：可使用users api 查看id
curl -H "PRIVATE-TOKEN: '$PRIVATE_TOKEN'" -H "Content-Type: application/json" -d '{ "id": "1", "title": "rootkey", "key": "'$SSHKEY_KEY'" }' -X POST http://gitlab:30080/api/v4/users/1/keys
