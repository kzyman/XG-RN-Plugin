//
//  RCTXgPushEventQueue.m
//  RCTXgPushModule
//
//  Created by zq on 2020/2/17.
//  Copyright © 2020 Tencent. All rights reserved.
//

#import "RCTXgPushEventQueue.h"

/**
@brief TPNS Event
*/
@implementation RCTXgPushEventQueue

+ (instancetype)sharedInstance {
    static RCTXgPushEventQueue *instance = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        instance = [[self alloc] init];
    });
    return instance;
}

- (instancetype)init
{
    self = [super init];
    if (self) {
    }
    return self;
}

@end
