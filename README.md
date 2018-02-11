# Cordova Android Life Cycle Guide quirks

A simple demo app for the Ionic Zürich group to display Cordova the Android Life Cycle Guide quirks

## Cordova Android Life Cycle

The Cordova Android Life Cycle and quirks is described in the [documentation](https://cordova.apache.org/docs/en/latest/guide/platforms/android/index.html#lifecycle-guide)

## Demo structure

The [master](https://github.com/peterpeterparker/ionic-zurich-cordova-android-quirks) branch of this project doesn't include any quirks. You could use it to simulate the problem on an Android device running on low memory. You could also simulate the effect by setting your Android device to "always destroy activities" (in the developer options).

The [quirks](https://github.com/peterpeterparker/ionic-zurich-cordova-android-quirks/tree/quirks) branch display how to handle the lifecycle in order to know not loose user inputs or not display a restarting app to them.

## Additional documentation

I did document the all story of discovering the problem in my app and how I solved it on the [Ionic forum](https://forum.ionicframework.com/t/solved-camera-plugin-restart-app-on-android-8-1/117828/5)

## Note

If you are using the `cordova-plugin-facebook4` you may need to modify the plugin in order to get the quirks resume value. See the above Ionic forum link for more information
