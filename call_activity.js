    /**
        11/2024
        this script call a Activity @android
        by @brunovais
    */
    function callActivity(activity) {
        console.log("\n[ + ] Call Activity")

        var ActivityThread = Java.use("android.app.ActivityThread");
        var context = ActivityThread.currentApplication().getApplicationContext();
        var Intent = Java.use("android.content.Intent");
        var MyActivity = Java.use(activity);
        var intent = Intent.$new(context, MyActivity.class);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK.value);
        context.startActivity(intent);

    }