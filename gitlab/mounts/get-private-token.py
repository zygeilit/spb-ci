import re
import sys

import requests

import gitlab


URL = 'https://gitlab.com'
SIGN_IN_URL = 'https://gitlab.com/users/sign_in'
LOGIN_URL = 'https://gitlab.com/users/sign_in'

session = requests.Session()

sign_in_page = session.get(SIGN_IN_URL).content
for l in sign_in_page.split('\n'):
    m = re.search('name="authenticity_token" value="([^"]+)"', l)
    if m:
        break

token = None
if m:
    token = m.group(1)

if not token:
    print('Unable to find the authenticity token')
    sys.exit(1)

data = {'user[login]': 'login_or_email',
        'user[password]': 'SECRET',
        'authenticity_token': token}
r = session.post(LOGIN_URL, data=data)
if r.status_code != 200:
    print('Failed to log in')
    sys.exit(1)

gl = gitlab.Gitlab(URL, api_version=4, session=session)