# [Clik Consumer App](http://www.clik.asia/)
_Safer then cash_

---
## Prerequisites (All Platforms)

Make sure you have completly installed the following:

* [React Native](https://facebook.github.io/react-native/docs/getting-started.html)

##  Prerequisites (iOS Platform)
* [Xcode](https://developer.apple.com/xcode)
* Run `npm install`
* Download the [Facebook SDK]
(https://origincache.facebook.com/developers/resources/?id=facebook-ios-sdk-current.zip)
* Unzip the Facebook SDK to `~/Documents/FacebookSDK`

##  Prerequisites (Android Platform)
* [Android Studio](https://developer.android.com/studio/index.html) 
*  Run `npm install`
*  Open node_modules/react-native-fbsdk/android/build.gradle. open build.gradle file.
*  Change `compile('com.facebook.android:facebook-android-sdk:4++')` to `compile('com.facebook.android:facebook-android-sdk:4.22.1')`

## Run The Application

- Android : `react-native run-android`
- iOS : `react-native run-ios`

## Troubleshooting

Sometimes it may be necessar to reinstall the FBSDK library if the application fails to run.

---

## Integration of React Native FBSDK

The [React Native FBSDK](https://github.com/facebook/react-native-fbsdk/blob/master/README.md) is a wrapper around the iOS Facebook SDK and Android Facebook SDK

**Quick Setup on Android**

* For Android we are already config in project
* [Android Studio Setup](https://developers.facebook.com/docs/android/getting-started#androidstudio)

**Quick Setup on iOS**

* Start from **Step 2** of facebook configuation [getting started document](https://developers.facebook.com/docs/ios/getting-started#download)
* [Configure Facebook App Settings](https://developers.facebook.com/docs/ios/getting-started#settings)
* [Video Config FBSDK](https://www.youtube.com/watch?v=rAXVKapP5cM)