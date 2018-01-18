
# 注册runner使用，需要添加对应的job的token

gitlab-runner register

# > Please enter the gitlab-ci coordinator URL (e.g. https://gitlab.com/):

# > Please enter the gitlab-ci token for this runner:

# > Please enter the gitlab-ci description for this runner:

# > Please enter the gitlab-ci tags for this runner (comma separated):

# > Whether to run untagged builds [true/false]:
#   a. 默认值为false。这句话的意思是：是否在没有标记tag的job上运行，如果选择默认值false，那没有标记tag的代码提交是不会触发gitlab runner的

# > Whether to lock the Runner to current project [true/false]:

# > Please enter the executor: parallels, shell, ssh, virtualbox, docker-ssh+machine, kubernetes, docker, docker-ssh, docker+machine:
