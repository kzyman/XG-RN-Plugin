package com.tencent.tpns.plugin;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.tencent.android.tpush.XGIOperateCallback;
import com.tencent.android.tpush.XGPushConfig;
import com.tencent.android.tpush.XGPushManager;
import java.util.HashSet;
import java.util.Set;
import androidx.annotation.Nullable;
import android.util.Log;

public class XgPushModule extends ReactContextBaseJavaModule {
    private final ReactApplicationContext reactContext;
    public static final String TAG = "XgPushModule";
    public static XgPushModule instance;

    public XgPushModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
        instance = this;
    }

    @Override
    public String getName() {
        return "XgPushModule";
    }

    @ReactMethod
    public void regPush() {
        Log.i(TAG, "regPush");
        XGPushManager.registerPush(reactContext);
    }


    @ReactMethod
    public void setEnableDebug(boolean enable) {
        Log.i(TAG, "setEnableDebug:" + enable);
        XGPushConfig.enableDebug(reactContext, enable);
    }


    @ReactMethod
    public void setHeartbeatIntervalMs(int heartbeat) {
        Log.i(TAG, "setHeartbeatIntervalMs:" + heartbeat);
        XGPushConfig.setHeartbeatIntervalMs(reactContext, heartbeat);
    }

    @ReactMethod
    public void stopXg() {
        Log.i(TAG, "stopXg:");
        XGPushManager.unregisterPush(reactContext);
    }

    @ReactMethod
    public void setXgTag(String tagName) {
        Log.i(TAG, "setXgTag:" + tagName);
        XGPushManager.setTag(reactContext, tagName);
    }

    /**
     * 设置多个标签，会覆盖之前的标签
     * @param readableMap 存储多个标签的 reableMap 对象
     */
    @ReactMethod
    public void setXgTags(ReadableMap readableMap) {
        if (readableMap == null) {
            Log.w(TAG, "setXgTags failure readableMap==null");
            return;
        }
        if (readableMap.hasKey(Extras.TAGS)) {
            ReadableArray tags = readableMap.getArray(Extras.TAGS);
            Set<String> tagSet = new HashSet<>();
            assert tags != null;
            for (int i = 0; i < tags.size(); i++) {
                String tag = tags.getString(i);
                tagSet.add(tag);
            }
            String operateName = "setXgTags" + System.currentTimeMillis();
            XGPushManager.setTags(reactContext, operateName, tagSet);
        } else {
            Log.w(TAG, "setXgTags failure no" + Extras.TAGS);
        }

    }

    /**
     * 添加多个标签，不会覆盖之前的标签
     * @param readableMap 存储多个标签的 reableMap 对象
     */
    @ReactMethod
    public void addXgTags(ReadableMap readableMap) {
        if (readableMap == null) {
            Log.i(TAG, "addXgTags failure readableMap==null");
            return;
        }
        if (readableMap.hasKey(Extras.TAGS)) {
            ReadableArray tags = readableMap.getArray(Extras.TAGS);
            Set<String> tagSet = new HashSet<>();
            assert tags != null;
            for (int i = 0; i < tags.size(); i++) {
                String tag = tags.getString(i);
                tagSet.add(tag);
            }
            String operateName = "addXgTags" + System.currentTimeMillis();
            XGPushManager.addTags(reactContext, operateName, tagSet);
        } else {
            Log.i(TAG, "addTags failure no" + Extras.TAGS);
        }
    }


    @ReactMethod
    public void deleteXgTag(String tagName) {
        Log.i(TAG, "deleteXgTag " + tagName);
        XGPushManager.deleteTag(reactContext, tagName);
    }

    /**
     * 删除多个标签
     * @param readableMap 存储多个标签的 reableMap 对象
     */
    @ReactMethod
    public void deleteXgTags(ReadableMap readableMap) {
        if (readableMap == null) {
            Log.i(TAG, "deleteXgTags failure readableMap==null");
            return;
        }
        if (readableMap.hasKey(Extras.TAGS)) {
            ReadableArray tags = readableMap.getArray(Extras.TAGS);
            Set<String> tagSet = new HashSet<>();
            assert tags != null;
            for (int i = 0; i < tags.size(); i++) {
                String tag = tags.getString(i);
                tagSet.add(tag);
            }
            String operateName = "deleteXgTags" + System.currentTimeMillis();
            XGPushManager.deleteTags(reactContext, operateName, tagSet);
        } else {
            Log.i(TAG, "deleteXgTags failure no" + Extras.TAGS);
        }
    }


    /**
     * 清除所有标签
     */
    @ReactMethod
    public void cleanXgTags() {
        Log.i(TAG, "cleanXgTags");
        String operateName = "cleanXgTags:" + System.currentTimeMillis();
        XGPushManager.cleanTags(reactContext, operateName, new XGIOperateCallback() {
            @Override
            public void onSuccess(Object o, int i) {
                WritableMap map = Arguments.createMap();
                map.putInt(Extras.RESULT_CODE, i);
                map.putString(Extras.CONTENT, "Success");
                sendEventMethod(Extras.XG_PUSH_DID_CLEAR_WITH_IDENENTIFIER, map);
            }

            @Override
            public void onFail(Object o, int i, String s) {
                WritableMap map = Arguments.createMap();
                map.putInt(Extras.RESULT_CODE, i);
                map.putString(Extras.CONTENT, s);
                sendEventMethod(Extras.XG_PUSH_DID_CLEAR_WITH_IDENENTIFIER, map);
            }
        });
    }


    @ReactMethod
    public void getToken(Callback callback) {
        String token = XGPushConfig.getToken(reactContext);
        Log.i(TAG, "getToken() token:" + token);
        callback.invoke(token);
    }


    @ReactMethod
    public void bindAccount(String account) {
        Log.i(TAG, "bindAccount() account:" + account);
        XGPushManager.bindAccount(reactContext, account);
    }


    @ReactMethod
    public void appendAccount(String account) {
        Log.i(TAG, "appendAccount() account:" + account + "");
        XGPushManager.appendAccount(reactContext, account);
    }


    @ReactMethod
    public void delAccount(String account) {
        Log.i(TAG, "delAccount() account:" + account);
        XGPushManager.delAccount(reactContext, account);
    }


    /**
     * 删除所有账号
     */
    @ReactMethod
    public void delAllAccount() {
        Log.i(TAG, "delAllAccount()");
        XGPushManager.delAllAccount(reactContext, new XGIOperateCallback() {
            @Override
            public void onSuccess(Object o, int i) {
                WritableMap map = Arguments.createMap();
                map.putInt(Extras.RESULT_CODE, i);
                map.putString(Extras.CONTENT, "Success");
                sendEventMethod(Extras.XG_PUSH_DID_CLEAR_WITH_IDENENTIFIER, map);
            }

            @Override
            public void onFail(Object o, int i, String s) {
                WritableMap map = Arguments.createMap();
                map.putInt(Extras.RESULT_CODE, i);
                map.putString(Extras.CONTENT, s);
                sendEventMethod(Extras.XG_PUSH_DID_CLEAR_WITH_IDENENTIFIER, map);
            }
        });
    }


    @ReactMethod
    public void enableOtherPush(boolean enable) {
        Log.i(TAG, "enableOtherPush()");
        XGPushConfig.enableOtherPush(reactContext, enable);
    }


    @ReactMethod
    public void setMiPushAppKey(String key) {
        Log.i(TAG, "setMiPushAppKey()");
        XGPushConfig.setMiPushAppKey(reactContext, key);
    }


    @ReactMethod
    public void setMiPushAppId(String id) {
        Log.i(TAG, "setMiPushAppId()---" + id);
        XGPushConfig.setMiPushAppId(reactContext, id);
    }


    @ReactMethod
    public void setMzPushAppKey(String appKey) {
        Log.i(TAG, "setMzPushAppKey()------" + appKey);
        XGPushConfig.setMzPushAppKey(reactContext, appKey);
    }


    @ReactMethod
    public void setMzPushAppId(String appId) {
        Log.i(TAG, "setMzPushAppId()");
        XGPushConfig.setMiPushAppId(reactContext, appId);
    }


    @ReactMethod
    public void enableOppoNotification(boolean enable) {
        Log.i(TAG, "enableOppoNotification()");
        XGPushConfig.enableOppoNotification(reactContext, enable);
    }


    @ReactMethod
    public void setOppoPushAppKey(String appKey) {
        Log.i(TAG, "setOppoPushAppKey()");
        XGPushConfig.setOppoPushAppKey(reactContext, appKey);
    }


    @ReactMethod
    public void setOppoPushAppId(String appId) {
        Log.i(TAG, "setOppoPushAppId()");
        XGPushConfig.setOppoPushAppId(reactContext, appId);
    }


    public void sendEventMethod(String eventName, @Nullable WritableMap params) {
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }
}