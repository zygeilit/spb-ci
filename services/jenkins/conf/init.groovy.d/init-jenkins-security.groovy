
// 初始化jenkins服务时，需要手动的访问jenkins服务地址初始化服务，并注册root用户
// 手动方式太依赖用户行为，服务器之间无法自动初始化
// 该脚本，自动初始化jenkins，并且注册root用户

import jenkins.model.*
import hudson.security.*
import jenkins.security.s2m.AdminWhitelistRule
 
def instance = Jenkins.getInstance()

// 获取 .env 中配置的账号信息，用于初始化
def env = System.getenv()
String user = env['jenkins_user'].trim()
String pass = env['jenkins_pass'].trim()

def hudsonRealm = new HudsonPrivateSecurityRealm(false)
hudsonRealm.createAccount(user, pass)
instance.setSecurityRealm(hudsonRealm)
 
def strategy = new FullControlOnceLoggedInAuthorizationStrategy()
instance.setAuthorizationStrategy(strategy)
instance.save()
 
Jenkins.instance.getInjector().getInstance(AdminWhitelistRule.class).setMasterKillSwitch(false)
