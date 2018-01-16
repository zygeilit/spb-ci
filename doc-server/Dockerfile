
FROM centos:6

RUN yum install -y epel-release && \
    yum install -y nodejs && \
    yum -y install git && \
    yum -y install npm && \
    yum -y update

CMD node $external_mounts_path/doc-web-server/bin/www && \ 
    tail -F $external_mounts_path/doc-web-server/error.log
