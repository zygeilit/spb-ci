# 非交互式注册方式
# link:
# 1. # 2. https://blog.m31271n.com/2017/08/22/%E9%80%9A%E8%BF%87-GitLab-%E6%9E%84%E5%BB%BA%E8%87%AA%E5%B7%B1%E7%9A%84-CI-CD-Pipeline/

REG_TOKEN=$1
NAME=$2

docker exec -it gitlab-runner gitlab-runner register \
  --non-interactive \
  --url http://$gitlab_host_name/ \
  --registration-token $1 \
  --name $2 \
  --tag-list docker-in-docker \
  # false
  --run-untagged=true \
  --executor docker \
  --docker-image docker:latest \
  # docker:dind 需要 privileged 权限
  --docker-privileged
