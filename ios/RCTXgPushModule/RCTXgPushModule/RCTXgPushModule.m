//
//  RCTXgPushModule.m
//  RCTXgPushModule
//
//  Created by zq on 2020/2/16.
//  Copyright © 2020 Tencent. All rights reserved.
//

#import "RCTXgPushModule.h"
#import "RCTXgPushEventQueue.h"

#if __IPHONE_OS_VERSION_MAX_ALLOWED >= __IPHONE_10_0
#import <UserNotifications/UserNotifications.h>
#endif

//callback
//DeviceToken回调
#define OnRegisteredDeviceToken  @"onRegisteredDeviceToken"
//注册推送服务成功回调
#define OnRegisteredDone  @"onRegisteredDone"
//注销推送服务回调
#define UnRegistered @"unRegistered"
//收到通知消息回调
#define OnReceiveNotificationResponse  @"onReceiveNotificationResponse"
//收到透传、静默消息回调
#define OnReceiveMessage  @"onReceiveMessage"
//设置角标回调
#define XgPushDidSetBadge @"xgPushDidSetBadge"
//绑定账号和标签回调
#define XgPushDidBindWithIdentifier  @"xgPushDidBindWithIdentifier"
//解绑账号和标签回调
#define XgPushDidUnbindWithIdentifier  @"xgPushDidUnbindWithIdentifier"
//更新账号和标签回调
#define XgPushDidUpdatedBindedIdentifier @"xgPushDidUpdatedBindedIdentifier"
//清除所有账号和标签回调
#define XgPushDidClearAllIdentifiers  @"xgPushDidClearAllIdentifiers"
//通知点击回调
#define XgPushClickAction  @"xgPushClickAction"

@interface  RCTXgPushModule()<XGPushDelegate, XGPushTokenManagerDelegate>
{
    //callback
    //DeviceToken回调
    RCTResponseSenderBlock  onRegisteredDeviceToken;
    //注册推送服务成功回调
    RCTResponseSenderBlock  onRegisteredDone;
    //注销推送服务回调
    RCTResponseSenderBlock unRegistered;
    //收到通知消息回调
    RCTResponseSenderBlock  onReceiveNotificationResponse;
    //收到透传、静默消息回调
    RCTResponseSenderBlock  onReceiveMessage;
    //设置角标回调
    RCTResponseSenderBlock xgPushDidSetBadge;
    //绑定账号和标签回调
    RCTResponseSenderBlock  xgPushDidBindWithIdentifier;
    //解绑账号和标签回调
    RCTResponseSenderBlock  xgPushDidUnbindWithIdentifier;
    //更新账号和标签回调
    RCTResponseSenderBlock xgPushDidUpdatedBindedIdentifier;
    //清除所有账号和标签回调
    RCTResponseSenderBlock  xgPushDidClearAllIdentifiers;
    //通知点击回调
    RCTResponseSenderBlock  xgPushClickAction;
}
@end

@implementation RCTXgPushModule

RCT_EXPORT_MODULE();
@synthesize bridge = _bridge;

+ (BOOL)requiresMainQueueSetup
{
    return YES;
}

//===================================信鸽注册反注册和debug接口================================

//注册推送服务
//iOS需传appId和appKey
//android不需要传参数
RCT_EXPORT_METHOD(startXg:(NSString *)appId andSequenceNum:(NSString *)appKey)
{
    dispatch_sync(dispatch_get_main_queue(), ^{
        [[XGPush defaultManager] startXGWithAppID:(uint32_t)[appId longLongValue] appKey:appKey delegate:self];
    });
}

//注销推送服务
RCT_EXPORT_METHOD(stopXg)
{
    [[XGPush defaultManager] stopXGNotification];
}

//debug模式
RCT_EXPORT_METHOD(setEnableDebug:(BOOL)enableDebug)
{
    [[XGPush defaultManager] setEnableDebug:enableDebug];
}

//========================================单个操作账号和标签================================

//绑定账号或标签
RCT_EXPORT_METHOD(bindWithIdentifier:(NSString *)identify andBindType:(int)bindType)
{
    [[XGPushTokenManager defaultTokenManager] bindWithIdentifier:identify type:bindType];
}

//解绑账号或标签
RCT_EXPORT_METHOD(unbindWithIdentifier:(NSString *)identify andBindType:(int)bindType)
{
    [[XGPushTokenManager defaultTokenManager] unbindWithIdentifer:identify type:bindType];
}

//========================================批量操作账号和标签================================

//批量绑定账号或标签
//对于账号操作. List类型为dic数组[{'account':identifyStr, 'accountType':0}]
//对于标签操作，List类型为字符串数组(标签字符串不允许有空格或者是tab字符) [identifyStr]
RCT_EXPORT_METHOD(bindWithIdentifiers:(nonnull NSArray *)identifys andBindType:(int)bindType)
{
    [[XGPushTokenManager defaultTokenManager] bindWithIdentifiers:identifys type:bindType];
}

//批量解绑账号或标签
//对于账号操作. List类型为dic数组[{'account':identifyStr, 'accountType':0}]
//对于标签操作，List类型为字符串数组(标签字符串不允许有空格或者是tab字符) [identifyStr]
RCT_EXPORT_METHOD(unbindWithIdentifiers:(nonnull NSArray *)identifys andBindType:(int)bindType)
{
    [[XGPushTokenManager defaultTokenManager] unbindWithIdentifers:identifys type:bindType];
}

//清除全部账号或标签
RCT_EXPORT_METHOD(clearAllIdentifier:(int)bindType)
{
    [[XGPushTokenManager defaultTokenManager] clearAllIdentifiers:bindType];
}

//========================================更新账号和标签================================

//更新账号或标签
//对于账号操作. List类型为dic数组[{'account':identifyStr, 'accountType':0}]
//对于标签操作，List类型为字符串数组(标签字符串不允许有空格或者是tab字符) [identifyStr]
RCT_EXPORT_METHOD(updateBindIdentifiers:(nonnull NSArray *)identifys andBindType:(int)bindType)
{
    [[XGPushTokenManager defaultTokenManager] updateBindedIdentifiers:identifys bindType:bindType];
}

//========================================设置角标======================================

RCT_EXPORT_METHOD(setBadge:(int)badgeSum)
{
    [[XGPush defaultManager] setBadge:badgeSum];
}

//=====================================================================================
//========================================设置应用显示角标======================================

RCT_EXPORT_METHOD(setXgApplicationBadgeNumber:(int)badgeSum)
{
    [[XGPush defaultManager] setXgApplicationBadgeNumber:badgeSum];
}

//=====================================================================================

RCT_EXPORT_METHOD(unRegisteredCallback:(RCTResponseSenderBlock)callback){
  unRegistered = callback;
}

#pragma mark - XGPushDelegate
- (void)xgPushDidFinishStart:(BOOL)isSuccess error:(NSError *)error {
    NSLog(@"%s, result %@, error %@", __FUNCTION__, isSuccess?@"OK":@"NO", error);
}

- (void)xgPushDidFinishStop:(BOOL)isSuccess error:(NSError *)error {
    NSString *resultStr = @"";
    if (error) {
        resultStr = [error domain];
    } else {
        resultStr = @"注销完成";
    }
    [self.bridge enqueueJSCall:@"RCTDeviceEventEmitter"
        method:@"emit"
          args:@[UnRegistered,resultStr]
    completion:NULL];
}

- (void)xgPushDidRegisteredDeviceToken:(NSString *)deviceToken xgToken:(NSString *)xgToken error:(NSError *)error {
    if (!error) {
        [self.bridge enqueueJSCall:@"RCTDeviceEventEmitter"
            method:@"emit"
              args:@[OnRegisteredDone,xgToken]
        completion:NULL];
        [[XGPushTokenManager defaultTokenManager] setDelegate:self];
    } else {
        [self.bridge enqueueJSCall:@"RCTDeviceEventEmitter"
            method:@"emit"
              args:@[OnRegisteredDeviceToken,xgToken]
        completion:NULL];
    }
}

// iOS 10 新增 API
// iOS 10 会走新 API, iOS 10 以前会走到老 API
#if __IPHONE_OS_VERSION_MAX_ALLOWED >= __IPHONE_10_0
// App 用户点击通知
// App 用户选择通知中的行为
// App 用户在通知中心清除消息
// 无论本地推送还是远程推送都会走这个回调
- (void)xgPushUserNotificationCenter:(UNUserNotificationCenter *)center didReceiveNotificationResponse:(UNNotificationResponse *)response withCompletionHandler:(void (^)(void))completionHandler  API_AVAILABLE(ios(10.0)){
    NSLog(@"[XGDemo] click notification");
    
    if (response.notification.request.content.userInfo) {
        [self.bridge enqueueJSCall:@"RCTDeviceEventEmitter"
            method:@"emit"
              args:@[XgPushClickAction,response.notification.request.content.userInfo]
        completion:NULL];
    }
    
    if ([response.actionIdentifier isEqualToString:@"xgaction001"]) {
        NSLog(@"click from Action1");
    } else if ([response.actionIdentifier isEqualToString:@"xgaction002"]) {
        NSLog(@"click from Action2");
    }
    completionHandler();
}
#endif
/**
 统一收到通知消息的回调
 @param notification 消息对象
 @param completionHandler 完成回调
 @note SDK 3.2.0+
 */
- (void)xgPushDidReceiveRemoteNotification:(id)notification withCompletionHandler:(void (^)(NSUInteger))completionHandler {
    if ([notification isKindOfClass:[NSDictionary class]]) {
        [self.bridge enqueueJSCall:@"RCTDeviceEventEmitter"
            method:@"emit"
              args:@[onReceiveMessage,notification]
        completion:NULL];
    } else if (@available(iOS 10.0, *)) {
        if ([notification isKindOfClass:[UNNotification class]]) {
            //NSLog(@"xg info :%@", ((UNNotification *)notification).request.content.userInfo);
            completionHandler(UNNotificationPresentationOptionBadge | UNNotificationPresentationOptionSound | UNNotificationPresentationOptionAlert);
            [self.bridge enqueueJSCall:@"RCTDeviceEventEmitter"
                method:@"emit"
                  args:@[OnReceiveNotificationResponse,((UNNotification *)notification).request.content.userInfo]
            completion:NULL];
        }
    } else {
        // Fallback on earlier versions
    }
}

- (void)xgPushDidSetBadge:(BOOL)isSuccess error:(NSError *)error {
    NSString *argumentDescribe = @"设置角标成功";
    if (error) {
        argumentDescribe = [NSString stringWithFormat:@"设置角标失败：%@",error.description];
    }
    [self.bridge enqueueJSCall:@"RCTDeviceEventEmitter" method:@"emit" args:@[XgPushDidSetBadge,argumentDescribe] completion:NULL];
}


#pragma mark - XGPushTokenManagerDelegate

- (void)xgPushDidBindWithIdentifier:(NSString *)identifier type:(XGPushTokenBindType)type error:(NSError *)error {
    NSString *argumentDescribe = @"绑定成功";
    if (error) {
        argumentDescribe = [NSString stringWithFormat:@"绑定失败：%@",error.description];
    }
    [self.bridge enqueueJSCall:@"RCTDeviceEventEmitter" method:@"emit" args:@[XgPushDidBindWithIdentifier,argumentDescribe] completion:NULL];
}

- (void)xgPushDidUnbindWithIdentifier:(NSString *)identifier type:(XGPushTokenBindType)type error:(NSError *)error {
    NSString *argumentDescribe = @"解绑成功";
    if (error) {
        argumentDescribe = [NSString stringWithFormat:@"解绑失败：%@",error.description];
    }
    [self.bridge enqueueJSCall:@"RCTDeviceEventEmitter" method:@"emit" args:@[XgPushDidUnbindWithIdentifier,argumentDescribe] completion:NULL];
}

- (void)xgPushDidBindWithIdentifiers:(NSArray<NSString *> *)identifiers type:(XGPushTokenBindType)type error:(NSError *)error {
    NSString *argumentDescribe = @"绑定成功";
    if (error) {
        argumentDescribe = [NSString stringWithFormat:@"绑定失败：%@",error.description];
    }
    [self.bridge enqueueJSCall:@"RCTDeviceEventEmitter" method:@"emit" args:@[XgPushDidUnbindWithIdentifier,argumentDescribe] completion:NULL];
}

- (void)xgPushDidUnbindWithIdentifiers:(NSArray<NSString *> *)identifiers type:(XGPushTokenBindType)type error:(NSError *)error {
    NSString *argumentDescribe = @"解绑成功";
    if (error) {
        argumentDescribe = [NSString stringWithFormat:@"绑定失败：%@",error.description];
    }
    [self.bridge enqueueJSCall:@"RCTDeviceEventEmitter" method:@"emit" args:@[XgPushDidUnbindWithIdentifier,argumentDescribe] completion:NULL];
}

- (void)xgPushDidUpdatedBindedIdentifiers:(NSArray<NSString *> *)identifiers bindType:(XGPushTokenBindType)type error:(NSError *)error {
    NSString *argumentDescribe = @"更新成功";
    if (error) {
        argumentDescribe = [NSString stringWithFormat:@"更新失败：%@",error.description];
    }
    [self.bridge enqueueJSCall:@"RCTDeviceEventEmitter" method:@"emit" args:@[XgPushDidUpdatedBindedIdentifier,argumentDescribe] completion:NULL];
}

- (void)xgPushDidClearAllIdentifiers:(XGPushTokenBindType)type error:(NSError *)error {
    NSString *argumentDescribe = @"清除完成";
    if (error) {
        argumentDescribe = [NSString stringWithFormat:@"清除失败：%@",error.description];
    }
    [self.bridge enqueueJSCall:@"RCTDeviceEventEmitter" method:@"emit" args:@[XgPushDidClearAllIdentifiers,argumentDescribe] completion:NULL];
}

@end
