
# 通过 api + 项目id 获取项目的描述信息
curl --request POST --header "PRIVATE-TOKEN: pewnuvsyjy_EcrmVF4t4" "http://www.zygci.cn:5000/api/v4/projects/1/archive" | jq -r '.runners_token'
