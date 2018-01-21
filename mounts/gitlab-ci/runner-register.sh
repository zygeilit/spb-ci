
# 使用非交互的方式注册runner

# --docker-network-mode=host \
# 使用host机网络，主要是需要使用在host机子上的www.zygci.cn的域名
# 该域名是通过外部使用docker-compose创建的私有网络和gitlab服务器连接起来的

# --docker-disable-cache=true \
# 要想使用host机的网络，这里的disable-cache必须是true
# 社区中贡献的源代码中发现

gitlab-runner register \
	--non-interactive \
	--url "http://www.gitlab.cn:5000" \
	--registration-token "DVWZ3sTMqLcERXBUYEAM" \
	--executor "docker" \
	--docker-image "docker:latest" \
	--docker-network-mode=host \
	--run-untagged=true \
	--docker-disable-cache=true \
	--name "Shared Gitlab Runner Token" \
  	--tag-list "Shared Token"
