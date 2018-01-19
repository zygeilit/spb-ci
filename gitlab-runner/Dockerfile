FROM centos:7

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
ENV container=docker

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

ENTRYPOINT ["entrypoint.sh"]

CMD /usr/sbin/init
