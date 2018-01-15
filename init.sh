
# 进入jenkins服务器，添加credential
docker exec jenkins /var/external-mounts/add-credential-with-ssh-key.sh

# Gitlab配置完Root用户密码后，提取Private Token到mounts/gitlab-private-token中，再执行init.sh
# 把jenkins服务器上的公钥push到Gitlab服务器上
docker exec jenkins /var/external-mounts/add-ssh-key-to-gitlab.sh
