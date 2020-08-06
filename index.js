import {
    DeviceEventEmitter,
    NativeModules,
    Platform
} from 'react-native'

import AndroidApi from './AndroidApi.js'

/// 设备token绑定的类型，绑定指定类型之后，就可以在信鸽前端按照指定的类型进行指定范围的推送
/// none:当前设备token不绑定任何类型，可以使用token单推，或者是全量推送（3.2.0+ 不推荐使用 ）
/// account:当前设备token与账号绑定之后，可以使用账号推送
/// tag:当前设备token与指定标签绑定之后，可以使用标签推送
if(typeof XGBindType == "undefined"){
	const XGBindType = {};
　　 XGBindType.none = 0;
　　 XGBindType.account = 1;
　　 XGBindType.tag = 2;
}

const XgPushModule = NativeModules.XgPushModule

const listeners = {}
/// 注册推送服务失败TPNS token回调
const OnRegisteredDeviceToken 		   = 'onRegisteredDeviceToken'
/// 注册推送服务成功回调
const OnRegisteredDone        		   = 'onRegisteredDone'
/// 注销推送服务回调
const UnRegistered 					   = 'unRegistered'
/// 收到通知消息回调
const OnReceiveNotificationResponse    = 'onReceiveNotificationResponse'
/// 收到透传、静默消息回调
const OnReceiveMessage                 = 'onReceiveMessage'
/// 设置角标回调仅iOS
const XgPushDidSetBadge      		   = 'xgPushDidSetBadge'
/// 绑定账号和标签回调
const XgPushDidBindWithIdentifier      = 'xgPushDidBindWithIdentifier'
/// 解绑账号和标签回调
const XgPushDidUnbindWithIdentifier    = 'xgPushDidUnbindWithIdentifier'
/// 更新账号和标签回调
const XgPushDidUpdatedBindedIdentifier = 'xgPushDidUpdatedBindedIdentifier'
/// 清除所有账号和标签回调
const XgPushDidClearAllIdentifiers     = 'xgPushDidClearAllIdentifiers'
/// 通知点击回调
const XgPushClickAction     		   = 'xgPushClickAction'


export default class XgPush {
    /* ======信鸽注册反注册和debug接口====== */


    /// debug模式默认为关闭状态
    /// @param enableDebug bool类型
    static setEnableDebug(enableDebug) {
        XgPushModule.setEnableDebug(enableDebug)
    }

    /// 注册推送服务
    /// iOS需传appId和appKey均为String类型
    /// android不需要传参数
    static startXg(appId, appKey) {
        if (Platform.OS == "ios") {
            XgPushModule.startXg(appId, appKey)
        } else {
            AndroidApi.regPush()
        }
    }

    /// 注销推送服务
    static stopXg() {
        XgPushModule.stopXg()
    }


    /* ======单个操作账号和标签====== */


    /// 绑定账号或标签
    /// @param identify String类型
    /// @param bindType XGBindType枚举值
    static bindWithIdentifier(identify, bindType) {
        if (Platform.OS == "ios") {
            XgPushModule.bindWithIdentifier(identify, bindType)
        } else {
            if(bindType==1){
              AndroidApi.appendAccount(identify)
            }else if(bindType==2){
               AndroidApi.addXgTags({tags:[identify]});
            }
        }
    }

    /// 解绑账号或标签
    /// @param identify String类型
    /// @param bindType XGBindType枚举值
    static unbindWithIdentifier(identify, bindType) {
        if (Platform.OS == "ios") {
            XgPushModule.unbindWithIdentifier(identify, bindType)
        } else {
            if(bindType==1){
                AndroidApi.delAccount(identify)
            }else if(bindType==2){
                AndroidApi.deleteXgTag(identify)
            }
        }
    }


    /* ======批量操作账号和标签====== */


    /// 批量绑定账号或标签
    /// @param bindType XGBindType枚举值
    /// ios 对于账号操作. identifys类型为dic数组[{'account':identifyStr, 'accountType':0}]
    /// ios 对于标签操作，identifys类型为字符串数组(标签字符串不允许有空格或者是tab字符) [identifyStr]
    /// android List类型为字符串数组(标签字符串不允许有空格或者是tab字符) [identifyStr]
    static bindWithIdentifiers(identifys, bindType) {
        if (Platform.OS == "ios") {
            XgPushModule.bindWithIdentifiers(identifys, bindType)
        } else {
            if(bindType==2){
                AndroidApi.addXgTags(identifys)
             }
        }
    }

    /// 批量解绑账号或标签
    /// @param bindType XGBindType枚举值
    /// ios 对于账号操作. identifys类型为dic数组[{'account':identifyStr, 'accountType':0}]
    /// ios 对于标签操作，identifys类型为字符串数组(标签字符串不允许有空格或者是tab字符) [identifyStr]
    /// android List类型为字符串数组(标签字符串不允许有空格或者是tab字符) [identifyStr]
    static unbindWithIdentifiers(identifys, bindType) {
        if (Platform.OS == "ios") {
            XgPushModule.unbindWithIdentifiers(identifys, bindType)
        } else {
              if(bindType==2){
                AndroidApi.deleteXgTags(identifys)
              }
        }
    }

    /// 清除全部账号或标签
    /// @param bindType XGBindType枚举值
    static clearAllIdentifier(bindType) {
        if (Platform.OS == "ios") {
            XgPushModule.clearAllIdentifier(bindType)
        } else {
            if(bindType==1){
            AndroidApi.delAllAccount()
            }else if(bindType==2){
            AndroidApi.cleanXgTags()
            }
        }
    }


    /* ======更新账号和标签====== */


    /// 更新账号和标签
    /// @param bindType XGBindType枚举值
    /// ios 对于账号操作. identifys类型为dic数组[{'account':identifyStr, 'accountType':0}]
    /// ios 对于标签操作，identifys类型为字符串数组(标签字符串不允许有空格或者是tab字符) [identifyStr]
    /// android List类型为字符串数组(标签字符串不允许有空格或者是tab字符) [identifyStr]
    static updateBindIdentifiers(identifys, bindType) {
        if (Platform.OS == "ios") {
            XgPushModule.updateBindIdentifiers(identifys, bindType)
        } else {
            if(bindType==2){
                AndroidApi.setXgTags(identifys)
            }
        }
    }


    /* ======设置角标仅iOS====== */


    /// 上报角标仅iOS
    /// @param badgeSum int类型
    static setBadge(badgeSum) {
        if (Platform.OS == "ios") {
            XgPushModule.setBadge(badgeSum)
        } else {

        }
    }


    /* ======信鸽callback====== */


    /// DeviceToken回调
    static addOnRegisteredDeviceTokenListener(callback) {
        listeners[callback] = DeviceEventEmitter.addListener(
            OnRegisteredDeviceToken, result => {
                callback(result)
            })
    }

    /// 注册推送服务成功回调
    static addOnRegisteredDoneListener(callback) {
        listeners[callback] = DeviceEventEmitter.addListener(
            OnRegisteredDone, result => {
                callback(result)
            })
    }

 	/// 注销推送服务回调
    static addUnRegisteredListener(callback) {
        listeners[callback] = DeviceEventEmitter.addListener(
            UnRegistered, result => {
                callback(result)
            })
    }

    /// 收到通知消息回调
    static addOnReceiveNotificationResponseListener(callback) {
        listeners[callback] = DeviceEventEmitter.addListener(
            OnReceiveNotificationResponse, result => {
                callback(result)
            })
    }

    /// 收到透传、静默消息回调
    static addOnReceiveMessageListener(callback) {
        listeners[callback] = DeviceEventEmitter.addListener(
            OnReceiveMessage, result => {
                callback(result)
            })
    }

    /// 设置角标回调仅iOS
    static addXgPushDidSetBadgeListener(callback) {
        listeners[callback] = DeviceEventEmitter.addListener(
            XgPushDidSetBadge, result => {
                callback(result)
            })
    }

    /// 绑定账号和标签回调
    static addXgPushDidBindWithIdentifierListener(callback) {
        listeners[callback] = DeviceEventEmitter.addListener(
            XgPushDidBindWithIdentifier, result => {
                callback(result)
            })
    }

    /// 解绑账号和标签回调
    static addXgPushDidUnbindWithIdentifierListener(callback) {
        listeners[callback] = DeviceEventEmitter.addListener(
            XgPushDidUnbindWithIdentifier, result => {
                callback(result)
            })
    }

    /// 更新账号和标签回调
    /// 仅IOS有
    static addXgPushDidUpdatedBindedIdentifierListener(callback) {
        listeners[callback] = DeviceEventEmitter.addListener(
            XgPushDidUpdatedBindedIdentifier, result => {
                callback(result)
            })
    }

    /// 清除所有账号和标签回调
    static addXgPushDidClearAllIdentifiersListener(callback) {
        listeners[callback] = DeviceEventEmitter.addListener(
            XgPushDidClearAllIdentifiers, result => {
                callback(result)
            })
    }

    /// 通知点击回调
    static addXgPushClickActionListener(callback) {
        listeners[callback] = DeviceEventEmitter.addListener(
            XgPushClickAction, result => {
                callback(result)
            })
    }

    /// 移除事件
    static removeListener(callback) {
        if (!listeners[callback]) {
            return
        }
        listeners[callback].remove()
        listeners[callback] = null
    }
}



