package com.benepick.EventListener;

import android.content.Intent;
import android.widget.Toast;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
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
  public void startListeningInBackground() {
      Intent serviceIntent = new Intent(reactContext, EventService.class);
      reactContext.startService(serviceIntent);
  }

  @ReactMethod
  public void stopListening() {
      Intent serviceIntent = new Intent(reactContext, EventService.class);
      reactContext.stopService(serviceIntent);
  }

  @ReactMethod
  public void sendTrigger(String trigger) {
      Toast.makeText(reactContext, "트리거 발동", Toast.LENGTH_SHORT).show();
      reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit("onTrigger", trigger);
  }

    @ReactMethod
    public void addListener(String eventName) {

    }

    @ReactMethod
    public void removeListeners(Integer count) {

    }
}


