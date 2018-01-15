
// 添加权限到jenkins
// 使用jenkins的标准方式，添加初始化执行的groovy脚本
// 脚本调用sh脚本执行添加权限的操作
// jnekins-init-scripts目录下的文件会被copy到jenkins/init.grooy.d目录下，该目录下的groovy文件会在init时，自动执行

def env = System.getenv()
def engine = new groovy.text.SimpleTemplateEngine()
def sout = new StringBuffer(), serr = new StringBuffer()

// 拼装 shell script 命令
def template = engine.createTemplate('$external_mounts_path/$add_credential_filename').make([
	'external_mounts_path': env['external_mounts_path'].trim(),
	'add_credential_filename': env['jenkins_add_credential_filename'].trim()
])

def proc = template.toString().execute()

proc.consumeProcessOutput(sout, serr)
proc.waitForOrKill(1000)

println sout
