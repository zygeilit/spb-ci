#!/bin/sh
# 使用 Gitlab Users API，把jenkins上的ssh-key添加到gitlab服务器

# 参数
USERID=1
SSHKEY_KEY=`cat $jenkins_home_path/.ssh/id_rsa.pub`
GITLAB_PRIVATE_TOKEN=`cat $external_common_mounts_path/gitlab/gitlab-private-token`

# POST请求参数
DATA=`cat <<EOF
{
  "id": "$USERID",
  "title": "rootkey",
  "key": "$SSHKEY_KEY"
}
EOF`

# https://docs.gitlab.com/ce/api/users.html#add-ssh-key
# 添加ssh-key，使用Private token，post请求
# 使用root用户添加ssh-key，root用户的 ID 是 1：可使用users api 查看id
curl -H "PRIVATE-TOKEN: $GITLAB_PRIVATE_TOKEN" \
	 -H "Content-Type: application/json" \
	 -d "$DATA" \
	 -XPOST http://$gitlab_host_name:$gitlab_port/api/v4/users/$USERID/keys
