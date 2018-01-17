#!/bin/bash

# jenkins中构建任务的统一执行入口
# 在构建任务所在的文件夹找到所有的非此sh文件的，所有shell script依次执行
# 任何想在jenkins上添加的构建任务添加sh脚本即可

# $external_common_mounts_path | $jenkins_executer_folder_name
# 由docker-compose.yml文件加入的环境变量

for filename in $external_common_mounts_path/$jenkins_executer_folder_name/*.sh; do
  # 如果是入口sh，则continue，避免死循环
  if [[ $filename =~ shell-scripts-executer.sh ]]; then
    continue
  fi
  $filename
done
