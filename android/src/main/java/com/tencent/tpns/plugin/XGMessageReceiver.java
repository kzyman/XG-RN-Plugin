package com.tencent.tpns.plugin;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.tencent.android.tpush.XGPushBaseReceiver;
import com.tencent.android.tpush.XGPushClickedResult;
import com.tencent.android.tpush.XGPushRegisterResult;
import com.tencent.android.tpush.XGPushShowedResult;
import com.tencent.android.tpush.XGPushTextMessage;
import android.content.Context;



public class XGMessageReceiver extends XGPushBaseReceiver {
    /**
     * 注册结果回调
     *
     * @param context   上下文
     * @param errorCode 结果码 XGPushBaseReceiver.SUCCESS成功
     * @param message   注册响应结果 xgPushRegisterResult.getToken获取设备token
     */
    @Override
    public void onRegisterResult(Context context, int errorCode, XGPushRegisterResult message) {
        if (errorCode == XGPushBaseReceiver.SUCCESS) {
            WritableMap map = Arguments.createMap();
            String token = message.getToken();
            map.putString(Extras.XG_TOKEN, token);
            XgPushModule.instance.sendEventMethod(Extras.ON_REGISTERED_DONE, map);
        } else {
            WritableMap map = Arguments.createMap();
            String token = message.getToken();
            map.putString(Extras.XG_TOKEN, token);
            XgPushModule.instance.sendEventMethod(Extras.ON_REGISTERED_DEVICE_TOKEN, map);
        }
    }

    /**
     * 注销结果回调
     *
     * @param context   上下文
     * @param errorCode 结果码 XGPushBaseReceiver.SUCCESS成功
     */
    @Override
    public void onUnregisterResult(Context context, int errorCode) {
        if (errorCode == XGPushBaseReceiver.SUCCESS) {
            WritableMap map = Arguments.createMap();
            map.putString(Extras.CONTENT, "UnRegister  successful");
            map.putInt(Extras.RESULT_CODE,errorCode);
            XgPushModule.instance.sendEventMethod(Extras.UN_REGISTERED, map);
        } else {
            WritableMap map = Arguments.createMap();
            map.putInt(Extras.RESULT_CODE, errorCode);
            map.putString(Extras.CONTENT, "Unregister  failure");
            XgPushModule.instance.sendEventMethod(Extras.UN_REGISTERED, map);
        }
    }

    /**
     * 设置Tag结果回调
     *
     * @param context   上下文
     * @param errorCode 结果码
     * @param s         消息
     */
    @Override
    public void onSetTagResult(Context context, int errorCode, String s) {
        WritableMap map = Arguments.createMap();
        map.putInt(Extras.RESULT_CODE, errorCode);
        map.putString(Extras.CONTENT, s);
        XgPushModule.instance.sendEventMethod(Extras.XG_PUSH_DID_BIND_WITH_IDENENTIFIER, map);
    }

    /**
     * 删除Tag结果回调
     *
     * @param context   上下文
     * @param errorCode 结果码
     * @param s         消息
     */
    @Override
    public void onDeleteTagResult(Context context, int errorCode, String s) {
        WritableMap map = Arguments.createMap();
        map.putInt(Extras.RESULT_CODE, errorCode);
        map.putString(Extras.CONTENT, s);
        XgPushModule.instance.sendEventMethod(Extras.XG_PUSH_DID_UNBIND_WITH_IDENENTIFIER, map);
    }

    /**
     * 设置账号结果回调
     *
     * @param context   上下文
     * @param errorCode 结果码
     * @param s         消息
     */
    @Override
    public void onSetAccountResult(Context context, int errorCode, String s) {
        WritableMap map = Arguments.createMap();
        map.putInt(Extras.RESULT_CODE, errorCode);
        map.putString(Extras.CONTENT, s);
        XgPushModule.instance.sendEventMethod(Extras.XG_PUSH_DID_BIND_WITH_IDENENTIFIER, map);
    }

    /**
     * 删除账号结果回调
     *
     * @param context   上下文
     * @param errorCode 结果码
     * @param s         消息
     */
    @Override
    public void onDeleteAccountResult(Context context, int errorCode, String s) {
        WritableMap map = Arguments.createMap();
        map.putInt(Extras.RESULT_CODE, errorCode);
        map.putString(Extras.CONTENT, s);
        XgPushModule.instance.sendEventMethod(Extras.XG_PUSH_DID_UNBIND_WITH_IDENENTIFIER, map);
    }

    /**
     * 收到透传通知消息
     *
     * @param context 上下文
     * @param message 信鸽推送文本消息
     */
    @Override
    public void onTextMessage(Context context, XGPushTextMessage message) {
        String content = message.getContent();
        String customContent = message.getCustomContent();
        String title = message.getTitle();
        int pushChannel = message.getPushChannel();
        WritableMap map = Arguments.createMap();
        map.putString(Extras.TITLE, title);
        map.putString(Extras.CONTENT, content);
        map.putString(Extras.CUSTOM_MESSAGE, customContent);
        map.putString(Extras.PUSH_CHANNEL, String.valueOf(pushChannel));
        //交由Flutter自主处理
        XgPushModule.instance.sendEventMethod(Extras.ON_RECEIVE_MESSAGE, map);
    }

    /**
     * 通知栏消息点击回调
     *
     * @param context         上下文
     * @param notifiShowedRlt 信鸽推送消息点击结果
     */
    @Override
    public void onNotificationClickedResult(Context context, XGPushClickedResult notifiShowedRlt) {
        if (context == null || notifiShowedRlt == null) {
            WritableMap map = Arguments.createMap();
            map.putString(Extras.MESSAGE,
                    "通知栏展示失败----context == null ||  notifiShowedRlt == null");
//            RNXgPushModule.instance
//                    .sendEventMethod(Extras.TO_FLUTTER_METHOD_NOTIFACTION_SHOW_RESULT, para);
            return;
        }
        String content = notifiShowedRlt.getContent();
        String customContent = notifiShowedRlt.getCustomContent();
        String title = notifiShowedRlt.getTitle();
        int notificationActionType = notifiShowedRlt.getNotificationActionType();
        long msgId = notifiShowedRlt.getMsgId();
        String activityName = notifiShowedRlt.getActivityName();
        long actionType = notifiShowedRlt.getActionType();

        WritableMap map = Arguments.createMap();
        map.putString(Extras.TITLE, title);
        map.putString(Extras.CONTENT, content);
        map.putString(Extras.CUSTOM_MESSAGE, customContent);
        map.putString(Extras.MSG_ID, String.valueOf(msgId));
        map.putString(Extras.NOTIFACTION_ACTION_TYPE, String.valueOf(notificationActionType));
        map.putString(Extras.ACTIVITY_NAME, activityName);
        map.putString(Extras.ACTION_TYPE, String.valueOf(actionType));
        //交由Flutter自主处理
        XgPushModule.instance.sendEventMethod(Extras.XG_PUSH_CLICK_ACTION, map);
    }

    /**
     * 通知栏显示
     *
     * @param context 上下文
     * @param message 显示结果
     */
    @Override
    public void onNotificationShowedResult(Context context, XGPushShowedResult message) {
        if (context == null || message == null) {
            WritableMap para = Arguments.createMap();
            para.putInt(Extras.RESULT_CODE, -1);
            para.putString(Extras.MESSAGE,
                    "点击通知失败----context == null ||  XGPushClickedResult == null");
//             RNXgPushModule.instance
//                     .sendEventMethod(Extras.TO_FLUTTER_METHOD_NOTIFACTION_SHOW_RESULT, para);
            return;
        }
        String content = message.getContent();
        String customContent = message.getCustomContent();
        int notifactionId = message.getNotifactionId();
        String title = message.getTitle();
        long msgId = message.getMsgId();
        String activityPath = message.getActivity();
        int pushChannel = message.getPushChannel();
        int notificationActionType = message.getNotificationActionType();
        WritableMap para = Arguments.createMap();
        para.putString(Extras.CONTENT, content);
        para.putString(Extras.CUSTOM_MESSAGE, customContent);
        para.putString(Extras.TITLE, title);
        para.putString(Extras.PUSH_CHANNEL, String.valueOf(pushChannel));
        para.putString(Extras.NOTIFACTION_ID, String.valueOf(notifactionId));
        para.putString(Extras.MSG_ID, String.valueOf(msgId));
        para.putString(Extras.ACTIVITY, activityPath);
        para.putString(Extras.NOTIFACTION_ACTION_TYPE, String.valueOf(notificationActionType));
        //交由Flutter自主处理
        XgPushModule.instance.sendEventMethod(Extras.ON_RECEIVE_NOTIFICATION_RESPONSE, para);
    }
}