
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
