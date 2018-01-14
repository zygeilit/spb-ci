#!/bin/sh
# 在jenkins服务器上生成ssh-key

# 切换到jenkins用户， 生成ssh-key需要使用jenkins用户，否则jenkins自动化构建时无法拉取项目
# 生成ssh-key
su - jenkins -s /bin/sh -c "mkdir /var/lib/jenkins/.ssh && echo -e 'y\n' | ssh-keygen -t rsa -P '' -f .ssh/id_rsa"
