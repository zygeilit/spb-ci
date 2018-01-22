#!/bin/sh

echo workspace: $WORKSPACE
ls -l

# 取出来.builder.json中的有关doc的描述提交到文档站点
curl "http://doc-server:3000/add?type=nav&aurthor=xuhaibin@beisne.com&keywords=aa,dd,gg,zhangyue"

echo " Doc Model saved!"
