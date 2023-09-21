package com.benepick.EventListener;

import android.content.Intent;
import android.os.Build;
import android.widget.Toast;
import com.facebook.react.bridge.*;
import com.facebook.react.modules.core.DeviceEventManagerModule;

public class EventListenerModule extends ReactContextBaseJavaModule {
  private final ReactApplicationContext reactContext;

  public EventListenerModule(ReactApplicationContext reactContext) {
      super(reactContext);
      this.reactContext = reactContext;
  }

  @Override
  public String getName() {
      return "EventListener";
  }

  @ReactMethod
  public void startShakePick() {
      Intent serviceIntent = new Intent(reactContext, EventService.class);
      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
          reactContext.startForegroundService(serviceIntent);
      } else {
          reactContext.startService(serviceIntent);
      }
      Toast.makeText(reactContext, "RN_Start", Toast.LENGTH_SHORT).show();
  }

  @ReactMethod
  public void stopShakePick() {
      Intent serviceIntent = new Intent(reactContext, EventService.class);
      if (EventService.getIsRunning()) {
          reactContext.stopService(serviceIntent);
      }
      Toast.makeText(reactContext, "RN_Stop", Toast.LENGTH_SHORT).show();
  }

  @ReactMethod
  public void sendLocation(double latitude, double longitude) {
      WritableMap location = Arguments.createMap();
      location.putDouble("latitude", latitude);
      location.putDouble("longitude", longitude);

      reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit("onTrigger", location);
  }
    @ReactMethod
    public void addListener(String eventName) {
    }

    @ReactMethod
    public void removeListeners(Integer count) {
    }

}


