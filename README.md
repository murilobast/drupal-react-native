# POC App (React Native)

### Requirements
- JDK 8 http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html
- Android Studio https://developer.android.com/studio/install.html
- NodeJS https://nodejs.org/en/
- React Native https://facebook.github.io/react-native/docs/getting-started.html

### Running
First you need to have an Android Phone connected through adb or a running Android Emulator instance

Then compile and run the app
```` 
	$ react-native run-android
````
If you get a red screen error
````
	$ react-native start
````
Then click "RELOAD"

### Building
I'm providing a simple singnature key in `android/app/reactapp-key.keystore`

You can generate your own key using `keytool`
````
	$ keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
````

Generating a signed apk
- OSX/Linux
````
	$ cd android && ./gradlew assembleRelease
````
- Windows
````
	$ cd android && gradlew assembleRelease
````

`Proguard is enabled`
***
Murilo Bastos, Web Developer: iam@murilobastos.com
