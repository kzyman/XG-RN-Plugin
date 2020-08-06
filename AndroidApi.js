
import {
    DeviceEventEmitter,
    NativeModules,
    Platform
} from 'react-native'

//注册推送服务失败TPNS token回调
const OnRegisteredDeviceToken 		   = 'onRegisteredDeviceToken'
//注册推送服务成功回调
const OnRegisteredDone        		   = 'onRegisteredDone'
//注销推送服务回调
const UnRegistered 					   = 'unRegistered'
//收到通知消息回调
const OnReceiveNotificationResponse    = 'onReceiveNotificationResponse'
//收到透传、静默消息回调
const OnReceiveMessage                 = 'onReceiveMessage'
//绑定账号和标签回调
const XgPushDidBindWithIdentifier      = 'xgPushDidBindWithIdentifier'
//解绑账号和标签回调
const XgPushDidUnbindWithIdentifier    = 'xgPushDidUnbindWithIdentifier'
//更新账号和标签回调
const XgPushDidUpdatedBindedIdentifier = 'xgPushDidUpdatedBindedIdentifier'
//清除所有账号和标签回调
const XgPushDidClearAllIdentifiers     = 'xgPushDidClearAllIdentifiers'
//通知点击回调
const XgPushClickAction     		   = 'xgPushClickAction'

const listeners = {}

export default class AndroidApi{
/**
	* 初始化推送服务
	*
	* */
	static regPush(){
       NativeModules.XgPushModule.regPush()
	  }

	/**
	*开启debug模式
	*enable 是否为debug模式 默认不是
	*
	**/
	static setEnableDebug(enable){
		  NativeModules.XgPushModule.setEnableDebug(enable)
	  }

	/**
     * 设置心跳间隔
     *
     * @param heartbeat 心跳间隔
     */
	static setHeartbeatIntervalMs(heartbeat) {
		 NativeModules.XgPushModule.setHeartbeatIntervalMs(heartbeat)
	}


	/**
     * 反注册
     * <p>
     * 当用户已退出或 App 被关闭，不再需要接收推送时，可以取消注册 App，即反注册。
     * （一旦设备反注册，直到这个设备重新注册成功期间内，下发的消息该设备都无法收到）
     */
	static stopXg(){
         NativeModules.XgPushModule.stopXg()
	}

	 /**
     * 设置标签,单个标签
     *
     * @param tagName  标签
     */
	static setXgTag(tagName) {
		 NativeModules.XgPushModule.setXgTag(tagName)
	}

	 /**
     * 设置多tag call传参为List<String>tag的集合
     * 一次设置多个标签，会覆盖这个设备之前设置的标签。
     *
     * @param readableMap 标签集合
     */
	static setXgTags(tags){
		 NativeModules.XgPushModule.setXgTags(tags)
	}


	/**
     * 添加多个标签  call传参为List<String>tag的集合 每个 tag 不能超过40字节（超过会抛弃）不能包含空格（含有空格会删除空格)
     * 最多设置1000个 tag，超过部分会抛弃
     * 一次设置多个标签，会覆盖这个设备之前设置的标签。
     * <p>
     * <p>
     * 如果新增的标签的格式为 "test:2 level:2"，则会删除这个设备的全部历史标签，再新增 test:2 和 level。
     * 如果新增的标签有部分不带:号，如 "test:2 level"，则会删除这个设备的全部历史标签，再新增 test:2 和 level 标签。
     * <p>
     * <p>
     * 新增的 tags 中，:号为后台关键字，请根据具体的业务场景使用。
     * 此接口调用的时候需要间隔一段时间（建议大于5s），否则可能造成更新失败。
     *
     * @param readableMap 标签集合
     * @param operateName 操作名称
     */
	static addXgTags (tags){
		 NativeModules.XgPushModule.addXgTags(tags)
	}


	/**
     * 删除指定标签 call传参为TagName需要删除的标签名称
     *
     * @param tagName  标签名称
     */
	static deleteXgTag(tagName){
		NativeModules.XgPushModule.deleteXgTag(tagName)
	}

	/**
     * 删除多个标签  call传参为List<String>tag的集合 每个标签是一个 String。限制：
     * 每个 tag 不能超过40字节（超过会抛弃），不能包含空格（含有空格会删除空格）。最多设置1000个tag，超过部分会抛弃。
     *
     * @param readableMap 标签集合
     */
	static deleteXgTags(tags){
		NativeModules.XgPushModule.deleteXgTags(tags)
	}

	/**
     * 清除所有标签
     *
     */
	static cleanXgTags() {
		NativeModules.XgPushModule.cleanXgTags()
	}

	 /**
     * 获取Xg的token
     * App 第一次注册会产生 Token，之后一直存在手机上，不管以后注销注册操作，该 Token 一直存在，
     * 当 App 完全卸载重装了 Token 会发生变化。不同 App 之间的 Token 不一样。
     */
	static getToken(callback){
		NativeModules.XgPushModule.getToken(callback)
	}

	/**
     * 绑定账号注册
     * 推荐有账号体系的App使用（此接口会覆盖设备之前绑定过的账号，仅当前注册的账号生效）
     *
     * @param account  账号
     */
	static bindAccount(account){
		NativeModules.XgPushModule.bindAccount(account)
	}

	/**
     * 添加账号
     * 推荐有账号体系的App使用（此接口保留之前的账号，只做增加操作，一个token下最多只能有10个账号超过限制会自动顶掉之前绑定的账号)
     *
     * @param account  账号
     */
	static appendAccount(account){
		NativeModules.XgPushModule.appendAccount(account)
	}

	/**
     * 解除指定账号绑定
     * 账号解绑只是解除 Token 与 App 账号的关联，若使用全量/标签/Token 推送仍然能收到通知/消息。
     *
     * @param account  账号
     */
	static delAccount(account){
		NativeModules.XgPushModule.delAccount(account)
	}

	/**
     * 清除全部账号
     */
	static delAllAccount(){
		NativeModules.XgPushModule.delAllAccount()
	}

	/**
     * 开启其他推送  XGPushManager.registerPush 前，开启第三方推
     *
     * @param enable 是否开启第三方推送
     */
	 static enableOtherPush(enable){
		 	NativeModules.XgPushModule.enableOtherPush(enable)
	 }

	 /**
     * 设置小米平台的APP_KEY
     * 推荐有账号体系的App使用（此接口保留之前的账号，只做增加操作，一个token下最多只能有10个账号超过限制会自动顶掉之前绑定的账号)
     *
     * @param key appKey
     */
	static setMiPushAppKey(appKey){
		NativeModules.XgPushModule.setMiPushAppKey(appKey)
	}

	 /**
     * 设置小米平台的APP_ID
     */
	static setMiPushAppId(appId){
		NativeModules.XgPushModule.setMiPushAppId(appId)
	}

	/**
     * 设置魅族平台的的APP_KEy
     *
     * @param appKey appKey
     */
	static setMzPushAppKey(appKey)	{
		NativeModules.XgPushModule.setMzPushAppKey(appKey)
	}

	/**
     * 设置魅族平台的的APP_ID
     *
     * @param appId appID
     */
	static setMzPushAppId(appId){
		NativeModules.XgPushModule.setMzPushAppId(appId)
	}

	/**
     * 在调用腾讯移动推送 XGPushManager.registerPush前，调用以下代码：
     * 在应用首次启动时弹出通知栏权限请求窗口，应用安装周期内，提示弹窗仅展示一次。
	 *需 TPNS-OPPO 依赖包版本在 1.1.5.1 及以上支持，系统 ColorOS 5.0 以上有效。
     */
	static enableOppoNotification(enable){
		NativeModules.XgPushModule.enableOppoNotification(enable)
	}

	/**
     * 设置OPPO的key
     */
	static setOppoPushAppKey(appKey){
		NativeModules.XgPushModule.setOppoPushAppKey(appKey)
	}

	/**
     * 设置OPPO的appID
     */
	static setOppoPushAppId(appId){
		NativeModules.XgPushModule.setOppoPushAppId(appId)
	}

    //DeviceToken回调
    static addOnRegisteredDeviceTokenListener(callback) {
        listeners[callback] = DeviceEventEmitter.addListener(
            OnRegisteredDeviceToken, result => {
                callback(result)
            })
    }

    //注册推送服务成功回调
    static addOnRegisteredDoneListener(callback) {
        listeners[callback] = DeviceEventEmitter.addListener(
            OnRegisteredDone, result => {
                callback(result)
            })
    }

 	//注销推送服务回调
    static addUnRegisteredListener(callback) {
        listeners[callback] = DeviceEventEmitter.addListener(
            UnRegistered, result => {
                callback(result)
            })
    }

    //收到通知消息回调
    static addOnReceiveNotificationResponseListener(callback) {
        listeners[callback] = DeviceEventEmitter.addListener(
            OnReceiveNotificationResponse, result => {
                callback(result)
            })
    }

    //收到透传、静默消息回调
    static addOnReceiveMessageListener(callback) {
        listeners[callback] = DeviceEventEmitter.addListener(
            OnReceiveMessage, result => {
                callback(result)
            })
    }

    //设置角标回调仅iOS
    static addXgPushDidSetBadgeListener(callback) {
        listeners[callback] = DeviceEventEmitter.addListener(
            XgPushDidSetBadge, result => {
                callback(result)
            })
    }

    //绑定账号和标签回调
    static addXgPushDidBindWithIdentifierListener(callback) {
        listeners[callback] = DeviceEventEmitter.addListener(
            XgPushDidBindWithIdentifier, result => {
                callback(result)
            })
    }

    //解绑账号和标签回调
    static addXgPushDidUnbindWithIdentifierListener(callback) {
        listeners[callback] = DeviceEventEmitter.addListener(
            XgPushDidUnbindWithIdentifier, result => {
                callback(result)
            })
    }

    //更新账号和标签回调
    static addXgPushDidUpdatedBindedIdentifierListener(callback) {
        listeners[callback] = DeviceEventEmitter.addListener(
            XgPushDidUpdatedBindedIdentifier, result => {
                callback(result)
            })
    }

    //清除所有账号和标签回调
    static addXgPushDidClearAllIdentifiersListener(callback) {
        listeners[callback] = DeviceEventEmitter.addListener(
            XgPushDidClearAllIdentifiers, result => {
                callback(result)
            })
    }

    //通知点击回调
    static addXgPushClickActionListener(callback) {
        listeners[callback] = DeviceEventEmitter.addListener(
            XgPushClickAction, result => {
                callback(result)
            })
    }


    //移除事件
    static removeListener(callback) {
        if (!listeners[callback]) {
                return
            }
        listeners[callback].remove()
        listeners[callback] = null
    }
}
