
FROM jenkins/jenkins:lts

ARG jenkins_home_path
ARG jenkins_init_groovy_path

COPY ./mounts/executors.groovy $jenkins_init_groovy_path/executors.groovy
COPY ./mounts/init-jenkins-security.groovy $jenkins_init_groovy_path/init-jenkins-security.groovy

# RUN /usr/local/bin/install-plugins.sh gitlab-plugin

RUN echo -e 'y\n' | ssh-keygen -t rsa -P '' -f $jenkins_home_path/.ssh/id_rsa
