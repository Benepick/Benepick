package com.benepick.EventListener;

import android.Manifest;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.os.Build;
import android.widget.Toast;

import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import com.facebook.react.bridge.*;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.google.android.gms.location.CurrentLocationRequest;
import com.google.android.gms.location.FusedLocationProviderClient;
import com.google.android.gms.location.Granularity;
import com.google.android.gms.location.LocationServices;
import com.google.android.gms.location.Priority;

import java.text.DecimalFormat;

public class EventListenerModule extends ReactContextBaseJavaModule {
  private final ReactApplicationContext reactContext;
  private FusedLocationProviderClient fusedLocationProviderClient;

  public EventListenerModule(ReactApplicationContext reactContext) {
      super(reactContext);
      this.reactContext = reactContext;
      fusedLocationProviderClient = LocationServices.getFusedLocationProviderClient(reactContext);
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
  public void getLocation(Callback successCallback, Callback errorCallback) {
      CurrentLocationRequest currentLocationRequest = new CurrentLocationRequest.Builder().setGranularity(Granularity.GRANULARITY_FINE).setPriority(Priority.PRIORITY_HIGH_ACCURACY).build();

      if (ContextCompat.checkSelfPermission(reactContext, Manifest.permission.ACCESS_FINE_LOCATION) == PackageManager.PERMISSION_GRANTED && ActivityCompat.checkSelfPermission(reactContext, Manifest.permission.ACCESS_COARSE_LOCATION) == PackageManager.PERMISSION_GRANTED) {
          if (fusedLocationProviderClient != null) {
          fusedLocationProviderClient.getCurrentLocation(currentLocationRequest, null).addOnSuccessListener(location -> {
              if (location != null) {
                  successCallback.invoke(location.getLatitude(), location.getLongitude());
              } else {
                  errorCallback.invoke("Location is null");
              }
          }).addOnFailureListener(error -> {
              errorCallback.invoke(error.getMessage());
          });
          }
      }
      else {
          errorCallback.invoke("Permission not granted");
      }
  }

  @ReactMethod
  public void addListener(String eventName) {
  }

  @ReactMethod
  public void removeListeners(Integer count) {
  }
}


