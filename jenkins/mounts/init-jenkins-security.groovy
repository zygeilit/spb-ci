// > https://technologyconversations.com/2017/06/16/automating-jenkins-docker-setup/
// jenkins服务器配置好了之后，需要手动初始化，这里通过命令脚本的方式输出化jenkins，并配置root账号，账号配置在.env文件中
 
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
