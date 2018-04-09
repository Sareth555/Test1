import React, { Component } from 'react';
import {
    SplashScreen,
    CreateAccount,
    PINConfirm,
    CaptureScreen,
    PhoneNumberVerify,
    AccountRegistered,
    PersonalInfo,
    SocialConnect,
    LiveVideo,
    MainScreen,
    SMSVerification,
    VideoPreview,
    CreatePin,
    ConfirmPin,
    ViewReceiptScreen,
    ActionResult,
    SignIn,
    MerchantDetail,
    ScanQRCodeView,
    ChatMessage,
    ChatList
} from './scenes';

import { StackNavigator } from 'react-navigation';

const RootNavigator = StackNavigator(
    {
        SplashScreen: {
            screen: SplashScreen
        },
        CreateAccount: {
            screen: CreateAccount
        },
        PINConfirm: {
            screen: PINConfirm
        },
        Capture: {
            screen: CaptureScreen
        },
        PhoneNumberVerify: {
            screen: PhoneNumberVerify
        },
        AccountRegistered: {
            screen: AccountRegistered
        },
        PersonalInfo: {
            screen: PersonalInfo
        },
        SocialConnect: {
            screen: SocialConnect
        },
        MainScreen: {
            screen: MainScreen
        },
        SMSVerificationScreen: {
            screen: SMSVerification
        },
        LiveVideoScreen: {
            screen: LiveVideo
        },
        VideoPreviewScreen: {
            screen: VideoPreview
        },
        CreatePin: {
            screen: CreatePin
        },
        ConfirmPin: {
            screen: ConfirmPin
        },
        ViewReceiptScreen: {
            screen: ViewReceiptScreen
        },
        ActionResult: {
            screen: ActionResult
        },
        SignIn: {
            screen: SignIn
        },
        MerchantDetail: {
            screen: MerchantDetail
        },
        ScanQRCodeView: {
            screen: ScanQRCodeView
        },
        ChatMessage: {
            screen: ChatMessage
        },
        ChatList: {
            screen: ChatList
        }
    },
    {
        headerMode: 'none'
    }
);

export default RootNavigator;
