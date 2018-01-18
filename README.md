# 自动化集成交付部署平台

整合Docker、Jenkins、Gitlab，搭建企业持续集成平台，实现企业内部开发流程化、项目持续交付、自动化部署


## 优势
* 服务器资源和配置使用挂载的方式添加进服务器(Docker.volumnes)，实现服务器资源文件方便迁移、可备份

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

访问 http://localhost:5000, 初始化root账号，访问 http://localhost:5002, 进行jenkins的初始化配置
```
```

调用命令行输出化Gitlab服务器和Jenkins服务器的配置，命令执行完毕后，所有服务器就已经配置成功了
```
./init.sh
```

### 先决条件

系统中安装了 Docker、Docker Compose，具体的安装步骤可见 [Docker官方文档](http://www.baidu.com)

### Installing

A step by step series of examples that tell you have to get a development env running

Say what the step will be

```
Give the example
```

And repeat

```
until finished
```

End with an example of getting some data out of the system or using it for a little demo

## Running the tests

Explain how to run the automated tests for this system

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [Maven](https://maven.apache.org/) - Dependency Management
* [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Billie Thompson** - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* http://www.ruanyifeng.com/blog/2015/09/continuous-integration.html
* Inspiration
* etc
