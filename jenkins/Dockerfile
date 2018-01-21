
FROM jenkins/jenkins:lts

ARG jenkins_home_path

RUN /usr/local/bin/install-plugins.sh gitlab-plugin

RUN echo -e 'y\n' | ssh-keygen -t rsa -P '' -f $jenkins_home_path/.ssh/id_rsa
