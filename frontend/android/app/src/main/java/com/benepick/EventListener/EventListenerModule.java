package com.benepick.EventListener;

import android.content.Intent;
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
  public void startListening() {
      Intent serviceIntent = new Intent(reactContext, EventService.class);
      reactContext.startService(serviceIntent);
      Toast.makeText(reactContext, "들어", Toast.LENGTH_SHORT).show();
  }

  @ReactMethod
  public void stopListening() {
      Intent serviceIntent = new Intent(reactContext, EventService.class);
      reactContext.stopService(serviceIntent);
      Toast.makeText(reactContext, "듣지마", Toast.LENGTH_SHORT).show();
  }

  @ReactMethod
  public void sendLocation(double latitude, double longitude) {
      WritableMap location = Arguments.createMap();
      location.putDouble("latitude", latitude);
      location.putDouble("longitude", longitude);

      reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit("onTrigger", location);
  }
}


