
FROM centos:6

RUN curl -L https://packages.gitlab.com/install/repositories/runner/gitlab-ci-multi-runner/script.rpm.sh | bash
RUN yum install -y gitlab-runner

RUN yum install --setopt=obsoletes=0 docker-ce-17.03.2.ce-1.el7.centos.x86_64 docker-ce-selinux-17.03.2.ce-1.el7.centos.noarch

RUN yum install -y git && git --version

# CMD systemctl start docker && /bin/bash
