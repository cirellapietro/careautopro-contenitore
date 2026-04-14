package io.ionic.starter;

import android.app.PendingIntent;
import android.appwidget.AppWidgetProvider;
import android.appwidget.AppWidgetManager;
import android.content.Context;
import android.content.Intent;
import android.widget.RemoteViews;
import com.careautopro.app.MainActivity;
import com.careautopro.app.R;

public class CarWidgetProvider extends AppWidgetProvider {

    @Override
    public void onUpdate(Context context, AppWidgetManager appWidgetManager, int[] appWidgetIds) {
        for (int appWidgetId : appWidgetIds) {
            // Prepariamo la vista del widget
            RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.car_widget_layout);
            
            // Intento per aprire l'applicazione (MainActivity)
            Intent intent = new Intent(context, MainActivity.class);
            PendingIntent pendingIntent = PendingIntent.getActivity(
                context, 
                0, 
                intent, 
                PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE
            );
            
            // Colleghiamo l'azione al pulsante nel layout
            views.setOnClickPendingIntent(R.id.btn_open_app, pendingIntent);
            
            // Aggiorniamo il widget
            appWidgetManager.updateAppWidget(appWidgetId, views);
        }
    }
}