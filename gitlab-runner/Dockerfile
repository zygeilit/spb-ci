
FROM centos:7

RUN curl -L https://packages.gitlab.com/install/repositories/runner/gitlab-ci-multi-runner/script.rpm.sh | bash

RUN yum install -y gitlab-runner

RUN yum install -y yum-utils device-mapper-persistent-data lvm2

RUN yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo

RUN	yum-config-manager --enable docker-ce-edge

RUN yum install -y docker-ce

# CMD systemctl start docker && /bin/bash
