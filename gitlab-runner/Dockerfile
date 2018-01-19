
FROM centos:6

RUN curl -L https://packages.gitlab.com/install/repositories/runner/gitlab-ci-multi-runner/script.rpm.sh | bash
RUN yum install -y gitlab-runner

RUN yum update && \
	tee /etc/yum.repos.d/docker.repo <<-'EOF'
	[dockerrepo]
	name=Docker Repository
	baseurl=https://yum.dockerproject.org/repo/main/centos/$releasever/
	enabled=1
	gpgcheck=1
	gpgkey=https://yum.dockerproject.org/gpg
	EOF && \
	yum install docker-engine

RUN yum install -y git && git --version

# CMD systemctl start docker && /bin/bash
