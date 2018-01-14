# > https://technologyconversations.com/2017/06/16/automating-jenkins-docker-setup/

FROM centos

RUN yum install -y java-1.8.0-openjdk.x86_64
RUN cp /etc/profile /etc/profile_backup && \
    echo 'export JAVA_HOME=/usr/lib/jvm/jre-1.8.0-openjdk' | tee -a /etc/profile && \
    echo 'export JRE_HOME=/usr/lib/jvm/jre' | tee -a /etc/profile && \
    source /etc/profile && \
    echo $JAVA_HOME && \
    echo $JRE_HOME && \
    java -version

RUN yum install -y wget
RUN cd ~ && \
    wget -O /etc/yum.repos.d/jenkins.repo https://pkg.jenkins.io/redhat-stable/jenkins.repo && \
    rpm --import https://pkg.jenkins.io/redhat-stable/jenkins.io.key && \
    yum install -y jenkins

RUN yum -y install initscripts && \
    yum clean all

RUN yum -y install git && \
    git --version

RUN yum install -y epel-release && \
    yum install -y nodejs && \
    echo Nodejs Version: `node -v`

# 配置自定义初始化
# We used JAVA_OPTS to disable the setup wizard. We won’t need it since our setup will be fully automated.
# > https://technologyconversations.com/2017/06/16/automating-jenkins-docker-setup/
ENV JAVA_OPTS="-Djenkins.install.runSetupWizard=false"

# 复制自定义初始化脚本到jenkins配置中
# init.groovy.d中的脚本，jenkins在初始化时，都会默认执行
RUN cp $external_mounts_path/init-jenkins-security.groovy /usr/share/jenkins/ref/init.groovy.d/init-jenkins-security.groovy

ENTRYPOINT service jenkins start && /bin/bash
