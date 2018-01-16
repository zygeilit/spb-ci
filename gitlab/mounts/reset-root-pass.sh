#!/usr/bin/env bash

gitlab-rails runner -e production "  \
  user = User.find_by(id:'1');                  \
  user.password = user.password_confirmation = '12345678'; \
  user.save!"
