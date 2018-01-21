# systemd 解决方案
# > https://forums.docker.com/t/any-simple-and-safe-way-to-start-services-on-centos7-systemd/5695/8

FROM centos:7

ENV container=docker

# gitlab-runner
RUN curl -L https://packages.gitlab.com/install/repositories/runner/gitlab-ci-multi-runner/script.rpm.sh | bash
RUN yum install -y gitlab-runner

# docker
RUN yum install -y yum-utils device-mapper-persistent-data lvm2
RUN yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
RUN	yum-config-manager --enable docker-ce-edge
RUN yum install -y docker-ce

# ------------------------------------------start---------------------------------------------
# ------------------------------解决在centos7 systemd 权限bug中---------------------------------
# --------------------------------------------------------------------------------------------

RUN (cd /lib/systemd/system/sysinit.target.wants/; for i in *; do [ $i == systemd-tmpfiles-setup.service ] || rm -f $i; done); \
rm -f /lib/systemd/system/multi-user.target.wants/*;\
rm -f /etc/systemd/system/*.wants/*;\
rm -f /lib/systemd/system/local-fs.target.wants/*; \
rm -f /lib/systemd/system/sockets.target.wants/*udev*; \
rm -f /lib/systemd/system/sockets.target.wants/*initctl*; \
rm -f /lib/systemd/system/basic.target.wants/*;\
rm -f /lib/systemd/system/anaconda.target.wants/*;

# named (dns server) service
RUN yum install -y bind bind-utils
RUN systemctl enable named.service

# --------------------------------------------------------------------------------------------
# ------------------------------解决在centos7 systemd 权限bug中---------------------------------
# ----------------------------------------end-------------------------------------------------

# 把命令复制到bin目录下，让ENTRYPOINT可执行
# ADD ./entrypoint.sh /
# RUN chmod 755 /entrypoint.sh

# 初始化服务，用于systemctl命令，解决权限问题
# ENTRYPOINT systemctl start docker

# 提取Gitlab Runner Token时使用
# RUN yum install -y jq

# 需要使用 /usr/sbin/init 启动，然后开启docker 和启动gitlab-runner
CMD ["/usr/sbin/init"]
