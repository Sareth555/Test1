package asia.clik.ConsumerApp;

import android.app.Application;

import com.AlexanderZaytsev.RNI18n.RNI18nPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.airbnb.android.react.maps.MapsPackage;
import com.brentvatne.react.ReactVideoPackage;
import com.facebook.CallbackManager;
import com.facebook.react.ReactApplication;
import com.evollu.react.fcm.FIRMessagingPackage;
import io.invertase.firebase.RNFirebasePackage;
import com.reactlibrary.RNClikSharedAppPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.horcrux.svg.SvgPackage;
import com.rnfs.RNFSPackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.rt2zz.reactnativecontacts.ReactNativeContacts;
import com.lwansbrough.RCTCamera.RCTCameraPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private static CallbackManager mCallbackManager = CallbackManager.Factory.create();

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
            new MainReactPackage(),
            new FIRMessagingPackage(),
            new RNFirebasePackage(),
            new RNClikSharedAppPackage(),
            new VectorIconsPackage(),
            new ReactNativeContacts(),
            new SvgPackage(),
            new ReactVideoPackage(),
            new RNFSPackage(),
            new RCTCameraPackage(),
            new RNI18nPackage(),
            new FBSDKPackage(mCallbackManager),
            new LinearGradientPackage(),
            new MapsPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }

  protected static CallbackManager getCallbackManager() {
    return mCallbackManager;
  }

}
