
FROM centos:6

RUN yum install -y wget && \
	wget -qO- https://rpm.nodesource.com/setup_7.x | bash && \
	yum install -y nodejs && \
	node -v && \
	npm -v

RUN yum install -y git && \
	git --version

RUN cd $external_common_mounts_path/doc-web-server && \
    npm install

CMD node $external_common_mounts_path/doc-web-server/bin/www && \
	tail -F $external_common_mounts_path/doc-web-server/error.log
