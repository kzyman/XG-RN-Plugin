# XG-RN-Plugin
克隆腾讯推送,如有侵权等问题，请及时联系我。
## 1.安装:

    cd rn工程目录
    终端执行 npm install tpns_rn_plugin --save

## 2.API接口说明:

#### 信鸽注册反注册和debug接口

    /// debug模式默认为关闭状态
    /// @param enableDebug bool类型
```dart
    static setEnableDebug(enableDebug)
```

    /// 注册推送服务
    /// iOS需传appId和appKey均为String类型
    /// android不需要传参数
```dart
    static startXg(appId, appKey)
```

    /// 注销推送服务
```dart
    static stopXg()
```

#### 单个操作账号和标签

    /// 绑定账号或标签
    /// @param identify String类型
    /// @param bindType XGBindType枚举值
```dart
    static bindWithIdentifier(identify, bindType)
```

    /// 解绑账号或标签
    /// @param identify String类型
    /// @param bindType XGBindType枚举值
```dart
    static unbindWithIdentifier(identify, bindType)
```

#### 批量操作账号和标签

	/// 批量绑定账号或标签
    /// @param bindType XGBindType枚举值
	/// ios 对于账号操作. identifys类型为dic数组[{'account':identifyStr, 'accountType':0}]
	/// ios 对于标签操作，identifys类型为字符串数组(标签字符串不允许有空格或者是tab字符) [identifyStr]
	/// android List类型为字符串数组(标签字符串不允许有空格或者是tab字符) [identifyStr]
```dart
    static bindWithIdentifiers(identifys, bindType)
```

    /// 批量解绑账号或标签
    /// @param bindType XGBindType枚举值
	/// ios 对于账号操作. identifys类型为dic数组[{'account':identifyStr, 'accountType':0}]
	/// ios 对于标签操作，identifys类型为字符串数组(标签字符串不允许有空格或者是tab字符) [identifyStr]
	/// android List类型为字符串数组(标签字符串不允许有空格或者是tab字符) [identifyStr]
```dart
    static unbindWithIdentifiers(identifys, bindType)
```

    /// 清除全部账号或标签
    /// @param bindType XGBindType枚举值
    /// android暂时不提供清除全部账号操作
```dart
    static clearAllIdentifier(bindType)
```

#### 更新账号和标签

	/// 更新账号和标签
    /// @param bindType XGBindType枚举值
	/// ios 对于账号操作. identifys类型为dic数组[{'account':identifyStr, 'accountType':0}]
	/// ios 对于标签操作，identifys类型为字符串数组(标签字符串不允许有空格或者是tab字符) [identifyStr]
	/// android List类型为字符串数组(标签字符串不允许有空格或者是tab字符) [identifyStr]
```dart
    static updateBindIdentifiers(identifys, bindType)
```

#### 上报角标仅iOS

	/// 上报角标仅iOS
    /// @param badgeSum int类型
```
    static setBadge(badgeSum)
```

#### 设置应用显示角标仅iOS

	/// 设置应用的角标个数显示仅iOS
    /// @param badgeSum int类型
```
    static setXgApplicationBadgeNumber(badgeSum)
```

## 3.使用:
###   iOS:
#### 3.1pod集成
- 进入到iOS工程执行pod install
- 注意：如果项目里使用pod安装过，请先执行命令pod deintegrate
      
      
      
      
###   Android
#### 1. 环境配置
#### 1.1 在项目的package.json中加入依赖
```
    "dependencies": {
        .....
        "tpns_rn_plugin": "^1.0.3"
    }
```

#### 1.2 在工程目录运行命令安装插件
```
    npm install xg_rn_plugin --save
```

#### 1.3 在android app模块下的build.gradle中进行配置代码如下:
```
    android: {
                 ....
                 defaultConfig {
                   applicationId "替换成自己应用 ID"
                   ...
                   //
                   manifestPlaceholders = [
                       XG_ACCESS_ID : "替换自己的ACCESS_ID",  //信鸽官网注册所得ACCESS_ID
                       XG_ACCESS_KEY : "替换自己的ACCESS_KEY", //信鸽官网注册所得ACCESS_KEY
            
                   ]
                 }
               }
```

#### 1.4 RN0.6以下在Application中getPackages添加XgPushPackage()
``` 
     @Override
     protected List<ReactPackage> getPackages() {
          List<ReactPackage> packages = new PackageList(this).getPackages();
          packages.add(new XgPushPackage());
          return packages;
     }
```

#### 2 安卓端 XgAndroidApi 接口说明
#### 2.0.1 注册推送服务
```
    static regPush()
```

#### 2.0.2 开启debug模式
```
    /**
    *enable 是否为debug模式 默认不是
    **/
    static setEnableDebug(enable)
```

#### 2.0.3 设置心跳间隔
```
    /**
     * @param heartbeat 心跳间隔
     */
    static setHeartbeatIntervalMs(heartbeat)
```

#### 2.0.4 反注册推送服务
```
    static stopXg()
```

#### 2.0.5 设置单个标签
```
    static setXgTag(tag)
```

#### 2.0.6 设置多个标签,会覆盖这个设备之前设置的标签
```
   	static setXgTags(tags)
```

#### 2.0.7 添加多个标签,每个 tag 不能超过40字节（超过会抛弃）不能包含空格（含有空格会删除空格)最多设置1000个 tag，
####       超过部分会抛弃,会覆盖这个设备之前设置的标签
```
	static addXgTags (tags)
```

#### 2.0.8 删除指定标签
```
    static deleteXgTag(tag)
```

#### 2.0.9 删除多个标签
```
	static deleteXgTags(tags)
```

#### 2.1.0 清除所有标签
```
    static cleanXgTags()
```

#### 2.1.1 获取Xg的token,callback 回调函数
```
	static getToken(callback)
```

#### 2.1.2 绑定账号,此接口会覆盖设备之前绑定过的账号，仅当前注册的账号生效
```
    static bindAccount(account)
```

#### 2.1.3 添加账号,此接口保留之前的账号，只做增加操作，一个token下最多只能有10个账号超过限制会自动顶掉之前绑定的账号
```
	static appendAccount(account)
```

#### 2.1.4 解除指定账号绑定,账号解绑只是解除 Token 与 App 账号的关联
```
	static delAccount(account)
```

#### 2.1.5 清除全部账号
```
    static delAllAccount()
```

#### 2.1.6 开启其他推送,enable boolean类型值
```
    static enableOtherPush(enable)
```

#### 2.1.7 设置小米平台的APP_KEY
```
    static setMiPushAppKey(appKey)
```

#### 2.1.8 设置小米平台的APP_ID
```
    static setMiPushAppId(appId)
```

#### 2.1.9 设置魅族平台的的APP_KEy
```
    static setMzPushAppKey(appKey)
```

#### 2.2.0 设置魅族平台的的APP_ID
```
    static setMzPushAppId(appId)
```

####2.2.1 设置是否开启oppo通知
```
    static enableOppoNotification(enable)
```

#### 2.2.2 设置OPPO的key
```
    static setOppoPushAppKey(appKey)
```

#### 2.2.3 设置OPPO的appID
```
    static setOppoPushAppId(appId)
```

#### 2.2.4 添加注册获取token回调,callback回调函数对象
```
    static addOnRegisteredDeviceTokenListener(callback)
```

#### 2.2.5 添加注册推送服务成功回调,callback回调函数对象
```
     static addOnRegisteredDoneListener(callback)
```

#### 2.2.6 添加注销推送服务回调,callback回调函数对象
```
     static addUnRegisteredListener(callback)
```

#### 2.2.7 添加收到通知消息回调
```
    static addOnReceiveNotificationResponseListener(callback)
```

#### 2.2.8 添加收到透传、静默消息回调
```
    static addOnReceiveMessageListener(callback) 
```

##### 2.2.9 添加绑定账号和标签回调
```
    static addXgPushDidBindWithIdentifierListener(callback)
```

#### 2.3.0 添加解绑账号和标签回调
```
    static addXgPushDidUnbindWithIdentifierListener(callback)
```

#### 2.3.1 添加更新账号和标签回调
```
    static addXgPushDidUpdatedBindedIdentifierListener(callback)
```

#### 2.3.2 添加清除所有账号和标签回调
```
    static addXgPushDidClearAllIdentifiersListener(callback)
```

#### 2.3.3 添加通知点击回调
```
    static addXgPushClickActionListener(callback)
```

#### 2.3.4 移除事件
```
    static removeListener(callback)
```


#### 3. 安卓端回调接口说明
#### 3.1 透传消息、回调接口
```
    _onReceiveMessage 数据类型 Map<String, Object> para:
        key:
            title:标题
            content：消息文本
            customMessage：自定义 key-value
            pushChannel：推送通道
```

#### 3.2 收到通知消息回调
```
    _onReceiveNotificationResponse    数据类型 Map<String, Object> para = new HashMap<>()
         key：
             title:标题
             content：消息文本
             customMessage：自定义 key-value
             pushChannel：推送通道
             notifactionId：通知ID
             msgId：消息ID
             activity：活动
             notifactionActionType：通知类型
```

#### 3.3 通知点击回调
```
    _xgPushClickAction   数据类型 Map<String, Object> para:
        kay：
            title:标题
            content：消息文本
            customMessage：自定义 key-value
            msgId：消息ID
            notifactionActionType：通知ID
            activityName：活动名称
            actionType：类型
```

#### 4. 代码混淆
```
      #TPNS SDK
      -keep public class * extends android.app.Service
      -keep public class * extends android.content.BroadcastReceiver
      -keep class com.tencent.android.tpush.** {*;}
      -keep class com.tencent.tpns.baseapi.** {*;}
      -keep class com.tencent.tpns.mqttchannel.** {*;}
      -keep class com.tencent.tpns.dataacquisition.** {*;}
```

### Android 厂商通道接入说明
#### 1. 华为通道接入，可参考信鸽SDK[华为通道接入](https://cloud.tencent.com/document/product/548/36653)
#### 1.1. 在 App 模块下的 build.gradle 文件内添加以下配置：
```
      android: {
        defaultConfig {
          manifestPlaceholders = [
            ....
            // 配置华为 APPID               
            HW_APPID: "华为的APPID"
            .....
          ]
        }
      }
```

```
        // 导入华为推送相关依赖
        implementation 'com.tencent.tpns:huawei:1.1.5.5-release'// 华为推送
```

#### 1.2 开启华为推送,在调用 `regPush()`注册信鸽推送之前调用启用三方通道接口以开启厂商推送：

```
      AndroidApi.enableOtherPush(true);
      AndroidApi.regPush();
```

#### 1.3 代码混淆

```
      -ignorewarning
      -keepattributes *Annotation*
      -keepattributes Exceptions
      -keepattributes InnerClasses
      -keepattributes Signature
      -keepattributes SourceFile,LineNumberTable
      -keep class com.hianalytics.android.**{*;}
      -keep class com.huawei.updatesdk.**{*;}
      -keep class com.huawei.hms.**{*;}
      -keep class com.huawei.android.hms.agent.**{*;}
```

#### 2. 小米通道接入，可参考信鸽SDK[小米通道接入](https://cloud.tencent.com/document/product/548/36653)
#### 2.1 引入小米推送的依赖
```
      implementation 'com.tencent.tpns:xiaomi:1.1.5.5-release'// 小米推送 
```

#### 2.2 开启小米推送
```
      // 设置小米 AppID 和 AppKey。
      AndroidApi.setMiPushAppId(appId);
      AndroidApi.setMiPushAppKey(appKey);
      
      // 打开第三方推送并注册
      AndroidApi.enableOtherPush(true);
      AndroidApi.regPush();
```

#### 2.3 代码混淆
```
      -keep class com.xiaomi.**{*;}
      -keep public class * extends com.xiaomi.mipush.sdk.PushMessageReceiver
```

#### 3. 魅族通道接入，可参考信鸽SDK[魅族通道接入](https://cloud.tencent.com/document/product/548/36655)
#### 3.1 引入魅族推送的依赖
```
      implementation 'com.tencent.tpns:meizu:1.1.5.5-release'// 魅族推送 
```

#### 3.2 开启魅族推送
```
      // 设置魅族 AppID 和 AppKey
      AndroidApi.setMzPushAppId(appId);
      AndroidApi.setMzPushAppKey(appKey);
      
      // 打开第三方推送
      AndroidApi.enableOtherPush(true);
      AndroidApi.regPush();
```

#### 3.3 代码混淆
```
      -dontwarn com.meizu.cloud.pushsdk.**
      -keep class com.meizu.cloud.pushsdk.**{*;}
```

#### 4. vivo通道接入，可参考信鸽SDK [vivo通道接入](https://cloud.tencent.com/document/product/548/36657)
#### 4.1 在 App 模块下的 build.gradle 文件内
```
      android: {
        defaultConfig {
          manifestPlaceholders = [
            ....
            VIVO_APPID: "VIVO的APPID"
            VIVO_APPKEY:"VIVO的APP_KEy",
            .....
          ]
        }
      }
```
```
      // 引入 vivo 推送的依赖
      implementation 'com.tencent.tpns:vivo:1.1.5.5-release'// vivo 推送
```

#### 4.2 启用 vivo 推送
```
      // 打开第三方推送
      AndroidApi.enableOtherPush(true);
      AndroidApi.regPush();
```

#### 4.3代码混淆
```
      -dontwarn com.vivo.push.**
      -keep class com.vivo.push.**{*; }
      -keep class com.vivo.vms.**{*; }
      -keep class com.tencent.android.vivopush.VivoPushMessageReceiver{*;}
```

#### 5. OPPO通道接入，可参考信鸽SDK [OPPO通道接入](https://cloud.tencent.com/document/product/548/36658)
#### 5.1 引入 OPPO 推送的依赖
```
      implementation 'com.tencent.tpns:oppo:1.1.5.5-release'// OPPO 推送 
```

#### 5.2 请求通知栏权限（可选），在调用腾讯移动推送`XgAndroidApi.regPush()`前，调用以下代码：
```
      // TPNS-OPPO 依赖包版本在 1.1.5.1 及以上支持，系统 ColorOS 5.0 以上有效
      AndroidApi.enableOppoNotification(true);
```

#### 5.3 开启推送
```
      // 设置OPPO AppKey 和 AppSecret
      AndroidApi.setOppoPushAppId("Oppo的AppKey");
      AndroidApi.setOppoPushAppKey( "Oppo的AppKey");
      
      // 打开第三方推送
      AndroidApi.enableOtherPush(true);
      AndroidApi.regPush();
```

#### 5.4 代码混淆
```
      -keep public class * extends android.app.Service
      -keep class com.heytap.mcssdk.** {*;}
      -keep class com.heytap.msp.** { *;}
```

#### 6. FCM通道接入，可参考信鸽SDK [FCM通道接入](https://cloud.tencent.com/document/product/548/36656)
#### 6.1 添加 google-services.json 文件，请参考[FCM通道配置文件](https://cloud.tencent.com/document/product/548/36656#.E9.85.8D.E7.BD.AE.E5.86.85.E5.AE.B9)。
#### 6.2 在项目级的 build.gradle 文件中的 dependencies 节点中添加下面代码，集成谷歌 service
```
      classpath 'com.google.gms:google-services:4.2.0'
```

#### 6.3 在应用级的 build.gradle 文件中，添加依赖：
```
      implementation 'com.tencent.tpns:fcm:1.1.5.5-release' // fcm 推送
      implementation  'com.google.firebase:firebase-messaging:17.6.0'
```

#### 6.4 并在应用级的 build.gradle 文件末尾新增
```
      apply plugin: 'com.google.gms.google-services'
```

#### 6.5 启用 FCM 推送
```
      // 打开第三方推送
      AndroidApi.enableOtherPush(true);
      AndroidApi.regPush();
```



