
FROM centos:6

RUN yum install -y epel-release && \
    yum install -y nodejs

RUN yum -y install git

RUN yum -y install npm

CMD node $external_mounts_path/doc-web-server/bin/www && \ 
    tail -F $external_mounts_path/doc-web-server/error.log
