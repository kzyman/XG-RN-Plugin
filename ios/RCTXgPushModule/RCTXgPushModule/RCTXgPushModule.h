//
//  RCTXgPushModule.h
//  RCTXgPushModule
//
//  Created by zq on 2020/2/16.
//  Copyright © 2020 Tencent. All rights reserved.
//

#import <Foundation/Foundation.h>

#if __has_include(<React/RCTBridge.h>)
#import <React/RCTEventEmitter.h>
#import <React/RCTRootView.h>
#import <React/RCTBridge.h>
#elif __has_include("RCTBridge.h")
#import "../Modules/RCTEventEmitter.h"
#import "RCTRootView.h"
#import "RCTBridge.h"
#endif


#import "XGPush.h"

@interface RCTXgPushModule : NSObject<RCTBridgeModule>

@end
