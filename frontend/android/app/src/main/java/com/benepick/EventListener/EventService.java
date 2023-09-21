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
import android.location.Location;
import android.location.LocationManager;
import android.os.Build;
import android.os.IBinder;
import android.widget.Toast;

import androidx.core.app.ActivityCompat;

import com.benepick.MainApplication;
import com.benepick.R;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;

public class EventService extends Service implements SensorEventListener {
    private SensorManager sensorManager;
    private int lastShakeValue = -1;
    private long lastShakeTime = 0;
    private static final int SHAKE_THRESHOLD = 800;
    private static final int NOTIFICATION_ID = 1;
    private static final String CHANNEL_ID = "SHAKEPICK";
    private static boolean isRunning = false;

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

            long currentTime = System.currentTimeMillis();

            if ((currentTime - lastShakeTime) > 100) {
                long timeDiff = currentTime - lastShakeTime;
                lastShakeTime = currentTime;

                double speed = Math.abs(x + y + z - lastShakeValue) / timeDiff * 10000;

                if (speed > SHAKE_THRESHOLD) {
                    onShake();
                }

                lastShakeValue = (int) (x + y + z);
            }
        }
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

    private void onShake() {
        EventListenerModule eventListenerModule = new EventListenerModule((ReactApplicationContext) getReactContext());
        LocationManager locationManager = (LocationManager) getSystemService(Context.LOCATION_SERVICE);

        if (ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) == PackageManager.PERMISSION_GRANTED && ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_COARSE_LOCATION) == PackageManager.PERMISSION_GRANTED) {
            Location current = locationManager.getLastKnownLocation(LocationManager.GPS_PROVIDER);
            System.out.println(current);
            if (current != null) {
                eventListenerModule.sendLocation(current.getLatitude(), current.getLongitude());
            }
        }
        else {
            return;
        }
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
