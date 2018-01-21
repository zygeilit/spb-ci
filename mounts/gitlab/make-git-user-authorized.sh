#!/bin/bash
# http://blog.csdn.net/wershest/article/details/77713923

groupadd git
adduser git -g git

vi /etc/passwd
git:x:500:500::/home/git:/bin/bash > git:x:500:500::/home/git:/usr/bin/git-shell

cd /home/git/
mkdir .ssh
chmod 700 .ssh
touch .ssh/authorized_keys
chmod 600 .ssh/authorized_keys
chown -R git:git .ssh
