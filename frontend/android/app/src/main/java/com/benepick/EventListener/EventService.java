package com.benepick.EventListener;

import android.Manifest;
import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.hardware.Sensor;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import android.hardware.SensorManager;
import android.os.Build;
import android.os.IBinder;

import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import com.benepick.MainApplication;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;

import com.google.android.gms.location.CurrentLocationRequest;
import com.google.android.gms.location.FusedLocationProviderClient;
import com.google.android.gms.location.LocationServices;
import com.google.android.gms.location.Priority;

public class EventService extends Service implements SensorEventListener {
    private SensorManager sensorManager;
    private static final float SHAKE_THRESHOLD_GRAVITY = 3.5f;
    private static final int SHAKE_COUNT_THRESHOLD = 2;
    private int shakeCount = 0;
    private long lastShakeTimestamp = 0;
    private static final int NOTIFICATION_ID = 1;
    private static final String CHANNEL_ID = "SHAKEPICK";
    private static boolean isRunning = false;
    private FusedLocationProviderClient fusedLocationProviderClient;

    public EventService() {
        super();
    }

    private ReactContext getReactContext() {
        ReactInstanceManager reactInstanceManager = ((MainApplication) getApplication()).getReactNativeHost().getReactInstanceManager();
        return reactInstanceManager.getCurrentReactContext();
    }

    @Override
    public void onCreate() {
        super.onCreate();
        sensorManager = (SensorManager) getSystemService(Context.SENSOR_SERVICE);
        fusedLocationProviderClient = LocationServices.getFusedLocationProviderClient(this);
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        startListening();
        setIsRunning(true);
        return START_STICKY;
    }

    @Override
    public void onDestroy() {
        stopListening();
        setIsRunning(false);
        super.onDestroy();
    }

    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    @Override
    public void onSensorChanged(SensorEvent event) {
        if (event.sensor.getType() == Sensor.TYPE_ACCELEROMETER) {
            float x = event.values[0];
            float y = event.values[1];
            float z = event.values[2];

             float gX = x / SensorManager.GRAVITY_EARTH;
             float gY = y / SensorManager.GRAVITY_EARTH;
             float gZ = z / SensorManager.GRAVITY_EARTH;

             float gForce = (float)Math.sqrt(gX * gX + gY * gY + gZ * gZ);

            if (gForce > SHAKE_THRESHOLD_GRAVITY) {
                long now = System.currentTimeMillis();
                if (lastShakeTimestamp == 0) {
                    lastShakeTimestamp = now;
                }

                if (lastShakeTimestamp + 350 > now) {
                    return;
                }

                long shakeTime = now - lastShakeTimestamp;
                if (shakeTime > 1500) {
                    setShakeCount(0);
                }

                lastShakeTimestamp = now;
                shakeCount++;
                System.out.println(shakeCount);
                if (shakeCount >= SHAKE_COUNT_THRESHOLD) {
                    onShake();
                    setShakeCount(0);
                }
            }
        }
    }
    private void setShakeCount(int count) {
        shakeCount = count;
    }
    @Override
    public void onAccuracyChanged(Sensor sensor, int accuracy) {
        // Do nothing
    }
    private void startListening() {
        Sensor accelerometerSensor = sensorManager.getDefaultSensor(Sensor.TYPE_ACCELEROMETER);
        if (accelerometerSensor != null) {
            sensorManager.registerListener(this, accelerometerSensor, SensorManager.SENSOR_DELAY_NORMAL);
        }
        startForeground(NOTIFICATION_ID, createNotification());
    }

    private void stopListening() {
        sensorManager.unregisterListener(this);
    }

    public void onShake() {
        EventListenerModule eventListenerModule = new EventListenerModule((ReactApplicationContext) getReactContext());

        CurrentLocationRequest currentLocationRequest = new CurrentLocationRequest.Builder().setPriority(Priority.PRIORITY_HIGH_ACCURACY).build();

        if (ContextCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) == PackageManager.PERMISSION_GRANTED && ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_COARSE_LOCATION) == PackageManager.PERMISSION_GRANTED) {
            fusedLocationProviderClient.getCurrentLocation(currentLocationRequest, null).addOnSuccessListener(location -> {
                if (location != null) {
                    eventListenerModule.sendLocation(location.getLatitude(), location.getLongitude());
                }
            });
        }
//        LocationManager locationManager = (LocationManager) getSystemService(Context.LOCATION_SERVICE);

//        if (ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) == PackageManager.PERMISSION_GRANTED && ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_COARSE_LOCATION) == PackageManager.PERMISSION_GRANTED) {
//            Location current = locationManager.getLastKnownLocation(LocationManager.GPS_PROVIDER);
//            if (current != null) {
//                eventListenerModule.sendLocation(current.getLatitude(), current.getLongitude());
//            }
//        }
    }

    private Notification createNotification() {
        Notification notification;
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationChannel channel = new NotificationChannel(
                    CHANNEL_ID,
                    "SHAKEPICK",
                    NotificationManager.IMPORTANCE_HIGH
            );

            NotificationManager notificationManager = getSystemService(NotificationManager.class);
            notificationManager.createNotificationChannel(channel);

            notification = new Notification.Builder(this, CHANNEL_ID)
                    .setContentTitle("BENEPICK")
                    .setContentText("BENEPICK 서비스가 실행 중입니다.")
                    .build();
        } else {
            notification = new Notification.Builder(this)
                    .setContentTitle("BENEPICK")
                    .setContentText("BENEPICK 서비스가 실행 중입니다.")
                    .build();
        }

        return notification;
    }
    private void setIsRunning(boolean isRunning) {
        EventService.isRunning = isRunning;
    }
    public static boolean getIsRunning() {
        return isRunning;
    }
}
