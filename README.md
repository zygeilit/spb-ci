# 自动化集成服务 -spb-ci

整合Docker、Jenkins、Gitlab，搭建企业持续集成服务，实现开发流程化、项目持续交付、自动化部署

优势
-----------

* 服务器资源和配置使用 [docker.volumes](https://docs.docker.com/engine/admin/volumes/volumes) 添加进容器，实现资源文件可备份、方便迁移

* 使用 [dockerfile](https://docs.docker.com/engine/reference/builder/)、[docker-compose](https://docs.docker.com/compose/overview/) 配置服务器，使服务可复制，方便部署和操作

安装使用
-----------

把项目clone到本地
```
git clone git@github.com:zygeilit/spb-ci.git
```

使用Docker创建镜像以及启动服务器
```
docker-compose up --build -d
```

执行init命令，配置Jenkins和Gitlab的权限和SSH
```
./init.sh
```

先决条件
-----------

系统中安装了 Docker、Docker Compose，具体的安装步骤可见 [Docker官方文档](https://www.docker.com)

目标计划
-----------

* 在 **spb-ci** 基础之上，结合 [spb-builder](https://github.com/zygeilit/spb-builder) 提供的组件标准化方案，可实现PAAS公司组件生态圈

* 持续构建服务、组件生态圈、页面可视化布局的技术模块封装发布，可实现PAAS体系前端技术栈的可复制

开发计划
-----------

计划和任务的拆分，可见 [Projects](https://github.com/zygeilit/spb-ci/projects/2)

不足
-----------

* Gitlab-runner服务器使用centos7服务器（权限BUG），目前无法自动启动docker服务和runner服务，需要手动开启
* gitlab-runner register自动创建还未实现，需要手动注册
* Giltab和Jenkins服务器之间的SSH配置还未实现自动化，需要启动服务后，调用./init.sh脚本

spb-ci搭建的线上服务
-----------

使用了阿里云的云服务器，网站正在备案中 [www.zygci.com](http://39.104.66.206:5000)

可先使用IP地址访问：39.104.66.206
```
Gitlab 服务器端口: 5000
Jenkins服务器端口: 5002
最高权限账号均为: root:12345678
```
文档
-----------

gitlab-runner自动注册方案：
> https://github.com/ayufan/gitlab-ci-multi-runner/blob/master/docs/configuration/advanced-configuration.md
> https://docs.gitlab.com/ce/ci/docker/using_docker_build.html

gitlab-ci搭建方案
> https://blog.m31271n.com/2017/08/22/通过-GitLab-构建自己的-CI-CD-Pipeline/

centos7镜像权限BUG解决方案：
> https://forums.docker.com/t/any-simple-and-safe-way-to-start-services-on-centos7-systemd/5695/8

API注册Jenkins.Credentials方案
> http://www.greenreedtech.com/creating-jenkins-credentials-via-the-rest-api/

API获取Jenkins.crumb_token方案
> https://support.cloudbees.com/hc/en-us/articles/219257077-CSRF-Protection-Explained


