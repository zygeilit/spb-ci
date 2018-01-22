
import React, { Component, PropTypes } from 'react';
import{
    BaseButton
} from '@beisen/ethos';
import { calculOffset, HASHHISTORY,deepClone } from '../utils/common';
import * as urlApi from '../utils/urlApi';
import buttonHandlerMap from './handlerMap';
import { createURL } from './buttonDep/helper';
import Immutable from 'Immutable';
import * as Helper from '../utils/appHelper';

const EDITBATCH = 'editBatch';
const MOUBATCH = 'mouBatch';
const CONFIRMPOP = 'confirmPop';
const SHOWPANEL = 'showPanel';
const EXPORTBUTTON = 'ExportButton';

export default class BS_Button extends Component {
    constructor(props) {
        super(props);
        this.actions = props.containerContext.actions;
        this.memoryParams = null;
    }

    //button click之后会将当前的button数据推到reducer的active button上
    buttonClick (event,value,e) {
        if(localStorage.getItem('isDisable') || localStorage.getItem('buttonDropDown')) return;
        let isDropDown = (typeof value === 'boolean') ? false : true;
        localStorage.setItem('showIframePop','no');
        let { clickFn,sub_cmps} = this.props;
        //1.寻找定位元素，获得它的坐标，用于渲染confirm的位置。此为高度耦合逻辑，需要抽象。
        let currentTarget = event.currentTarget;
        if(currentTarget.tagName == 'LI') {
            while(currentTarget.tagName !== 'DIV') {
                currentTarget = currentTarget.parentNode;
            }
        }
        let currentTargetOffset = calculOffset(currentTarget);
            let newObj = {
            'left': currentTargetOffset.left
            ,'top': currentTargetOffset.top + currentTarget.offsetHeight
            ,'height': currentTarget.offsetHeight
            ,'width': currentTarget.offsetWidth
        };
        let str = JSON.stringify(newObj);
        localStorage.setItem('buttonUse',str);

        //2.如果传入了回调click，则执行。否则执行自己的click事件
        if(clickFn) {
            this.isActvie = false;
            let id = isDropDown ? value : value.value;
            clickFn(id,e);
        }else{
            let btnItem;
            //如果点击的是dropdownbutton,则从中提取出目标参数
            if(sub_cmps && sub_cmps.length) {
                let id = isDropDown ? value : value.value;
                sub_cmps.forEach( item => {
                    if(item.value == id) {
                       btnItem = item;
                    }
                });
            }
            let btnData = isDropDown ? value : btnItem;
            let btnOptions = Object.assign({},btnData || Immutable.fromJS(this.props).toJS());
            //这里做处理是因为新打印params数据返回的是弹窗下拉数据，所以在这里做一下转换
            if(btnOptions.cmp_data.action == 'PrintButtonV2' && sessionStorage.getItem('disablePrintBtn')) {
                return;
            }
            if(btnOptions.cmp_data.action == 'PrintButtonV2') {
                if(!this.memoryParams) {
                    this.memoryParams = deepClone(btnOptions.cmp_data.params);
                }
                btnOptions['PrintBtnUseListData'] = this.memoryParams || btnOptions.cmp_data.params;
                btnOptions.cmp_data.params = 'formState:edit';
                btnOptions['detailViewCode'] = this.props.detailViewCode || '';
            }
            let { cmp_data,cmp_type,cmp_name } = btnOptions;
            let { action } = cmp_data;
            let buttonHandler = buttonHandlerMap[action];

            if(cmp_data.params && cmp_data.params.ConfirmMessage) {
                localStorage.setItem('deleteButtonInfo',cmp_data.params.ConfirmMessage);

            }else if(typeof cmp_data.params == 'string' && cmp_data.params.indexOf('ConfirmMessage') >= 0) {
                let paramsArr = cmp_data.params.split(',');
                let paramsStr = '';
                for(let i = 0; i < paramsArr.length; i++) {
                    if(paramsArr[i].indexOf('ConfirmMessage') >= 0) {
                        paramsStr = paramsArr[i];
                    }
                }
                let b = paramsStr.split(':');
                let str = '';
                for(let i = 0; i < b.length; i++) {
                    if(b[i] == 'ConfirmMessage') {
                        str = b[i + 1];
                    }
                }
                if((str && str.indexOf('"') >= 0) || (str && str.charCodeAt(0) == 39)) {
                    str = str.slice(1,str.length - 1);
                    localStorage.setItem('deleteButtonInfo',str);
                } else {
                    localStorage.setItem('deleteButtonInfo',str);
                }

            } else {
                localStorage.removeItem('deleteButtonInfo');
            }

            if(!buttonHandler) {
                console.info('系统未定义action');
                return;
            }
            if(cmp_type != 'ButtonItem' && cmp_type != 'Button') {
                throw new Error('Button 的cmp_type 应为 ButtonItem');
            }
            //获取action的第一个handler, 当为confirmPop和showPanel的时候才判断条数
            let actionFirstHandler = this._getActionHandler(buttonHandler);
            //此action的reducer响应为：state.merge({"activeButton":Object.assign({},params,{currentHandler:0})});
            //将此button置了激活的button,然后actionQueue会渲染，开始执行button的action序列
            btnOptions.cmp_data.params = this.paramsFormat(btnOptions.cmp_data.params,action);
            //如果是 导入按钮 和 批量编辑按钮, 将固定参数写到前端
            btnOptions.cmp_data.params = this._assembleParams(btnOptions.cmp_data.params, action, actionFirstHandler);
            //提取必须的data数据
            btnOptions.data = this.dataFilter(btnOptions.cmp_data.params,btnOptions.firstFieldName);

            //判断条数
            let errorTip = this._validateDataRows(actionFirstHandler, btnOptions, btnOptions.cmp_data.params);
            if(errorTip) {
                this.actions.showTip(errorTip);
                return false;
            }
            //处理业务传的formSaveUrl_Pre参数问题
            //判断PopComponentButton时，viewName为空，增加formSaveUrl_Pre保存url
            if (btnOptions.cmp_data.action == 'PopComponentButton') {
                let _params_ = btnOptions.cmp_data.params;
                let formSaveUrl_Pre = _params_.formSaveUrl_Pre;
                if (formSaveUrl_Pre) {
                    _params_.formSaveUrl_Pre = createURL(formSaveUrl_Pre,btnOptions.queryUrl,null,btnOptions.data,_params_);
                } else if (_params_.actionType && _params_.actionType.indexOf('PopForm') > -1 && !_params_.formSaveUrl_Pre) {
                    let _pm_ = btnOptions.cmp_data.params;
                    let ops = {
                        queryUrl: btnOptions.queryUrl,
                        data: btnOptions.data,
                        cmp_data: {
                            params: {
                                formState: _pm_.formState
                            }
                        }
                    };
                    _params_.formSaveUrl_Pre = this._formatUrl(ops,_params_);
                }
            }

            //将{data.xxx}进行处理
            if(actionFirstHandler.buttonHandler == SHOWPANEL) {
                btnOptions.cmp_data.params.tempType = btnOptions.cmp_name; //导入保存时，用cmp_name区分导入的模板
                btnOptions.cmp_data.params.formSaveUrl = this._formatUrl(btnOptions,btnOptions.cmp_data.params);
            }

            //组装 url 需要的 Token信息
            btnOptions.cmp_data.params = this._assembleFeatureTokenUrl(btnOptions);

            this.actions.btnStartFn(btnOptions);
        }
    }

    render() {
        let {cmp_data,cmp_id,cls ,color,size} = this.props;
        let optionData = {
            title: cmp_data.title,
            bsSize: size || 'default',
            bsStyle: 'default',
            onClick: this.buttonClick
        };

        // 判断是否为返回按钮，再进一步判断是否显示该按钮
        let type = cmp_data.action;
        if (type === 'GoBackButton') {
            let isGoBackShow = HASHHISTORY.isGoBackShow({
                name: window.name,
                hash: location.href
            });
            if (!isGoBackShow) {
                return null;
            }
        } else if (type === 'GoForwardButton') {
            // 前进按钮已经不允许配置，不应该展示
            return null;
        }
        return (
            <BaseButton {...optionData} />
        );
    }

    //对data数据进行过滤，以减小post message的负荷
    dataFilter(params,batchEditFilter) {
        let _params = params;
        //读取所有url中的选择器
        let data = {};
        if (typeof params == 'object') {
            params = JSON.stringify(params);
        }

        let matchedKeys = params.match(/\{data\.(\S+?)(?=\})/gm) || [];
        let matchedKeys_s = params.match(/\{datas\.(\S+?)(?=\})/gm) || []; //datas 表示需要获取成多条数据，以逗号分隔

        matchedKeys = matchedKeys.map(x => x.split('.')[1]);
        matchedKeys_s = matchedKeys_s.map(x => x.split('.')[1]);

        matchedKeys.push('_id');

        matchedKeys.map(x => {
            let valArray = this.getValArray(x);
            if(x != '_id') {
                data[x] = valArray[0];
            } else {
                data[x] = JSON.stringify(this.getValArray(x));
            }
        });
        //处理{datas.}的情况
        matchedKeys_s.map(x => {
            let valArray = this.getValArray(x);
            data['_datas_' + x] = valArray.join(',');
        });

        //如果批量编辑过滤字段存在，则加载额外不同格式的数据,用于编辑失败时的提示
        if (batchEditFilter) {
            data["firstDisplayedFieldTextAry"] = this.props.data.map(x => {
                return { id: x['_id'],showText: x[batchEditFilter] };
            });
        }

        // ids,_id,id兼容
        let idArr = JSON.parse(data._id);
        data.id = idArr[0] || '';
        data.ids = data._id = idArr.join(',');
        if(idArr[0] && typeof idArr[0] == 'object') {
            data.id = idArr[0].text || '';
            data.ids = idArr[0].text || '';
        }
        //增加 dataTableItem
        if(_params.dataTableItems) {
            let matchedKeys_dataTableItems = _params.dataTableItems.split('|');
            //处理 dataTableItem:'a|b|c'的情况
            matchedKeys_dataTableItems.map(x => {
                // 获取value
                if(!data[x]) {
                    let valArray = this.getValArray(x);
                    data[x] = valArray.join(',');
                }
                //获取text
                if(!data[x + 'Text']) {
                    let textArray = this.getTextArray(x);
                    data[x + 'Text'] = textArray.join(',');
                }
            });
        }

        return data;

    }

    getValArray(key) {
        return this.props.data.map(x => {
            return x[key];
        });
    }

    getTextArray(key) {
        return this.props.dataText.map(x => {
            return x[key];
        });
    }

    //飞哥添加
    paramsFormat(params,action) {
        //这里明天要重点做处理
        if (typeof params == 'object') {
            return params;
        }
        if((action == 'PopExportButton' || action == EXPORTBUTTON) && params.indexOf('{') >= 0 && params.indexOf('}') >= 0) {
            params = params.slice(1,params.length - 1);
        }
        //移除所有空格和" ===> 如果key和value中有这些字符也会受到影响
        params = params.replace(/("+)|(\s+)/g,'').replace(/(:(?=,))|(:(?=$))/g,': ');
        //给所有key 和 value 加上双引号
        params = params.replace(/:(.+?)(,|$)/g,":\"$1\"$2").replace(/(^|,)(.+?):/g,"$1\"$2\":");

        return JSON.parse('{' + params + '}');
    }


    //获取handler,当为confirmPop和showPanel的时候才判断条数
    _getActionHandler(buttonHandler) {
        return {
            buttonHandler: buttonHandler[0].split(':')[0],
            buttonHandlerType: buttonHandler[0].split(':')[1]
        };
    }

    //验证列表选中
    _validateDataRows(actionFirstHandler, btnOptions, params) {
        let errorTip = '';
        let {buttonHandler, buttonHandlerType} = actionFirstHandler;
        if(buttonHandler == CONFIRMPOP && btnOptions.cmp_data.action != EXPORTBUTTON) {
            let validateDataRows = this._getValidateDataRowsMessage(btnOptions.data, params.dataRows);
            if(validateDataRows.error) {
                errorTip = {
                    type: 'warning'
                    ,text: validateDataRows.errorMessage
                };
            }
        }else if(buttonHandler == SHOWPANEL) {
            if(params.formState == 'create' && buttonHandlerType != EDITBATCH && buttonHandlerType != MOUBATCH) {
                params.dataRows = params.dataRows ? params.dataRows : 'none';
            }
            let validateDataRows = this._getValidateDataRowsMessage(btnOptions.data, params.dataRows);
            if(validateDataRows.error && (params.formState == 'create' || params.formState == 'edit' || buttonHandlerType == EDITBATCH || buttonHandlerType == MOUBATCH)) {
                errorTip = {
                    type: 'warning'
                    ,text: validateDataRows.errorMessage
                };
            }
        }
        return errorTip;
    }

    _getValidateDataRowsMessage(data, dataRows) {
        let error = false, errorMessage = '';
        let count = data.ids == '' ? 0 : data.ids.split(',').length;
        dataRows = dataRows ? dataRows : 'multi';

        switch(dataRows) {
            case 'single':
                if(count == 0) {
                    error = true;
                    errorMessage = '请选择一条数据！';
                }else if(count > 1) {
                    error = true;
                    errorMessage = '只能选择一条数据！';
                }
                break;
            case 'multi':
                error = count < 1 ? true : false;
                errorMessage = count < 1 ? '请至少选择一条数据！' : '';
                break;
            case 'none':
            default:
                break;
        }
        return { error: error, errorMessage: errorMessage };
    }

    //组装导入按钮 和 批量编辑按钮 的参数 将固定参数写到前端
    _assembleParams(params, action, actionFirstHandler) {
        //导入是个实体，没有后台页面配置，把固定的参数写到前端
        this.queryObj = Helper.getQueryObject();
        let importSaveUrl = urlApi.ImportSaveUrl;
        if(this.queryObj.id && this.queryObj.metaObjName) {
            importSaveUrl += '&parentId=' + this.queryObj.id + '&parentMetaObjName=' + this.queryObj.metaObjName;
        }
        if(action == 'PopImportForm') {
            params = Object.assign({}, params, {
                formState: 'create',
                viewName: BSGlobal.application + '.SystemMetaObjImportMetaObjectImportForm',
                title: params.title || '导入',
                formSaveLabel: params.formSaveLabel || '导入',
                formSaveUrl: importSaveUrl,
                formViewMetaObjName: BSGlobal.application + '.SystemMetaObjImportMetaObject'
            });
        }
        //批量编辑Button formState
        if(actionFirstHandler.buttonHandlerType == EDITBATCH && params.model == 'form') {
             params = Object.assign({}, params, {
                formState: 'create',
                formSaveUrl: urlApi.EditBatchSaveFormUrl
            });
        }
        return params;
    }

    //将{data.xxx}进行处理
    _formatUrl(btnOptions, params) {
        let { formSaveUrl, formState } = btnOptions.cmp_data.params;
        if (!formSaveUrl) {
            switch(formState) {
                case 'create':
                    formSaveUrl = urlApi.SaveCreateFormUrl;
                    break;
                case 'edit':
                    formSaveUrl = urlApi.SaveEditFormUrl;
                    break;
                default:
                    break;
            }
        }
        return createURL(formSaveUrl,btnOptions.queryUrl,null,btnOptions.data,params);
    }

    //获取签名信息
    //请求不使用 ajaxList 里面的url，是因为在事件参数中，url 是可以追加参数的，但是这个参数没有同步到 ajaxList 里面
    _assembleFeatureTokenUrl(btnOptions) {
        let { params } = btnOptions.cmp_data;
        let ajaxList = btnOptions.cmp_data.ajaxList;

        if(ajaxList && ajaxList.length > 0) {
            ajaxList.map(item => {
                params['_' + item.key + 'FeatureToken'] = {
                    token: item.token,
                    apiCode: item.apiCode,
                    featureId: btnOptions.cmp_id
                };
                params['_' + item.key + 'Method'] = item.method;
            });
        }

        return params;
    }
}
