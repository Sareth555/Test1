/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"
#import <FBSDKCoreKit/FBSDKCoreKit.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <AVFoundation/AVFoundation.h>
#import <React/RCTLinkingManager.h>
#import <Firebase.h>
#import <FirebaseMessaging/FIRMessaging.h>
@import FirebaseMessaging;

@import GoogleMaps;
@implementation AppDelegate

- (BOOL)application:(UIApplication *)application
didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  [FIRApp configure];
  [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(tokenRefreshCallBack:) name:kFIRInstanceIDTokenRefreshNotification object:nil];
  UIUserNotificationType allNotificationType = (UIUserNotificationTypeSound | UIUserNotificationTypeAlert | UIUserNotificationTypeBadge);
  UIUserNotificationSettings *setting = [UIUserNotificationSettings settingsForTypes:allNotificationType categories:nil];
  [application registerUserNotificationSettings:setting];
  [application registerForRemoteNotifications];
  [FIRMessaging messaging].delegate = self;
  [[UNUserNotificationCenter currentNotificationCenter] setDelegate:self];
  
  [GMSServices provideAPIKey:@"AIzaSyBisFuqs__G62l4l6hwv7MJbG-oAfubzd0"];
  [[AVAudioSession sharedInstance] setCategory:AVAudioSessionCategoryAmbient error:nil];
  [NSThread sleepForTimeInterval:3.0];
  NSURL *jsCodeLocation;
  
  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
  
  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"consumer-app"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];
  
  [[FBSDKApplicationDelegate sharedInstance] application:application
                           didFinishLaunchingWithOptions:launchOptions];
  
  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  
  return YES;
}

- (BOOL)application:(UIApplication *)application
            openURL:(NSURL *)url
            options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options {
  BOOL handled = [[FBSDKApplicationDelegate sharedInstance] application:application
                                                                openURL:url
                                                      sourceApplication:options[UIApplicationOpenURLOptionsSourceApplicationKey]
                                                             annotation:options[UIApplicationOpenURLOptionsAnnotationKey]
                  ];
  if (handled) {
    return handled;
  }
  else{
    return [RCTLinkingManager application:application openURL:url
                        sourceApplication:nil annotation:nil];
  }
}

- (BOOL)application:(UIApplication *)application
            openURL:(NSURL *)url
  sourceApplication:(NSString *)sourceApplication
         annotation:(id)annotation {

  BOOL handled = [[FBSDKApplicationDelegate sharedInstance] application:application
                                                                openURL:url
                                                      sourceApplication:sourceApplication
                                                             annotation:annotation
                  ];
  if (handled) {
    return handled;
  }
  else{
    return [RCTLinkingManager application:application openURL:url
                        sourceApplication:sourceApplication annotation:annotation];
  }
  
}
- (BOOL)application:(UIApplication *)application continueUserActivity:(NSUserActivity *)userActivity
 restorationHandler:(void (^)(NSArray * _Nullable))restorationHandler
{
  return [RCTLinkingManager application:application
                   continueUserActivity:userActivity
                     restorationHandler:restorationHandler];
}

-(void) applicationDidBecomeActive:(UIApplication *)application{
  [self connectToFirebase];
}
-(void) applicationDidEnterBackground:(UIApplication *)application{
  [[FIRMessaging messaging] disconnect];
  NSLog(@"Disconnect from FCM");
}
-(void) application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler{
  NSLog(@"MessageID = %@", userInfo[@"gcm.message_id"]);
  NSLog(@"UserInfo= %@",userInfo);
}

-(void)tokenRefreshCallBack:(NSNotification*) notification{
  NSString* refreshToken = [[FIRInstanceID instanceID] token];
  NSLog(@"InstanceID token: %@",refreshToken);
  [self connectToFirebase];
}
-(void)connectToFirebase{
  [[FIRMessaging messaging] connectWithCompletion:^(NSError * _Nullable error) {
    if (error != nil) {
      NSLog(@"Unable connected to FCM.");
    }
    else{
      NSLog(@"Connected to FCM.");
    }
  }];
}




@end
