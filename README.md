# 自动化集成服务

整合Docker、Jenkins、Gitlab，搭建企业持续集成服务，实现企业内部开发流程化、项目持续交付、自动化部署


## 优势
* 服务器资源和配置使用 [挂载的方式](https://docs.docker.com/engine/admin/volumes/volumes) 添加进容器，实现服务器资源文件方便迁移、可备份

* 使用dockerfile、docker-compose配置服务器，使服务器配置可移植，方便部署和操作

* clone项目到本地一键配置服务器

## 安装使用

把项目clone到本地
```
git clone git@github.com:zygeilit/spb-ci.git
```

使用Docker创建镜像以及启动服务器
```
docker-compose up --build -d
```

进入Gitlab容器，等待服务器自动化配置，配置完毕后关闭Terminal即可
```
docker attach gitlab
```
进入Jenkins容器，等待服务器自动化配置，配置完毕后关闭Terminal即可
```
docker attach jenkins
```

访问[Gitlab](http://localhost:5000)初始化root账号，访问[Jenkins](http://localhost:5002)进行安装
```
```

执行init命令，配置Jenkins和Gitlab的权限和SSH
```
./init.sh
```

### 先决条件

系统中安装了 Docker、Docker Compose，具体的安装步骤可见 [Docker官方文档](https://www.docker.com)

### 服务器配置

服务器的细节配置，可查看项目中 Dockerfile 和 docker-compose.yml
