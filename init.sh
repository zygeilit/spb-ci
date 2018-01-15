
# Gitlab配置完Root用户密码后，提取Private Token到mounts/gitlab-private-token中，再执行init.sh
# 把jenkins服务器上的公钥push到Gitlab服务器上
docker exec jenkins $external_mounts_path/add-ssh-key-to-gitlab.sh
